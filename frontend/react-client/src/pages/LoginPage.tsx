import {useState} from "react";
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {fetch_auth} from "../state/auth/epics.ts";

export default function LoginPage(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch();

    return (
        <>
            <div className="flex justify-center">
                <div>
                    <TextField label="Email"
                               variant="outlined"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField label="Password"
                               variant="outlined"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={() => dispatch(fetch_auth({email, password}))}></Button>
                </div>
            </div>
        </>
    )
}