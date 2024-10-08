import {GraphQLExecutionErrorType} from "../../../graphql/GraphQLExecutionErrorType.ts";
import {WorkSession} from "../../../types/WorkSession.ts";

export interface StartSessionResponse{
    errors? : GraphQLExecutionErrorType[]
    data: {
        timeTrackerMutation:{
            startSession: WorkSession
        }
    }
}

export const startSessionQuery = () => `
mutation StartSession{
 timeTrackerMutation{
   startSession {
     id
     startTime
   }
 } 
}
`