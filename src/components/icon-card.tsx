"use client";

import type { FC } from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface IconCardProps {
  label: string;
  icon?: LucideIcon;
  iconName?: string;
  imageUrl?: string;
  onClick: () => void;
  isSelected?: boolean;
  className?: string;
}

export const IconCard: FC<IconCardProps> = ({ label, icon, iconName, imageUrl, onClick, isSelected, className }) => {
  const Icon = icon || (iconName ? (LucideIcons as any)[iconName] : null);

  return (
    <button
      onClick={onClick}
      className={cn(
        "text-center w-full h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-ring rounded-lg transition-all",
        isSelected && "ring-4 ring-primary",
        className
      )}
      aria-label={label}
    >
      <Card className={cn(
        "h-full transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1",
        "flex flex-col items-center justify-center",
        isSelected ? "border-primary-foreground bg-primary/20 border-2" : "",
        className
      )}>
        <CardContent className="flex flex-col items-center justify-center p-4 aspect-square w-full h-full">
          {imageUrl ? (
            <div className="w-20 h-20 mb-2 relative overflow-hidden rounded-md">
                <img src={imageUrl} alt={label} className="object-cover w-full h-full" />
            </div>
          ) : Icon && (typeof Icon === 'function' || (Icon as any).render) ? (
            <Icon className="w-20 h-20 text-muted-foreground mb-2" />
          ) : null}
          <p className="font-semibold text-foreground text-base md:text-lg">{label}</p>
        </CardContent>
      </Card>
    </button>
  );
};
