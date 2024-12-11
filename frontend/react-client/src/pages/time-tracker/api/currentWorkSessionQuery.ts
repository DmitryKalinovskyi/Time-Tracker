import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";
import {WorkSession} from "../../../types/WorkSession.ts";

export interface CurrentWorkSessionResponse {
    errors? : GraphQLExecutionErrorType[]
    data: {
        timeTrackerQuery: {
            currentWorkSession: WorkSession | null
        }
    }
}

export const getCurrentWorkSessionQuery = () => `
query GetCurrentWorkSession($userId: Int){
    timeTrackerQuery{
        currentWorkSession(userId: $userId) {
            id
            startTime
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
}`;
