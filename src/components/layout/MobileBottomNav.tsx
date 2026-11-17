'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export function MobileBottomNav({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const pathname = usePathname();
  const { totalItems, openCartDrawer } = useCart();
  const { isAuthenticated } = useAuth();

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Categories',
      href: '/categories',
      icon: Grid,
      isActive: pathname.startsWith('/categories') || pathname.startsWith('/category'),
    },
    {
      label: 'Cart',
      href: '#',
      icon: ShoppingBag,
      onClick: openCartDrawer,
      badge: totalItems > 0 ? totalItems : null,
      isActive: pathname === '/cart',
    },
    {
      label: 'Account',
      href: isAuthenticated ? '/account' : '#',
      icon: User,
      onClick: !isAuthenticated && onOpenAuth ? onOpenAuth : undefined,
      isActive: pathname.startsWith('/account') || pathname.startsWith('/login') || pathname.startsWith('/register'),
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#11160c]/95 backdrop-blur-md border-t border-slate-200/90 dark:border-[#222818] shadow-[0_-4px_12px_rgba(0,0,0,0.06)] py-1.5 px-4 transition-colors">
      <div className="grid grid-cols-4 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <div
              className={`flex flex-col items-center justify-center py-1 transition-colors select-none ${
                item.isActive ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.badge !== null && item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 bg-brand-600 text-white font-mono text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </div>
          );

          if (item.onClick) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className="focus:outline-none"
              >
                {content}
              </button>
            );
          }

          return (
            <Link key={item.label} href={item.href}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
