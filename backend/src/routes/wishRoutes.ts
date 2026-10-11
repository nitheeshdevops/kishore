import { Router } from 'express';
import { WishController } from '../controllers/wishController';
import { wishRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.get('/', WishController.getWishes);
router.post('/', wishRateLimiter, WishController.createWish);
router.post('/:id/like', WishController.likeWish);

export default router;
