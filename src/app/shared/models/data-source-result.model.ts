export interface DataSourceResult<T> {
  data: Array<T>;
  total: number;
  pageNo: number;
  pageSize: number;
}
