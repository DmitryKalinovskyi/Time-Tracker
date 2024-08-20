import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WorkSession} from "../../types/WorkSession";
import { PaginatedWorkSessions } from "../../types/PaginatedWorkSessions";
import moment from "moment";

export interface TimeTrackerType {
    workSessions: PaginatedWorkSessions;
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
    workSessions: {
        totalCount: 0,
        pageInfo:{
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: null,
            endCursor: null
        },
        edges: []
    },
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

        getSessions(state, _action: PayloadAction<PaginationPayload>)
        {
            state.workSessions = initialState.workSessions;
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

        addSessionSuccessful(state, action: PayloadAction<WorkSession>) {
            state.loading = false;
            state.error = null;
            state.workSessions.edges = [
                ...state.workSessions.edges,
                { node: action.payload }
            ];
            state.workSessions.edges.sort((a, b) => {
                return a.node.startTime.valueOf() - b.node.startTime.valueOf();
            });
        },
        
        deleteSessionSuccessful(state, action: PayloadAction<number>) {
            state.loading = false;
            state.error = null;
    
            state.workSessions.edges = state.workSessions.edges.filter(session => 
                session.node.id !== action.payload
            );
        },

        updateSessionSuccessful(state, action: PayloadAction<WorkSession>)
        {
            state.loading = false;
            state.workSessions.edges = state.workSessions.edges.map(session => 
                session.node.id === action.payload.id 
                    ? { node: action.payload } 
                    : session
            );
            state.error = null;
        },

        getSessionsSuccessful(state, action: PayloadAction<PaginatedWorkSessions>)
        {
            console.log(action.payload);
            state.loading = false;
            state.error = null;
            state.workSessions = action.payload;
            const lastSession = state.workSessions.edges[0].node;
            if (lastSession && !lastSession.endTime) {
                state.isTracking = true;
                const localStartTime = moment.utc(lastSession.startTime).local().toDate().valueOf();
                const currentTime = Date.now();
                state.currentSessionDuration = Math.floor((currentTime - localStartTime) / 1000);
                state.currentSessionId = lastSession.id;
              } else {
                state.isTracking = false;
                state.currentSessionDuration = 0;
                state.currentSessionId = null;
              }
        },
        
        startSuccessful(state, action: PayloadAction<number>) {
            state.currentSessionId= action.payload
            state.isTracking = true;
            state.currentSessionDuration = 0;
            state.loading = false;
        },

        stopSuccessful(state, action: PayloadAction<WorkSession>) {
            state.workSessions.edges.unshift({ node: action.payload });
            state.loading = false;
            state.isTracking = false;
            state.currentSessionDuration = 0; 
            state.currentSessionId = null;
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

        toggleTracking(state)
        {
            state.isTracking = !state.isTracking;
        },

        setCurrentSessionDuration(state, action: PayloadAction<number>)
        {
            state.currentSessionDuration = action.payload;
        }
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
    toggleTracking,
    setCurrentSessionDuration
} = timeTrackerSlice.actions;

export default timeTrackerSlice.reducer;