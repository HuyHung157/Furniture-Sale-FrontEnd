export interface Product {
  name: string;
  product_code: string;
  price: number;
  price_before: number;
  size: string;
  color: string;
  rate?: string;
  vote?: string;
  description?: string;
  is_available: boolean;
  category: string[];
  image_url: string;
}
