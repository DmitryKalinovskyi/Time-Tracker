import {CalendarEvent} from "../../../types/CalendarEvent.ts";
import User from "../../../types/User.ts";
import {GraphQLResponse} from "@time-tracker/shared/graphql/GraphQLResponse.ts";

export interface CreateCalendarEventResponse extends GraphQLResponse{
    data: {
        calendarMutation:{
            createCalendarEvent: CalendarEvent
        }
    },
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

export interface UpdateCalendarEventResponse extends GraphQLResponse{
    data: {
        calendarMutation:{
            updateCalendarEvent: CalendarEvent
        }
    },
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

export interface DeleteCalendarEventResponse extends GraphQLResponse{
    data: {
        calendarMutation: string
    },
}
export const deleteCalendarEventQuery = () => `
mutation DeleteCalendarEvent($calendarEventId: Int!){
  calendarMutation{
    deleteCalendarEvent(calendarEventId: $calendarEventId)
  }
}`

export interface FetchUserByIdResponse extends GraphQLResponse{
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