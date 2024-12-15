import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";
import {WorkSession} from "@time-tracker/types/WorkSession.ts";
import PaginatedResult from "@time-tracker/types/PaginatedResult.ts";

export interface GetWorkSessionsResponse{
    errors? : GraphQLExecutionErrorType[],
    data: {
        timeTrackerQuery: {
            workSessions: PaginatedResult<WorkSession>
        }
    }
}

export const getWorkSessionsQuery = () => `
query GetWorkSessions($input: PaginationRequestInputGraphType_WorkSessionSortableFields!){
  timeTrackerQuery{
    workSessions(input: $input) {
      results {
        id
        startTime
        endTime
        duration
        createdAt
        lastUpdatedAt
        user {
          id
          fullName
          email
        }
        editedBy {
          id
          fullName
          email
        }
        sessionOrigin {
          id
          originName
          description
        }
      }
      totalRecords
      totalPages
      currentPage
      pageSize
    }  
  }
}`