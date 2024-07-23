import {combineEpics, ofType} from "redux-observable";
import {map, mergeMap, tap} from "rxjs";
import {ajax} from 'rxjs/ajax';
import {set_hello_message} from "../slices/helloSlice.ts";

const url = "https://localhost:7213/graphql";

// fetch hello action creator
export const fetch_hello = () => ({type: "FETCH_HELLO"});
export const fetchHelloEpic = action$ => action$.pipe(
    ofType("FETCH_HELLO"),
    tap(() => console.log("Epic handled")),
    mergeMap(() =>
        ajax({
            url: url,
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

export const rootEpic = combineEpics(
    fetchHelloEpic
)