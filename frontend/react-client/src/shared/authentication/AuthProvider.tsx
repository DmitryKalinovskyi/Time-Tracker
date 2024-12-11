import {useEffect} from "react";
import {useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import useIsHaveRefreshToken from "@time-tracker/shared/authentication/hooks/useIsHaveRefreshToken.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {beginRefreshToken} from "./authSlice.ts";
import {store} from "@time-tracker/app/store.ts";

export function AuthProvider({children}){
    // dispatch auth action and wait, then return inner component.
    useEffect(() => {
        store.dispatch(beginRefreshToken())
    }, []);

    const isHaveRefreshToken = useIsHaveRefreshToken();
    const isRefreshed = useSelector((store) => store.auth.isRefreshed);

    if(!isHaveRefreshToken || (isHaveRefreshToken && isRefreshed))
        return <>{children}</>

    return <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Full height of the viewport
        }}
    >
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
            Authorizing...
        </Typography>
    </Box>
}