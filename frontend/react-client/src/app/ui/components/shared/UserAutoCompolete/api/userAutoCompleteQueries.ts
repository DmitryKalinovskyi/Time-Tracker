import User from "../../../../../types/User.ts";

export interface UsersByEmailOrFullNameResponse{
    data: {
        usersQuery:{
            usersByEmailOrFullName: User[]
        }
    },
    errors?: []
}

export const usersByEmailOrFullNameQuery = () => `
query UsersByEmailOrFullName($input: UsersByEmailOrFullNameRequest!){
  usersQuery{
    usersByEmailOrFullName(input: $input){
      id,
      fullName,
      email,
      calendarEvents{
        id,
        startTime,
        endTime
      }
    }
  }
}
`
