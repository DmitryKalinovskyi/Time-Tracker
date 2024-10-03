import User from "../../../types/User.ts";

export interface WorkReportQueryResponse {
    errors? : [],
    data: {
        workReportingQuery: {
            workReport:{
                page: number,
                pageSize: number,
                pageCount: number,
                users: [{
                    user: User,
                    trackedHours: number
                }]
            }
        }
    }
}

export const workReportQuery = () =>
`
query WorkReportQuery($input: WorkReportInput!){
  workReportingQuery{
    workReport(input: $input){
      page,
      pageCount,
      pageSize
      users{
        user{
          id,
          fullName,
          email
        }
        trackedHours
      }
    }
  }
}
`
