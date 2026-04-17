import { z } from "zod";

export const productStatusSchema = z.enum(["ON_SALE", "RESERVED", "SOLD"]);

export const productSchema = z.object({
  id: z.number(),
  sellerId: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  status: productStatusSchema,
  imageUrls: z.array(z.url()),
  category: z.string(),
  locationName: z.string(),
  likes: z.number(),
  views: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const pageMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number()
});

export const productsResponseSchema = z.object({
  items: z.array(productSchema),
  meta: pageMetaSchema
});

export type Product = z.infer<typeof productSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
