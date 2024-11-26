import { z } from 'zod';

const IMG_MAX_LIMIT = 3;

const ImgSchema = z.object({
  fileName: z.string(),
  code: z.number(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string()
});

export const updateHistorySchema = z.object({
  updatedBy: z.any().optional(), // Aquí el ObjectId lo representamos como string
  updateDate: z.any().optional(), // Fecha opcional, con valor por defecto de la fecha actual
  changes: z.any().optional() // Descripción opcional de los cambios
});

export const formSchema = z.object({
  orderNumber: z.any(),
  claimReasons: z.string().min(1).max(255),
  comments: z.string().min(1).max(255),
  product: z.string(),
  product2: z.string().optional(),
  variant: z.string(),
  variant2: z.string().optional(),
  shippingMethod: z.string().min(1).max(255).optional(),
  status: z.string(),
  trackingCode: z.string().optional(),
  solutionType: z.string().optional(),
  shippingCost: z.string().optional()
});
