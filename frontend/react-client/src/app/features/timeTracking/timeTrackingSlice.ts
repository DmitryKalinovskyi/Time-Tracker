import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";

import { WorkSession} from "../../types/WorkSession";
import PaginatedResult from "../../types/PaginatedResult";
import User from "../../types/User.ts";

export interface PaginationInfo{
    totalRecords: number
    totalPages: number
    currentPage: number
    pageSize: number
}

export interface TimeTrackerFilter{
    selectedUser: User | null
    selectedOrigins: number[],
    selectedDay: Date|null
}

export interface TimeTrackerType {
    workSessions: WorkSession[];
    paginationInfo: PaginationInfo;
    currentWorkSession: WorkSession | null;
    // sorts: SortCriteria[];
    todayTotalDuration: number;
    isWorkSessionUpdating: boolean

    filter: TimeTrackerFilter
}

export interface AddWorkSessionPayload {
    userId: number;
    startTime: Date;
    endTime: Date;
}

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
    filter: {
        selectedUser: null,
        selectedOrigins: [],
        selectedDay: new Date()
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
        deleteWorkSessionSuccess(state, action: PayloadAction<number>) {
            // imagine case when we try to delete session in the last page
            if(state.paginationInfo.currentPage >= state.paginationInfo.totalPages
                &&  state.paginationInfo.totalRecords % state.paginationInfo.pageSize == 1)
                state.paginationInfo.currentPage = Math.max(1, state.paginationInfo.currentPage-1);
        },
        applyTimeTrackerFilter(state, action: PayloadAction<TimeTrackerFilter>){
            state.filter = action.payload;
            // reset page
            state.paginationInfo.currentPage = 1;
        },


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
        addWorkSession(state, action: PayloadAction<AddWorkSessionPayload>)
        {
        },
        addWorkSessionSuccessful(state, action: PayloadAction<WorkSession>) {
        },
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
    getTodayTotalDurationSuccessful,
    applyTimeTrackerFilter,
    addWorkSession,
    addWorkSessionSuccessful

} = timeTrackerSlice.actions;

export default timeTrackerSlice.reducer;