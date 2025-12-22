"use client";

import { useState, useEffect } from 'react';
import type { CardItem } from '@/lib/data';

const STORAGE_KEY = 'govoryusha_custom_cards';

export function useCustomCards() {
  const [customCards, setCustomCards] = useState<CardItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCustomCards(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse custom cards', e);
      }
    }
  }, []);

  const addCard = (card: CardItem) => {
    const updated = [...customCards, card];
    setCustomCards(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const removeCard = (id: string) => {
    const updated = customCards.filter(c => c.id !== id);
    setCustomCards(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { customCards, addCard, removeCard };
}

