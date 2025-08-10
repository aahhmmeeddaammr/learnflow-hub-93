import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchFilter } from "@/components/ui/search-filter";
import { UserCheck, Mail, Plus, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const departments = Array.from(new Set(mentors.map(mentor => mentor.department)));

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || mentor.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || mentor.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('mentors.title')}</h1>
          <p className="text-muted-foreground">{t('mentors.description')}</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          {t('mentors.addMentor')}
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
        {filteredMentors.map((mentor) => (
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
                    {mentor.department} • {mentor.groups} {t('mentors.groups')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="default">{t(`common.${mentor.status}`)}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>{t('common.edit')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('mentors.viewGroups')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('mentors.deactivate')}</DropdownMenuItem>
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
