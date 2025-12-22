"use client";

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { IconCard } from '@/components/icon-card';
import { PlusCircle, Mic, Trash2, StopCircle, Play, Sparkles, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type { CardItem } from '@/lib/data';
import { useCustomCards } from '@/hooks/use-custom-cards';
import { cn } from '@/lib/utils';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from '@/lib/data';

const formSchema = z.object({
  label: z.string().min(2, { message: 'Название должно быть не менее 2 символов.' }),
  image: z.any().optional(),
  iconName: z.string().optional(),
  categoryId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContentEditorPage() {
  const { customCards, addCard, removeCard } = useCustomCards();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [suggestedIcons, setSuggestedIcons] = useState<string[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSearchingIcons, setIsSearchingIcons] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: '',
      image: undefined,
      iconName: '',
      categoryId: 'my-cards',
    },
  });

  const generateWithAI = async () => {
    const currentLabel = form.getValues('label');
    if (!currentLabel) {
      toast({
        title: "Ошибка",
        description: "Введите примерное описание в поле 'Название', чтобы AI мог его улучшить.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentLabel }),
      });
      const data = await response.json();
      if (data.label) {
        form.setValue('label', data.label);
        toast({
          title: "Готово!",
          description: "AI предложил название для вашей карточки.",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Ошибка",
        description: "Не удалось связаться с AI.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const searchIcons = async () => {
    const label = form.getValues('label');
    if (!label) return;

    setIsSearchingIcons(true);
    try {
      const response = await fetch('/api/ai/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `Suggest 5 Lucide icon names for the object: "${label}". Return ONLY a JSON object like { "icons": ["Apple", "Pizza"] }. Use standard Lucide icon names (PascalCase).` 
        }),
      });
      const data = await response.json();
      const icons = data.icons || [];
      setSuggestedIcons(icons);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearchingIcons(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setSelectedIcon(null);
      };
      reader.readAsDataURL(file);
      form.setValue('image', file);
    }
  };

  const selectIcon = (name: string) => {
    setSelectedIcon(name);
    setPreviewUrl(null);
    form.setValue('iconName', name);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          setAudioUrl(reader.result as string);
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast({
        title: "Ошибка",
        description: "Не удалось получить доступ к микрофону.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playPreviewAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  function onSubmit(values: FormValues) {
    const newCard: CardItem = {
      id: `custom-${Date.now()}`,
      label: values.label,
      imageUrl: previewUrl || undefined,
      iconName: selectedIcon || undefined,
      audioUrl: audioUrl || undefined,
      categoryId: values.categoryId,
    };
    addCard(newCard);
    toast({
      title: "Карточка добавлена!",
      description: `Новая карточка "${values.label}" успешно создана.`,
    });
    form.reset();
    setPreviewUrl(null);
    setAudioUrl(null);
    setSelectedIcon(null);
    setSuggestedIcons([]);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Редактор контента</h1>
        <p className="text-muted-foreground">Добавляйте свои собственные картинки, иконки и аудиозаписи.</p>
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
                      <div className="flex items-center justify-between">
                        <FormLabel>Название</FormLabel>
                        <div className="flex gap-2">
                          <Button 
                            type="button" 
                            variant="secondary" 
                            size="sm" 
                            className="h-8 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
                            onClick={generateWithAI}
                            disabled={isGenerating}
                          >
                            <Sparkles className={cn("mr-2 h-4 w-4", isGenerating && "animate-spin")} />
                            AI Текст
                          </Button>
                          <Button 
                            type="button" 
                            variant="secondary" 
                            size="sm" 
                            className="h-8 bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200"
                            onClick={searchIcons}
                            disabled={isSearchingIcons}
                          >
                            <Search className={cn("mr-2 h-4 w-4", isSearchingIcons && "animate-spin")} />
                            Найти иконку
                          </Button>
                        </div>
                      </div>
                      <FormControl>
                        <Input placeholder="Например, 'Пицца' или 'Книга'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Категория (доска)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите доску" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="my-cards">Мои карточки (отдельно)</SelectItem>
                          {CATEGORIES.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {suggestedIcons.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Предложенные иконки:</Label>
                    <div className="flex flex-wrap gap-2">
                      {suggestedIcons.map(name => {
                        const Icon = (LucideIcons as any)[name];
                        if (!Icon) return null;
                        return (
                          <Button
                            key={name}
                            type="button"
                            variant={selectedIcon === name ? "default" : "outline"}
                            className="p-2 h-12 w-12"
                            onClick={() => selectIcon(name)}
                          >
                            <Icon className="h-6 w-6" />
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Изображение (если нет иконки)</Label>
                  <Input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                  />
                  {(previewUrl || selectedIcon) && (
                      <div className="mt-2 w-32 h-32 relative border rounded-lg overflow-hidden flex items-center justify-center bg-muted/30">
                          {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
                          ) : selectedIcon ? (
                            (() => {
                              const Icon = (LucideIcons as any)[selectedIcon];
                              return Icon ? <Icon className="w-16 h-16 text-muted-foreground" /> : null;
                            })()
                          ) : null}
                      </div>
                  )}
                </div>

                <div className="space-y-2">
                    <Label>Аудио</Label>
                    <div className="flex gap-2">
                        {!isRecording ? (
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="flex-grow"
                                onClick={startRecording}
                            >
                                <Mic className="mr-2 h-4 w-4" />
                                Записать голос
                            </Button>
                        ) : (
                            <Button 
                                type="button" 
                                variant="destructive" 
                                className="flex-grow animate-pulse"
                                onClick={stopRecording}
                            >
                                <StopCircle className="mr-2 h-4 w-4" />
                                Остановить запись...
                            </Button>
                        )}
                        {audioUrl && (
                            <Button 
                                type="button" 
                                variant="secondary" 
                                onClick={playPreviewAudio}
                            >
                                <Play className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    {audioUrl && <p className="text-xs text-green-600 font-medium">Голос записан!</p>}
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
                  <div key={card.id} className="relative group">
                    <IconCard
                      label={card.label}
                      imageUrl={card.imageUrl}
                      icon={card.icon}
                      iconName={card.iconName}
                      onClick={() => {
                        if (card.audioUrl) {
                            new Audio(card.audioUrl).play();
                        } else {
                            toast({ title: "Карточка нажата!", description: card.label });
                        }
                      }}
                    />
                    <div className="absolute top-1 left-1 bg-primary/80 text-[10px] px-1 rounded text-primary-foreground">
                        {CATEGORIES.find(c => c.id === card.categoryId)?.label || 'Мои'}
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeCard(card.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
