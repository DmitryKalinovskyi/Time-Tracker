import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WorkSession} from "../../types/WorkSession";
import PaginatedResult from "../../types/PaginatedResult";

export interface PaginationInfo{
    totalRecords: number
    totalPages: number
    currentPage: number
    pageSize: number
}

export interface TimeTrackerType {
    workSessions: WorkSession[];
    paginationInfo: PaginationInfo;
    currentWorkSession: WorkSession | null;
    // filters?: FilterCriteria[];
    // sorts: SortCriteria[];
    todayTotalDuration: number;
    isWorkSessionUpdating: boolean
}

// export interface AddSessionPayload{
//     userId: number;
//     startTime: Date;
//     endTime: Date;
//     sessionOriginId: number;
//     editedBy: number | null;
// }

export interface UpdateSessionPayload{
    id: number;
    startTime: Date;
    endTime: Date;
}

export type WorkSessionPaginationResult = PaginatedResult<WorkSession>;

const initialState: TimeTrackerType = {
    workSessions: [],
    currentWorkSession: null,
    paginationInfo: {
        totalRecords: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: 5
    },
    todayTotalDuration: 0,
    isWorkSessionUpdating: false
}

const timeTrackerSlice = createSlice({
    name: "timeTracker",
    initialState,
    reducers: {
        startSession(){
        },
        startSessionSuccessful(state, action: PayloadAction<WorkSession>) {
            state.currentWorkSession = action.payload
            state.isTracking = true;
        },
        stopSession()
        {
        },
        stopSessionSuccessful(state) {
            state.isTracking = false;
            state.currentWorkSession = null;
        },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getWorkSessions(state)
        {
        },
        getWorkSessionsSuccessful(state, action: PayloadAction<WorkSessionPaginationResult>)
        {
            state.loading = false;
            state.error = null;
            state.workSessions = action.payload.results;
            state.paginationInfo = {
                currentPage: action.payload.currentPage,
                pageSize: action.payload.pageSize,
                totalPages: action.payload.totalPages,
                totalRecords: action.payload.totalRecords
            }
        },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        updateWorkSession(state, action: PayloadAction<UpdateSessionPayload>)
        {
            state.isWorkSessionUpdating = true;
        },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        updateWorkSessionSuccessful(state, action: PayloadAction<WorkSession>)
        {
            // update ui
            state.isWorkSessionUpdating = false;
        },

        updateWorkSessionFailure(state)
        {
            state.isWorkSessionUpdating = false;
        },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        deleteWorkSession(state, action: PayloadAction<number>)
        {
        },
        deleteWorkSessionSuccess(state) {
        },

        // addSession(state, action: PayloadAction<AddSessionPayload>)
        // {
        //     state.loading = true;
        // },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getCurrentWorkSession(state, action: PayloadAction<number>)
        {
        },

        getCurrentWorkSessionSuccessful(state, action: PayloadAction<WorkSession | null>)
        {
            state.currentWorkSession = action.payload;
        },
        getTodayTotalDuration()
        {
        },
        getTodayTotalDurationSuccessful(state, action: PayloadAction<number>)
        {
            state.todayTotalDuration = action.payload;
        },

        setWorkSessionsPage(state, action: PayloadAction<number>)
        {
            state.paginationInfo.currentPage = action.payload;
        },
        //
        // setFilters(state, action: PayloadAction<FilterCriteria[]>)
        // {
        //     if(action.payload.length == 1)
        //         action.payload.push(
        //       {
        //         filterBy: "START_TIME",
        //         operator: "BETWEEN",
        //         value: new Date().toISOString().split('T')[0] + ',' + addDays(new Date(), 1).toISOString().split('T')[0]
        //       });
        //     state.filters = action.payload;
        // },

        
        // setSorts(state, action: PayloadAction<SortCriteria[]>)
        // {
        //     state.sorts = action.payload;
        // },
        //
        // addSessionSuccessful(state, action: PayloadAction<WorkSession>) {
        //     state.loading = false;
        //     state.error = null;
        //     state.workSessions = [
        //         ...state.workSessions,
        //         action.payload
        //     ];
        //     state.workSessions.sort((a, b) => {
        //         return a.startTime.valueOf() - b.startTime.valueOf();
        //     });
        // },
        //





    },
})

export const {
    startSession,
    startSessionSuccessful,
    stopSession,
    stopSessionSuccessful,
    updateWorkSession,
    updateWorkSessionSuccessful,
    updateWorkSessionFailure,
    deleteWorkSession,
    deleteWorkSessionSuccess,
    getCurrentWorkSession,
    getCurrentWorkSessionSuccessful,
    getWorkSessions,
    getWorkSessionsSuccessful,
    setWorkSessionsPage,
    getTodayTotalDuration,
    getTodayTotalDurationSuccessful

} = timeTrackerSlice.actions;

export default timeTrackerSlice.reducer;