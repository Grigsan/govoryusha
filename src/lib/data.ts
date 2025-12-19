import type { LucideIcon } from 'lucide-react';
import {
  Utensils,
  Smile,
  Users,
  Home,
  ToyBrick,
  HelpingHand,
  PersonStanding,
  Book,
  Hand,
  Frown,
  Angry,
  Baby,
  School,
  Building2,
  TreePine,
  Gamepad2,
  Bed,
  Bath,
  Milk,
  CupSoda,
  Apple,
  Soup,
  Banana,
} from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

export interface CardItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  imageUrl?: string;
  imageHint?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  items: CardItem[];
}

const getImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    return { imageUrl: img?.imageUrl, imageHint: img?.imageHint };
}

export const CATEGORIES: Category[] = [
  {
    id: 'wants',
    label: 'Я хочу',
    icon: Hand,
    items: [
      { id: 'eat', label: 'Есть', icon: Utensils, ...getImage('eat') },
      { id: 'drink', label: 'Пить', icon: CupSoda, ...getImage('drink') },
      { id: 'play', label: 'Играть', icon: Gamepad2, ...getImage('play') },
      { id: 'sleep', label: 'Спать', icon: Bed, ...getImage('sleep') },
      { id: 'toilet', label: 'В туалет', icon: Bath, ...getImage('toilet') },
    ],
  },
  {
    id: 'food',
    label: 'Еда и напитки',
    icon: Utensils,
    items: [
      { id: 'apple', label: 'Яблоко', ...getImage('apple') },
      { id: 'banana', label: 'Банан', ...getImage('banana') },
      { id: 'soup', label: 'Суп', ...getImage('soup') },
      { id: 'water', label: 'Вода', ...getImage('water') },
      { id: 'juice', label: 'Сок', ...getImage('juice') },
      { id: 'milk', label: 'Молоко', ...getImage('milk') },
    ],
  },
  {
    id: 'feelings',
    label: 'Чувства',
    icon: Smile,
    items: [
      { id: 'happy', label: 'Радость', ...getImage('happy') },
      { id: 'sad', label: 'Грусть', ...getImage('sad') },
      { id: 'angry', label: 'Злость', ...getImage('angry') },
    ],
  },
  {
    id: 'people',
    label: 'Люди',
    icon: Users,
    items: [
      { id: 'mom', label: 'Мама', ...getImage('mom') },
      { id: 'dad', label: 'Папа', ...getImage('dad') },
      { id: 'teacher', label: 'Учитель', ...getImage('teacher') },
    ],
  },
  {
    id: 'places',
    label: 'Места',
    icon: Home,
    items: [
      { id: 'home', label: 'Дом', ...getImage('home') },
      { id: 'school', label: 'Школа', ...getImage('school') },
      { id: 'shop', label: 'Магазин', ...getImage('shop') },
      { id: 'park', label: 'Парк', ...getImage('park') },
    ],
  },
  {
    id: 'actions',
    label: 'Действия',
    icon: HelpingHand,
    items: [
        { id: 'play', label: 'Играть', ...getImage('play') },
        { id: 'sleep', label: 'Спать', ...getImage('sleep') },
    ]
  }
];

export const ALL_ITEMS: CardItem[] = CATEGORIES.flatMap(category => category.items);
