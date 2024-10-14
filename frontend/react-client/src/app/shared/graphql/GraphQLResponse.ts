import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";

export interface GraphQLResponse{
    data,
    errors: GraphQLExecutionErrorType[]
}