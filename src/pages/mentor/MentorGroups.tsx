import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { School, Users, BarChart3 } from "lucide-react";

const groups = [
  { id: 1, name: "CS-2024-A", students: 28, avgGrade: 8.7, assignments: 5 },
  { id: 2, name: "BA-2024-B", students: 25, avgGrade: 7.9, assignments: 3 },
];

export default function MentorGroups() {
  return (
    <DashboardLayout role="mentor">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Groups</h1>
        <div className="grid gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <School className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span><Users className="w-4 h-4 inline mr-1" />{group.students} students</span>
                      <span><BarChart3 className="w-4 h-4 inline mr-1" />Avg: {group.avgGrade}/10</span>
                    </div>
                  </div>
                </div>
                <Button>View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}