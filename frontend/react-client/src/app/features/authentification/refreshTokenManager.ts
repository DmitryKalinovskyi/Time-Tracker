import Token from "../../types/Token.ts";

const KEYNAME = "_REFRESH_TOKEN";
export function saveRefreshToken(refreshToken: Token): void{
    localStorage[KEYNAME] = JSON.stringify(refreshToken);
}

export function getRefreshToken(): Token|null{
    return JSON.parse(localStorage[KEYNAME] ?? null);
}