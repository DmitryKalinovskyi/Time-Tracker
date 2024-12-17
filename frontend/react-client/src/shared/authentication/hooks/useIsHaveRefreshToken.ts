import {getAvailableRefreshToken} from "@time-tracker/shared/authentication/refreshTokenManager.ts";

export default function useIsHaveRefreshToken(){
    const token = getAvailableRefreshToken();

    return token != null;
}