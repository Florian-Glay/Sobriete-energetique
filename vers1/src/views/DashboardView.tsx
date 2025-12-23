import React from 'react';
import { Leaf, Zap, Droplets, Monitor } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const DashboardView: React.FC = () => {
  const score = 78;
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];
  const COLORS = ['#22c55e', '#f3f4f6'];

  return (
    <div className="flex flex-col gap-6 px-6 pt-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Bonjour,</h1>
        <p className="text-gray-500 text-sm">Voici votre bilan énergétique du jour</p>
      </header>

      {/* Score Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
        <h2 className="text-gray-900 font-semibold mb-2">Score de Sobriété</h2>
        
        <div className="relative w-48 h-48 flex items-center justify-center">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={180}
                endAngle={0}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-4">
            <span className="text-4xl font-bold text-gray-900">{score}</span>
            <span className="block text-xs text-gray-400 font-medium">/100</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium mt-[-40px]">
            <Leaf size={12} />
            Excellent
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-2xl flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Zap size={16} />
            </div>
            <div>
                <span className="text-xs text-gray-500 block">Élec.</span>
                <span className="text-lg font-bold text-gray-900">12.4 <span className="text-xs font-normal text-gray-500">kWh</span></span>
            </div>
        </div>
        <div className="bg-cyan-50 p-4 rounded-2xl flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                <Droplets size={16} />
            </div>
             <div>
                <span className="text-xs text-gray-500 block">Eau</span>
                <span className="text-lg font-bold text-gray-900">140 <span className="text-xs font-normal text-gray-500">L</span></span>
            </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-2xl flex flex-col gap-2 col-span-2">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <Monitor size={16} />
                </div>
                <div>
                    <span className="text-xs text-gray-500 block">Numérique</span>
                    <span className="text-lg font-bold text-gray-900">4h 12m <span className="text-xs font-normal text-gray-500">d'écran</span></span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
