export interface DataSourceResult<T> {
  skip?: number;
  totalPages?: number;
  pageNo?: number;
  pageSize?: number;
  totalRecords?: number;
  data: Array<T>;
  isSuccess?: boolean;
  message?: string;
}
