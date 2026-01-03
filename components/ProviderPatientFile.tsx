
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Phone, Calendar, MapPin, Activity, ShieldAlert, FileText, ChevronRight, Stethoscope, Sparkles } from 'lucide-react';
import { getClinicalInsight } from '../services/geminiService';
import { Patient } from '../types';

interface ProviderPatientFileProps {
  patient: Patient;
  onBack: () => void;
}

export const ProviderPatientFile: React.FC<ProviderPatientFileProps> = ({ patient, onBack }) => {
  const [insight, setInsight] = useState<string>('Analyse clinique en cours...');

  useEffect(() => {
    getClinicalInsight({
      name: patient.name,
      week: patient.pregnancyWeek,
      bp: "12/8",
      risk: patient.riskLevel
    }).then(setInsight);
  }, [patient]);

  return (
    <div className="bg-gray-50 min-h-screen pb-24 animate-in slide-in-from-right duration-300">
      {/* Patient Header Card */}
      <div className="bg-white px-4 pt-4 pb-6 shadow-sm border-b border-gray-100">
        <button onClick={onBack} className="mb-4 p-2 -ml-2 hover:bg-rose-50 rounded-full text-gray-600 transition-colors">
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex items-start space-x-4">
          <img src={patient.photo} alt={patient.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-rose-100 shadow-sm" />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{patient.name}</h1>
            <p className="text-sm text-gray-500 font-medium">{patient.age} ans • Bamako, Mali</p>
            <div className="mt-2 flex space-x-2">
              <button className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-colors">
                <Phone size={18} />
              </button>
              <button className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-colors">
                <Calendar size={18} />
              </button>
              <button className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-colors">
                <MapPin size={18} />
              </button>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
            patient.riskLevel === 'high' ? 'bg-rose-500 text-white' : 'bg-green-500 text-white'
          }`}>
            Risque {patient.riskLevel === 'high' ? 'Élevé' : 'Faible'}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Terme Prévu</p>
          <p className="font-bold text-gray-800">12 Août 2024</p>
          <p className="text-[10px] text-rose-500 font-bold mt-1">Semaine {patient.pregnancyWeek}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Dernière TA</p>
          <p className="font-bold text-gray-800">12 / 8</p>
          <p className="text-[10px] text-green-500 font-bold mt-1">Stable</p>
        </div>
      </div>

      {/* AI Assistant Note */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={64} />
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="bg-rose-500 p-1.5 rounded-lg">
              <Stethoscope size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-300">Assistant Clinique IA</span>
          </div>
          <p className="text-sm font-medium leading-relaxed italic text-gray-100">
            "{insight}"
          </p>
        </div>
      </div>

      {/* Medical History Sections */}
      <div className="px-4 space-y-4">
        <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">Dossier Médical</h2>
        
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-xl"><FileText size={20} /></div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Antécédents</p>
                <p className="text-xs text-gray-400">G2P1, 1 Césarienne</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-50 text-amber-500 rounded-xl"><Activity size={20} /></div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Examens Labo</p>
                <p className="text-xs text-gray-400">GS: O+, VIH: Négatif</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-rose-50 text-rose-500 rounded-xl"><ShieldAlert size={20} /></div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Alertes Passées</p>
                <p className="text-xs text-gray-400">Aucune alerte majeure</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </button>
        </div>

        {/* Action Button */}
        <button className="w-full bg-rose-500 text-white py-4 rounded-2xl font-black shadow-lg shadow-rose-100 active:scale-[0.98] transition-all mt-4 flex items-center justify-center space-x-2">
          <span>Nouvelle Consultation (CPN)</span>
        </button>
      </div>
    </div>
  );
};
