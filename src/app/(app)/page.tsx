"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { IconCard } from '@/components/icon-card';
import { useSpeech } from '@/hooks/use-speech';
import { CATEGORIES, type Category, type CardItem, ALL_ITEMS } from '@/lib/data';
import { ArrowLeft, UserCircle, Star } from 'lucide-react';
import { useCustomCards } from '@/hooks/use-custom-cards';
import { useAnalytics } from '@/hooks/use-analytics';

export default function InteractiveBoardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAdultMode, setIsAdultMode] = useState(false);
  const { customCards } = useCustomCards();
  const { trackClick, getFrequentIds } = useAnalytics();
  const { speak } = useSpeech();

  useEffect(() => {
    const checkAdultMode = () => {
      setIsAdultMode(document.documentElement.classList.contains('adult-mode'));
    };
    checkAdultMode();
    
    // Listen for class changes
    const observer = new MutationObserver(checkAdultMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleItemClick = (item: CardItem) => {
    speak(item.label, item.audioUrl);
    trackClick(item.id);
  };

  const frequentIds = getFrequentIds(5);
  const allItems = [...customCards, ...ALL_ITEMS];
  const frequentItems = allItems.filter(item => frequentIds.includes(item.id));

  const myCategory: Category | null = customCards.length > 0 ? {
    id: 'my-cards',
    label: 'Мои карточки',
    icon: UserCircle,
    items: customCards
  } : null;

  const frequentCategory: Category | null = frequentItems.length > 0 ? {
    id: 'frequent',
    label: 'Часто используемые',
    icon: Star,
    items: frequentItems
  } : null;

  const filteredCategories = CATEGORIES.filter(cat => isAdultMode ? cat.isAdult !== false : !cat.isAdult);

  const displayCategories = filteredCategories.map(category => {
    const categoryCustomCards = customCards.filter(card => card.categoryId === category.id);
    if (categoryCustomCards.length > 0) {
      return {
        ...category,
        items: [...category.items, ...categoryCustomCards]
      };
    }
    return category;
  });

  const categoriesToShow = [];
  if (frequentCategory) categoriesToShow.push(frequentCategory);
  if (myCategory) categoriesToShow.push(myCategory);
  categoriesToShow.push(...displayCategories);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-foreground">
                {selectedCategory ? selectedCategory.label : 'Интерактивные доски'}
            </h1>
            <p className="text-muted-foreground">
                {selectedCategory ? 'Выберите картинку, чтобы озвучить' : 'Выберите категорию, чтобы начать'}
            </p>
        </div>
        {selectedCategory && (
            <Button variant="ghost" onClick={() => setSelectedCategory(null)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад к категориям
            </Button>
        )}
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {!selectedCategory
          ? categoriesToShow.map((category) => (
              <IconCard
                key={category.id}
                label={category.label}
                icon={category.icon}
                onClick={() => setSelectedCategory(category)}
              />
            ))
          : [
              // Кнопка Назад как первая карточка
              <IconCard
                key="back-card"
                label="Назад"
                icon={ArrowLeft}
                onClick={() => setSelectedCategory(null)}
                className="border-dashed border-2 bg-muted/20"
              />,
              ...selectedCategory.items.map((item) => (
                <IconCard
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  iconName={item.iconName}
                  imageUrl={item.imageUrl}
                  onClick={() => handleItemClick(item)}
                />
              ))
            ]}
      </div>
    </div>
  );
}
