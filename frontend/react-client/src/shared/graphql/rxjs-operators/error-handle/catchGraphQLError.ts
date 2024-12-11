import {GraphQLResponse} from "@time-tracker/shared/graphql/GraphQLResponse.ts";
import {AjaxResponse} from "rxjs/ajax";
import {filter, map, Observable} from "rxjs";
import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";

export function catchGraphQLError<ProjectResult>(
    errorCode: string,
    project: (ajaxResponse: AjaxResponse<GraphQLResponse>, error: GraphQLExecutionErrorType) => ProjectResult
) {
    return (source: Observable<AjaxResponse<GraphQLResponse>>) => source.pipe(
        filter((ajaxResponse: AjaxResponse<GraphQLResponse>) =>
            ajaxResponse.response.errors && ajaxResponse.response.errors.some(error =>
                error.extensions.code === errorCode)),
        map((ajaxResponse: AjaxResponse<GraphQLResponse>) => {
            const error = ajaxResponse.response.errors
                .find(error => error.extensions.code === errorCode);

            return project(ajaxResponse, error);
        })
    )
}