import {createRequest} from "@time-tracker/shared/misc/RequestCreator.ts";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {Observable} from "rxjs";
import {GraphQLResponse} from "@time-tracker/shared/graphql/GraphQLResponse.ts";

export function apiRequest<ResponseType extends GraphQLResponse>(query: string, variables: object):
    Observable<AjaxResponse<ResponseType>> {
    return ajax(createRequest(query, variables));
}