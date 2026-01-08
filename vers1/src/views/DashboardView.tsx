import React, { useEffect, useMemo, useState } from 'react';
import { Leaf, Flame, Settings2, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const DashboardView: React.FC = () => {
  const score = 78;

  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];
  const COLORS = ['#22c55e', '#f3f4f6'];

  // ---------------- GAZ (jauge 0% -> 200%) ----------------
  const gasTodayKwh = 7.4; // exemple conso du jour
  const DEFAULT_LIMIT = 12; // 100% = 12 kWh (limite)
  const [gasLimitKwh, setGasLimitKwh] = useState<number>(DEFAULT_LIMIT);

  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [limitDraft, setLimitDraft] = useState<string>(String(DEFAULT_LIMIT));

  // Charger la limite depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gasLimitKwh');
    if (saved) {
      const n = Number(saved);
      if (Number.isFinite(n) && n > 0) setGasLimitKwh(n);
    }
  }, []);

  // Sync draft à l'ouverture
  useEffect(() => {
    if (isLimitModalOpen) setLimitDraft(String(gasLimitKwh));
  }, [isLimitModalOpen, gasLimitKwh]);

  const gauge = useMemo(() => {
    const safeLimit = Math.max(0.0001, gasLimitKwh);
    const percent = (gasTodayKwh / safeLimit) * 100; // 0..∞
    const percentClamped = Math.max(0, Math.min(200, percent)); // 0..200
    const fillWidth = (percentClamped / 200) * 100; // largeur sur 0..100%

    const colorClass =
      percent > 100
        ? 'bg-black'
        : percent >= 75
          ? 'bg-red-500'
          : percent >= 50
            ? 'bg-orange-500'
            : 'bg-green-500';

    const badgeClass =
      percent > 100
        ? 'bg-black text-white'
        : percent >= 75
          ? 'bg-red-50 text-red-700'
          : percent >= 50
            ? 'bg-orange-50 text-orange-700'
            : 'bg-green-50 text-green-700';

    const statusText =
      percent > 100
        ? `Dépassement +${(gasTodayKwh - safeLimit).toFixed(1)} kWh`
        : `marge ${(safeLimit - gasTodayKwh).toFixed(1)} kWh`;

    return { percent, fillWidth, colorClass, badgeClass, statusText };
  }, [gasTodayKwh, gasLimitKwh]);

  function saveLimit() {
    const n = Number(limitDraft.replace(',', '.'));
    if (!Number.isFinite(n) || n <= 0) return;
    setGasLimitKwh(n);
    localStorage.setItem('gasLimitKwh', String(n));
    setIsLimitModalOpen(false);
  }

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

      {/* Gaz */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-50 p-4 rounded-2xl flex flex-col gap-3 col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Flame size={16} />
            </div>
            <div className="flex-1">
              <span className="text-xs text-gray-500 block">Gaz</span>
              <span className="text-lg font-bold text-gray-900">
                4h 12m <span className="text-xs font-normal text-gray-500">de chauffage</span>
              </span>
            </div>
          </div>

          {/* Nouvelle jauge 0% -> 200% + bouton modifier limite */}
          <div className="bg-white/70 border border-white/80 rounded-2xl p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">
                  Limite gaz : {gasLimitKwh} kWh
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {gasTodayKwh} kWh{' '}
                  <span className="text-gray-400 font-normal">
                   : {Math.round(gauge.percent)}%
                  </span>
                </span>
              </div>

              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${gauge.badgeClass}`}>
                {gauge.statusText}
              </span>
            </div>

            <div className="mt-3">
              <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                {/* Fill */}
                <div
                  className={`h-full ${gauge.colorClass} rounded-full transition-all duration-500`}
                  style={{ width: `${gauge.fillWidth}%` }}
                />

                {/* Graduations 0 / 50 / 100 / 150 / 200 */}
                {[0, 25, 50, 75, 100].map((left, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 w-[2px] bg-white/80"
                    style={{ left: `${left}%` }}
                  />
                ))}
              </div>

              <div className="mt-2 flex justify-between text-[11px] text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
                <span>150%</span>
                <span>200%</span>
              </div>

              <button
                type="button"
                onClick={() => setIsLimitModalOpen(true)}
                className="mt-3 w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-2 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Settings2 size={16} />
                Modifier la limite
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal modifier limite */}
      {isLimitModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setIsLimitModalOpen(false)} />

          <div className="absolute left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-xl border border-gray-100">
            <div className="p-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Modifier la limite gaz</h3>
                <p className="text-sm text-gray-500">Définissez le seuil correspondant à 100%.</p>
              </div>
              <button
                type="button"
                className="p-2 rounded-xl hover:bg-gray-100"
                onClick={() => setIsLimitModalOpen(false)}
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-5 pb-5">
              <label className="text-xs font-semibold text-gray-700">Limite (kWh / jour)</label>
              <input
                value={limitDraft}
                onChange={(e) => setLimitDraft(e.target.value)}
                inputMode="decimal"
                placeholder="Ex: 12"
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-purple-200"
              />

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsLimitModalOpen(false)}
                  className="flex-1 rounded-2xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={saveLimit}
                  className="flex-1 rounded-2xl bg-purple-600 py-3 text-sm font-semibold text-white hover:bg-purple-700"
                >
                  Enregistrer
                </button>
              </div>

              <p className="mt-3 text-xs text-gray-400">
                La jauge va de 0% à 200%. 100% correspond à la limite que vous définissez.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
