export interface Excuse {
  id: string;
  studentId: string;
  studentName: string;
  reason: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
  attachments?: string[];
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface ExcuseFormData {
  reason: string;
  date: string;
  description: string;
}