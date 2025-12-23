import React from 'react';
import { Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

export const AdviceView: React.FC = () => {
  const tips = [
    {
      id: 1,
      title: 'Éteindre les appareils en veille',
      category: 'Électricité',
      difficulty: 'Facile',
      impact: 'High',
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      id: 2,
      title: 'Privilégier le mode Éco du lave-linge',
      category: 'Eau',
      difficulty: 'Moyen',
      impact: 'Medium',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 3,
      title: 'Réduire la luminosité de l\'écran',
      category: 'Numérique',
      difficulty: 'Facile',
      impact: 'Low',
      color: 'bg-purple-100 text-purple-700',
    },
     {
      id: 4,
      title: 'Dégivrer le congélateur',
      category: 'Électricité',
      difficulty: 'Difficile',
      impact: 'High',
      color: 'bg-yellow-100 text-yellow-700',
    },
  ];

  return (
    <div className="flex flex-col gap-6 px-6 pt-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Conseils</h1>
        <p className="text-gray-500 text-sm">Optimisez votre impact</p>
      </header>

      {/* Hero Tip */}
      <div className="bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full filter blur-[60px] opacity-20 transform translate-x-10 -translate-y-10"></div>
        
        <div className="relative z-10">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                <Lightbulb size={20} className="text-yellow-300" />
            </div>
            <h3 className="text-lg font-bold mb-2">Le saviez-vous ?</h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Baisser le chauffage de seulement 1°C permet de réduire la consommation d'énergie de 7%.
            </p>
            <button className="text-xs font-semibold bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                En savoir plus
            </button>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-gray-900 mt-2">Recommandations</h3>

      <div className="flex flex-col gap-3">
        {tips.map((tip) => (
            <div key={tip.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-gray-200 transition-all">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tip.color}`}>
                            {tip.category}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">{tip.difficulty}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {tip.title}
                    </span>
                </div>
                <button className="text-gray-300 hover:text-green-500 transition-colors">
                    <CheckCircle2 size={24} />
                </button>
            </div>
        ))}
      </div>
      
       <button className="w-full py-3 rounded-xl border border-dashed border-gray-300 text-gray-400 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2">
            Voir plus de conseils <ArrowRight size={16} />
       </button>
    </div>
  );
};
