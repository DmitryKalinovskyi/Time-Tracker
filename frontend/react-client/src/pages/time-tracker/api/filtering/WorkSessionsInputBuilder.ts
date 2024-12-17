
import dayjs from "dayjs";
import {RootState} from "@time-tracker/app/store.ts";

export default class WorkSessionsInputBuilder {
    private state: RootState;
    private variables;
    constructor(state) {
        this.state = state;
        this.variables = {
            input: {
                pageNumber: this.state.timeTracker.paginationInfo.currentPage,
                pageSize: this.state.timeTracker.paginationInfo.pageSize,
                filterCriterias: [],
                sortCriterias: []
            }
        };
    }

    public attachSelectedUser(){
        if(this.state.timeTracker.filter.selectedUser){
            this.variables.input.filterCriterias.push({
                "filterBy": "USER_ID",
                "value": `${this.state.timeTracker.filter.selectedUser.id}`,
                "operator": "EQUAL"
            })
        }
        return this;
    }

    public attachSelectedOrigins(){
        if(this.state.timeTracker.filter.selectedOrigins.length>0){
            const originsIds = `${this.state.timeTracker.filter.selectedOrigins.join(',')}`;
            this.variables.input.filterCriterias.push({
                "filterBy": "SESSION_ORIGIN_ID",
                "value": originsIds,
                "operator": "IN"
            })
        }

        return this;
    }

    public attachSelectedDay(){
        if(this.state.timeTracker.filter.selectedDay){
            const selectedDay = dayjs(this.state.timeTracker.filter.selectedDay);
            // Start and end moments of the day
            const startOfDay = selectedDay.startOf('day');
            const endOfDay = selectedDay.endOf('day');

            this.variables.input.filterCriterias.push({
                "filterBy": "START_TIME",
                "value": startOfDay.toDate(),
                "operator": "GREATER_THAN_OR_EQUAL"
            });

            this.variables.input.filterCriterias.push({
                "filterBy": "START_TIME",
                "value": endOfDay.toDate(),
                "operator": "LESS_THAN_OR_EQUAL"
            })
        }
        return this;
    }

    public sortByStartTime(){
        // sort by start time
        this.variables.input.sortCriterias.push({
            "sortBy": "START_TIME",
            "isAscending": false
        });
        return this;
    }

    build(): object{
        return this.variables;
    }
}