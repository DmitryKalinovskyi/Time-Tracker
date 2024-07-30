import {useState} from "react";
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";

export default function LoginPage(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch();
    return (
        <>
            <div className="flex justify-center">
                <div>
                    <TextField label="Email" variant="outlined" />
                    <TextField label="Password" variant="outlined" />
                    <Button onClick={useD}></Button>
                </div>
            </div>
        </>
    )
}