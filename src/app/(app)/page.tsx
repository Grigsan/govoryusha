"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconCard } from '@/components/icon-card';
import { useSpeech } from '@/hooks/use-speech';
import { CATEGORIES, type Category } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';

export default function InteractiveBoardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { speak } = useSpeech();

  const handleItemClick = (label: string) => {
    speak(label);
  };

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
          ? CATEGORIES.map((category) => (
              <IconCard
                key={category.id}
                label={category.label}
                icon={category.icon}
                onClick={() => setSelectedCategory(category)}
              />
            ))
          : selectedCategory.items.map((item) => (
              <IconCard
                key={item.id}
                label={item.label}
                icon={item.icon}
                onClick={() => handleItemClick(item.label)}
              />
            ))}
      </div>
    </div>
  );
}
