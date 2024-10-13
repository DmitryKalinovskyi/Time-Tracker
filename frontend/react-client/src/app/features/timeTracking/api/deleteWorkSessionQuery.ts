import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/GraphQLExecutionErrorType.ts";

export interface DeleteSessionResponse{
    errors?: GraphQLExecutionErrorType,
    data: string
}

export const deleteWorkSessionQuery = () => `
mutation DeleteSession($workSessionId: Int){
  timeTrackerMutation{
    deleteSession(workSessionId: $workSessionId)
  }
}
`