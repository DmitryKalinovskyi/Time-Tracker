import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WorkSession} from "../../types/WorkSession";
import PaginatedRequest from "../../types/PaginatedRequest";
import PaginatedResult from "../../types/PaginatedResult";
import FilterCriteria from "../../types/FilterCriteria";
import { SortCriteria } from "../../types/SortCriteria";
import { addDays } from "date-fns";

// export interface PaginationInfo{
//     totalRecords?: number
//     totalPages?: number
//     currentPage: number
//     pageSize?: number
// }
export interface TimeTrackerType {
    // workSessions: Array<WorkSession>;
    // paginationInfo?: PaginationInfo;
    currentWorkSession: WorkSession | null;
    // filters?: FilterCriteria[];
    // sorts: SortCriteria[];
    todayTotalDuration: number;
    // workSessionsListingTotalDuration: number;
    loading: boolean;
}

// export interface AddSessionPayload{
//     userId: number;
//     startTime: Date;
//     endTime: Date;
//     sessionOriginId: number;
//     editedBy: number | null;
// }

export interface UpdateSessionPayload{
    editorId: number;
    id: number;
    startTime: Date;
    endTime: Date;
}

export type WorkSessionPaginationResult = PaginatedResult<WorkSession>;

const initialState: TimeTrackerType = {
    currentWorkSession: null,
    loading: false,
    todayTotalDuration: 0,
}

const timeTrackerSlice = createSlice({
    name: "timeTracker",
    initialState,
    reducers: {
        startSession(state){
            state.isLoading = true;
        },
        startSuccessful(state, action: PayloadAction<WorkSession>) {
            state.currentWorkSession = action.payload
            state.isTracking = true;
            state.loading = false;
        },
        stopSession(state)
        {
            state.loading = true;
        },
        stopSuccessful(state) {
            state.loading = false;
            state.isTracking = false;
            state.currentWorkSession = null;
        },

        // getSessions(state, _action: PayloadAction<PaginatedRequest>)
        // {
        //     state.loading = true;
        // },
        //
        // updateSession(state, _action: PayloadAction<UpdateSessionPayload>)
        // {
        //     state.loading = true;
        // },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        deleteSession(state, action: PayloadAction<number>)
        {
            state.loading = true;
        },

        // addSession(state, action: PayloadAction<AddSessionPayload>)
        // {
        //     state.loading = true;
        // },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getCurrentWorkSession(state, action: PayloadAction<number>)
        {
            state.loading = true;
        },

        getCurrentWorkSessionSuccessful(state, action: PayloadAction<WorkSession | null>)
        {
            state.loading = false;
            state.currentWorkSession = action.payload;
        },

        // getWorkSessionsListingTotalDuration(state, _action: PayloadAction<Array<FilterCriteria>>)
        // {
        //     state.loading = true;
        // },
        // getTodayTotalDuration(state, _action: PayloadAction<number>)
        // {
        //     state.loading = true;
        // },
        // getTodayTotalDurationSuccessful(state, action: PayloadAction<number>)
        // {
        //     state.loading = false;
        //     state.todayTotalDuration = action.payload;
        // },

        // getWorkSessionsListingTotalDurationSuccessful(state, action: PayloadAction<number>)
        // {
        //     state.loading = false;
        //     state.workSessionsListingTotalDuration = action.payload;
        // },
        //
        // setPage(state, action: PayloadAction<number>)
        // {
        //     state.paginationInfo!.currentPage = action.payload;
        // },
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
        // deleteSessionSuccessful(state, _action: PayloadAction<number>) {
        //     state.loading = false;
        //     state.error = null;
        //     state.paginationInfo!.currentPage = 1
        // },
        //
        // updateSessionSuccessful(state, _action: PayloadAction<WorkSession>)
        // {
        //     state.loading = false;
        //     state.error = null;
        // },
        //
        // getSessionsSuccessful(state, action: PayloadAction<WorkSessionPaginationResult>)
        // {
        //     state.loading = false;
        //     state.error = null;
        //     state.workSessions = action.payload.results;
        //     state.paginationInfo = {
        //         currentPage: action.payload.currentPage,
        //         pageSize: action.payload.pageSize,
        //         totalPages: action.payload.totalPages,
        //         totalRecords: action.payload.totalRecords
        //     }
        // },
    },
})

export const {
    startSession,
    startSuccessful,
    stopSession,
    stopSuccessful,
    deleteSession,
    getCurrentWorkSession,
    getCurrentWorkSessionSuccessful
} = timeTrackerSlice.actions;

export default timeTrackerSlice.reducer;