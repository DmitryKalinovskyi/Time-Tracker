import {GraphQLResponse} from "@time-tracker/shared/graphql/GraphQLResponse.ts";
import {AjaxResponse} from "rxjs/ajax";
import {map, Observable} from "rxjs";
import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";

export function catchAnyGraphQLError<ProjectResult, OnErrorResult>(
    project: (ajaxResponse: AjaxResponse<GraphQLResponse>) => ProjectResult,
    onError: (ajaxResponse: AjaxResponse<GraphQLResponse>, error: GraphQLExecutionErrorType) => OnErrorResult,
    logError: boolean = false
){
    return (source: Observable<AjaxResponse<GraphQLResponse>>) => source.pipe(
        map((ajaxResponse: AjaxResponse<GraphQLResponse>) => {
            if(ajaxResponse.response.errors && ajaxResponse.response.errors.length > 0){
                const error = ajaxResponse.response.errors[0];
                if(logError)
                console.log(error)
                return onError(ajaxResponse, error);
            }
            return project(ajaxResponse)
        })
    )
}