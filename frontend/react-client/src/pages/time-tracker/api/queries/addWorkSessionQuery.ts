import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";
import {WorkSession} from "@time-tracker/types/WorkSession.ts";

export interface AddWorkSessionResponse{
    errors? : GraphQLExecutionErrorType[],
    data: {
        timeTrackerMutation: {
            addSession: WorkSession
        }
    }
}

export const addWorkSessionQuery = () => `
mutation AddWorkSession($input: AddSessionInput!){
  timeTrackerMutation{
    addSession(input: $input) {
      id
    }
  }
}
`