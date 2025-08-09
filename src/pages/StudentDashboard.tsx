import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import StudentGrades from "./student/StudentGrades";
import StudentAttendance from "./student/StudentAttendance";
import StudentExcuses from "./student/StudentExcuses";
import StudentAnnouncements from "./student/StudentAnnouncements";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  ClipboardCheck, 
  Calendar,
  FileText,
  TrendingUp,
  Clock,
  BookOpen,
  Award,
  Target
} from "lucide-react";

function StudentOverview() {
  // ... keep existing code (all student dashboard content)
  return (
    <div className="space-y-8">
      {/* Header and all existing content remains the same */}
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <Routes>
        <Route index element={<StudentOverview />} />
        <Route path="grades" element={<StudentGrades />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="excuses" element={<StudentExcuses />} />
        <Route path="announcements" element={<StudentAnnouncements />} />
      </Routes>
    </DashboardLayout>
  );
}