// fetch hello action creator
import {ofType} from "redux-observable";
import {map, mergeMap, tap} from "rxjs";
import {ajax} from "rxjs/ajax";
import {API_URL} from "../../app/config.ts";
import {set_hello_message} from "./helloSlice.ts";

export const fetch_hello = () => ({type: "hello/fetch_hello"});
export const fetchHelloEpic = action$ => action$.pipe(
    ofType("hello/fetch_hello"),
    tap(() => console.log("Epic handled")),
    mergeMap(() =>
        ajax({
            url: `${API_URL}/graphql`,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                query: `
                query GetName{
                    testQuery{
                      name
                    }
                }`
            }
        }).pipe(
            // tap(ajaxResponse => console.log(ajaxResponse)),
            map(ajaxResponse => set_hello_message(ajaxResponse.response.data.testQuery.name))
        )
    )
);