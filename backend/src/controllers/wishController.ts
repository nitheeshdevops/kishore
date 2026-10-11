import { Request, Response } from 'express';
import { WishService } from '../services/wishService';
import { createWishSchema } from '../validators/wishValidator';

export class WishController {
  public static async getWishes(_req: Request, res: Response): Promise<void> {
    try {
      const wishes = await WishService.getAllWishes();
      res.status(200).json(wishes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve blessings' });
    }
  }

  public static async createWish(req: Request, res: Response): Promise<void> {
    try {
      const parsed = createWishSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          error: 'Validation failed',
          details: parsed.error.issues.map((i) => i.message),
        });
        return;
      }

      const created = await WishService.addWish(parsed.data);
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit blessing' });
    }
  }

  public static async likeWish(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updated = await WishService.likeWish(id);
      if (!updated) {
        res.status(404).json({ error: 'Blessing not found' });
        return;
      }
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update blessing' });
    }
  }
}
