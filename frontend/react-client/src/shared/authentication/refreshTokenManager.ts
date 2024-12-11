import Token from "../../types/Token.ts";
import {isTokenExpired} from "@time-tracker/shared/misc/tokenValidation.ts";

const KEYNAME = "_REFRESH_TOKEN";
export function saveRefreshToken(refreshToken: Token): void{
    localStorage[KEYNAME] = JSON.stringify(refreshToken);
}

export function removeRefreshToken(): void{
    localStorage.removeItem(KEYNAME);
}
/*
Returns validated and not expired token.
 */
export function getAvailableRefreshToken(): Token|null{
    const token: Token|null = JSON.parse(localStorage[KEYNAME] ?? null);

    if(token == null) return null;

    if(isTokenExpired(token)) return null;

    return token;
}