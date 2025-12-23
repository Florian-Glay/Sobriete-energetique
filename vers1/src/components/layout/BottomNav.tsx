import React from 'react';
import { LayoutDashboard, BarChart3, Lightbulb, User } from 'lucide-react';

export type ViewType = 'dashboard' | 'consumption' | 'advice' | 'profile';

interface BottomNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Accueil', icon: LayoutDashboard },
    { id: 'consumption', label: 'Conso', icon: BarChart3 },
    { id: 'advice', label: 'Conseils', icon: Lightbulb },
    { id: 'profile', label: 'Profil', icon: User },
  ] as const;

  return (
    <div 
      className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex justify-between items-center z-40"
      style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
    >
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? 'text-blue-600 scale-105' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon
              size={24}
              strokeWidth={isActive ? 2.5 : 2}
              className={`transition-all duration-300 ${isActive ? 'drop-shadow-sm' : ''}`}
            />
            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
