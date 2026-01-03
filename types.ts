
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

export type NavTab = 'home' | 'monitoring' | 'calendar' | 'alerts' | 'profile';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  read: boolean;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  pregnancyWeek: number;
  lastVisit: string;
  riskLevel: 'low' | 'medium' | 'high';
  photo: string;
}
