import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchFilter } from "@/components/ui/search-filter";
import { Users, Mail, Plus, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const departments = Array.from(new Set(instructors.map(instructor => instructor.department)));

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || instructor.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || instructor.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('instructors.title')}</h1>
          <p className="text-muted-foreground">{t('instructors.description')}</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          {t('instructors.addInstructor')}
        </Button>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        departmentFilter={departmentFilter}
        onDepartmentFilterChange={setDepartmentFilter}
        departments={departments}
      />

      <div className="grid gap-4">
        {filteredInstructors.map((instructor) => (
          <Card key={instructor.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{instructor.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    {instructor.email}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {instructor.department} • {instructor.groups} {t('instructors.groups')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={instructor.status === "active" ? "default" : "secondary"}>
                  {t(`common.${instructor.status}`)}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>{t('common.edit')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('instructors.viewGroups')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('instructors.deactivate')}</DropdownMenuItem>
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
