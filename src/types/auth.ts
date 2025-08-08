export type UserRole = 'admin' | 'instructor' | 'mentor' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}