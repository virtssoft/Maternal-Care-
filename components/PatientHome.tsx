
import React, { useEffect, useState } from 'react';
import { User, Heart, Calendar, Baby, Activity, Info, ChevronRight, Sparkles } from 'lucide-react';
import { getPregnancyTips } from '../services/geminiService';

export const PatientHome: React.FC<{ week: number }> = ({ week }) => {
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPregnancyTips(week).then(data => {
      setTips(data);
      setLoading(false);
    });
  }, [week]);

  return (
    <div className="space-y-6 pb-20 p-4 animate-in fade-in duration-500">
      <header className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
          <img src="https://picsum.photos/seed/patient/200" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Bonjour, Mariam</h1>
          <p className="text-rose-500 text-sm font-medium">Semaine {week} • Deuxième Trimestre</p>
        </div>
      </header>

      {/* Main Status Circle */}
      <div className="relative flex justify-center py-4">
        <div className="w-48 h-48 rounded-full border-[10px] border-rose-100 flex flex-col items-center justify-center text-center bg-white shadow-inner relative z-10">
           <Baby size={48} className="text-rose-500 mb-2" />
           <p className="text-3xl font-black text-gray-800">92</p>
           <p className="text-[10px] uppercase font-bold text-gray-400">Jours restants</p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-2 border-dashed border-rose-200 rounded-full animate-[spin_20s_linear_infinite]" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-rose-50 p-4 rounded-2xl flex flex-col items-center text-center border border-rose-100">
          <div className="bg-white p-2 rounded-xl mb-3 shadow-sm text-rose-500">
            <Heart size={20} fill="currentColor" />
          </div>
          <span className="text-xs font-bold text-gray-700">Mes Signes Vitaux</span>
        </div>
        <div className="bg-rose-50 p-4 rounded-2xl flex flex-col items-center text-center border border-rose-100">
          <div className="bg-white p-2 rounded-xl mb-3 shadow-sm text-rose-500">
            <Calendar size={20} />
          </div>
          <span className="text-xs font-bold text-gray-700">Prochain RDV</span>
        </div>
      </div>

      {/* AI Tips Section */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-rose-400" size={20} />
            <h2 className="font-bold text-gray-800">Conseils Santé IA</h2>
          </div>
          <span className="text-[10px] text-gray-400 font-medium">Personnalisé pour sem. {week}</span>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex space-x-3 group">
                <div className="mt-1 w-2 h-2 rounded-full bg-rose-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">{tip.tip}</p>
                  <span className="text-[10px] uppercase font-bold text-rose-300">{tip.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Next Milestone Card */}
      <div className="bg-gradient-to-r from-rose-500 to-rose-400 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-xl">
             <Info size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-rose-100">Le saviez-vous ?</p>
            <p className="text-sm font-bold">Bébé a maintenant la taille d'une mangue !</p>
          </div>
        </div>
        <ChevronRight size={20} />
      </div>
    </div>
  );
};
