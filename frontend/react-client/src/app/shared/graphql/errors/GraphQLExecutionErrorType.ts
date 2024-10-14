export interface GraphQLExecutionErrorType{
    message: string,
    path: string[],
    locations: [{
        line: number,
        column: number
    }]
    extensions: {
        code: string,
        codes: string[],
        details: string
    }
}
