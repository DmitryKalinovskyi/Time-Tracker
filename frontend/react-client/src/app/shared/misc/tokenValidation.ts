import Token from "@time-tracker/types/Token.ts";

export function isTokenExpired(token: Token) {
    return new Date(token.dateExpires) < Date.now()
}
