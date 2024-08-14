import {getAvailableRefreshToken} from "../features/authentification/refreshTokenManager.ts";

export default function useIsHaveRefreshToken(){
    const token = getAvailableRefreshToken();

    return token != null;
}