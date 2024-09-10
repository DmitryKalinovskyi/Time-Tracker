export default interface PaginatedResult<TType>
{
    results: Array<TType>
    totalRecords: number
    totalPages: number
    currentPage: number
    pageSize: number
}