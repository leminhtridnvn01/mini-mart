export interface PagingResult {
  isSuccess: boolean;
  message?: string;
  pageNo: number;
  pageSize: null;
  skip: number;
  totalPages: number;
  totalRecords: number;
  data: any[];
}
