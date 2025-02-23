'use client';

import { MessageSquare, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const sidebarItems = [
  { name: 'Chat', href: '/', icon: MessageSquare },
  { name: 'View', href: '/view', icon: Calendar },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-card border-r">
      <div className="p-6">
        <Image src="/images/spectra-icon.png" alt="Spectra Logo" width={100} height={100} />
        <h1 className="text-2xl font-bold text-primary">Spectra</h1>
      </div>
      <nav className="space-y-2 px-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}