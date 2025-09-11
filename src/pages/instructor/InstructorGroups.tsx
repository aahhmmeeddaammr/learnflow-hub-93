import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { School, Users, Calendar, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const groups = [
  {
    id: 1,
    name: "CS-2024-A",
    diploma: "Computer Science Degree",
    students: 28,
    attendance: 94.2,
    avgGrade: 8.7,
    nextClass: "Dec 16, 10:00 AM",
  },
  {
    id: 2,
    name: "CS-2023-B",
    diploma: "Computer Science Degree",
    students: 25,
    attendance: 89.5,
    avgGrade: 7.9,
    nextClass: "Dec 17, 2:00 PM",
  },
];

export default function InstructorGroups() {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Groups</h1>
          <p className="text-muted-foreground">
            Manage your assigned groups and track student progress
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <School className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {group.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {group.diploma}
                  </p>
                </div>
              </div>
              <Button 
                className="bg-primary text-primary-foreground"
                onClick={() => navigate('/instructor/group-details')}
              >
                View Details
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="font-semibold text-foreground">{group.students}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                  <p className="font-semibold text-foreground">{group.attendance}%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="secondary">
                  Avg Grade: {group.avgGrade}/10
                </Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Next Class</p>
                  <p className="font-semibold text-foreground text-sm">{group.nextClass}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}