export interface InputCreateProduct {
  name: string;
  type?: string;
  index?: number;
  description?: string;
  price?: number;
  referencePrice?: number;
  discount?: number;
  size?: string;
  color?: string;
  pictureUrl?: string;
  isActive?: boolean;
  categoryIds: string[];
}

export interface InputUpdateProduct {
  id: string;
  name: string;
  type?: string;
  index?: number;
  description?: string;
  price?: number;
  referencePrice?: number;
  discount?: number;
  size?: string;
  color?: string;
  isActive?: boolean;
  pictureUrl?: string;
  categoryIds: string[];
}