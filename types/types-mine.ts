export interface Complaint {
  _id: string;
  orderNumber: string;
  dateTime: string;
  comments: string;
  product: string;
  trackingCode: string;
  claimReasons: string;
  status: string;
  solutionType: string;
  shippingCost: number;
  photo: string;
  quantity: number;
  shippingType: string;
  detectionLocation: string;
  customer: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isClosed: boolean; // Indica si el caso está cerrado o no
}

export interface ChartData {
  pendingComplaints: Complaint[];
  resolvedComplaints: Complaint[];
  recentComplaints: Complaint[];
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
