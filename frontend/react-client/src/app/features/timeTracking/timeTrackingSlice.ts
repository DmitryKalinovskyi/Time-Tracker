import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WorkSession} from "../../types/WorkSession";
import PaginatedRequest from "../../types/PaginatedRequest";
import PaginatedResult from "../../types/PaginatedResult";
import FilterCriteria from "../../types/FilterCriteria";
import { SortCriteria } from "../../types/SortCriteria";
import { addDays } from "date-fns";
export interface TimeTrackerType {
    workSessions: Array<WorkSession>;
    paginationInfo?: {
        totalRecords?: number
        totalPages?: number
        currentPage: number
        pageSize?: number
    }
    currentSession: WorkSession | null;
    isTracking: boolean;
    filters?: FilterCriteria[];
    sorts: SortCriteria[];
    todayTotalDuration: number;
    workSessionsListingTotalDuration: number;
    loading: boolean;
    error: string | null;
}

export interface AddSessionPayload{
    userId: number;
    startTime: Date;
    endTime: Date;
    sessionOriginId: number;
    editedBy: number | null;
}

export interface UpdateSessionPayload{
    editorId: number;
    id: number;
    startTime: Date;
    endTime: Date;
}

export type WorkSessionPaginationRequest = PaginatedRequest;

export type WorkSessionPaginationResult = PaginatedResult<WorkSession>;

const initialState: TimeTrackerType = {
    workSessions: [],
    currentSession: null,
    isTracking: false,
    loading: false,
    error: null,
    paginationInfo: {
        currentPage: 1,
        pageSize: 3
    },
    todayTotalDuration: 0,
    workSessionsListingTotalDuration: 0,
    sorts: 
        [
           {sortBy: "START_TIME", isAscending: false} 
        ]
}

const timeTrackerSlice = createSlice({
    name: "timeTracker",
    initialState,
    reducers: {
        startSession(state, _action: PayloadAction<number>)
        {
            state.loading = true; 
            state.error = null;
        },

        stopSession(state)
        {
            state.loading = true;
            state.error = null;
        },

        getSessions(state, _action: PayloadAction<WorkSessionPaginationRequest>)
        {
            state.loading = true;
            state.error = null;
        },

        updateSession(state, _action: PayloadAction<UpdateSessionPayload>)
        {
            state.loading = true;
            state.error = null;
        },

        deleteSession(state, _action: PayloadAction<number>)
        {
            state.loading = true;
            state.error = null;
        },

        addSession(state, _action: PayloadAction<AddSessionPayload>)
        {
            state.loading = true;
            state.error = null;
        },

        getCurrentWorkSession(state, _action: PayloadAction<number>)
        {
            state.loading = true;
            state.error = null;
        },

        getWorkSessionsListingTotalDuration(state, _action: PayloadAction<Array<FilterCriteria>>)
        {
            state.loading = true;
            state.error = null;
        },
        getTodayTotalDuration(state, _action: PayloadAction<number>)
        {
            state.loading = true;
            state.error = null;
        },
        getTodayTotalDurationSuccessful(state, action: PayloadAction<number>)
        {
            state.loading = false;
            state.todayTotalDuration = action.payload;
        },

        getWorkSessionsListingTotalDurationSuccessful(state, action: PayloadAction<number>)
        {
            state.loading = false;
            state.workSessionsListingTotalDuration = action.payload;
        },

        setPage(state, action: PayloadAction<number>)
        {
            state.paginationInfo!.currentPage = action.payload;
        },
        
        setFilters(state, action: PayloadAction<FilterCriteria[]>)
        {
            if(action.payload.length == 1)
                action.payload.push(
              {
                filterBy: "START_TIME",
                operator: "BETWEEN",
                value: new Date().toISOString().split('T')[0] + ',' + addDays(new Date(), 1).toISOString().split('T')[0]
              });
            state.filters = action.payload;
        },

        
        setSorts(state, action: PayloadAction<SortCriteria[]>)
        {
            state.sorts = action.payload;
        },

        addSessionSuccessful(state, action: PayloadAction<WorkSession>) {
            state.loading = false;
            state.error = null;
            state.workSessions = [
                ...state.workSessions,
                action.payload
            ];
            state.workSessions.sort((a, b) => {
                return a.startTime.valueOf() - b.startTime.valueOf();
            });
        },
        
        deleteSessionSuccessful(state, _action: PayloadAction<number>) {
            state.loading = false;
            state.error = null;
        },

        updateSessionSuccessful(state, _action: PayloadAction<WorkSession>)
        {
            state.loading = false;
            state.error = null;
        },

        getSessionsSuccessful(state, action: PayloadAction<WorkSessionPaginationResult>)
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
        
        startSuccessful(state, action: PayloadAction<WorkSession>) {
            state.currentSession = action.payload
            state.isTracking = true;
            state.loading = false;
        },

        stopSuccessful(state, _action: PayloadAction<WorkSession>) {
            state.loading = false;
            state.isTracking = false;
            state.currentSession = null;
        },

        getCurrentWorkSessionSuccessful(state, action: PayloadAction<WorkSession | null>)
        {
            state.loading = false;
            if(action.payload)
            {
                state.isTracking = true;
                state.currentSession = action.payload;
                
                const startTimeUTC = new Date(action.payload.startTime + 'Z');

                console.log('NOW: ', Date.now());
                console.log("NOW SERVER (UTC assumed): ", startTimeUTC);

                state.currentSession.duration = Math.floor((Date.now() - startTimeUTC.getTime()) / 1000);

                console.log("Current duration: ", state.currentSession.duration);
            }
            else
            {
                state.isTracking = false;
                state.currentSession = null;
            }
        },

        setLoading(state, action: PayloadAction<boolean>)
        {
            state.loading = action.payload;
        },

        setError(state, action: PayloadAction<string | null>)
        {
            state.loading = false;
            state.error = action.payload;
        },
    },
})

export const {
    startSession,
    stopSession,
    getSessions,
    updateSession,
    deleteSession,
    addSession,
    startSuccessful,
    stopSuccessful,
    getSessionsSuccessful,
    updateSessionSuccessful,
    deleteSessionSuccessful,
    addSessionSuccessful,
    setError,
    setLoading,
    setFilters,
    setPage,
    setSorts,
    getCurrentWorkSession,
    getCurrentWorkSessionSuccessful,
    getTodayTotalDurationSuccessful,
    getWorkSessionsListingTotalDurationSuccessful,
    getWorkSessionsListingTotalDuration,
    getTodayTotalDuration
} = timeTrackerSlice.actions;

export default timeTrackerSlice.reducer;