import {GraphQLResponse} from "@time-tracker/shared/graphql/GraphQLResponse.ts";
import {AjaxResponse} from "rxjs/ajax";
import {catchError, map, Observable} from "rxjs";
import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";

export function catchAnyGraphQLError<ProjectResult, OnErrorResult>(
    project: (ajaxResponse: AjaxResponse<GraphQLResponse>) => ProjectResult,
    onError: (ajaxResponse: AjaxResponse<GraphQLResponse>, error: GraphQLExecutionErrorType) => OnErrorResult,
    logError: boolean = true
){
    return (source: Observable<AjaxResponse<GraphQLResponse>>) => source.pipe(
        map((ajaxResponse: AjaxResponse<GraphQLResponse>) => {
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
            const graphQLError = error.response.errors[0] ?? null;
            if(logError){
                console.log(`Rxjs operator (${catchAnyGraphQLError.name}) caught error:  `)
                console.log(error);

                console.log(`Rxjs operator (${catchAnyGraphQLError.name}) caught graphQL error:  `)
                console.log(graphQLError);
            }

            return onError(error.response, graphQLError)
        })
    )
}