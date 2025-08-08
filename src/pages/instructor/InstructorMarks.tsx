import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Search, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const students = [
  {
    id: 1,
    name: "John Smith",
    group: "CS-2024-A",
    attendance: 95,
    midterm: 8.5,
    final: 9.0,
    assignments: 8.8,
    overall: 8.7,
  },
  {
    id: 2,
    name: "Emily Davis",
    group: "CS-2024-A",
    attendance: 92,
    midterm: 7.8,
    final: 8.2,
    assignments: 9.1,
    overall: 8.3,
  },
  {
    id: 3,
    name: "Michael Chen",
    group: "CS-2024-A",
    attendance: 88,
    midterm: 9.2,
    final: 8.7,
    assignments: 8.5,
    overall: 8.8,
  },
];

export default function InstructorMarks() {
  return (
    <DashboardLayout role="instructor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Marks & Attendance</h1>
            <p className="text-muted-foreground">
              Manage student grades and attendance records
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-primary text-primary-foreground">
              Take Attendance
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search students..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Midterm</TableHead>
                  <TableHead>Final</TableHead>
                  <TableHead>Assignments</TableHead>
                  <TableHead>Overall</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.group}</TableCell>
                    <TableCell>
                      <Badge variant={student.attendance >= 90 ? "default" : "secondary"}>
                        {student.attendance}%
                      </Badge>
                    </TableCell>
                    <TableCell>{student.midterm}/10</TableCell>
                    <TableCell>{student.final}/10</TableCell>
                    <TableCell>{student.assignments}/10</TableCell>
                    <TableCell>
                      <Badge variant={student.overall >= 8.5 ? "default" : "secondary"}>
                        {student.overall}/10
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </TableCell>
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