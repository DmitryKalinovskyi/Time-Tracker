import {combineEpics} from "redux-observable";
import {startSessionEpic} from "./epics/startSessionEpic.ts";
import {stopSessionEpic} from "./epics/stopSessionEpic.ts";
import {deleteWorkSessionEpic} from "./epics/deleteWorkSessionEpic.ts";
import {getCurrentWorkSessionEpic} from "./epics/getCurrentWorkSessionEpic.ts";

export const timeTrackingEpics = combineEpics(
    startSessionEpic,
    stopSessionEpic,
    deleteWorkSessionEpic,
    getCurrentWorkSessionEpic
);



// ????
// export const deleteSessionSuccessfullEpic = (action$: Observable<Action>, state$: Observable<RootState>) => action$.pipe(
//     ofType(deleteSessionSuccessful.type),
//     withLatestFrom(state$),
//     map(([_action, state]: [any, RootState]) =>
//         getSessions(getCurrentPagArgs(state.timeTracker.paginationInfo!,
//             state.timeTracker.sorts,
//             state.timeTracker.filters!
//     )))
// );
//