// fetch hello action creator
import {ofType} from "redux-observable";
import {map, mergeMap, tap} from "rxjs";
import {ajax} from "rxjs/ajax";
import {API_URL} from "../../app/config.ts";
import {set_auth} from "./authSlice.ts";


interface LoginInputType{
    email: string,
    password: string
}

export const loginUser = (payload: LoginInputType) => ({type: "auth/login_user", payload});
export const loginUserEpic = action$ => action$.pipe(
    ofType("auth/login_user"),
    mergeMap((action) =>
        ajax({
            url: `${API_URL}/graphql`,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                query: `
                    query Login{
                          identityQuery{
                            login(input: {email: "${action.payload.email}", password: "${action.payload.password}"}){
                              accessToken{
                               value 
                              },
                              user{
                                fullName,
                                email,
                                role{
                                  id,
                                  name,
                                  permissions
                                }
                              }
                            }
                        }
                    }`
            }
        }).pipe(
            // tap(ajaxResponse => console.log(ajaxResponse.response.data)),
            map(ajaxResponse => set_auth(ajaxResponse.response.data.identityQuery.login))
        )
    )
);

