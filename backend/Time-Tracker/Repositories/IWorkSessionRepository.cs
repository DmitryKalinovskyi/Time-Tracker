﻿using Time_Tracker.Enums;
using Time_Tracker.Helpers;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface IWorkSessionRepository
    {

        Task<WorkSession> AddWorkSessionAsync(WorkSession workSession);

        Task<WorkSession> UpdateWorkSessionAsync(WorkSession workSession);

        Task DeleteWorkSessionAsync(int id);

        Task<WorkSession?> GetWorkSessionByIdAsync(int id);

        Task<PaginationResult<WorkSession>> GetWorkSessionsWithPaginationAsync(PaginationRequest<WorkSessionSortableFields, WorkSessionFilterableFields, SQLOperators> request);

        Task<int> GetTotalDurationByFiltersAsync(List<FilterCriteria<TotalDurationOfWorkSessionsFilters, SQLOperators>> filterCriterias);

        Task<WorkSession?> GetCurrentWorkSessionByUserIdAsync(int userId);

        Task<bool> IsWorkSessionTimeAvailable(WorkSession workSession);
    }
}
