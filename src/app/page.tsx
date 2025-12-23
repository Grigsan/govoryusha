"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconCard } from '@/components/icon-card';
import { useSpeech } from '@/hooks/use-speech';
import { CATEGORIES, type Category, type CardItem } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { speak } = useSpeech();

  const handleItemClick = (item: CardItem) => {
    speak(item.label);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6 lg:p-8 pt-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedCategory ? selectedCategory.label : 'Интерактивные доски'}
            </h1>
            <p className="text-gray-600 text-lg">
              {selectedCategory 
                ? 'Выберите картинку, чтобы озвучить' 
                : 'Выберите категорию, чтобы начать'}
            </p>
          </div>
          {selectedCategory && (
            <Button 
              variant="ghost" 
              onClick={() => setSelectedCategory(null)}
              className="hover:bg-blue-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад к категориям
            </Button>
          )}
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {!selectedCategory
            ? CATEGORIES.map((category) => (
                <IconCard
                  key={category.id}
                  label={category.label}
                  icon={category.icon}
                  onClick={() => handleCategoryClick(category)}
                />
              ))
            : [
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
                    onClick={() => handleItemClick(item)}
                  />
                ))
              ]}
        </div>
      </div>
    </div>
  );
}

