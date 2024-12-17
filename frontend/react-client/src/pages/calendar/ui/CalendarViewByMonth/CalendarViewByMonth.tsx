import Grid from "@mui/material/Grid";
import {MonthCell} from "./MonthCell.tsx";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useCallback, useEffect} from "react";
import {useMonthDetails} from "../hooks/useMonthDetails.ts";
import {useDayModal} from "../hooks/useDayModal.ts";
import {CalendarToolBar} from "@time-tracker/pages/calendar/ui/CalendarViewByMonth/CalendarToolBar.tsx";
import {useSelectedUser} from "@time-tracker/pages/calendar/ui/hooks/useSelectedUser.ts";
import Box from "@mui/material/Box";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function CalendarViewByMonth(){
    const {days, weeksCount} = useMonthDetails();
    const openDayModal = useDayModal();
    const {selectedUser, selectMe} = useSelectedUser();

    const handleMonthClick = useCallback((day: Date)=>{
        openDayModal(day);
    }, [openDayModal]);

    useEffect(() => {
        if(selectedUser == null)
            selectMe()
    }, [selectedUser, selectMe]);


    if(selectedUser == null) return null;
    return <>
        <Stack sx={{height: "100%"}}>
            <CalendarToolBar/>

            {/*calendar week days*/}
            <Grid container columns={7} alignItems="stretch">
                {dayNames.map((day, index) =>
                    <Grid item xs={1} key={index}>
                        <Box sx={{
                            height: "3em",
                            display: "flex",
                            borderWidth: "1px",
                            borderTopWidth: "2px",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Typography variant="h6">
                                {day}
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>

            {/*calendar cells*/}
            <Grid container columns={7} sx={{height: "100%"}}>
                {days.map((day, index) =>
                    <Grid key={index} item xs={1}
                          sx={{height: `${100/weeksCount}%`, boxSizing: 'border-box'}}>
                        <MonthCell day={day}
                                   onClick={handleMonthClick}/>
                    </Grid>
                )}
            </Grid>
        </Stack>
    </>
}