import {getAvailableRefreshToken} from "../refreshTokenManager.ts";

export default function useIsHaveRefreshToken(){
    const token = getAvailableRefreshToken();

    return token != null;
}