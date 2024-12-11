import User from "../../../types/User.ts";

export interface GetUsersQueryResponseType {
    errors?: [],
    data:{
        usersQuery:{
            users:{
                results: User[],
                totalRecords: number
                totalPages: number
                currentPage: number
                pageSize: number
            }
        }
    }
}

export const getUsersQuery = () => `
query UsersQuery($input: PaginationRequestInputGraphType_UserSortableFields!){
  usersQuery{
    users(input: $input){
      results{
        id
        fullName
        email
        permissions
        isActive
      },
      totalRecords,
      totalPages,
      currentPage,
      pageSize
    }
  }
}`