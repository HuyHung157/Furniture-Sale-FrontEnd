export interface BasePaginator {
    pageIndex: number,
    pageSize: number,
    pageSizeOptions: Number[],
    pageNumberMaxBlockCount?: number;
}