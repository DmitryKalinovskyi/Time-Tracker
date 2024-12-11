import {GraphQLResponse} from "@time-tracker/shared/graphql/GraphQLResponse.ts";
import {AjaxResponse} from "rxjs/ajax";
import {filter, map, Observable} from "rxjs";
import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";

export function catchAnyGraphQLError<ProjectResult>(
    project: (ajaxResponse: AjaxResponse<GraphQLResponse>, error: GraphQLExecutionErrorType) => ProjectResult
){
    return (source: Observable<AjaxResponse<GraphQLResponse>>) => source.pipe(
        filter((ajaxResponse: AjaxResponse<GraphQLResponse>) =>
            ajaxResponse.response.errors && ajaxResponse.response.errors.length > 0),
        map((ajaxResponse: AjaxResponse<GraphQLResponse>) => project(ajaxResponse, ajaxResponse.response.errors[0]))
    )
}