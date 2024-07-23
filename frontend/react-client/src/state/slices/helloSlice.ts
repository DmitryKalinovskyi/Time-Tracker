import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    msg: ""
}

const helloSlice = createSlice({
    name: "hello",
    initialState,
    reducers: {
        set_hello_message: (state, action: PayloadAction<string>) => {
            state.msg = action.payload;
        }
    }
})

export const {set_hello_message} = helloSlice.actions;

export default helloSlice.reducer;