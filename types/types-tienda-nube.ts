interface Attribute {
  en: string;
}

interface CategoryDescription {
  en: string;
  es: string;
  pt: string;
}

interface Handle {
  en: string;
  es: string;
  pt: string;
}

interface Category {
  created_at: string;
  description: CategoryDescription;
  handle: Handle;
  id: number;
  name: Handle;
  parent: null | number;
  subcategories: any[];
  google_shopping_category: null | string;
  updated_at: string;
}

interface ProductDescription {
  en: string;
  es: string;
  pt: string;
}

interface Image {
  id: number;
  src: string;
  position: number;
  product_id: number;
}

interface Name {
  en: string;
  es: string;
  pt: string;
}

interface VariantValue {
  en: string;
  es: string;
  pt: string;
}

export interface Variant {
  id: number;
  promotional_price: string;
  created_at: string;
  depth: null | string;
  height: null | string;
  values: VariantValue[];
  price: string;
  product_id: number;
  stock_management: boolean;
  stock: number;
  sku: string;
  updated_at: string;
  weight: string;
  width: null | string;
  cost: null | string;
}

export interface ProductNube {
  attributes: Attribute[];
  categories: Category[];
  created_at: string;
  description: ProductDescription;
  handle: Handle;
  id: number;
  images: Image[];
  name: Name;
  brand: null | string;
  video_url: string;
  seo_title: string;
  seo_description: string;
  published: boolean;
  free_shipping: boolean;
  updated_at: string;
  variants: Variant[];
  tags: string;
}
