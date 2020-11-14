import { ID, guid } from '@datorama/akita';

export type Product = {
  id: ID;
  name: string;
  product_code?: string;
  price_before: number;
  price: number;
  color: string;
  size: string;
  description: string;
  image_url: string;
};

export function createProduct(
  name: string,
  product_code?: string,
  price: number,
  price_before: number,
  color: string,
  size: string,
  description: string,
  image_url: string
) {
  return {
    id: guid(),
    name,
    product_code,
    price,
    price_before,
    size,
    color,
    description,
    is_available: true,
    image_url,
  } as Product;
}