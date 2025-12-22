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
  Footprints,
  GlassWater,
  Bed,
  Soup,
  Car,
  Circle,
  Square,
  Star,
  Heart,
  Dog,
  Bird,
  Fish,
  ShoppingBag,
  Trees,
  Building2,
  School,
  PersonStanding,
  Pencil,
  Scissors,
  Ruler,
  Paintbrush,
  BookOpen,
  Apple,
  Banana,
  Beef,
  Cookie,
  Drumstick,
  Milk,
  Bath,
  ShowerHead,
  Sofa,
  Lamp,
  Tv,
  Stethoscope,
  Hospital,
  Thermometer,
  Cloudy,
  Sun,
  Snowflake,
  Wind,
  CloudRain,
  Train,
  Bus,
  Plane,
  Bike,
  ThumbsUp,
  ThumbsDown,
  MessageSquareQuote,
  Info,
  Calendar,
  Watch,
  X,
  Check,
  MoreHorizontal,
  Plus,
  Minus,
  MoveLeft,
  MoveRight,
  PencilRuler,
  Calculator,
  Baby,
  SmilePlus,
  Ghost,
  Frown,
  Moon,
  Coffee,
  Waves,
  Briefcase,
  Wallet,
  BusFront,
  Stethoscope as   HealthIcon,
  ShieldAlert,
  Octagon,
  ShoppingCart,
  Store,
  Banknote,
  Package,
  Carrot,
  IceCream,
  CupSoda,
  Bowl,
  Wine,
  Droplets
} from 'lucide-react';

