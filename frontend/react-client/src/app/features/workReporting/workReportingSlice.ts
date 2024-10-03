import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../../types/User.ts";

export interface WorkReportingState {
    workReport: WorkReport | null,
    isFetching: boolean;
}

export interface WorkReport{
    page: number,
    pageSize: number,
    pageCount: number,
    users: [{
        user: User,
        trackedHours: number
    }]
}

export interface WorkReportRequest{
    from: Date,
    to: Date,
    page: number,
    pageSize: number
}

const initialState = {};

const workReportingSlice = createSlice({
    name: "workReportingSlice",
    initialState,
    reducers: {
        fetchWorkReport: (state, action: PayloadAction<WorkReportRequest>) => {
            state.isFetching = true;
        },
        fetchWorkReportSuccess: (state, action: PayloadAction<WorkReport>) => {
            state.workReport = action.payload;
            state.isFetching = false;
        },
        fetchWorkReportFailure: (state) => {
            state.isFetching = false;
        }
    }
});

export const {fetchWorkReport,
    fetchWorkReportSuccess,
    fetchWorkReportFailure
} = workReportingSlice.actions;

export default workReportingSlice.reducer;