import {GraphQLExecutionErrorType} from "../../../graphql/GraphQLExecutionErrorType.ts";
import {WorkSession} from "../../../types/WorkSession.ts";

export interface StopSessionResponse{
    errors? : GraphQLExecutionErrorType[]
    data: {
        timeTrackerMutation:{
            stopSession: WorkSession
        }
    }
}

export const stopSessionQuery = () => `
mutation StopSession{
  timeTrackerMutation{
    stopSession {
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
`
