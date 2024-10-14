export const stringAvatar = (fullName: string) => {
    const tokens = fullName.split(' ')
        .map(token => token.trim())
        .filter(token => token.length > 0);

    let avatarName = "";
    if(tokens.length == 0){
        avatarName = "?";
    }
    else if(tokens.length == 1){
        avatarName = tokens[0][0];
    }
    else{
        avatarName = `${tokens[0][0]}${tokens[1][0]}`
    }

    return {
        sx : {
            bgcolor: stringToColor(fullName),
        },
        children: avatarName
    }
}

export const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}