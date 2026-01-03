
import React, { useEffect, useState } from 'react';
import { Search, Bell, MapPin, Star, ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react';
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
    <div className="pb-32 page-transition">
      {/* Top Profile Bar */}
      <div className="px-6 pt-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm overflow-hidden bg-white">
            <img src="https://i.pravatar.cc/150?u=mariam" alt="Mariam" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400">Bonjour !</p>
            <h1 className="text-lg font-black text-gray-800 tracking-tight">Mariam Sidibe</h1>
          </div>
        </div>
        <button className="p-3 bg-white rounded-2xl shadow-sm text-gray-400">
          <Bell size={20} />
        </button>
      </div>

      {/* Search/Location Bar */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-[24px] p-2 flex items-center shadow-sm border border-gray-50">
          <div className="flex items-center flex-1 px-4 space-x-3">
             <MapPin size={18} className="text-[#7BAE7F]" />
             <input 
               type="text" 
               placeholder="Trouver un centre de santé..." 
               className="bg-transparent border-none outline-none text-sm font-medium w-full text-gray-600 placeholder:text-gray-300"
             />
          </div>
          <button className="p-3 bg-[#7BAE7F] text-white rounded-[18px]">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Featured AI Section (Replacing "Top Doctors") */}
      <div className="mt-8">
        <div className="px-6 flex justify-between items-center mb-4">
          <h2 className="text-xl font-black text-gray-800">Ma Grossesse</h2>
          <button className="text-[#7BAE7F] text-sm font-bold">Détails</button>
        </div>
        
        <div className="px-6">
          <div className="bg-[#7BAE7F] rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl shadow-[#7BAE7F]/20">
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                   <Sparkles size={16} className="text-white/80" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Semaine {week}</span>
                </div>
                <h3 className="text-2xl font-black leading-tight mb-4">Votre bébé a la taille d'une mangue !</h3>
                <div className="flex space-x-2">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter">Croissance Active</div>
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter">4.9 ★</div>
                </div>
             </div>
             {/* Abstract design element */}
             <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Upcoming Section (Like the cards in the image) */}
      <div className="mt-10">
        <div className="px-6 flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-gray-800">Prochains RDV</h2>
          <button className="text-gray-400 text-sm font-bold">Tout voir</button>
        </div>

        {/* Filter Chips */}
        <div className="flex space-x-3 px-6 overflow-x-auto no-scrollbar pb-2">
          {['Tous', 'Consultations', 'Examens', 'Vaccins'].map((cat, i) => (
            <button key={cat} className={`px-6 py-3 rounded-[18px] text-xs font-bold whitespace-nowrap transition-all ${
              i === 0 ? 'bg-[#7BAE7F] text-white shadow-lg shadow-[#7BAE7F]/20' : 'bg-white text-gray-400 border border-gray-100'
            }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Cards Layout */}
        <div className="flex space-x-4 px-6 mt-6 overflow-x-auto no-scrollbar">
          {[1, 2].map((i) => (
            <div key={i} className="min-w-[280px] bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm relative group hover:border-[#7BAE7F] transition-all">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#7BAE7F]/10 flex items-center justify-center text-[#7BAE7F]">
                   <Star size={24} fill="currentColor" />
                </div>
                <div>
                   <h4 className="font-bold text-gray-800">CPN 3 - Trimestre 2</h4>
                   <p className="text-xs text-gray-400 font-medium">Hôpital Gabriel Touré</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                   <p className="text-xs font-bold text-[#7BAE7F]">14 AVRIL, 09:00</p>
                   <p className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter mt-1">Dr. Aminata Diallo</p>
                </div>
                <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-[#7BAE7F] group-hover:text-white transition-all">
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
