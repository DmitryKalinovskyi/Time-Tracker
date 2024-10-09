import {GraphQLExecutionErrorType} from "../../../graphql/GraphQLExecutionErrorType.ts";

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