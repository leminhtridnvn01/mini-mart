import { ProductCategoryService } from './http/product-category.service';
import { ProductCategoryCommunicationService } from './logic/product-category-communicate.service';
export { ProductCategoryService };
export const ALL: Array<any> = [
  ProductCategoryService,
  ProductCategoryCommunicationService,
];
