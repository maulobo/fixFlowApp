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
  orderNumber: z.string().min(1, 'El número de orden es obligatorio.'),
  comments: z.string().optional(),
  product: z.string().min(1, 'El producto es obligatorio.').optional(),
  product2: z.string().optional(),
  trackingCode: z.string().min(1, 'El código de seguimiento es obligatorio.'),
  variant: z.any(),
  variant2: z.any().optional(),
  claimReasons: z.string().min(1, 'El producto es obligatorio'),
  status: z
    .enum(['Hablado', 'No Hablado', 'Empaquetado'])
    .default('No Hablado'),
  quantity: z.number().optional(),
  solutionType: z
    .enum([
      'Reenvio',
      'Cupon',
      'Devolucion',
      'Regalo',
      'Cambio de producto',
      'Logistica inversa',
      'otro'
    ])
    .optional(),
  shippingCost: z
    .any()
    .optional()
    .transform((value) => (value ? Number(value) : undefined)), // Costo de envío opcional
  errorPrice: z
    .any()
    .optional()
    .transform((value) => (value ? Number(value) : undefined)), // Cantidad opcional
  shippingMode: z.string().optional(), // Tipo de envío opcional
  customer: z.string().optional(), // Cliente opcional
  isClosed: z.string().optional(),
  updatedBy: z.string().optional(), // Usuario que actualizó por última vez
  updateHistory: z.array(updateHistorySchema).optional(), // Historial de cambios opcional
  productChange: z.string().optional()
});
