import { WorkSession } from "./WorkSession"

export interface PaginatedWorkSessions {
    totalCount: number;
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string | null;
        endCursor: string | null;
    };
    edges: {
        node: WorkSession;
    }[];
}