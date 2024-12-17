import Grid from "@mui/material/Grid";
import {MonthCell} from "./MonthCell.tsx";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useCallback, useEffect} from "react";
import {useMonthDetails} from "../hooks/useMonthDetails.ts";
import {useDayModal} from "../hooks/useDayModal.ts";
import {CalendarToolBar} from "@time-tracker/pages/calendar/ui/CalendarViewByMonth/CalendarToolBar.tsx";
import {useSelectedUser} from "@time-tracker/pages/calendar/ui/hooks/useSelectedUser.ts";

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
                        <div className="h-12 flex border border-t-2 justify-center items-center">
                            <Typography variant="h6">
                                {day}
                            </Typography>
                        </div>
                    </Grid>
                )}
            </Grid>

            {/*calendar cells*/}
            <Grid sx={{height: "100%"}}
                  container
                  columns={7} >
                {days.map((day, index) =>
                    <Grid item
                          xs={1}
                          key={index}
                          sx={{height: `${100/weeksCount}%`, boxSizing: 'border-box'}}>
                        <MonthCell day={day}
                                   onClick={handleMonthClick}/>
                    </Grid>
                )}
            </Grid>
        </Stack>
    </>
}