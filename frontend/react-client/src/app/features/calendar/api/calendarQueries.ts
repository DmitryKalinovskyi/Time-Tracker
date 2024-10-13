import {CalendarEvent} from "../../../types/CalendarEvent.ts";
import User from "../../../types/User.ts";
import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/GraphQLExecutionErrorType.ts";

export interface CreateCalendarEventQueryResponseType{
    data: {
        calendarMutation:{
            createCalendarEvent: CalendarEvent
        }
    },
    errors?: GraphQLExecutionErrorType[]
}
export const createCalendarEventQuery = () => `
mutation CreateCalendarEvent($createCalendarEventInput: CreateCalendarEventInput!){
  calendarMutation{
    createCalendarEvent(calendarEvent: $createCalendarEventInput){
      id,
      startTime,
      endTime
    }
  }
}`;

export interface UpdateCalendarEventQueryResponseType{
    data: {
        calendarMutation:{
            updateCalendarEvent: CalendarEvent
        }
    },
    errors?: GraphQLExecutionErrorType[]
}
export const updateCalendarEventQuery = () => `
mutation UpdateEvent($updateCalendarEventInput: UpdateCalendarEventInput!){
  calendarMutation{
    updateCalendarEvent(calendarEvent: $updateCalendarEventInput){
      id,
      startTime,
      endTime
    }
  }
}`

export interface DeleteCalendarEventQueryResponseType{
    data: {
        calendarMutation: string
    },
    errors?: GraphQLExecutionErrorType[]
}
export const deleteCalendarEventQuery = () => `
mutation DeleteCalendarEvent($calendarEventId: Int!){
  calendarMutation{
    deleteCalendarEvent(calendarEventId: $calendarEventId)
  }
}`

export interface FetchUserByIdResponseType{
    errors?: GraphQLExecutionErrorType[]
    data:{
        usersQuery:{
            user: User
        }
    }
}

export const fetchUserById = () => `
query GetUser($userId: Int!){
  usersQuery{
    user(userId: $userId){
      id,
      fullName,
      email,
      calendarEvents{
        id
        startTime,
        endTime,
      }
    }
  }
}`