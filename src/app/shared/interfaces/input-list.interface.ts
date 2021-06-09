export interface BaseInputGetList {
  keyword?: string;
  paging?: {
    pageIndex: number;
    pageSize: number;
  }
  sorting?: {
    sortFieldName?: string;
    descending?: boolean;
  }
}