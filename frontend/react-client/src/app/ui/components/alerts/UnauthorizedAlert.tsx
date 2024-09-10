import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function UnauthorizedAlert(){
    return (
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
    )
}