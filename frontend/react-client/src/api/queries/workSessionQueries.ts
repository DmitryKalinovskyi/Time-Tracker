import { WorkSession } from "../../app/types/WorkSession";
import { AddSessionPayload, PaginationPayload, UpdateSessionPayload } from "../../app/features/timeTracking/timeTrackingSlice";
import { PaginatedWorkSessions } from "../../app/types/PaginatedWorkSessions";

export interface StartSessionResponse{
    timeTrackerMutation:{
        startSession: {
            id: number,
            startTime: Date
        }
    }      
}

export interface StopSessionResponse{
    timeTrackerMutation:{
        stopSession: WorkSession
    }
}

export interface AddSessionResponse{
    timeTrackerMutation: {
        addSession: WorkSession
    }
}

export interface UpdateSessionResponse{
    timeTrackerMutation: {
        updateSession: WorkSession
    }
}

export interface WorkSessionByIdResponse{
    timeTrackerQuery: {
        workSession: WorkSession
    }
}

export interface WorkSessionsWithPaginationResponse{
    timeTrackerQuery:{
        workSessions: PaginatedWorkSessions
    }
}



export const startSessionQuery = (userId: number) => {
    const query =
    `
    mutation
    {
        timeTrackerMutation
        {
            startSession(userId: ${userId}) 
            {
                id
                startTime
            }
        }
    }
    `;

    return query;

}

export const stopSessionQuery = (workSessionId: number) => {
    const query = 
    `
        mutation
    {
        timeTrackerMutation
        {
            stopSession(workSessionId: ${workSessionId}) {
                id
                startTime
                endTime
                duration
                createdAt
                lastUpdatedAt
                user {
                    id
                    fullName
                    email
                    permissions
                    isActive
                }
                editedBy {
                    id
                    fullName
                    email
                    permissions
                    isActive
                }
                sessionOrigin {
                    id
                    originName
                    description
                }
            } 
        }
    }
    `;

    return query;
}

export const addSessionQuery = (payload: AddSessionPayload) => {
    const query = 
    `
        mutation
        {
            timeTrackerMutation{
                addSession(input: 
                                { 
                                    userId: ${payload.userId}, 
                                    startTime: "${payload.startTime.toISOString()}",
                                    endTime: "${payload.endTime.toISOString()}", 
                                    sessionOriginId: ${payload.sessionOriginId}
                                }
                            ) 
                    {
                id
                startTime
                endTime
                duration
                createdAt
                lastUpdatedAt
                user {
                    id
                    fullName
                    email
                    permissions
                    isActive
                }
                editedBy {
                    id
                    fullName
                    email
                    permissions
                    isActive
                }
                sessionOrigin {
                    id
                    originName
                    description
                }
            }
            }
        }
    `;
    return query;
}

export const updateSessionQuery = (payload: UpdateSessionPayload) => {
    const query = 
    `
    mutation{
        timeTrackerMutation{
            updateSession( editorId: ${payload.editorId} , 
                            input: 
                            { 
                                id: ${payload.id},
                                startTime: "${payload.startTime.toISOString()}", 
                                endTime: "${payload.endTime.toISOString()}"
                            }
                        ) 
            {
            id
            startTime
            endTime
            duration
            createdAt
            lastUpdatedAt
            user {
                id
                fullName
                email
                permissions
                isActive
            }
            editedBy {
                id
                fullName
                email
                permissions
                isActive
            }
            sessionOrigin {
                id
                originName
                description
            }
        }
        }
    }
    `;
    return query;
}

export const deleteSessionQuery = (workSessionId: number) => {
    const query = 
    `
    mutation{
        timeTrackerMutation{
            deleteSession(workSessionId:${workSessionId})
        }
    }
    `;

    return query;
}

export const getWorkSessionByIdQuery = (workSessionId: number) => {
    const query = 
    `
            query{
                timeTrackerQuery{
                    workSession(id: ${workSessionId}) {
                    id
                    startTime
                    endTime
                    duration
                    createdAt
                    lastUpdatedAt
                    user {
                        id
                        fullName
                        email
                        permissions
                        isActive
                    }
                    editedBy {
                        id
                        fullName
                        email
                        permissions
                        isActive
                    }
                    sessionOrigin {
                        id
                        originName
                        description
                    }
                }
                }
        }
    `;

    return query;
}

export const getWorkSessionsWithPagination = (payload: PaginationPayload) => {
    const query = 
    `
        query{
        timeTrackerQuery{
            workSessions(
                            after: ${payload.after ? `"${payload.after}"` : null}, 
                            before: ${payload.before ? `"${payload.before}"` : null}, 
                            first: ${payload.first}, 
                            last: ${payload.last}, 
                            userId: ${payload.userId}, 
                            year: ${payload.year}, 
                            month: ${payload.month}, 
                            day: ${payload.day}
                        ) 
            {
            totalCount
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            edges {
            node {
                id
                startTime
                endTime
                duration
                createdAt
                lastUpdatedAt
                user {
                    id
                    fullName
                    email
                    permissions
                    isActive
                }
                editedBy {
                    id
                    fullName
                    email
                    permissions
                    isActive
                }
                sessionOrigin {
                    id
                    originName
                    description
                }
            }
            }
        }
        }
    }
    `;

    return query;
}