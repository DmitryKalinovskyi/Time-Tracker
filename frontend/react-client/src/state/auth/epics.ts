// fetch hello action creator
import {ofType} from "redux-observable";
import {map, mergeMap} from "rxjs";
import {ajax} from "rxjs/ajax";
import {API_URL} from "../../app/config.ts";

// TODO: Make request to api, get user token, and permissions.
// TODO: Store request result in the state, hooks will use it
// Question 1: How frontend should know that permissions for the user is changed?

interface FetchAuthPayload{
    email: string,
    password: string
}

export const fetch_auth = (payload: FetchAuthPayload) => ({type: "auth/fetch_auth", payload});
// export const fetchAuthEpic = action$ => action$.pipe(
//     ofType("auth/fetch_auth"),
//     mergeMap(() =>
//         ajax({
//             url: `${API_URL}/graphql`,
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: {
//                 query: ` LOGIN QUERY
//                 `
//             }
//         }).pipe(
//             // tap(ajaxResponse => console.log(ajaxResponse)),
//             map(ajaxResponse => set_hello_message(ajaxResponse.response.data.testQuery.name))
//         )
//     )
// );