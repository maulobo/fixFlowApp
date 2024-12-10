import { ClaimForm } from '@/components/forms/form-generated';
import { UseFormReturn } from 'react-hook-form';

export interface ChartData {
  pendingComplaints: Claim[];
  resolvedComplaints: Claim[];
  recentComplaints: Claim[];
  avgResolutionTime: number;
  errorsByType: Array<{ _id: string; count: number }>;
  humanErrors: number;
  mostComplainedProducts: Array<{ _id: string; count: number }>;
  mostComplainedCategories: Array<{ _id: string; count: number }>;
  costsAndLosses: {
    totalRepostCost: number;
    totalProductLoss: number;
  };
  complainedByMonth: Array<{ month: number; year: number; complaints: number }>;
  trend: Array<{ _id: { month: number; year: number }; count: number }>;
}

export type ComplaintCategory = {
  category: string;
  count: number;
};

export type MonthComplaintData = {
  month: number; // 1 para enero, 2 para febrero, etc.
  categories: ComplaintCategory[];
};

export type ChartDataMonth = {
  month: string;
  [category: string]: number | string; // Claves dinámicas para las categorías
};

export interface SolutionType {
  label: string;
  value: string;
}

export type Variant = {
  name: { es: string };
  id: string;
  price: string;
  product_id: string;
  sku: string;
  stock: number;
  values: [
    {
      es: string;
    }
  ];
};
export type ProductSave = {
  name: string;
  id: string;
};

type UpdateHistory = {
  updatedBy: string;
  changes: any[]; // Si tienes más detalles sobre `changes`, define el tipo específico.
  _id: string;
  updateDate: string; // ISO date string
};

interface Images {
  id: number;
  product_id: number;
  src: string;
  position: number;
  alt: string[]; // Es un array vacío según el ejemplo.
  created_at: string;
  updated_at: string;
  height: number;
  width: number;
  thumbnails_generated: number;
}

export interface ProductReceipt {
  name: { es: string };
  images: Images[];
  variants: Variant[];
  id: string;
}
export type Claimreason = {
  value: string;
  label: string;
};

export interface Claim {
  _id: string;
  claimReasons: string;
  orderNumber: string;
  dateTime: string;
  comments: string;
  products: FormProduct[];
  trackingCode: string;
  shippingMethod: string;
  status: string;
  createdBy: string;
  isClosed: boolean;
  updateHistory: UpdateHistory[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface FormTypes {
  initialData: Claim;
  onSubmit: (data: FormValues, event: any) => void;
  loading: boolean;
  form: UseFormReturn<FormValues>;
  handleSubmit: any;
}

export type FormValues = {
  products: FormProduct[];
  orderNumber: string | number;
  claimReasons: string;
  comments: string;
  status: string;
  trackingCode: string | number;
  solutionType: string | null;
  shippingCost: number;
  isClosed: boolean;
};

type Solution = {
  type: string;
  productToChange?: {
    product?: ProductSave;
    variant?: Variant;
    Quantity?: number;
  };
};
type FormProduct = {
  solution: Solution;
  product: ProductSave;
  variant: Variant;
  quantity: number;
  shippingMethod: string;
};
