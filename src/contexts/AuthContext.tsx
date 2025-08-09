import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/types/auth';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  joinDate: string;
  avatar?: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  deleteUser: (userId: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default users for demo
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'admin@route.com',
    name: 'Admin User',
    role: 'admin',
    department: 'Administration',
    joinDate: '2024-01-01',
    isActive: true
  },
  {
    id: '2',
    email: 'instructor@route.com',
    name: 'John Smith',
    role: 'instructor',
    department: 'Computer Science',
    joinDate: '2024-01-15',
    isActive: true
  },
  {
    id: '3',
    email: 'mentor@route.com',
    name: 'Sarah Johnson',
    role: 'mentor',
    department: 'Data Science',
    joinDate: '2024-02-01',
    isActive: true
  },
  {
    id: '4',
    email: 'student@route.com',
    name: 'Mike Wilson',
    role: 'student',
    department: 'Computer Science',
    joinDate: '2024-03-01',
    isActive: true
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize users from localStorage or use defaults
    const storedUsers = localStorage.getItem('route_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(defaultUsers);
      localStorage.setItem('route_users', JSON.stringify(defaultUsers));
    }

    // Check for existing session
    const storedUser = localStorage.getItem('route_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // Update localStorage when users change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('route_users', JSON.stringify(users));
    }
  }, [users]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple authentication - in real app, this would be API call
    const foundUser = users.find(u => u.email === email && u.isActive);
    
    if (foundUser && password === 'password') { // Demo password
      setUser(foundUser);
      localStorage.setItem('route_current_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('route_current_user');
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => {
      const updated = prev.map(u => 
        u.id === userId ? { ...u, ...updates } : u
      );
      
      // Update current user if it's being modified
      if (user && user.id === userId) {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('route_current_user', JSON.stringify(updatedUser));
      }
      
      return updated;
    });
  };

  const addUser = (newUser: Omit<User, 'id'>) => {
    const user: User = {
      ...newUser,
      id: Date.now().toString(),
    };
    
    setUsers(prev => [...prev, user]);
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    
    // If deleting current user, logout
    if (user && user.id === userId) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      users,
      login,
      logout,
      updateUser,
      addUser,
      deleteUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};