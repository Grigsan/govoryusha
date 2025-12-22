"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Grid3x3, MessageSquarePlus, FolderPlus, MessageCircleHeart, SunMoon, UserCog } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/', label: 'Доски', icon: Grid3x3 },
  { href: '/builder', label: 'Конструктор', icon: MessageSquarePlus },
  { href: '/editor', label: 'Редактор', icon: FolderPlus },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [highContrast, setHighContrast] = useState(false);
  const [adultMode, setAdultMode] = useState(false);

  useEffect(() => {
    const isHighContrast = document.documentElement.classList.contains('high-contrast');
    const isAdultMode = document.documentElement.classList.contains('adult-mode');
    setHighContrast(isHighContrast);
    setAdultMode(isAdultMode);
  }, []);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    if (newValue) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const toggleAdultMode = () => {
    const newValue = !adultMode;
    setAdultMode(newValue);
    if (newValue) {
      document.documentElement.classList.add('adult-mode');
    } else {
      document.documentElement.classList.remove('adult-mode');
    }
  };

  return (
    <>
      <SidebarHeader className="flex items-center gap-2">
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                    <MessageCircleHeart className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">Говоруша</h1>
            </div>
            <SidebarTrigger className="md:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
                className="hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 active:scale-95 transition-all"
              >
                <Link href={item.href} onClick={(e) => {
                  e.stopPropagation();
                }}>
                  <item.icon className="w-5 h-5" />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="mt-auto px-4 py-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SunMoon className="w-4 h-4" />
                    <Label htmlFor="high-contrast" className="text-xs">Контраст</Label>
                </div>
                <Switch 
                    id="high-contrast" 
                    checked={highContrast}
                    onCheckedChange={toggleHighContrast}
                />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <UserCog className="w-4 h-4" />
                    <Label htmlFor="adult-mode" className="text-xs">Взрослый режим</Label>
                </div>
                <Switch 
                    id="adult-mode" 
                    checked={adultMode}
                    onCheckedChange={toggleAdultMode}
                />
            </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="text-xs text-muted-foreground p-2 text-center group-data-[collapsible=icon]:hidden">
            <p>Сделано с ❤️ для особенных детей</p>
        </div>
      </SidebarFooter>
    </>
  );
}
