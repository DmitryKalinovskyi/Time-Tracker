import {AjaxResponse} from "rxjs/ajax";
import {catchError, map, Observable, of} from "rxjs";
import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";
import {GraphQLResponse} from "@time-tracker/shared/graphql/GraphQLResponse.ts";
import {Action} from "@reduxjs/toolkit";

export function catchAnyGraphQLError<Response extends GraphQLResponse>(
    project: (ajaxResponse: AjaxResponse<Response>) => Action,
    onError: (ajaxResponse: AjaxResponse<Response>, error: GraphQLExecutionErrorType) => Action,
    logError: boolean = true
){
    return (source: Observable<AjaxResponse<Response>>) => source.pipe(
        map((ajaxResponse: AjaxResponse<Response>) => {
            if(ajaxResponse.response.errors && ajaxResponse.response.errors.length > 0){
                const error = ajaxResponse.response.errors[0];
                if(logError){
                    console.log(`Rxjs operator (${catchAnyGraphQLError.name}) caught graphQL error:  `)
                    console.log(error);
                }
                return onError(ajaxResponse, error);
            }
            return project(ajaxResponse)
        }),
        catchError((error) => {

            const graphQLError = error.response?.errors[0];
            if(logError){
                console.log(`Rxjs operator (${catchAnyGraphQLError.name}) caught error:  `)
                console.log(error);

                console.log(`Rxjs operator (${catchAnyGraphQLError.name}) caught graphQL error:  `)
                console.log(graphQLError);
            }

            return of(onError(error.response, graphQLError))
        })
    )
}