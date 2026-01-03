
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
import { LogIn, Menu as MenuIcon, User as UserIcon, Lock, HeartPulse } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // State for provider monitoring sub-view
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Simple login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate role detection
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === loginEmail) || MOCK_USERS[1];
      setCurrentUser(user as User);
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
    setSelectedPatient(null);
  };

  // Reset selected patient when changing tabs
  useEffect(() => {
    if (activeTab !== 'monitoring') {
      setSelectedPatient(null);
    }
  }, [activeTab]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="text-center">
            <div className="inline-block p-4 bg-white rounded-3xl shadow-xl shadow-rose-200 mb-6">
              <HeartPulse className="text-rose-500 w-12 h-12" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">MaternelleConnect</h1>
            <p className="mt-2 text-gray-500 font-medium">Santé, Suivi & Sérénité</p>
          </div>

          <form className="bg-white p-8 rounded-3xl shadow-2xl space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Email / Identifiant</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium text-gray-700"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Mot de passe</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
                  <input
                    type="password"
                    required
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium text-gray-700"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-200 transition-all flex items-center justify-center space-x-2 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Se Connecter</span>
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <p className="text-xs text-gray-400 font-medium italic">Accès unifié pour Prestataires & Patientes</p>
            </div>
          </form>

          <div className="flex justify-center space-x-4 text-xs font-bold text-rose-400">
            <button type="button">BESOIN D'AIDE ?</button>
            <span className="text-gray-200">•</span>
            <button type="button">CONTACTEZ-NOUS</button>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return currentUser.role === UserRole.PRESTATAIRE 
          ? <ProviderHome /> 
          : <PatientHome week={currentUser.pregnancyWeek || 24} />;
      case 'monitoring':
        if (currentUser.role === UserRole.FEMME_ENCEINTE) {
          return <PatientMonitoring week={currentUser.pregnancyWeek || 24} />;
        } else {
          return selectedPatient 
            ? <ProviderPatientFile patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
            : <ProviderMonitoring onSelectPatient={setSelectedPatient} />;
        }
      case 'alerts':
        return <AlertsView role={currentUser.role} />;
      case 'profile':
      case 'calendar':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-10 text-gray-400">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
                <MenuIcon size={48} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Section {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <p className="text-sm mt-2">Détails de l'interface en cours de développement pour le rôle {currentUser.role}.</p>
          </div>
        );
      default:
        return <div>Contenu non disponible</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-lg mx-auto shadow-2xl shadow-gray-200 overflow-x-hidden">
      {/* Top Header */}
      {!selectedPatient && (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 -ml-2 hover:bg-rose-50 rounded-xl transition-colors text-gray-600"
          >
            <MenuIcon size={24} />
          </button>
          <div className="text-center">
              <span className="text-lg font-black text-rose-500 uppercase tracking-tighter">Maternelle+</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-rose-500 overflow-hidden border-2 border-white shadow-sm">
              <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </header>
      )}

      {/* Dynamic Content */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Shared Bottom Nav */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Side Menu Drawer */}
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onLogout={handleLogout}
        userName={currentUser.name}
        userRole={currentUser.role}
      />
    </div>
  );
};

export default App;
