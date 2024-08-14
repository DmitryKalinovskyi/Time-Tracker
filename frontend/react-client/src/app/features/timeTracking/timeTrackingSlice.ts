import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WorkSession} from "../../types/WorkSession";

export interface TimeTrackerType {
    workSessions: WorkSession[];
    currentSessionId: number | null;
    isTracking: boolean;
    currentSessionDuration: number;
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

export interface PaginationPayload{
    after: string | null;
    first: number | null;
    before: string | null;
    last: number | null;
    userId: number | null;
    year: number | null;
    month: number | null;
    day: number | null;
}

const initialState: TimeTrackerType = {
    workSessions: [],
    currentSessionId: null,
    isTracking: false,
    currentSessionDuration: 0,
    loading: false,
    error: null,
}

const timeTrackerSlice = createSlice({
    name: "timeTracker",
    initialState,
    reducers: {
        startSession(state, _action: PayloadAction<number>)
        {
            state.loading = true; 
            state.currentSessionId = null;
            state.error = null;
        },

        stopSession(state)
        {
            state.loading = true;
            state.error = null;
        },

        startSuccessful(state, action: PayloadAction<number>) {
            state.currentSessionId= action.payload
            state.isTracking = true;
            state.loading = false;
        },

        stopSuccessful(state, action: PayloadAction<WorkSession>) {
            state.workSessions.unshift(action.payload)
            state.loading = false;
        },

        setLoading(state, action: PayloadAction<boolean>)
        {
            state.loading = action.payload;
        },
        
        setError(state, action: PayloadAction<string | null>)
        {
            state.loading = false;
            state.error = action.payload;
        }
    },
})

export const {
    startSession,
    stopSession,
    startSuccessful,
    stopSuccessful,
    setError,
    setLoading
} = timeTrackerSlice.actions;

export default timeTrackerSlice.reducer;