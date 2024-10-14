import {ajax, AjaxResponse} from "rxjs/ajax";
import {createRequest} from "@time-tracker/shared/misc/RequestCreator.ts";
import {
    usersByEmailOrFullNameQuery,
    UsersByEmailOrFullNameResponse
} from "@time-tracker/shared/ui/UserAutoComplete/api/userAutoCompleteQueries.ts";
import {delay, map} from "rxjs";

export const getUsersObservable = (emailOrFullName: string, usersLimit: number, fetchDelay: number) => {
    const variables = {
        input: {
            usersLimit: usersLimit,
            emailOrFullName
        }
    };

    return ajax(createRequest(usersByEmailOrFullNameQuery(), variables)).pipe(
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