import {addDays} from "date-fns";
import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";

export interface GetTodayTotalDurationResponse{
    errors? : GraphQLExecutionErrorType[]
    data: {
        timeTrackerQuery: {
            totalDuration: number | null
        }
    }
}
export const getTodayTotalDurationByUserIdQuery = (payload: number) => {
    const today = new Date().toISOString().split('T')[0] + ',' + addDays(new Date(), 1).toISOString().split('T')[0];
    return `
    query GetTodayTotalDurationByUserId{
        timeTrackerQuery{
            totalDuration(
                    input: [
                         { filterBy: START_TIME operator: BETWEEN value: "${today}" },
                         { filterBy: USER_ID operator: EQUAL value: "${payload}" }
                        ]
                    )
        }
    }
    `;
}