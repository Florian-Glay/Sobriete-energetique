import React, { useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';

type Tab = 'elec' | 'water' | 'digital';

export const ConsumptionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('elec');

  const dataElec = [
    { day: 'L', val: 12 },
    { day: 'M', val: 18 },
    { day: 'M', val: 10 },
    { day: 'J', val: 15 },
    { day: 'V', val: 14 },
    { day: 'S', val: 22 },
    { day: 'D', val: 19 },
  ];

  const dataWater = [
    { day: 'L', val: 120 },
    { day: 'M', val: 132 },
    { day: 'M', val: 101 },
    { day: 'J', val: 154 },
    { day: 'V', val: 140 },
    { day: 'S', val: 190 },
    { day: 'D', val: 170 },
  ];

  const tabs = [
    { id: 'elec', label: 'Électricité' },
    { id: 'water', label: 'Eau' },
    { id: 'digital', label: 'Numérique' },
  ] as const;

  return (
    <div className="flex flex-col gap-6 px-6 pt-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Consommation</h1>
        <p className="text-gray-500 text-sm">Analysez vos habitudes</p>
      </header>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
              activeTab === tab.id ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-64">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
            {activeTab === 'elec' ? 'Cette semaine (kWh)' : activeTab === 'water' ? 'Cette semaine (L)' : 'Temps d\'écran (h)'}
        </h3>
        <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'elec' ? (
                 <BarChart data={dataElec} margin={{ top: 10, right: 10, left: 10, bottom: 15 }}>
                    <Bar dataKey="val" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </BarChart>
            ) : (
                <AreaChart data={dataWater} margin={{ top: 10, right: 10, left: 10, bottom: 15 }}>
                    <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                    <Tooltip cursor={{stroke: '#06b6d4', strokeWidth: 1}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="val" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
            )}
         
        </ResponsiveContainer>
      </div>

      {/* History List */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-900">Historique récent</h3>
        {[1, 2, 3].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-50">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">Mardi 24 Oct.</span>
                    <span className="text-xs text-gray-400">Consommation journalière</span>
                </div>
                <span className="font-bold text-gray-900">{12 + i}.5 kWh</span>
            </div>
        ))}
      </div>
    </div>
  );
};
