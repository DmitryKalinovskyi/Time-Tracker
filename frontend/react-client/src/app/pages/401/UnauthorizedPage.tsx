import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

export function UnauthorizedPage(){
    return(
        <div className="flex h-full justify-center flex-col">
            <div className="text-center">
                <Typography color="primary">
                    401
                </Typography>
                <Typography variant="h2" className="mt-4">
                    Unauthorized
                </Typography>
                <Typography className="mt-6">
                    Sorry, you don't have access for the page you’re looking for.
                </Typography>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button variant="contained" component={Link}>Go back home</Button>
                </div>
            </div>
        </div>
    )
}