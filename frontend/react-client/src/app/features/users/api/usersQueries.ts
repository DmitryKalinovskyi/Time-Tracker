export const getUsersQuery = () => {
    const query = `
    query usersQuery($first: Int, $after: String, $last: Int, $before: String){
    usersQuery {
      users(first: $first, after: $after, last: $last, before: $before) {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            fullName
            email
            permissions
            isActive
          }
        }
      }
    }
  }
  `;
    return query;
  }