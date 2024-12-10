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
  orderNumber: z.string().or(z.number()),
  claimReasons: z
    .string()
    .min(1, 'Debe tener al menos un carácter')
    .max(255, 'Máximo 255 caracteres'),
  comments: z.string().optional(),
  products: z
    .array(
      z.object({
        product: z.object({
          name: z.string().min(1, 'debe ser auque sea un producto')
        }),
        variant: z.object({
          id: z.any(),
          price: z.string(),
          sku: z.any(),
          values: z.any(),
          product_id: z.any(),
          stock: z.number()
        }),
        quantity: z.number().min(1, 'La cantidad debe ser al menos 1.'),
        solution: z.object({
          type: z.string(),
          productToChange: z
            .object({
              product: z.object({ name: z.string() }).optional(),
              variant: z.object({ sku: z.string() }).optional()
            })
            .optional()
        }),
        shippingMethod: z.string().optional()
      })
    )
    .nonempty('Debe añadir al menos un producto.'),
  shippingMethod: z.string().optional(),
  status: z.string().min(1, 'El estado es obligatorio'),
  trackingCode: z.string().or(z.number()).optional(),
  shippingCost: z.number().optional()
});