export interface CardItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  iconName?: string;
  imageUrl?: string;
  audioUrl?: string;
  categoryId?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  items: CardItem[];
  isAdult?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: 'phrases',
    label: 'Фразы',
    icon: MessageSquareQuote,
    items: [
      { id: 'yes', label: 'Да', icon: ThumbsUp },
      { id: 'no', label: 'Нет', icon: ThumbsDown },
      { id: 'hello', label: 'Привет', icon: Hand },
      { id: 'goodbye', label: 'Пока', icon: Hand },
      { id: 'thank-you', label: 'Спасибо', icon: HelpingHand },
      { id: 'please', label: 'Пожалуйста', icon: HelpingHand },
      { id: 'i-want', label: 'Я хочу', icon: Hand },
      { id: 'i-dont-want', label: 'Я не хочу', icon: X },
      { id: 'i-like', label: 'Мне нравится', icon: Heart },
      { id: 'i-dont-like', label: 'Мне не нравится', icon: X },
      { id: 'help-me', label: 'Помоги мне', icon: HelpingHand },
      { id: 'look', label: 'Смотри', icon: Star },
      { id: 'more', label: 'Еще', icon: Plus },
      { id: 'finished', label: 'Все', icon: Check },
    ],
  },
  {
    id: 'work',
    label: 'Работа',
    icon: Briefcase,
    items: [
      { id: 'work-go', label: 'На работу', icon: Briefcase },
      { id: 'break', label: 'Перерыв', icon: Coffee },
      { id: 'salary', label: 'Зарплата', icon: Wallet },
      { id: 'task', label: 'Задание', icon: Check },
      { id: 'boss', label: 'Начальник', icon: Users },
      { id: 'colleague', label: 'Коллега', icon: Users },
    ],
    isAdult: true,
  },
  {
    id: 'money',
    label: 'Деньги',
    icon: Wallet,
    items: [
      { id: 'buy', label: 'Купить', icon: Wallet },
      { id: 'price', label: 'Сколько стоит?', icon: Info },
      { id: 'change', label: 'Сдача', icon: Wallet },
      { id: 'card-pay', label: 'Оплата картой', icon: Wallet },
      { id: 'cash', label: 'Наличные', icon: Wallet },
      { id: 'receipt', label: 'Чек', icon: Check },
    ],
    isAdult: true,
  },
  {
    id: 'transport-adult',
    label: 'Транспорт+',
    icon: BusFront,
    items: [
      { id: 'bus-adult', label: 'Автобус', icon: BusFront },
      { id: 'metro', label: 'Метро', icon: Train },
      { id: 'taxi', label: 'Такси', icon: Car },
      { id: 'ticket', label: 'Билет', icon: Wallet },
      { id: 'route', label: 'Маршрут', icon: Waves },
      { id: 'stop', label: 'Остановка', icon: Octagon },
    ],
    isAdult: true,
  },
  {
    id: 'health-adult',
    label: 'Здоровье+',
    icon: HealthIcon,
    items: [
      { id: 'pharmacy', label: 'Аптека', icon: HealthIcon },
      { id: 'prescription', label: 'Рецепт', icon: Check },
      { id: 'emergency', label: 'Срочно!', icon: ShieldAlert },
      { id: 'record', label: 'Запись к врачу', icon: Calendar },
    ],
    isAdult: true,
  },
  {
    id: 'actions',
    label: 'Действия',
    icon: HelpingHand,
    items: [
      { id: 'eat', label: 'Есть', icon: Utensils },
      { id: 'drink', label: 'Пить', icon: GlassWater },
      { id: 'go', label: 'Идти', icon: Footprints },
      { id: 'play', label: 'Играть', icon: ToyBrick },
      { id: 'sleep', label: 'Спать', icon: Bed },
      { id: 'read', label: 'Читать', icon: BookOpen },
      { id: 'draw', label: 'Рисовать', icon: Paintbrush },
      { id: 'write', label: 'Писать', icon: Pencil },
      { id: 'wash', label: 'Мыть', icon: Hand },
      { id: 'open', label: 'Открыть', icon: MoveRight },
      { id: 'close', label: 'Закрыть', icon: MoveLeft },
      { id: 'sit', label: 'Сидеть', icon: PersonStanding },
      { id: 'stand', label: 'Стоять', icon: PersonStanding },
      { id: 'give', label: 'Дать', icon: Hand },
      { id: 'take', label: 'Взять', icon: Hand },
      { id: 'get-dressed', label: 'Одеваться', icon: Shirt },
      { id: 'undress', label: 'Раздеваться', icon: Shirt },
      { id: 'count-school', label: 'Считать', icon: Calculator },
      { id: 'pet', label: 'Гладить', icon: Hand },
      { id: 'drive', label: 'Ехать', icon: Car },
    ],
  },
  {
    id: 'food',
    label: 'Еда',
    icon: Utensils,
    items: [
      { id: 'eat-food', label: 'Есть', icon: Utensils },
      { id: 'apple', label: 'Яблоко', icon: Apple },
      { id: 'banana', label: 'Банан', icon: Banana },
      { id: 'soup', label: 'Суп', icon: Soup },
      { id: 'borscht', label: 'Борщ', icon: CookingPot },
      { id: 'buckwheat', label: 'Гречка', icon: Utensils },
      { id: 'pancakes', label: 'Блины', icon: Sandwich },
      { id: 'bread', label: 'Хлеб', icon: Sandwich },
      { id: 'porridge', label: 'Каша', icon: CookingPot },
      { id: 'chicken', label: 'Курица', icon: Drumstick },
      { id: 'meat', label: 'Мясо', icon: Beef },
      { id: 'cookie', label: 'Печенье', icon: Cookie },
      { id: 'croissant', label: 'Круассан', icon: Banana },
    ],
  },
  {
    id: 'drinks',
    label: 'Напитки',
    icon: GlassWater,
    items: [
        { id: 'drink-drinks', label: 'Пить', icon: GlassWater },
        { id: 'water', label: 'Вода', icon: GlassWater },
        { id: 'juice', label: 'Сок', icon: GlassWater },
        { id: 'milk', label: 'Молоко', icon: Milk },
        { id: 'tea', label: 'Чай', icon: Coffee },
        { id: 'tea-lemon', label: 'Чай с лимоном', icon: Coffee },
    ]
  },
  {
    id: 'shop',
    label: 'Магазин',
    icon: ShoppingCart,
    items: [
      { id: 'shop-go', label: 'В магазин', icon: Store },
      { id: 'cart', label: 'Тележка', icon: ShoppingCart },
      { id: 'cashier', label: 'Касса', icon: Banknote },
      { id: 'bag', label: 'Пакет', icon: ShoppingBag },
      { id: 'milk-shop', label: 'Молоко', icon: Milk },
      { id: 'bread-shop', label: 'Хлеб', icon: Sandwich },
      { id: 'eggs', label: 'Яйца', icon: Circle },
      { id: 'carrot', label: 'Морковь', icon: Carrot },
      { id: 'potato', label: 'Картофель', icon: Circle },
      { id: 'ice-cream', label: 'Мороженое', icon: IceCream },
      { id: 'package', label: 'Упаковка', icon: Package },
    ],
  },
  {
    id: 'feelings',
    label: 'Чувства',
    icon: Smile,
    items: [
      { id: 'happy', label: 'Радость', icon: Smile },
      { id: 'sad', label: 'Грусть', icon: Frown },
      { id: 'angry', label: 'Злость', icon: SmilePlus }, 
      { id: 'surprised', label: 'Удивление', icon: Ghost },
      { id: 'tired', label: 'Усталость', icon: Moon },
      { id: 'scared', label: 'Страх', icon: Ghost },
    ],
  },
  {
    id: 'people',
    label: 'Люди',
    icon: Users,
    items: [
      { id: 'talk', label: 'Говорить', icon: MessageSquareQuote },
      { id: 'mom', label: 'Мама', icon: Users },
      { id: 'dad', label: 'Папа', icon: Users },
      { id: 'teacher', label: 'Учитель', icon: Users },
      { id: 'friend', label: 'Друг', icon: Users },
      { id: 'grandmother', label: 'Бабушка', icon: Users },
      { id: 'grandfather', label: 'Дедушка', icon: Users },
      { id: 'brother', label: 'Брат', icon: PersonStanding },
      { id: 'sister', label: 'Сестра', icon: PersonStanding },
      { id: 'babushka', label: 'Бабуля', icon: Users },
      { id: 'dedushka', label: 'Дедуля', icon: Users },
    ],
  },
  {
    id: 'places',
    label: 'Места',
    icon: Home,
    items: [
      { id: 'go-to', label: 'Идти', icon: Footprints },
      { id: 'home', label: 'Дом', icon: Home },
      { id: 'school', label: 'Школа', icon: School },
      { id: 'shop', label: 'Магазин', icon: ShoppingBag },
      { id: 'park', label: 'Парк', icon: Trees },
      { id: 'playground', label: 'Площадка', icon: Building2 },
      { id: 'hospital', label: 'Больница', icon: Hospital },
      { id: 'room', label: 'Комната', icon: Sofa },
      { id: 'kitchen', label: 'Кухня', icon: CookingPot },
      { id: 'toilet', label: 'Туалет', icon: Bath },
    ],
  },
  {
    id: 'toys',
    label: 'Игрушки',
    icon: ToyBrick,
    items: [
      { id: 'play-toys', label: 'Играть', icon: ToyBrick },
      { id: 'ball', label: 'Мяч', icon: Circle },
      { id: 'car', label: 'Машинка', icon: Car },
      { id: 'doll', label: 'Кукла', icon: PersonStanding },
      { id: 'blocks', label: 'Кубики', icon: Square },
      { id: 'puzzle', label: 'Пазл', icon: ToyBrick },
    ],
    isAdult: false,
  },
  {
    id: 'animals',
    label: 'Животные',
    icon: Cat,
    items: [
      { id: 'pet', label: 'Гладить', icon: Hand },
      { id: 'cat', label: 'Кошка', icon: Cat },
      { id: 'dog', label: 'Собака', icon: Dog },
      { id: 'bird', label: 'Птица', icon: Bird },
      { id: 'fish', label: 'Рыба', icon: Fish },
    ],
  },
  {
    id: 'clothes',
    label: 'Одежда',
    icon: Shirt,
    items: [
      { id: 'get-dressed', label: 'Одеваться', icon: Shirt },
      { id: 'undress', label: 'Раздеваться', icon: Shirt },
      { id: 'shirt', label: 'Футболка', icon: Shirt },
      { id: 'pants', label: 'Штаны', icon: Square },
      { id: 'dress', label: 'Платье', icon: Square },
      { id: 'hat', label: 'Шапка', icon: Circle },
      { id: 'shoes', label: 'Обувь', icon: Footprints },
      { id: 'jacket', label: 'Куртка', icon: Shirt },
      { id: 'slippers', label: 'Тапочки', icon: Footprints },
      { id: 'valenki', label: 'Валенки', icon: Footprints },
    ],
  },
  {
    id: 'school-supplies',
    label: 'Учеба',
    icon: Calculator,
    items: [
      { id: 'read-school', label: 'Читать', icon: BookOpen },
      { id: 'write-school', label: 'Писать', icon: Pencil },
      { id: 'draw-school', label: 'Рисовать', icon: Paintbrush },
      { id: 'count-school', label: 'Считать', icon: Calculator },
      { id: 'pencil', label: 'Карандаш', icon: Pencil },
      { id: 'pen', label: 'Ручка', icon: Pencil },
      { id: 'notebook', label: 'Тетрадь', icon: BookOpen },
      { id: 'scissors', label: 'Ножницы', icon: Scissors },
      { id: 'ruler', label: 'Линейка', icon: Ruler },
      { id: 'glue', label: 'Клей', icon: Pencil },
      { id: 'book', label: 'Книга', icon: Book },
    ],
    isAdult: false,
  },
  {
    id: 'hygiene',
    label: 'Гигиена',
    icon: Bath,
    items: [
        { id: 'toilet-action', label: 'В туалет', icon: PersonStanding },
        { id: 'wash-hands', label: 'Мыть руки', icon: Hand },
        { id: 'take-shower', label: 'Принять душ', icon: ShowerHead },
        { id: 'brush-teeth', label: 'Чистить зубы', icon: Circle }, // Tooth icon was removed
    ]
  },
  {
    id: 'home-items',
    label: 'Дома',
    icon: Sofa,
    items: [
        { id: 'sofa', label: 'Диван', icon: Sofa },
        { id: 'table', label: 'Стол', icon: Square },
        { id: 'chair', label: 'Стул', icon: Square },
        { id: 'bed', label: 'Кровать', icon: Bed },
        { id: 'tv', label: 'Телевизор', icon: Tv },
        { id: 'lamp', label: 'Лампа', icon: Lamp },
    ]
  },
  {
    id: 'health',
    label: 'Здоровье',
    icon: Stethoscope,
    items: [
        { id: 'doctor', label: 'Врач', icon: Stethoscope },
        { id: 'it-hurts', label: 'Болит', icon: Heart },
        { id: 'medicine', label: 'Лекарство', icon: Circle },
        { id: 'temperature', label: 'Температура', icon: Thermometer },
    ]
  },
  {
    id: 'weather',
    label: 'Погода',
    icon: Sun,
    items: [
        { id: 'sunny', label: 'Солнечно', icon: Sun },
        { id: 'cloudy', label: 'Облачно', icon: Cloudy },
        { id: 'rain', label: 'Дождь', icon: CloudRain },
        { id: 'snow', label: 'Снег', icon: Snowflake },
        { id: 'wind', label: 'Ветер', icon: Wind },
    ]
  },
  {
    id: 'transport',
    label: 'Транспорт',
    icon: Car,
    items: [
        { id: 'drive', label: 'Ехать', icon: Car },
        { id: 'car', label: 'Машина', icon: Car },
        { id: 'bus', label: 'Автобус', icon: Bus },
        { id: 'train', label: 'Поезд', icon: Train },
        { id: 'plane', label: 'Самолет', icon: Plane },
        { id: 'bicycle', label: 'Велосипед', icon: Bike },
    ]
  },
  {
    id: 'questions',
    label: 'Вопросы',
    icon: Info,
    items: [
        { id: 'who', label: 'Кто?', icon: Info },
        { id: 'what', label: 'Что?', icon: Info },
        { id: 'where', label: 'Где?', icon: Info },
        { id: 'when', label: 'Когда?', icon: Calendar },
        { id: 'why', label: 'Почему?', icon: Info },
        { id: 'how', label: 'Как?', icon: Info },
    ]
  }
];

// Fallback icon for items that might not have a specific one
const DefaultIcon = Circle;

// Add a default icon to each item if it doesn't have one
CATEGORIES.forEach(category => {
  category.items.forEach(item => {
    if (!item.icon) {
      item.icon = DefaultIcon;
    }
    // Fix for puzzle id
    if ((item as any).id_ === 'puzzle') {
        item.id = 'puzzle';
        delete (item as any).id_;
    }
  });
});

export const ALL_ITEMS: CardItem[] = CATEGORIES.flatMap(category => category.items);
