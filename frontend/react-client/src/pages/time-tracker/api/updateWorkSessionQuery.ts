import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";
import {WorkSession} from "../../../types/WorkSession.ts";
import {UpdateSessionPayload} from "../timeTrackingSlice.ts";

export interface UpdateWorkSessionResponse {
    errors?: GraphQLExecutionErrorType[]
    data: {
        timeTrackerMutation: {
            updateSession: WorkSession
        }
    }
}


export const updateWorkSessionQuery = (payload: UpdateSessionPayload) => {
    const query =
    `
    mutation{
        timeTrackerMutation{
            updateSession(
                            input:
                            {
                                id: ${payload.id},
                                startTime: "${new Date(payload.startTime).toISOString()}",
                                endTime: "${new Date(payload.endTime).toISOString()}"
                            }
                        )
            {
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
        }
    }
    `;
    return query;
}
