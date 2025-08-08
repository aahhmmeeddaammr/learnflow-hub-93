import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, TrendingUp, Trophy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const grades = [
  {
    subject: "Advanced Programming",
    instructor: "Dr. Sarah Johnson",
    midterm: 8.5,
    final: 9.0,
    assignments: 8.8,
    overall: 8.7,
    credits: 6,
  },
  {
    subject: "Database Systems",
    instructor: "Prof. Michael Chen",
    midterm: 7.8,
    final: 8.2,
    assignments: 9.1,
    overall: 8.3,
    credits: 5,
  },
  {
    subject: "Software Engineering",
    instructor: "Dr. Emily Rodriguez",
    midterm: 9.2,
    final: 8.7,
    assignments: 8.5,
    overall: 8.8,
    credits: 6,
  },
];

const gpa = 8.6;
const totalCredits = 17;

export default function StudentGrades() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Grades</h1>
            <p className="text-muted-foreground">
              View your academic performance and grade history
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current GPA</p>
                <p className="text-2xl font-bold text-foreground">{gpa}/10</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-2xl font-bold text-foreground">{totalCredits}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Academic Standing</p>
                <p className="text-lg font-bold text-foreground">Excellent</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Grades Table */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Current Semester</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Midterm</TableHead>
                  <TableHead>Final</TableHead>
                  <TableHead>Assignments</TableHead>
                  <TableHead>Overall</TableHead>
                  <TableHead>Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{grade.subject}</TableCell>
                    <TableCell>{grade.instructor}</TableCell>
                    <TableCell>{grade.midterm}/10</TableCell>
                    <TableCell>{grade.final}/10</TableCell>
                    <TableCell>{grade.assignments}/10</TableCell>
                    <TableCell>
                      <Badge variant={grade.overall >= 8.5 ? "default" : "secondary"}>
                        {grade.overall}/10
                      </Badge>
                    </TableCell>
                    <TableCell>{grade.credits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}