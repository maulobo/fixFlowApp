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

const MAX_FILE_SIZE = 600000000000000000000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const updateHistorySchema = z.object({
  updatedBy: z.any().optional(), // Aquí el ObjectId lo representamos como string
  updateDate: z.any().optional(), // Fecha opcional, con valor por defecto de la fecha actual
  changes: z.any().optional() // Descripción opcional de los cambios
});

export const formSchema = z.object({
  orderNumber: z.string().min(1, 'El número de orden es obligatorio.'),
  // dateTime: z.date().default(new Date()), // Fecha de creación por defecto a la fecha actual
  comments: z.string().optional(), // Comentarios opcionales
  product: z.string().min(1, 'El producto es obligatorio.'),
  trackingCode: z.string().min(1, 'El código de seguimiento es obligatorio.'),
  claimReasons: z
    .enum([
      'Error empaquetado',
      'Cambio despacho',
      'Devolucion',
      'Error Logistica',
      'Otro',
      'Sin Stock',
      'Garantia',
      'Retorno',
      'Cambio previo al envio'
    ])
    .optional(),
  status: z
    .enum(['Hablado', 'No Hablado', 'Empaquetado'])
    .default('No Hablado'),
  solutionType: z
    .enum([
      'Reenvio',
      'Cupon',
      'Devolucion',
      'Regalo',
      'Cambio de producto',
      'Logistica inversa'
    ])
    .optional(),
  shippingCost: z
    .any()
    .optional()
    .transform((value) => (value ? Number(value) : undefined)), // Costo de envío opcional
  // photo: z
  //   .array(
  //     z.object({
  //       url: z.string(),
  //       name: z.string()
  //     })
  //   )
  //   .optional(), // URL o path de la foto opcional
  errorPrice: z
    .any()
    .optional()
    .transform((value) => (value ? Number(value) : undefined)), // Cantidad opcional
  shippingType: z.string().optional(), // Tipo de envío opcional
  detectionLocation: z.string().optional(), // Lugar de detección opcional
  customer: z.string().optional(), // Cliente opcional
  // createdBy: z
  //   .string()
  //   .min(1, 'El usuario que creó el reclamo es obligatorio.'), // Referencia al usuario que creó el reclamo
  isClosed: z.boolean().default(false), // Campo booleano de cierre
  updatedBy: z.string().optional(), // Usuario que actualizó por última vez
  updateHistory: z.array(updateHistorySchema).optional() // Historial de cambios opcional
});
