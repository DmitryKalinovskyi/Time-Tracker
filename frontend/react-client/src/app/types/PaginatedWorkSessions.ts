import { WorkSession } from "./WorkSession"

export interface PaginatedWorkSessions{
        totalCount: number,
        pageInfo:{
            hasNextPage: boolean,
            hasPrevPage: boolean,
            startCursor: string | null,
            endCursor: string | null
        },
        edges: WorkSession[]
    };