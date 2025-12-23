import React from 'react';
import { User, Settings, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const menuItems = [
    { icon: Bell, label: 'Notifications', value: 'On' },
    { icon: Shield, label: 'Confidentialité', value: '' },
    { icon: Settings, label: 'Préférences', value: '' },
  ];

  return (
    <div className="flex flex-col gap-6 px-6 pt-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
        <p className="text-gray-500 text-sm">Gérez vos paramètres</p>
      </header>

      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-white shadow-lg">
            <User size={32} />
        </div>
        <div>
            <h2 className="text-lg font-bold text-gray-900">Alex Martin</h2>
            <p className="text-xs text-gray-500">alex.martin@example.com</p>
            <span className="inline-block mt-2 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                Membre Premium
            </span>
        </div>
      </div>

      {/* Settings List */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-900 mt-2">Général</h3>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {menuItems.map((item, index) => (
                <div key={index} className="p-4 flex items-center justify-between border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                            <item.icon size={16} />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <span className="text-xs text-gray-400">{item.value}</span>
                         <ChevronRight size={16} className="text-gray-300" />
                    </div>
                </div>
            ))}
        </div>
      </div>

       <button className="flex items-center justify-center gap-2 w-full py-4 text-red-500 font-medium text-sm hover:bg-red-50 rounded-xl transition-colors mt-4">
            <LogOut size={18} />
            Déconnexion
       </button>
       
       <p className="text-center text-[10px] text-gray-400 mt-4">
            Version 1.0.2 • Build 20231025
       </p>
    </div>
  );
};
