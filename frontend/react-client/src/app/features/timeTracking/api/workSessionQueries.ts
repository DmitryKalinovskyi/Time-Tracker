import { WorkSession } from "../../../types/WorkSession";
import {WorkSessionPaginationResult} from "../timeTrackingSlice.ts";
import {GraphQLExecutionErrorType} from "../../../graphql/GraphQLExecutionErrorType.ts";




// export interface AddSessionResponse{
//     timeTrackerMutation: {
//         addSession: WorkSession
//     }
// }

// export interface UpdateSessionResponse{
//     timeTrackerMutation: {
//         updateSession: WorkSession
//     }
// }

// export interface WorkSessionByIdResponse{
//     timeTrackerQuery: {
//         workSession: WorkSession
//     }
// }











// export const addSessionQuery = (payload: AddSessionPayload) => {
//     const query =
//     `
//         mutation
//         {
//             timeTrackerMutation{
//                 addSession(input:
//                                 {
//                                     userId: ${payload.userId},
//                                     startTime: "${payload.startTime.toISOString()}",
//                                     endTime: "${payload.endTime.toISOString()}",
//                                     sessionOriginId: ${payload.sessionOriginId}
//                                 }
//                             )
//                     {
//                 id
//                 startTime
//                 endTime
//                 duration
//                 createdAt
//                 lastUpdatedAt
//                 user {
//                     id
//                     fullName
//                     email
//                     permissions
//                     isActive
//                 }
//                 editedBy {
//                     id
//                     fullName
//                     email
//                     permissions
//                     isActive
//                 }
//                 sessionOrigin {
//                     id
//                     originName
//                     description
//                 }
//             }
//             }
//         }
//     `;
//     return query;
// }

// export const updateSessionQuery = (payload: UpdateSessionPayload) => {
//     console.log(payload);
//     const query =
//     `
//     mutation{
//         timeTrackerMutation{
//             updateSession( editorId: ${payload.editorId} ,
//                             input:
//                             {
//                                 id: ${payload.id},
//                                 startTime: "${new Date(payload.startTime).toISOString()}",
//                                 endTime: "${new Date(payload.endTime).toISOString()}"
//                             }
//                         )
//             {
//             id
//             startTime
//             endTime
//             duration
//             createdAt
//             lastUpdatedAt
//             user {
//                 id
//                 fullName
//                 email
//                 permissions
//                 isActive
//             }
//             editedBy {
//                 id
//                 fullName
//                 email
//                 permissions
//                 isActive
//             }
//             sessionOrigin {
//                 id
//                 originName
//                 description
//             }
//         }
//         }
//     }
//     `;
//     return query;
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
