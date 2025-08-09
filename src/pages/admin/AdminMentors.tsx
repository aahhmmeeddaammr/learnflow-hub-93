import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Mail, Plus, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const mentors = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex.thompson@school.edu",
    department: "Computer Science",
    groups: 2,
    status: "active",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@school.edu",
    department: "Business",
    groups: 3,
    status: "active",
  },
  {
    id: 3,
    name: "David Kim",
    email: "david.kim@school.edu",
    department: "Engineering",
    groups: 1,
    status: "active",
  },
];

export default function AdminMentors() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mentors</h1>
          <p className="text-muted-foreground">Manage mentor accounts and group assignments</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Mentor
        </Button>
      </div>

      <div className="grid gap-4">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{mentor.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    {mentor.email}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {mentor.department} • {mentor.groups} groups
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="default">{mentor.status}</Badge>
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
  );
}
