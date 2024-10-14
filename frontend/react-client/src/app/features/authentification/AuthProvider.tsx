import {useEffect} from "react";
import {store} from "../../store.ts";
import {useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import useIsHaveRefreshToken from "./hooks/useIsHaveRefreshToken.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {beginRefreshToken} from "./authSlice.ts";

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