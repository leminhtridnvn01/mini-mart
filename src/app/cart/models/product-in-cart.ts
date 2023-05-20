import { LK_ProductUnit } from 'src/app/product-category/enums/product-unit';

export interface GetProductInCart {
  id: number;
  name: string;
  description: string;
  img: string;
  price: number;
  priceDecreases: number;
  lk_ProductUnit: LK_ProductUnit;
  categoryId: number;
  quantity: number;
}
