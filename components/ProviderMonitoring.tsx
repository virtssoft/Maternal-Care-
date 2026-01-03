
import React, { useState } from 'react';
import { Search, Filter, User, ChevronRight, AlertCircle, Plus } from 'lucide-react';
import { MOCK_PATIENTS } from '../constants';
import { Patient } from '../types';

interface ProviderMonitoringProps {
  onSelectPatient: (patient: Patient) => void;
}

export const ProviderMonitoring: React.FC<ProviderMonitoringProps> = ({ onSelectPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Mes Patientes</h1>
        <button className="p-2 bg-rose-500 text-white rounded-xl shadow-lg hover:bg-rose-600 transition-colors">
          <Plus size={24} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
        <input
          type="text"
          placeholder="Rechercher une patiente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 shadow-sm outline-none focus:ring-2 focus:ring-rose-500 transition-all font-medium"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-gray-50 text-gray-500 rounded-lg">
          <Filter size={18} />
        </button>
      </div>

      {/* Risk Summary Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
        {['Tous', 'Haut Risque', 'Suivi Normal', 'En Retard'].map((tag, i) => (
          <button 
            key={tag}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              i === 0 ? 'bg-rose-500 border-rose-500 text-white shadow-md' : 'bg-white border-gray-100 text-gray-500'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Patient List */}
      <div className="space-y-3">
        {filteredPatients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className="w-full bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4 hover:border-rose-200 transition-all text-left group active:scale-[0.99]"
          >
            <div className="relative">
              <img src={patient.photo} alt={patient.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
              {patient.riskLevel === 'high' && (
                <div className="absolute -top-1 -right-1 bg-rose-500 text-white p-1 rounded-full border-2 border-white">
                  <AlertCircle size={10} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800 text-base">{patient.name}</h3>
                <span className="text-[10px] text-gray-400 font-bold uppercase">sem. {patient.pregnancyWeek}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Dernier examen : {patient.lastVisit}</p>
              <div className="flex items-center mt-2 space-x-3">
                <span className={`text-[10px] font-black uppercase tracking-tighter ${
                  patient.riskLevel === 'high' ? 'text-rose-500' : 'text-green-500'
                }`}>
                  {patient.riskLevel === 'high' ? 'Critique' : 'Stable'}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-200" />
                <span className="text-[10px] font-bold text-gray-400">{patient.age} ans</span>
              </div>
            </div>
            <div className="text-gray-300 group-hover:text-rose-400 transition-colors">
              <ChevronRight size={20} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
