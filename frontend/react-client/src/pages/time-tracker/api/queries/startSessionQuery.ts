import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";
import {WorkSession} from "@time-tracker/types/WorkSession.ts";

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