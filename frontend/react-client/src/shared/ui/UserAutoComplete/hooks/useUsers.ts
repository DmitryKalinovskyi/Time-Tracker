import {useEffect, useState} from "react";
import {getUsersObservable} from "@time-tracker/shared/ui/UserAutoComplete/api/getUsersObservable.ts";
import User from "@time-tracker/types/User.ts";

export function useUsers(emailOrFullName: string, usersLimit?: number){
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)

        const usersObservable = getUsersObservable(emailOrFullName, usersLimit ?? 50, 200);
        const subscription = usersObservable.subscribe({
            next: (users: User[]) =>{
                setUsers(users);
                setLoading(false);
            },
            error: () => {
                setUsers([]);
                setLoading(false);
            }
        })

        return () => {
            subscription.unsubscribe();
        };
    }, [usersLimit, emailOrFullName]);

    return {users, loading};
}