
import React from 'react';
import { NavTab } from '../types';
import { NAV_ITEMS, DRAWER_ITEMS } from '../constants';
import { X, LogOut } from 'lucide-react';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-[32px] px-2 py-3 shadow-2xl z-40">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 ${
                isActive ? 'text-[#7BAE7F] scale-110' : 'text-gray-300 hover:text-gray-400'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <span className="absolute -bottom-1 w-1 h-1 bg-[#7BAE7F] rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  userName: string;
  userRole: string;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, onLogout, userName, userRole }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white shadow-2xl animate-in slide-in-from-left duration-300 rounded-r-[40px]">
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <span className="text-xl font-black text-[#7BAE7F] tracking-tighter">MATERNELLE+</span>
            <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400"><X size={20} /></button>
          </div>

          <div className="mb-10 flex items-center space-x-4">
             <div className="w-12 h-12 rounded-2xl bg-[#7BAE7F]/10 flex items-center justify-center text-[#7BAE7F] font-bold text-lg">
                {userName.charAt(0)}
             </div>
             <div>
                <p className="font-bold text-gray-800">{userName}</p>
                <p className="text-xs text-gray-400 font-medium">{userRole === 'PRESTATAIRE' ? 'Professionnel de Santé' : 'Patiente'}</p>
             </div>
          </div>

          <nav className="flex-1 space-y-4">
            {DRAWER_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'logout') onLogout();
                    onClose();
                  }}
                  className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${
                    item.id === 'logout' ? 'bg-red-50 text-red-500' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-bold text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 text-[10px] text-gray-300 font-bold uppercase tracking-widest text-center">
            MaternelleConnect v2.0
          </div>
        </div>
      </div>
    </div>
  );
};
