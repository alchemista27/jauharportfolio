import { z } from "zod";

export const createOrderSchema = z.object({
  serviceId: z.number().int().positive(),
  buyerName: z.string().min(1).max(100),
  buyerPhone: z.string().min(10).max(15),
  buyerEmail: z.string().email().optional(),
});

export const updatePageSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
});

export const createServiceSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  price: z.number().int().positive(),
  imageUrl: z.string().url(),
});

export const updateServiceSchema = createServiceSchema.partial();

export const createPortfolioSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  imageUrl: z.string().url(),
  projectUrl: z.string().url().optional(),
});

export const updatePortfolioSchema = createPortfolioSchema.partial();

export const updateSettingSchema = z.object({
  value: z.string().min(1),
});

export const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
});

export const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  content: z.string().min(1),
  excerpt: z.string().max(500).optional(),
  featureImageUrl: z.string().url().optional(),
  categoryId: z.number().int().positive().optional(),
  isPublished: z.boolean().default(false),
});

export const updatePostSchema = createPostSchema.partial();
