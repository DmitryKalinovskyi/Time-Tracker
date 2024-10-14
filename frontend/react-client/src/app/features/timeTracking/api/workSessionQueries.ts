import { WorkSession } from "../../../types/WorkSession";
import {WorkSessionPaginationResult} from "../timeTrackingSlice.ts";
import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";



// export interface WorkSessionByIdResponse{
//     timeTrackerQuery: {
//         workSession: WorkSession
//     }
// }


// export const getWorkSessionByIdQuery = (workSessionId: number) => {
//     const query =
//     `
//             query{
//                 timeTrackerQuery{
//                     workSession(id: ${workSessionId}) {
//                     id
//                     startTime
//                     endTime
//                     duration
//                     createdAt
//                     lastUpdatedAt
//                     user {
//                         id
//                         fullName
//                         email
//                         permissions
//                         isActive
//                     }
//                     editedBy {
//                         id
//                         fullName
//                         email
//                         permissions
//                         isActive
//                     }
//                     sessionOrigin {
//                         id
//                         originName
//                         description
//                     }
//                 }
//                 }
//         }
//     `;
//
//     return query;
// }
//

//

//
// export const getTotalDurationByFiltersQuery = (payload: Array<FilterCriteria>) => {
//     const query =
//     `
//     query{
//         timeTrackerQuery{
//             totalDuration(
//                     input: [
//                         ${  payload.map(filterCriteria => {
//                                return `{ filterBy: ${filterCriteria.filterBy} operator: ${filterCriteria.operator} value: "${filterCriteria.value}"}`
//                             })}
//                         ]
//                     )
//         }
//     }
//     `;
//
//     return query;
// }
//
//
