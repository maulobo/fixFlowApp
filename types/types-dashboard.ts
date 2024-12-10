export interface ClaimReason {
  _id: string;
  count: number;
}

interface ClaimReasonCost {
  _id: string;
  claimCost: number;
}

interface TotalClaimCost {
  _id: string | null;
  claimCost: number;
}

interface ClaimStatus {
  status: string;
  count: number;
}

interface ClaimsTrend {
  totalClaims: number;
  _id: {
    year: number;
    month: number;
  };
}

interface ClaimReasonCost {
  _id: string;
  claimCost: number;
}

interface EconomicImpact {
  claimReasonsCost: ClaimReasonCost[];
  totalClaimCost: TotalClaimCost[];
}

interface SolutionDistribution {
  _id: string;
  count: number;
  percentage: number;
}
interface ProductCat {
  productName: string;
  productVariant: ProductVariant;
}

export interface TopClaimedProduct {
  totalClaims: number;
  totalQuantity: number;
  _id: ProductCat;
}

interface ProductVariant {
  id: number;
  image_id: string | null;
  product_id: number;
  position: number;
  price: string;
  [key: string]: any;
}

interface AverageResolutionTime {
  averageResolutionTimeHours: number;
  _id: string | null; // Puede ser `null` o un `string`
}

export interface DataStructure {
  averageResolutionTime: AverageResolutionTime[];
  claimReasons: ClaimReason[];
  claimStatusBreakdown: ClaimStatus[];
  claimsTrend: ClaimsTrend[];
  economicImpact: EconomicImpact;
  pendingComplaints: number;
  recentComplaints: number;
  resolvedComplaints: number;
  solutionDistribution: SolutionDistribution[];
  topClaimedProducts: TopClaimedProduct[];
}
