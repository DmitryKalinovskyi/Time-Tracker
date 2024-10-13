import {catchError, filter, map, Observable, of, switchMap} from "rxjs";
import {
    deleteWorkSessionSuccess,
    getCurrentWorkSession,
    getCurrentWorkSessionSuccessful
} from "../timeTrackingSlice.ts";
import {ofType, StateObservable} from "redux-observable";
import {createRequest} from "../../../misc/RequestCreator.ts";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {CurrentWorkSessionResponse, getCurrentWorkSessionQuery} from "../api/currentWorkSessionQuery.ts";
import {ShowFailure} from "../../../misc/SnackBarHelper.ts";
import {RootState} from "../../../store.ts";

export const getCurrentWorkSessionEpic = (action$, store$: StateObservable<RootState>) => action$.pipe(
    filter((action) => {
       if(action.type === deleteWorkSessionSuccess.type){
           // update when we deleted current session.
           return store$.value.timeTracker.currentWorkSession?.id == action.payload;
       }
       else if(action.type === getCurrentWorkSession.type){
           return true;
       }
       return false;
    }),
    switchMap(() =>
        ajax(createRequest(getCurrentWorkSessionQuery(), {userId: store$.value.auth.user.id})).pipe(
            map((ajaxResponse: AjaxResponse<CurrentWorkSessionResponse>) => {
                const errors = ajaxResponse.response.errors;
                if (errors && errors.length > 0) {
                    throw new Error(errors[0].message);
                }
                return getCurrentWorkSessionSuccessful(ajaxResponse.response.data.timeTrackerQuery.currentWorkSession);
            }),
            catchError((error) => {
                ShowFailure(error.message);
                return of();
            })
        )
    )
);
