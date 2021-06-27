export interface Product {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  pictureUrl?: string;
  type?: string;
  priceTotal?: string;
  pictures?: PictureItem[];
  categories?: {
    category?: {
      name?: string;
      id?: string;
    }
  };
  taxRate?: number;
  size?: string;
  isAvailable?: boolean;
  isActive?: boolean;
}


export interface PictureItem {
  id?: string;
  createdAt?: string;
  pictureUrl: string;
  internalComment?: string;
}
