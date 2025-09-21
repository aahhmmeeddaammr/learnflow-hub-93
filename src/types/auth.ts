export type UserRole = 'admin' | 'instructor' | 'mentor' | 'student' | 'hr';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}