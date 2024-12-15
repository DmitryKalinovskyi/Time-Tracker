import {filter, switchMap} from "rxjs";
import {
    deleteWorkSessionSuccess,
    getCurrentWorkSession,
    getCurrentWorkSessionFailure,
    getCurrentWorkSessionSuccessful
} from "../../timeTrackingSlice.ts";
import {StateObservable} from "redux-observable";
import {getCurrentWorkSessionQuery} from "../queries/currentWorkSessionQuery.ts";
import {RootState} from "@time-tracker/app/store.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

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
        apiRequest(getCurrentWorkSessionQuery(), {userId: store$.value.auth.user.id}).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) =>  getCurrentWorkSessionSuccessful(ajaxResponse.response.data.timeTrackerQuery.currentWorkSession),
                (ajaxResponse, error) => getCurrentWorkSessionFailure(error)
            )
        )
    )
);
