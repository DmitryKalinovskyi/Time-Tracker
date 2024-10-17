using Dapper;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml;
using Time_Tracker.Factories;
using Time_Tracker.Models;

namespace Time_Tracker.Services.WorkReport
{
    public class WorkReportBuilder(ISQLConnectionFactory sqlConnectionFactory)
    {
        private DateTimeOffset? _from;
        private DateTimeOffset? _to;
        private int _page = 0;
        private int _pageSize = 10;

        public WorkReportBuilder From(DateTimeOffset from)
        {
            _from = from;
            return this;
        }

        public WorkReportBuilder To(DateTimeOffset to)
        {
            _to = to;
            return this;
        }

        public WorkReportBuilder Paginate(int page, int pageSize)
        {
            if (page < 0 || pageSize < 0) throw new ArgumentException("Page and PageSize is non-negative numbers.");
            _page = page;
            _pageSize = pageSize;
            return this;
        }

        private async Task<int> GetRecordsCount()
        {
            if (_from == null || _to == null)
                throw new InvalidOperationException("From and To parameters is required.");

            if (_from > _to)
                throw new InvalidOperationException("From should be before To.");

            using var sqlConnection = sqlConnectionFactory.GetSqlConnection();

            var rowsCountSQL = $@"
                SELECT COUNT(*) from (
                SELECT UserId
                FROM WorkSessions
                WHERE WorkSessions.StartTime >=  @StartTime
                  AND WorkSessions.EndTime <= @EndTime
                GROUP BY UserId) as Subquery;
            ";

            var rowsCount = await sqlConnection.QuerySingleAsync<int>(rowsCountSQL, new { StartTime = _from, EndTime = _to });
            
            return rowsCount;
        }

        private async Task<IEnumerable<UserReport>> GetUsersReports()
        {
            var sql = $@"SELECT Users.*, 
                       WorkSessionsSummary.TrackedTime
                FROM Users
                INNER JOIN (
                    SELECT UserId, 
                           SUM(WorkSessions.Duration) AS TrackedTime
                    FROM WorkSessions
                    WHERE WorkSessions.StartTime >= @StartTime 
                      AND WorkSessions.EndTime <= @EndTime
                    GROUP BY UserId
                    ORDER By UserId
                    OFFSET @Offset ROWS
                    FETCH NEXT @PageSize ROWS ONLY
                ) AS WorkSessionsSummary ON Users.Id = WorkSessionsSummary.UserId;";

            using var sqlConnection = sqlConnectionFactory.GetSqlConnection();

            var results = await sqlConnection.QueryAsync(sql, new { StartTime = _from, EndTime = _to, Offset = _page * _pageSize, PageSize = _pageSize });

            var usersReports = results.Select(result =>
            {
                var user = new User()
                {
                    Id = result.Id,
                    FullName = result.FullName,
                    Email = result.Email,
                    HashedPassword = result.HashedPassword,
                    IsActive = result.IsActive,
                    Permissions = ((string)result.Permissions)?.Split(' ', StringSplitOptions.RemoveEmptyEntries).ToList() ?? [],
                    RefreshTokenDateExpires = result.RefreshTokenDateExpires,
                    RefreshToken = result.RefreshToken,
                    Salt = result.Salt,
                    Position = result.Position,
                    WorkHoursPerMonth = result.WorkHoursPerMonth,
                };

                var userReport = new UserReport()
                {
                    User = user,
                    TrackedHours = (int)Math.Round(result.TrackedTime / 3600.0)
                };
                return userReport;
            });
            return usersReports;
        }

        // attach pagination and user filters in the future.

        public async Task<WorkReport> BuildReport()
        {
            var recordsCount = await GetRecordsCount();
            var usersReports = await GetUsersReports();

            var report = new WorkReport()
            {
                Users = usersReports.ToList(),
                Page = _page,
                PageSize = _pageSize,
                PageCount = (int)Math.Ceiling((double)recordsCount / _pageSize)
            };

            return report;
        }

        public async Task<string> BuildExcelReportFile()
        {
            var recordsCount = await GetRecordsCount();
            _pageSize = recordsCount;
            var usersReports = await GetUsersReports();


            string fromDate = _from!.Value.ToString("yyyy.MM.dd");
            string toDate = _to!.Value.ToString("yyyy.MM.dd");

            // Set the relative path with date range in the file name
            string relativePath = $@"Reports\WorkReport_{fromDate}_to_{toDate}.xlsx";
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), relativePath);

            string directory = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            using (SpreadsheetDocument document = SpreadsheetDocument.Create(filePath, SpreadsheetDocumentType.Workbook))
            {
                WorkbookPart workbookPart = document.AddWorkbookPart();
                workbookPart.Workbook = new Workbook();

                WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
                SheetData sheetData = new SheetData();
                worksheetPart.Worksheet = new Worksheet(sheetData);

                Sheets sheets = document.WorkbookPart.Workbook.AppendChild(new Sheets());

                Sheet sheet = new Sheet()
                {
                    Id = document.WorkbookPart.GetIdOfPart(worksheetPart),
                    SheetId = 1,
                    Name = "WorkReport"
                };
                sheets.Append(sheet);

                Row headerRow = new Row();
                headerRow.Append(
                    new Cell() { CellValue = new CellValue("FullName"), DataType = CellValues.String },
                    new Cell() { CellValue = new CellValue("Email"), DataType = CellValues.String },
                    new Cell() { CellValue = new CellValue("Tracked Hours"), DataType = CellValues.String });

                sheetData.Append(headerRow);

                foreach (var report in usersReports)
                {
                    Row dataRow = new Row();
                    dataRow.Append(
                        new Cell() { CellValue = new CellValue(report.User.FullName), DataType = CellValues.String },
                        new Cell() { CellValue = new CellValue(report.User.Email), DataType = CellValues.String },
                        new Cell() { CellValue = new CellValue(report.TrackedHours.ToString()), DataType = CellValues.Number });

                    sheetData.Append(dataRow);
                }
                workbookPart.Workbook.Save();
            }
            return filePath;
        }
    }
}
