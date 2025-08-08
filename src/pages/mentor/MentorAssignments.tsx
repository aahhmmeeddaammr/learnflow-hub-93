import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Calendar } from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Database Design Project",
    group: "CS-2024-A",
    dueDate: "Dec 20, 2024",
    submissions: 23,
    totalStudents: 28,
    status: "active",
  },
  {
    id: 2,
    title: "Final Presentation",
    group: "BA-2024-B",
    dueDate: "Dec 25, 2024",
    submissions: 15,
    totalStudents: 25,
    status: "active",
  },
];

export default function MentorAssignments() {
  return (
    <DashboardLayout role="mentor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Assignments</h1>
          <Button><Plus className="w-4 h-4 mr-2" />New Assignment</Button>
        </div>
        <div className="grid gap-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground">{assignment.group}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-3 h-3" />
                      Due: {assignment.dueDate}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge>{assignment.submissions}/{assignment.totalStudents} submitted</Badge>
                  <div className="mt-2">
                    <Button size="sm">Review</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}