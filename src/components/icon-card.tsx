"use client";

import type { FC } from 'react';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface IconCardProps {
  label: string;
  icon?: LucideIcon;
  imageUrl?: string;
  imageHint?: string;
  onClick: () => void;
  isSelected?: boolean;
}

export const IconCard: FC<IconCardProps> = ({ label, icon: Icon, imageUrl, imageHint, onClick, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-center w-full h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-ring rounded-lg transition-all",
        isSelected && "ring-4 ring-primary"
      )}
      aria-label={label}
    >
      <Card className={cn(
        "h-full transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1",
        "flex flex-col items-center justify-center",
        isSelected ? "border-primary-foreground bg-primary/20 border-2" : ""
      )}>
        <CardContent className="flex flex-col items-center justify-center p-4 aspect-square">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={label}
              width={80}
              height={80}
              className="object-cover rounded-md mb-2"
              data-ai-hint={imageHint}
            />
          ) : Icon ? (
            <Icon className="w-20 h-20 text-muted-foreground mb-2" />
          ) : null}
          <p className="font-semibold text-foreground text-base md:text-lg">{label}</p>
        </CardContent>
      </Card>
    </button>
  );
};
