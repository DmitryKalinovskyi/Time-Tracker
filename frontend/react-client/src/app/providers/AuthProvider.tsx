import {createContext, useState} from "react";

export interface AuthContextType{
    auth: AuthType,
    setAuth: any
}

export interface AuthType{
    accessToken: string,
    permissions: [],
    userId: number
}

const AuthContext = createContext<AuthContextType|undefined>(undefined);

interface AuthProviderProps{
    children: React.ReactElement[] | React.ReactElement
}

export function AuthProvider (props: AuthProviderProps) {
    const [auth, setAuth] = useState();

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext