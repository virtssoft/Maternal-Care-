
import React from 'react';
import { NavTab, UserRole } from '../types';
import { NAV_ITEMS, DRAWER_ITEMS } from '../constants';
import { Menu, X } from 'lucide-react';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 pb-safe shadow-lg z-40">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 transition-colors ${
                isActive ? 'text-rose-600' : 'text-gray-400'
              }`}
            >
              <Icon size={24} className={isActive ? 'scale-110' : ''} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
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
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 left-0 bottom-0 w-3/4 max-w-xs bg-white shadow-xl animate-in slide-in-from-left duration-300">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-rose-600">SantéMaternelle</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="mb-8 p-4 bg-rose-50 rounded-xl">
            <p className="font-bold text-gray-800">{userName}</p>
            <p className="text-sm text-rose-600 capitalize">{userRole.toLowerCase().replace('_', ' ')}</p>
          </div>

          <nav className="flex-1 space-y-2">
            {DRAWER_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'logout') onLogout();
                    onClose();
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors ${item.color || 'text-gray-700'}`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-gray-100 text-[10px] text-gray-400 text-center">
            v1.0.0 - Propulsé par AI
          </div>
        </div>
      </div>
    </div>
  );
};
