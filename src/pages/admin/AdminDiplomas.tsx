import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Plus, MoreVertical, Clock } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const diplomas = [
  {
    id: 1,
    name: "Computer Science Degree",
    duration: "4 years",
    credits: 180,
    groups: 8,
    status: "active",
  },
  {
    id: 2,
    name: "Business Administration",
    duration: "3 years",
    credits: 150,
    groups: 5,
    status: "active",
  },
  {
    id: 3,
    name: "Engineering Diploma",
    duration: "5 years",
    credits: 200,
    groups: 6,
    status: "active",
  },
  {
    id: 4,
    name: "Digital Marketing Certificate",
    duration: "1 year",
    credits: 60,
    groups: 3,
    status: "draft",
  },
];

export default function AdminDiplomas() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Diplomas & Programs</h1>
          <p className="text-muted-foreground">Manage educational programs and diploma requirements</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Create Program
        </Button>
      </div>

      <div className="grid gap-4">
        {diplomas.map((diploma) => (
          <Card key={diploma.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{diploma.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {diploma.duration}
                    </div>
                    <span>{diploma.credits} credits</span>
                    <span>{diploma.groups} groups</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={diploma.status === "active" ? "default" : "secondary"}>{diploma.status}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Curriculum</DropdownMenuItem>
                    <DropdownMenuItem>Manage Groups</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
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
