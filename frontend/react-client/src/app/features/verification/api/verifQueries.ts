export const verifUserQuery = (
    code: string,
    password: string
) => {
    const query = `
    mutation ActivateUser {
        userMutation {
            activateUser(input: {code: "${code}", password: "${password}"})
        }
    }
`;
    return query;
}
