export const resetUserPasswordQuery = (
    email: string
) => {
    const query = `
    mutation ResetPassword {
      userMutation {
        resetPassword(user: { email: "${email}" })
      }
    }
`;
    return query;
}

