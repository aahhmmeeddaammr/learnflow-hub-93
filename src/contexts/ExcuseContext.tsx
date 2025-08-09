import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Excuse, ExcuseFormData } from '@/types/excuse';
import { useAuth } from './AuthContext';

interface ExcuseContextType {
  excuses: Excuse[];
  submitExcuse: (data: ExcuseFormData) => void;
  updateExcuseStatus: (excuseId: string, status: 'approved' | 'rejected', notes?: string) => void;
  getUserExcuses: (userId: string) => Excuse[];
  getPendingExcuses: () => Excuse[];
}

const ExcuseContext = createContext<ExcuseContextType | undefined>(undefined);

export function ExcuseProvider({ children }: { children: ReactNode }) {
  const [excuses, setExcuses] = useState<Excuse[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load excuses from localStorage
    const storedExcuses = localStorage.getItem('route_excuses');
    if (storedExcuses) {
      setExcuses(JSON.parse(storedExcuses));
    }
  }, []);

  // Save to localStorage when excuses change
  useEffect(() => {
    localStorage.setItem('route_excuses', JSON.stringify(excuses));
  }, [excuses]);

  const submitExcuse = (data: ExcuseFormData) => {
    if (!user) return;

    const newExcuse: Excuse = {
      id: Date.now().toString(),
      studentId: user.id,
      studentName: user.name,
      reason: data.reason,
      date: data.date,
      description: data.description,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    setExcuses(prev => [newExcuse, ...prev]);
  };

  const updateExcuseStatus = (excuseId: string, status: 'approved' | 'rejected', notes?: string) => {
    if (!user) return;

    setExcuses(prev =>
      prev.map(excuse =>
        excuse.id === excuseId
          ? {
              ...excuse,
              status,
              reviewedBy: user.name,
              reviewedAt: new Date().toISOString(),
              reviewNotes: notes,
            }
          : excuse
      )
    );
  };

  const getUserExcuses = (userId: string) => {
    return excuses.filter(excuse => excuse.studentId === userId);
  };

  const getPendingExcuses = () => {
    return excuses.filter(excuse => excuse.status === 'pending');
  };

  return (
    <ExcuseContext.Provider value={{
      excuses,
      submitExcuse,
      updateExcuseStatus,
      getUserExcuses,
      getPendingExcuses,
    }}>
      {children}
    </ExcuseContext.Provider>
  );
}

export const useExcuse = () => {
  const context = useContext(ExcuseContext);
  if (context === undefined) {
    throw new Error('useExcuse must be used within an ExcuseProvider');
  }
  return context;
};