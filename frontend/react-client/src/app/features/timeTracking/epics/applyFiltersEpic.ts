import {Observable, of, switchMap} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {applyTimeTrackerFilter, setWorkSessionsPage} from "../timeTrackingSlice.ts";

export const applyFiltersEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(applyTimeTrackerFilter.type),
    switchMap(() => of(setWorkSessionsPage(1)))
)