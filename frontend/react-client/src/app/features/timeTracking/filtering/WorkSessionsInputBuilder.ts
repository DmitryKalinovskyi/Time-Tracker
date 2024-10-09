import {RootState} from "../../../store.ts";

export default class WorkSessionsInputBuilder {
    private state: RootState;
    constructor(state) {
        this.state = state;
    }

    getVariables(): object{
        const variables = {
            input: {
                pageNumber: this.state.timeTracker.paginationInfo.currentPage,
                pageSize: this.state.timeTracker.paginationInfo.pageSize,
                filterCriterias: []
            }
        };

        if(this.state.timeTracker.filter.selectedUser){
            variables.input.filterCriterias.push({
                "filterBy": "USER_ID",
                "value": `${this.state.timeTracker.filter.selectedUser.id}`,
                "operator": "EQUAL"
            })
        }
        if(this.state.timeTracker.filter.selectedOrigins.length>0){
            const originsIds = `${this.state.timeTracker.filter.selectedOrigins.join(',')}`;
            variables.input.filterCriterias.push({
                "filterBy": "SESSION_ORIGIN_ID",
                "value": originsIds,
                "operator": "IN"
            })
        }

        console.log(variables)
        return variables;
    }
}