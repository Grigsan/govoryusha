"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconCard } from '@/components/icon-card';
import { useSpeech } from '@/hooks/use-speech';
import { CATEGORIES, ALL_ITEMS, type CardItem } from '@/lib/data';
import { Play, Trash2, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PhraseBuilderPage() {
  const [phrase, setPhrase] = useState<CardItem[]>([]);
  const { speak, isSpeaking } = useSpeech();

  const addToPhrase = (item: CardItem) => {
    setPhrase((currentPhrase) => [...currentPhrase, item]);
  };

  const removeFromPhrase = (index: number) => {
    setPhrase((currentPhrase) => currentPhrase.filter((_, i) => i !== index));
  };

  const clearPhrase = () => {
    setPhrase([]);
  };

  const speakPhrase = () => {
    if (phrase.length > 0) {
      const textToSpeak = phrase.map((item) => item.label).join(' ');
      speak(textToSpeak);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
        <header>
            <h1 className="text-3xl font-bold text-foreground">Конструктор фраз</h1>
            <p className="text-muted-foreground">Составляйте предложения из картинок.</p>
        </header>

      <Card className="min-h-[10rem] flex flex-col justify-between">
        <CardContent className="p-4 flex-grow">
          {phrase.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Здесь появится ваше предложение</p>
            </div>
          ) : (
            <ScrollArea>
              <div className="flex gap-4 pb-4">
                {phrase.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="relative group shrink-0">
                    <div className="w-28">
                       <IconCard
                        label={item.label}
                        icon={item.icon}
                        onClick={() => {}}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-3 -right-3 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromPhrase(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </CardContent>
        <div className="flex justify-end gap-2 p-4 border-t">
          <Button onClick={speakPhrase} disabled={phrase.length === 0 || isSpeaking} size="lg">
            <Play className="mr-2 h-5 w-5" />
            Озвучить
          </Button>
          <Button
            variant="destructive"
            onClick={clearPhrase}
            disabled={phrase.length === 0}
            size="lg"
          >
            <Trash2 className="mr-2 h-5 w-5" />
            Очистить
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="all" className="flex-grow">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-9">
            <TabsTrigger value="all">Все</TabsTrigger>
            {CATEGORIES.map(category => (
                <TabsTrigger key={category.id} value={category.id}>{category.label}</TabsTrigger>
            ))}
        </TabsList>
        <ScrollArea className="h-[calc(100%-4rem)] mt-4">
        <TabsContent value="all">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {ALL_ITEMS.map((item) => (
                    <IconCard
                        key={item.id}
                        label={item.label}
                        icon={item.icon}
                        onClick={() => addToPhrase(item)}
                    />
                ))}
            </div>
        </TabsContent>
        {CATEGORIES.map(category => (
            <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {category.items.map((item) => (
                        <IconCard
                            key={item.id}
                            label={item.label}
                            icon={item.icon}
                            onClick={() => addToPhrase(item)}
                        />
                    ))}
                </div>
            </TabsContent>
        ))}
        </ScrollArea>
      </Tabs>
    </div>
  );
}
