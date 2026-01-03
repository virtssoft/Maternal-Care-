
import React, { useEffect, useState } from 'react';
import { MOCK_PATIENTS } from '../constants';
import { Users, Plus, Search, ChevronRight, Activity, Bell, MapPin, Clipboard } from 'lucide-react';
import { getProviderDashboardSummary } from '../services/geminiService';

export const ProviderHome: React.FC = () => {
  const [summary, setSummary] = useState<string>('Analyse clinique en cours...');

  useEffect(() => {
    getProviderDashboardSummary(124, 3).then(setSummary);
  }, []);

  const stats = [
    { label: 'Suivies aujourd\'hui', value: '18', icon: Users, color: 'bg-blue-50 text-blue-500' },
    { label: 'Accouchements en cours', value: '03', icon: Activity, color: 'bg-orange-50 text-orange-500', alert: true },
    { label: 'Alertes actives', value: '05', icon: Bell, color: 'bg-red-50 text-red-500', alert: true },
    { label: 'Références envoyées', value: '02', icon: MapPin, color: 'bg-[#7BAE7F]/10 text-[#7BAE7F]' },
  ];

  return (
    <div className="pb-32 px-6 pt-6 max-w-7xl mx-auto">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Tableau de Bord</h1>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mt-1">Personnel de Santé</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-[#7BAE7F] text-white px-6 py-4 rounded-[20px] font-black shadow-lg shadow-[#7BAE7F]/20 active:scale-95 transition-all">
            <Plus size={20} strokeWidth={3} />
            <span className="text-sm uppercase tracking-wider">Nouvelle Patiente</span>
          </button>
          <button className="p-4 bg-white border border-gray-100 rounded-[20px] text-gray-400 shadow-sm">
            <Search size={24} />
          </button>
        </div>
      </div>

      {/* IA Insight - Full width */}
      <section className="mb-10">
        <div className="bg-gray-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-16 h-16 bg-[#7BAE7F]/20 rounded-2xl flex items-center justify-center text-[#7BAE7F] flex-shrink-0">
                 <Clipboard size={32} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2 block">Assistant Clinique IA</span>
                <p className="text-lg md:text-xl font-bold leading-relaxed italic text-gray-100">
                  "{summary}"
                </p>
              </div>
           </div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#7BAE7F]/10 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Stats Grid - Responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative group hover:border-[#7BAE7F] transition-all">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${s.color}`}>
              <s.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">{s.label}</p>
            <p className="text-3xl font-black text-gray-900">{s.value}</p>
            {s.alert && <div className="absolute top-6 right-6 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
          </div>
        ))}
      </div>

      {/* Main Content Areas - Two columns on Desktop */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Patients List */}
        <section className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Dernières Consultations</h2>
            <button className="text-[#7BAE7F] text-xs font-black uppercase tracking-widest">Voir Tout</button>
          </div>
          <div className="space-y-4">
            {MOCK_PATIENTS.map((p) => (
              <div key={p.id} className="bg-white p-5 rounded-[32px] border border-gray-100 flex items-center hover:shadow-md transition-all group">
                <img src={p.photo} alt={p.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-gray-50 mr-4" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-base">{p.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sem. {p.pregnancyWeek}</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${p.riskLevel === 'high' ? 'text-red-500' : 'text-[#7BAE7F]'}`}>
                      Risque {p.riskLevel === 'high' ? 'Élevé' : 'Normal'}
                    </span>
                  </div>
                </div>
                <button className="p-3 bg-gray-50 text-gray-300 rounded-2xl group-hover:bg-[#7BAE7F] group-hover:text-white transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Sidebar widgets (like Births in progress) */}
        <section className="space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-6 flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Partogrammes Actifs</span>
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="font-bold text-gray-800 text-sm">Fatouma B.</p>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-[10px] font-black text-orange-600 uppercase">Dilatation 6cm</span>
                  <span className="text-[10px] font-bold text-gray-400 italic">Dernier TV: 14:30</span>
                </div>
              </div>
              <button className="w-full py-3 border-2 border-dashed border-gray-100 rounded-2xl text-gray-300 text-[10px] font-black uppercase tracking-widest hover:border-[#7BAE7F] hover:text-[#7BAE7F] transition-all">
                Démarrer Partogramme
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
