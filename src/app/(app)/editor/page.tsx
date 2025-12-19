"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { IconCard } from '@/components/icon-card';
import { PlusCircle, Mic } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type { CardItem } from '@/lib/data';

const formSchema = z.object({
  label: z.string().min(2, { message: 'Название должно быть не менее 2 символов.' }),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const initialCustomCards: CardItem[] = [];

export default function ContentEditorPage() {
  const [customCards, setCustomCards] = useState<CardItem[]>(initialCustomCards);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: '',
      image: undefined,
    },
  });

  function onSubmit(values: FormValues) {
    // This logic is flawed as it only works with image URLs
    // For now, we'll just create a card without an image/icon
    const newCard: CardItem = {
      id: `custom-${Date.now()}`,
      label: values.label,
    };
    setCustomCards(prev => [...prev, newCard]);
    toast({
      title: "Карточка добавлена!",
      description: `Новая карточка "${values.label}" успешно создана.`,
    });
    form.reset();
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Редактор контента</h1>
        <p className="text-muted-foreground">Добавляйте свои собственные картинки и аудиозаписи.</p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Добавить новую карточку</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название</FormLabel>
                      <FormControl>
                        <Input placeholder="Например, 'Моя собака Рекс'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Изображение (неактивно)</FormLabel>
                      <FormControl>
                        <Input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => onChange(e.target.files)}
                            {...rest}
                            disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                    <Label>Аудио</Label>
                    <Button type="button" variant="outline" className="w-full">
                        <Mic className="mr-2 h-4 w-4" />
                        Записать аудио (неактивно)
                    </Button>
                    <p className="text-xs text-muted-foreground">Функция записи аудио будет добавлена в будущем.</p>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Добавить карточку
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Мои карточки</CardTitle>
          </CardHeader>
          <CardContent>
            {customCards.length === 0 ? (
              <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Здесь появятся ваши карточки</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {customCards.map(card => (
                  <IconCard
                    key={card.id}
                    label={card.label}
                    onClick={() => {
                        toast({ title: "Карточка нажата!", description: card.label });
                    }}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
