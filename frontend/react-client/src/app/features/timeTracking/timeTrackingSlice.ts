import { createSlice } from "@reduxjs/toolkit";

import { WorkSession} from "../../types/WorkSession";


export interface TimeTrackerType {
    workSessions: WorkSession[];
    sessionId: string | null;
    isTracking: boolean;
    searchingLastSession: boolean;
    currentTime: number;
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
    sessionId: null,
    isTracking: false,
    searchingLastSession: false,
    currentTime: 0,
}

const timeTrackerSlice = createSlice({
    name: "timeTracker",
    initialState,
    reducers: {
        startSuccessful(state, action) {
            state.sessionId = action.payload.id
        },
        stopSuccessful(state, action) {
            state.workSessions.unshift(action.payload)
        },
    },
})

export const {
    startSuccessful,
    stopSuccessful,
} = timeTrackerSlice.actions;

export default timeTrackerSlice.reducer;