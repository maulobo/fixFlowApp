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

export type Claim = {
  _id: string;
  orderNumber: string;
  dateTime: string;
  comments: string;
  product: string;
  product2: string;
  variant: string;
  variant2: string;
  trackingCode: string;
  claimReasons: string;
  shippingMethod: string;
  status: string;
  solutionType: string;
  createdBy: string;
  isClosed: boolean;
  updateHistory: UpdateHistory[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
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
  variants: string[];
}

export interface FormTypes {
  initialData: Claim;
  onSubmit: (data: ClaimForm) => void;
  markAsResolved: () => void;
  loading: boolean;
  form: UseFormReturn<ClaimForm>;
  handleSubmit: any;
}
