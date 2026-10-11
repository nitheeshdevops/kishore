import { z } from 'zod';

export const createWishSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name cannot exceed 60 characters'),
  relation: z.string().max(40).default('Friend'),
  message: z.string().min(5, 'Message must be at least 5 characters').max(500, 'Message cannot exceed 500 characters'),
});

export type CreateWishInput = z.infer<typeof createWishSchema>;
