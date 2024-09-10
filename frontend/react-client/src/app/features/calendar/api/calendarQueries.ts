import {CalendarEvent} from "../../../types/CalendarEvent.ts";

export interface CreateCalendarEventQueryResponseType{
    data: {
        calendarMutation:{
            createCalendarEvent: CalendarEvent
        }
    },
    errors?: []
}
export const createCalendarEventQuery = () => `
mutation CreateCalendarEvent($createCalendarEventInput: CreateCalendarEventInput!){
  calendarMutation{
    createCalendarEvent(calendarEvent: $createCalendarEventInput){
      id,
      userId,
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
    errors?: []
}
export const updateCalendarEventQuery = () => `
mutation UpdateEvent($updateCalendarEventInput: UpdateCalendarEventInput!){
  calendarMutation{
    updateCalendarEvent(calendarEvent: $updateCalendarEventInput){
      id,
      userId,
      startTime,
      endTime
    }
  }
}`

export interface DeleteCalendarEventQueryResponseType{
    data: {
        calendarMutation: string
    },
    errors?: []
}
export const deleteCalendarEventQuery = () => `
mutation DeleteCalendarEvent($calendarEventId: Int!){
  calendarMutation{
    deleteCalendarEvent(calendarEventId: $calendarEventId)
  }
}`