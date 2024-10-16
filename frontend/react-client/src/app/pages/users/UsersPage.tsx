import { Box, Typography } from "@mui/material";
import UsersList from "./ui/UsersList.tsx";

export function UsersPage() {
    return (
        <Box sx={{p: 1}}>
            <Typography variant="h4" className="text-blue-800" sx={{mb: 4}}>
                Users
            </Typography>
            <UsersList/>
        </Box>
    );
}