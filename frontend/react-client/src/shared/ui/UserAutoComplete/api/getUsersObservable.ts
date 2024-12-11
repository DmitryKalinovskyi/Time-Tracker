import {AjaxResponse} from "rxjs/ajax";
import {
    usersByEmailOrFullNameQuery,
    UsersByEmailOrFullNameResponse
} from "@time-tracker/shared/ui/UserAutoComplete/api/userAutoCompleteQueries.ts";
import {delay, map} from "rxjs";
import {apiRequest} from "@time-tracker/shared/graphql/rxjs-operators";

export const getUsersObservable = (emailOrFullName: string, usersLimit: number, fetchDelay: number) => {
    const variables = {
        input: {
            usersLimit: usersLimit,
            emailOrFullName
        }
    };

    return apiRequest(usersByEmailOrFullNameQuery(), variables).pipe(
        delay(fetchDelay),
        map((ajaxResponse: AjaxResponse<UsersByEmailOrFullNameResponse>) => {
            const errors = ajaxResponse.response.errors;
            if (errors) {
                throw new Error(errors[0].message);
            }
            return ajaxResponse.response.data.usersQuery.usersByEmailOrFullName;
        })
    );
}