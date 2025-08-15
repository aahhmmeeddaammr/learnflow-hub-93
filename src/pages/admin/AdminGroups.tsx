import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { School, Users, Plus, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GroupDetailsSheet } from "@/components/admin/sheets/GroupDetailsSheet";
import { CreateGroupModal } from "@/components/admin/modals/CreateGroupModal";

const groups = [
  {
    id: 1,
    name: "CS-2024-A",
    diploma: "Computer Science Degree",
    students: 28,
    maxStudents: 30,
    instructor: "Dr. Sarah Johnson",
    mentor: "Alex Thompson",
    status: "active",
    schedule: "Mon, Wed, Fri 9:00-11:00",
    room: "Room 301",
    semester: "Fall 2024",
  },
  {
    id: 2,
    name: "BA-2024-B",
    diploma: "Business Administration",
    students: 25,
    maxStudents: 30,
    instructor: "Prof. Michael Chen",
    mentor: "Maria Garcia",
    status: "active",
    schedule: "Tue, Thu 14:00-16:00",
    room: "Room 205",
    semester: "Fall 2024",
  },
  {
    id: 3,
    name: "ENG-2023-A",
    diploma: "Engineering Diploma",
    students: 22,
    maxStudents: 25,
    instructor: "Dr. Emily Rodriguez",
    mentor: "David Kim",
    status: "active",
    schedule: "Mon, Wed 10:00-12:00",
    room: "Lab 101",
    semester: "Fall 2024",
  },
  {
    id: 4,
    name: "DM-2024-C",
    diploma: "Digital Marketing Certificate",
    students: 15,
    maxStudents: 20,
    instructor: "Dr. Sarah Johnson",
    mentor: "Alex Thompson",
    status: "forming",
    schedule: "Fri 13:00-17:00",
    room: "Room 402",
    semester: "Spring 2025",
  },
];

export default function AdminGroups() {
  const [selectedGroup, setSelectedGroup] = useState<typeof groups[0] | null>(null);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Groups</h1>
          <p className="text-muted-foreground">Manage student groups and class assignments</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      <div className="grid gap-4">
        {groups.map((group) => (
          <Card key={group.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <School className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">{group.diploma}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {group.students} students
                    </div>
                    <span>Instructor: {group.instructor}</span>
                    <span>Mentor: {group.mentor}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={group.status === "active" ? "default" : "secondary"}>{group.status}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => { setSelectedGroup(group); setShowGroupDetails(true); }}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Group</DropdownMenuItem>
                    <DropdownMenuItem>Manage Students</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <GroupDetailsSheet
        group={selectedGroup}
        open={showGroupDetails}
        onOpenChange={setShowGroupDetails}
      />

      <CreateGroupModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={(data) => {
          console.log('New group:', data);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
}
