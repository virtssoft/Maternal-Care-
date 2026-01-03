
export enum UserRole {
  PRESTATAIRE = 'PRESTATAIRE',
  FEMME_ENCEINTE = 'FEMME_ENCEINTE',
  SUPERVISEUR = 'SUPERVISEUR'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  facility?: string;
  pregnancyWeek?: number;
  dueDate?: string;
}

export type NavTab = 'home' | 'monitoring' | 'calendar' | 'alerts' | 'profile' | 'settings' | 'language' | 'help' | 'privacy';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  read: boolean;
}

export interface CPNVisit {
  id: string;
  date: string;
  weight: number;
  bp: string;
  conjunctiva: 'colorées' | 'pâles';
  fundalHeight: number;
  fetalHeartRate: number;
  fetalMovements: boolean;
  presentation: 'sommet' | 'siège' | 'transverse' | 'N/A';
  liquidLoss: 'non' | 'sang' | 'pus' | 'eaux';
  albuminuria: '-' | '+' | '++';
  glycosuria: '-' | '+' | '++';
  treatments: string[];
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  pregnancyWeek: number;
  lastVisit: string;
  riskLevel: 'low' | 'medium' | 'high';
  photo: string;
  visits?: CPNVisit[];
}
