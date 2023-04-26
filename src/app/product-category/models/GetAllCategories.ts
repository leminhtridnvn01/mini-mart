import { IPagingRequest } from '../../shared/models/paging-request.model';
export interface GetAllCategoriesRequest extends IPagingRequest {}

export interface GetCategoryResponse {
  id: number;
  name: string;
  img: string;
}
