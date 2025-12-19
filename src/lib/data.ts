import type { LucideIcon } from 'lucide-react';
import {
  Utensils,
  Smile,
  Users,
  Home,
  ToyBrick,
  HelpingHand,
  Book,
  Hand,
  Shirt,
  Cat,
  CookingPot,
  Sandwich,
} from 'lucide-react';
import data from './placeholder-images.json';

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
    const img = data.placeholderImages.find(p => p.id === id);
    return { imageUrl: img?.imageUrl, imageHint: img?.imageHint };
}

export const CATEGORIES: Category[] = [
  {
    id: 'wants',
    label: 'Я хочу',
    icon: Hand,
    items: [
      { id: 'eat', label: 'Есть', icon: Utensils, ...getImage('eat') },
      { id: 'drink', label: 'Пить', ...getImage('drink') },
      { id: 'play', label: 'Играть', icon: ToyBrick, ...getImage('play') },
      { id: 'sleep', label: 'Спать', ...getImage('sleep') },
      { id: 'toilet', label: 'В туалет', ...getImage('toilet') },
      { id: 'walk', label: 'Гулять', ...getImage('walk') },
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
      { id: 'bread', label: 'Хлеб', icon: Sandwich, ...getImage('bread') },
      { id: 'porridge', label: 'Каша', icon: CookingPot, ...getImage('porridge') },
    ],
  },
    {
    id: 'animals',
    label: 'Животные',
    icon: Cat,
    items: [
      { id: 'cat', label: 'Кошка', ...getImage('cat') },
      { id: 'dog', label: 'Собака', ...getImage('dog') },
      { id: 'bird', label: 'Птица', ...getImage('bird') },
      { id: 'fish', label: 'Рыба', ...getImage('fish') },
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
      { id: 'surprised', label: 'Удивление', ...getImage('surprised') },
      { id: 'tired', label: 'Усталость', ...getImage('tired') },
    ],
  },
    {
    id: 'clothes',
    label: 'Одежда',
    icon: Shirt,
    items: [
      { id: 'shirt', label: 'Футболка', ...getImage('shirt') },
      { id: 'pants', label: 'Штаны', ...getImage('pants') },
      { id: 'dress', label: 'Платье', ...getImage('dress') },
      { id: 'hat', label: 'Шапка', ...getImage('hat') },
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
      { id: 'friend', label: 'Друг', ...getImage('friend') },
      { id: 'grandmother', label: 'Бабушка', ...getImage('grandmother') },
      { id: 'grandfather', label: 'Дедушка', ...getImage('grandfather') },
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
      { id: 'playground', label: 'Детская площадка', ...getImage('playground') },
    ],
  },
    {
    id: 'toys',
    label: 'Игрушки',
    icon: ToyBrick,
    items: [
      { id: 'ball', label: 'Мяч', ...getImage('ball') },
      { id: 'car', label: 'Машинка', ...getImage('car') },
      { id: 'doll', label: 'Кукла', ...getImage('doll') },
      { id: 'blocks', label: 'Кубики', ...getImage('blocks') },
    ],
  },
  {
    id: 'actions',
    label: 'Действия',
    icon: HelpingHand,
    items: [
        { id: 'play', label: 'Играть', ...getImage('play') },
        { id: 'sleep', label: 'Спать', ...getImage('sleep') },
        { id: 'read', label: 'Читать', icon: Book, ...getImage('read') },
        { id: 'draw', label: 'Рисовать', ...getImage('draw') },
        { id: 'go', label: 'Идти', ...getImage('walk') },
        { id: 'look', label: 'Смотреть', ...getImage('look') },
    ]
  }
];

export const ALL_ITEMS: CardItem[] = CATEGORIES.flatMap(category => category.items);
