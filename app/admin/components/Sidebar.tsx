'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', path: '/admin', icon: '📊' },
  { name: 'Leads', path: '/admin/leads', icon: '👥' },
  { name: 'Analytics', path: '/admin/analytics', icon: '📈' },
  { name: 'Newsletter', path: '/admin/newsletter', icon: '📧' },
  { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-zinc-900 border-r border-zinc-800 min-h-screen flex flex-col transition-all duration-300`}>
      {/* Logo/Brand */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">Admin</h1>
              <p className="text-xs text-zinc-400">Dashboard</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-green-600 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span className="font-medium">{item.name}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:bg-red-600 hover:text-white transition-colors"
        >
          <span className="text-xl">🚪</span>
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}
