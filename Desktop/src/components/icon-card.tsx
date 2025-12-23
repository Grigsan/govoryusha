"use client";

import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconCardProps {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  isSelected?: boolean;
  className?: string;
}

export const IconCard: FC<IconCardProps> = ({ 
  label, 
  icon: Icon, 
  onClick, 
  isSelected, 
  className 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full h-full",
        "flex flex-col items-center justify-center",
        "bg-white border-2 border-blue-300 rounded-xl",
        "shadow-lg hover:shadow-2xl",
        "transition-all duration-200 ease-in-out",
        "hover:-translate-y-1 hover:border-blue-500",
        "hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50",
        "active:scale-95",
        "focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2",
        "cursor-pointer",
        isSelected && "border-blue-500 bg-blue-50 ring-4 ring-blue-300",
        className
      )}
      aria-label={label}
      type="button"
      style={{ aspectRatio: '1' }}
    >
      <div className="flex flex-col items-center justify-center p-4 sm:p-6 w-full h-full gap-2">
        {Icon && (
          <div className="w-20 h-20 sm:w-24 sm:h-24 mb-2 flex items-center justify-center">
            <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600" strokeWidth={2.5} />
          </div>
        )}
        <p className="font-bold text-gray-800 text-sm sm:text-base md:text-lg text-center leading-tight">
          {label}
        </p>
      </div>
    </button>
  );
};
