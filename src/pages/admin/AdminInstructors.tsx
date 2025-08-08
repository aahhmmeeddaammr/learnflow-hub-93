import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Plus, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const instructors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    department: "Computer Science",
    groups: 3,
    status: "active",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "michael.chen@school.edu",
    department: "Mathematics",
    groups: 2,
    status: "active",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@school.edu",
    department: "Physics",
    groups: 4,
    status: "inactive",
  },
];

export default function AdminInstructors() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Instructors</h1>
            <p className="text-muted-foreground">
              Manage instructor accounts and assignments
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add Instructor
          </Button>
        </div>

        <div className="grid gap-4">
          {instructors.map((instructor) => (
            <Card key={instructor.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {instructor.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      {instructor.email}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {instructor.department} • {instructor.groups} groups
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={instructor.status === "active" ? "default" : "secondary"}
                  >
                    {instructor.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Groups</DropdownMenuItem>
                      <DropdownMenuItem>Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}