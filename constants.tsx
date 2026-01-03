
import React from 'react';
import { Home, ClipboardList, Calendar, Bell, User, Settings, Globe, HelpCircle, Lock, LogOut } from 'lucide-react';
import { NavTab, UserRole } from './types';

export const NAV_ITEMS = [
  { id: 'home' as NavTab, label: 'Accueil', icon: Home },
  { id: 'monitoring' as NavTab, label: 'Suivi', icon: ClipboardList },
  { id: 'calendar' as NavTab, label: 'Calendrier', icon: Calendar },
  { id: 'alerts' as NavTab, label: 'Alertes', icon: Bell },
  { id: 'profile' as NavTab, label: 'Profil', icon: User },
];

export const DRAWER_ITEMS = [
  { id: 'settings', label: 'Paramètres', icon: Settings },
  { id: 'language', label: 'Langue', icon: Globe },
  { id: 'help', label: 'Aide & éducation', icon: HelpCircle },
  { id: 'privacy', label: 'Confidentialité', icon: Lock },
  { id: 'logout', label: 'Déconnexion', icon: LogOut, color: 'text-red-500' },
];

export const MOCK_USERS = [
  {
    id: '1',
    name: 'Dr. Aminata Diallo',
    role: UserRole.PRESTATAIRE,
    phone: '0991234567',
    pin: '1234',
    email: 'provider@health.org',
    facility: 'Centre de Santé Reference - Bamako',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    name: 'Mariam Touré',
    role: UserRole.FEMME_ENCEINTE,
    phone: '0841234567',
    pin: '1234',
    email: 'mariam@example.com',
    pregnancyWeek: 24,
    dueDate: '2024-08-15',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=200'
  }
];

export const MOCK_PATIENTS = [
  { id: 'p1', name: 'Fatou Keita', age: 26, pregnancyWeek: 12, lastVisit: '2024-03-20', riskLevel: 'low', photo: 'https://i.pravatar.cc/150?u=fatou' },
  { id: 'p2', name: 'Aicha Kone', age: 31, pregnancyWeek: 34, lastVisit: '2024-03-18', riskLevel: 'high', photo: 'https://i.pravatar.cc/150?u=aicha' },
  { id: 'p3', name: 'Safiata Traoré', age: 22, pregnancyWeek: 28, lastVisit: '2024-03-15', riskLevel: 'medium', photo: 'https://i.pravatar.cc/150?u=safi' },
];
