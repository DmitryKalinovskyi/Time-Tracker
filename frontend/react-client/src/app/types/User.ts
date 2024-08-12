interface User {
    id: number,
    fullName: string,
    email: string,
    permissions: string[],
    isActive: boolean
}

export default User;