
import React, { useEffect, useState } from 'react';
import { MOCK_PATIENTS } from '../constants';
import { User, Users, AlertCircle, PlusCircle, Search, ArrowRight } from 'lucide-react';
import { getProviderDashboardSummary } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Lun', patients: 12 },
  { name: 'Mar', patients: 19 },
  { name: 'Mer', patients: 15 },
  { name: 'Jeu', patients: 22 },
  { name: 'Ven', patients: 30 },
];

export const ProviderHome: React.FC = () => {
  const [summary, setSummary] = useState<string>('Chargement de l\'aperçu IA...');

  useEffect(() => {
    getProviderDashboardSummary(124, 3).then(setSummary);
  }, []);

  return (
    <div className="space-y-6 pb-20 p-4 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bonjour, Dr. Aminata</h1>
          <p className="text-gray-500 text-sm">Prête pour les consultations du jour ?</p>
        </div>
        <button className="bg-rose-500 text-white p-3 rounded-full shadow-lg hover:bg-rose-600 transition-transform active:scale-95">
          <PlusCircle size={24} />
        </button>
      </header>

      {/* AI Summary Card */}
      <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-5 text-white shadow-xl">
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <Users size={18} />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider">Aperçu du Jour</span>
        </div>
        <p className="text-rose-50 font-medium leading-relaxed italic">
          "{summary}"
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Total Patientes</p>
          <p className="text-2xl font-bold text-gray-800">124</p>
          <div className="mt-2 text-green-500 text-[10px] font-bold">+5 cette semaine</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Alertes Actives</p>
          <p className="text-2xl font-bold text-rose-500">03</p>
          <div className="mt-2 text-rose-400 text-[10px] font-bold italic">Urgence requise</div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm h-64">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Volume de Consultations</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
            <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: '#fff5f5' }}
            />
            <Bar dataKey="patients" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 4 ? '#f43f5e' : '#fda4af'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Patient List Snippet */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-800">Patientes Critiques</h2>
          <button className="text-rose-500 text-sm font-semibold flex items-center">
            Voir tout <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
        <div className="space-y-3">
          {MOCK_PATIENTS.map((patient) => (
            <div key={patient.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center">
              <img src={patient.photo} alt={patient.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-sm">{patient.name}</h4>
                <p className="text-xs text-gray-500">{patient.pregnancyWeek} sem. • Dernier: {patient.lastVisit}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                patient.riskLevel === 'high' ? 'bg-rose-100 text-rose-600' :
                patient.riskLevel === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
              }`}>
                {patient.riskLevel}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
