import fs from 'fs';
import path from 'path';
import { WishModel } from '../models/Wish';
import { CreateWishInput } from '../validators/wishValidator';

const dataFilePath = path.join(__dirname, '../../wishes.json');

const INITIAL_WISHES: WishModel[] = [
  {
    id: 'wish-nitheesh',
    name: 'Nitheesh',
    relation: 'Best Friend & Brother',
    message: '✨ Heavenly Grace & Eternal Love — Seeing my brother Kishore find his perfect half in Shrika is the greatest blessing! You two bring out the purest joy and radiance in each other. May your journey together be showered with boundless happiness, unwavering strength, and a love that deepens with every sunrise. Here is to your forever! 🥂💍',
    createdAt: new Date().toISOString(),
    likes: 48,
    approved: true,
  },
  {
    id: 'wish-1',
    name: 'Vikram & Meera',
    relation: 'Close Friends',
    message: '💍 Eternal Love — Wishing Kishore and Shrika a lifetime of endless adventures, laughter, and unbreakable bonds! You two are pure magic together.',
    createdAt: new Date().toISOString(),
    likes: 18,
    approved: true,
  },
  {
    id: 'wish-2',
    name: 'Uncle Rajesh & Family',
    relation: 'Family',
    message: '🌸 Boundless Joy — Heartiest congratulations to Kishore! May God shower his choicest blessings upon you both as you build a heavenly home together.',
    createdAt: new Date().toISOString(),
    likes: 19,
    approved: true,
  },
  {
    id: 'wish-3',
    name: 'Pooja Sharma',
    relation: 'Colleague',
    message: '✨ Heavenly Grace — The website and your love story are utterly breathtaking! So thrilled for you Kishore. Have the most magical wedding!',
    createdAt: new Date().toISOString(),
    likes: 8,
    approved: true,
  },
];

export class WishService {
  private static initStorage(): void {
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify(INITIAL_WISHES, null, 2), 'utf8');
    }
  }

  public static async getAllWishes(): Promise<WishModel[]> {
    this.initStorage();
    try {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch {
      return INITIAL_WISHES;
    }
  }

  public static async addWish(input: CreateWishInput): Promise<WishModel> {
    this.initStorage();
    const wishes = await this.getAllWishes();
    const newWish: WishModel = {
      id: `wish-${Date.now()}`,
      name: input.name,
      relation: input.relation || 'Friend',
      message: input.message,
      createdAt: new Date().toISOString(),
      likes: 1,
      approved: true,
    };
    wishes.unshift(newWish);
    fs.writeFileSync(dataFilePath, JSON.stringify(wishes, null, 2), 'utf8');
    return newWish;
  }

  public static async likeWish(id: string): Promise<WishModel | null> {
    this.initStorage();
    const wishes = await this.getAllWishes();
    const wish = wishes.find((w) => w.id === id);
    if (!wish) return null;
    wish.likes += 1;
    fs.writeFileSync(dataFilePath, JSON.stringify(wishes, null, 2), 'utf8');
    return wish;
  }
}
