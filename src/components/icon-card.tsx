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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "text-center w-full h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-ring rounded-xl transition-all cursor-pointer",
        isSelected && "ring-4 ring-primary",
        className
      )}
      aria-label={label}
      type="button"
    >
      <Card className={cn(
        "h-full transition-all duration-300 ease-in-out",
        "flex flex-col items-center justify-center",
        "bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50",
        "border-2 border-blue-200/60 shadow-md",
        "hover:shadow-2xl hover:-translate-y-2 hover:scale-105",
        "active:scale-95",
        isSelected ? "border-primary bg-primary/30 shadow-xl ring-4 ring-primary/50" : "",
        className
      )}>
        <CardContent className="flex flex-col items-center justify-center p-6 aspect-square w-full h-full gap-3">
          {imageUrl ? (
            <div className="w-24 h-24 mb-2 relative overflow-hidden rounded-xl shadow-lg">
                <img src={imageUrl} alt={label} className="object-cover w-full h-full" />
            </div>
          ) : Icon && (typeof Icon === 'function' || (Icon as any).render) ? (
            <div className="w-24 h-24 mb-2 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 p-4 shadow-lg">
              <Icon className="w-16 h-16 text-blue-600" strokeWidth={2} />
            </div>
          ) : null}
          <p className="font-bold text-foreground text-base md:text-lg drop-shadow-sm">{label}</p>
        </CardContent>
      </Card>
    </button>
  );
};
