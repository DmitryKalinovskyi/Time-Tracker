import Role from "./Role.ts";

interface User {
    id: number,
    fullName: string,
    email: string,
    role: Role
}

export default User;