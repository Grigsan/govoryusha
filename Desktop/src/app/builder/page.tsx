"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconCard } from '@/components/icon-card';
import { useSpeech } from '@/hooks/use-speech';
import { CATEGORIES, type Category, type CardItem, ALL_ITEMS } from '@/lib/data';
import { X, Volume2, ArrowLeft } from 'lucide-react';

export default function BuilderPage() {
  const [selectedItems, setSelectedItems] = useState<CardItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { speak } = useSpeech();

  const handleItemClick = (item: CardItem) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleSpeakPhrase = () => {
    const phrase = selectedItems.map(item => item.label).join(' ');
    if (phrase) {
      speak(phrase);
    }
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleClear = () => {
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6 lg:p-8 pt-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Конструктор фраз
          </h1>
          <p className="text-gray-600 text-lg">
            Выберите карточки, чтобы составить предложение
          </p>
        </header>

        {/* Строка выбранных карточек */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Ваша фраза:</h2>
            <div className="flex gap-2">
              <Button
                onClick={handleSpeakPhrase}
                disabled={selectedItems.length === 0}
                className="flex items-center gap-2"
              >
                <Volume2 className="h-4 w-4" />
                Озвучить
              </Button>
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={selectedItems.length === 0}
              >
                Очистить
              </Button>
            </div>
          </div>
          <div className="min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-wrap gap-3 items-start">
            {selectedItems.length === 0 ? (
              <p className="text-gray-400 text-center w-full py-8">
                Выберите карточки из категорий ниже
              </p>
            ) : (
              selectedItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="relative bg-blue-50 border-2 border-blue-300 rounded-lg px-4 py-2 flex items-center gap-2"
                >
                  <span className="font-semibold text-gray-800">{item.label}</span>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Удалить"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Категории и карточки */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {selectedCategory ? selectedCategory.label : 'Выберите категорию'}
          </h2>
          
          {!selectedCategory ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {CATEGORIES.map((category) => (
                <IconCard
                  key={category.id}
                  label={category.label}
                  icon={category.icon}
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
            </div>
          ) : (
            <div>
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад к категориям
              </Button>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {selectedCategory.items.map((item) => (
                  <IconCard
                    key={item.id}
                    label={item.label}
                    icon={item.icon}
                    onClick={() => handleItemClick(item)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

