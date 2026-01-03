
import React, { useState } from 'react';
import { User, UserRole, NavTab, Patient } from './types';
import { MOCK_USERS } from './constants';
import { BottomNav, DesktopSidebar, SideDrawer } from './components/Navigation';
import { ProviderHome } from './components/ProviderHome';
import { PatientHome } from './components/PatientHome';
import { PatientMonitoring } from './components/PatientMonitoring';
import { ProviderMonitoring } from './components/ProviderMonitoring';
import { ProviderPatientFile } from './components/ProviderPatientFile';
import { AlertsView } from './components/AlertsView';
import { LogIn, Menu as MenuIcon, HeartPulse, Sparkles, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const user = MOCK_USERS.find(u => (u as any).phone === loginPhone && (u as any).pin === loginPin);
      if (user) {
        setCurrentUser(user as User);
        setActiveTab('home');
      } else {
        setError("Accès refusé. Vérifiez vos identifiants.");
      }
      setIsLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
    setSelectedPatient(null);
    setLoginPhone('');
    setLoginPin('');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
        {/* Zone Visuelle - 40% sur mobile, 50% sur desktop */}
        <div className="relative h-[40vh] md:h-screen md:w-1/2 overflow-hidden shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200" 
            alt="Medical Care" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-[#7BAE7F] p-3 rounded-2xl shadow-xl">
                <HeartPulse size={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tighter leading-none">MATERNALCARE+</h1>
                <p className="text-sm font-bold text-[#7BAE7F] uppercase tracking-[0.4em] mt-2">Édition RDC</p>
              </div>
            </div>
            <p className="text-xl font-medium text-gray-300 max-w-sm">« Un suivi sûr pour la mère et l’enfant »</p>
          </div>
        </div>

        {/* Zone Formulaire - 60% sur mobile, 50% sur desktop */}
        <div className="flex-1 flex items-center justify-center p-8 bg-[#F8FAF7] md:bg-white relative">
          <div className="w-full max-w-md bg-white md:bg-transparent p-12 rounded-[60px] md:p-0 shadow-2xl shadow-black/5 md:shadow-none -mt-20 md:mt-0 relative z-10 border border-gray-50 md:border-none">
            <div className="mb-12">
               <h2 className="text-3xl font-black text-gray-900 tracking-tight">Bienvenue</h2>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mt-3">Saisissez vos identifiants pour continuer</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-3xl flex items-center space-x-3 text-red-500">
                   <AlertCircle size={20} />
                   <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Téléphone / ID</label>
                <input
                  type="tel"
                  required
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  className="w-full bg-[#F8FAF7] p-6 rounded-[24px] border border-gray-100 outline-none font-black text-gray-800 focus:border-[#7BAE7F] transition-all tracking-wider placeholder:text-gray-200"
                  placeholder="0991234567"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Code PIN</label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  className="w-full bg-[#F8FAF7] p-6 rounded-[24px] border border-gray-100 outline-none font-black text-gray-800 focus:border-[#7BAE7F] transition-all tracking-[1em] placeholder:text-gray-200"
                  placeholder="••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#7BAE7F] hover:bg-[#6A9A6E] text-white font-black py-6 rounded-[24px] shadow-2xl shadow-[#7BAE7F]/30 transition-all active:scale-[0.98] mt-10 flex items-center justify-center space-x-3"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="uppercase tracking-[0.2em] text-sm">Se Connecter</span>
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-12 text-center text-[10px] font-bold text-gray-200 uppercase tracking-widest leading-loose">
              Sim: 0991234567 (Dr.) ou 0841234567 (Maman) <br/> PIN: 1234
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col lg:flex-row relative overflow-hidden">
      {/* Adaptative Navigation */}
      <DesktopSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} userName={currentUser.name} />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onLogout={handleLogout} userName={currentUser.name} userRole={currentUser.role} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-[280px] min-h-screen">
        {/* Top Header - Visible on Mobile and Tablet only */}
        <header className="lg:hidden px-6 py-6 flex justify-between items-center bg-transparent relative z-30">
          <button onClick={() => setIsDrawerOpen(true)} className="p-3 bg-white rounded-2xl shadow-sm text-gray-400 border border-gray-50">
            <MenuIcon size={20} />
          </button>
          <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-[#7BAE7F] uppercase tracking-[0.3em]">MaternalCare+</span>
              <span className="text-[8px] text-gray-300 font-bold uppercase">{currentUser.role}</span>
          </div>
          <img src={currentUser.avatar} className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" alt="Profile" />
        </header>

        {/* Dynamic Screen View */}
        <main className="flex-1 overflow-y-auto page-transition pb-20 lg:pb-10">
          {activeTab === 'home' && (
            currentUser.role === UserRole.PRESTATAIRE 
            ? <ProviderHome /> 
            : <PatientHome week={currentUser.pregnancyWeek || 24} />
          )}
          
          {activeTab === 'monitoring' && (
            currentUser.role === UserRole.FEMME_ENCEINTE 
            ? <PatientMonitoring week={currentUser.pregnancyWeek || 24} /> 
            : (selectedPatient ? <ProviderPatientFile patient={selectedPatient} onBack={() => setSelectedPatient(null)} /> : <ProviderMonitoring onSelectPatient={setSelectedPatient} />)
          )}
          
          {activeTab === 'alerts' && <AlertsView role={currentUser.role} />}
          
          {(activeTab === 'profile' || activeTab === 'calendar') && (
             <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-10 opacity-40">
                <Sparkles size={64} className="text-[#7BAE7F] mb-6" />
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Section {activeTab}</h2>
                <p className="text-[10px] uppercase font-black tracking-widest mt-2 text-gray-400">Édition des données bientôt disponible</p>
             </div>
          )}
        </main>
      </div>

      {/* Global Background Accents */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#7BAE7F]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
    </div>
  );
};

export default App;
