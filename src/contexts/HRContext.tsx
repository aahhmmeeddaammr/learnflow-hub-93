import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'instructor' | 'mentor';
  department: string;
  hourlyRate: number;
  totalHours: number;
  joinDate: string;
  isActive: boolean;
}

export interface Excuse {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'sick' | 'personal' | 'emergency' | 'vacation';
  reason: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
  attachments?: string[];
}

export interface WorkLog {
  id: string;
  employeeId: string;
  date: string;
  hoursWorked: number;
  description: string;
  sessionType?: string;
}

interface HRContextType {
  // Employees
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  // Excuses
  excuses: Excuse[];
  addExcuse: (excuse: Omit<Excuse, 'id' | 'submittedAt'>) => void;
  updateExcuseStatus: (id: string, status: 'approved' | 'rejected', reviewedBy: string) => void;
  
  // Work Logs
  workLogs: WorkLog[];
  addWorkLog: (workLog: Omit<WorkLog, 'id'>) => void;
  updateWorkLog: (id: string, updates: Partial<WorkLog>) => void;
  deleteWorkLog: (id: string) => void;
  
  // Calculations
  calculateSalary: (employeeId: string) => number;
  getEmployeeWorkLogs: (employeeId: string) => WorkLog[];
  getTotalHours: (employeeId: string) => number;
}

const HRContext = createContext<HRContextType | undefined>(undefined);

// Mock data
const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Dr. Ahmed Hassan',
    email: 'ahmed.hassan@route.com',
    role: 'instructor',
    department: 'Computer Science',
    hourlyRate: 50,
    totalHours: 120,
    joinDate: '2024-01-15',
    isActive: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@route.com',
    role: 'mentor',
    department: 'Data Science',
    hourlyRate: 35,
    totalHours: 95,
    joinDate: '2024-02-01',
    isActive: true
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.wilson@route.com',
    role: 'instructor',
    department: 'Web Development',
    hourlyRate: 45,
    totalHours: 110,
    joinDate: '2024-01-20',
    isActive: true
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@route.com',
    role: 'mentor',
    department: 'Mobile Development',
    hourlyRate: 40,
    totalHours: 85,
    joinDate: '2024-02-15',
    isActive: true
  }
];

const mockExcuses: Excuse[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'Dr. Ahmed Hassan',
    type: 'sick',
    reason: 'Flu symptoms',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    status: 'pending',
    submittedAt: '2024-03-14T09:00:00Z',
    notes: 'Doctor\'s note attached'
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Sarah Johnson',
    type: 'personal',
    reason: 'Family emergency',
    startDate: '2024-03-20',
    endDate: '2024-03-20',
    status: 'approved',
    submittedAt: '2024-03-19T14:30:00Z',
    reviewedBy: 'HR Manager',
    reviewedAt: '2024-03-19T16:00:00Z'
  },
  {
    id: '3',
    employeeId: '3',
    employeeName: 'Mike Wilson',
    type: 'vacation',
    reason: 'Annual leave',
    startDate: '2024-03-25',
    endDate: '2024-03-29',
    status: 'pending',
    submittedAt: '2024-03-10T11:15:00Z'
  }
];

const mockWorkLogs: WorkLog[] = [
  {
    id: '1',
    employeeId: '1',
    date: '2024-03-01',
    hoursWorked: 8,
    description: 'React fundamentals session',
    sessionType: 'lecture'
  },
  {
    id: '2',
    employeeId: '1',
    date: '2024-03-02',
    hoursWorked: 6,
    description: 'Student mentoring',
    sessionType: 'mentoring'
  },
  {
    id: '3',
    employeeId: '2',
    date: '2024-03-01',
    hoursWorked: 5,
    description: 'Data analysis workshop',
    sessionType: 'workshop'
  },
  {
    id: '4',
    employeeId: '2',
    date: '2024-03-03',
    hoursWorked: 7,
    description: 'Individual student guidance',
    sessionType: 'mentoring'
  }
];

export function HRProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [excuses, setExcuses] = useState<Excuse[]>(mockExcuses);
  const [workLogs, setWorkLogs] = useState<WorkLog[]>(mockWorkLogs);

  // Employee management
  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    ));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  // Excuse management
  const addExcuse = (excuse: Omit<Excuse, 'id' | 'submittedAt'>) => {
    const newExcuse: Excuse = {
      ...excuse,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    setExcuses(prev => [newExcuse, ...prev]);
  };

  const updateExcuseStatus = (id: string, status: 'approved' | 'rejected', reviewedBy: string) => {
    setExcuses(prev => prev.map(excuse => 
      excuse.id === id 
        ? {
            ...excuse,
            status,
            reviewedBy,
            reviewedAt: new Date().toISOString()
          }
        : excuse
    ));
  };

  // Work log management
  const addWorkLog = (workLog: Omit<WorkLog, 'id'>) => {
    const newWorkLog: WorkLog = {
      ...workLog,
      id: Date.now().toString(),
    };
    setWorkLogs(prev => [...prev, newWorkLog]);
  };

  const updateWorkLog = (id: string, updates: Partial<WorkLog>) => {
    setWorkLogs(prev => prev.map(log => 
      log.id === id ? { ...log, ...updates } : log
    ));
  };

  const deleteWorkLog = (id: string) => {
    setWorkLogs(prev => prev.filter(log => log.id !== id));
  };

  // Calculations
  const getEmployeeWorkLogs = (employeeId: string): WorkLog[] => {
    return workLogs.filter(log => log.employeeId === employeeId);
  };

  const getTotalHours = (employeeId: string): number => {
    return workLogs
      .filter(log => log.employeeId === employeeId)
      .reduce((total, log) => total + log.hoursWorked, 0);
  };

  const calculateSalary = (employeeId: string): number => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return 0;
    
    const totalHours = getTotalHours(employeeId);
    return totalHours * employee.hourlyRate;
  };

  return (
    <HRContext.Provider value={{
      employees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      excuses,
      addExcuse,
      updateExcuseStatus,
      workLogs,
      addWorkLog,
      updateWorkLog,
      deleteWorkLog,
      calculateSalary,
      getEmployeeWorkLogs,
      getTotalHours
    }}>
      {children}
    </HRContext.Provider>
  );
}

export const useHR = () => {
  const context = useContext(HRContext);
  if (context === undefined) {
    throw new Error('useHR must be used within an HRProvider');
  }
  return context;
};