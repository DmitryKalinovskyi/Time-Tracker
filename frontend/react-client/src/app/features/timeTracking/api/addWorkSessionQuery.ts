import {GraphQLExecutionErrorType} from "../../../graphql/GraphQLExecutionErrorType.ts";
import {WorkSession} from "../../../types/WorkSession.ts";

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