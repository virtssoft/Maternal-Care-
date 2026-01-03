
import React, { useState, useEffect } from 'react';
import { User, UserRole, NavTab, Patient } from './types';
import { MOCK_USERS } from './constants';
import { BottomNav, SideDrawer } from './components/Navigation';
import { ProviderHome } from './components/ProviderHome';
import { PatientHome } from './components/PatientHome';
import { PatientMonitoring } from './components/PatientMonitoring';
import { ProviderMonitoring } from './components/ProviderMonitoring';
import { ProviderPatientFile } from './components/ProviderPatientFile';
import { AlertsView } from './components/AlertsView';
import { LogIn, Menu as MenuIcon, Lock, HeartPulse } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === loginEmail) || MOCK_USERS[1];
      setCurrentUser(user as User);
      setIsLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
    setSelectedPatient(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F8FAF7] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-12 animate-in fade-in zoom-in duration-700">
          <div className="text-center">
            <div className="inline-block p-5 bg-white rounded-[32px] shadow-2xl shadow-[#7BAE7F]/10 mb-6">
              <HeartPulse className="text-[#7BAE7F] w-14 h-14" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">MATERNELLE+</h1>
            <p className="mt-2 text-gray-400 font-bold uppercase tracking-widest text-xs italic">Connecter le soin à la vie</p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="bg-white p-2 rounded-[28px] shadow-sm border border-gray-50 flex items-center px-6">
               <input
                 type="text"
                 required
                 value={loginEmail}
                 onChange={(e) => setLoginEmail(e.target.value)}
                 className="w-full py-4 bg-transparent outline-none font-bold text-gray-700 placeholder:text-gray-200"
                 placeholder="Identifiant ou Email"
               />
            </div>
            <div className="bg-white p-2 rounded-[28px] shadow-sm border border-gray-50 flex items-center px-6">
               <input
                 type="password"
                 required
                 className="w-full py-4 bg-transparent outline-none font-bold text-gray-700 placeholder:text-gray-200"
                 placeholder="Mot de passe"
               />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#7BAE7F] hover:bg-[#6A9A6E] text-white font-black py-5 rounded-[28px] shadow-xl shadow-[#7BAE7F]/20 transition-all active:scale-[0.98] mt-6 flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  <span className="uppercase tracking-widest">Se Connecter</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest leading-relaxed">
            Système sécurisé d'aide à la santé maternelle <br/> Propulsé par l'IA médicale
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col max-w-lg mx-auto shadow-2xl overflow-x-hidden relative">
      {!selectedPatient && (
        <header className="sticky top-0 z-30 bg-[#F8FAF7]/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
          <button onClick={() => setIsDrawerOpen(true)} className="p-3 bg-white rounded-2xl shadow-sm text-gray-400">
            <MenuIcon size={20} />
          </button>
          <div className="text-center">
              <span className="text-xs font-black text-[#7BAE7F] uppercase tracking-widest">Maternelle+</span>
          </div>
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm">
              <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-y-auto">
        {activeTab === 'home' && (currentUser.role === UserRole.PRESTATAIRE ? <ProviderHome /> : <PatientHome week={currentUser.pregnancyWeek || 24} />)}
        {activeTab === 'monitoring' && (currentUser.role === UserRole.FEMME_ENCEINTE ? <PatientMonitoring week={currentUser.pregnancyWeek || 24} /> : (selectedPatient ? <ProviderPatientFile patient={selectedPatient} onBack={() => setSelectedPatient(null)} /> : <ProviderMonitoring onSelectPatient={setSelectedPatient} />))}
        {activeTab === 'alerts' && <AlertsView role={currentUser.role} />}
        {(activeTab === 'profile' || activeTab === 'calendar') && (
           <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-10 opacity-30">
              <h2 className="text-xl font-bold text-gray-800">Section {activeTab}</h2>
              <p className="text-xs uppercase font-black tracking-widest mt-2">Développement en cours</p>
           </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onLogout={handleLogout} userName={currentUser.name} userRole={currentUser.role} />
    </div>
  );
};

export default App;
