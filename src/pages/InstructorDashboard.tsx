import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  School, 
  ClipboardCheck, 
  Calendar,
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  MessageSquare
} from "lucide-react";

export default function InstructorDashboard() {
  const myGroups = [
    {
      id: 1,
      name: "CS-101",
      diploma: "Computer Science",
      students: 28,
      avgAttendance: 92,
      avgGrades: 85,
      lastSession: "2024-01-15"
    },
    {
      id: 2,
      name: "CS-202", 
      diploma: "Computer Science",
      students: 25,
      avgAttendance: 88,
      avgGrades: 78,
      lastSession: "2024-01-14"
    },
    {
      id: 3,
      name: "DS-101",
      diploma: "Data Science",
      students: 22,
      avgAttendance: 95,
      avgGrades: 89,
      lastSession: "2024-01-13"
    }
  ];

  const upcomingClasses = [
    {
      group: "CS-101",
      subject: "Advanced Algorithms",
      time: "09:00 AM",
      date: "Today",
      room: "Lab A"
    },
    {
      group: "CS-202",
      subject: "Database Systems",
      time: "02:00 PM", 
      date: "Today",
      room: "Room 301"
    },
    {
      group: "DS-101",
      subject: "Machine Learning",
      time: "10:00 AM",
      date: "Tomorrow",
      room: "Lab B"
    }
  ];

  const monthlyTickets = {
    used: 3,
    limit: 10
  };

  return (
    <DashboardLayout role="instructor">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your groups and track student progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                My Groups
              </CardTitle>
              <School className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{myGroups.length}</div>
              <p className="text-xs text-muted-foreground">Active groups assigned</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Students
              </CardTitle>
              <Users className="w-5 h-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {myGroups.reduce((sum, group) => sum + group.students, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all groups</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Attendance
              </CardTitle>
              <ClipboardCheck className="w-5 h-5 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {Math.round(myGroups.reduce((sum, group) => sum + group.avgAttendance, 0) / myGroups.length)}%
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-success">+2%</span>
                <span className="text-muted-foreground">this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monthly Tickets
              </CardTitle>
              <MessageSquare className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {monthlyTickets.used}/{monthlyTickets.limit}
              </div>
              <Progress 
                value={(monthlyTickets.used / monthlyTickets.limit) * 100} 
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Groups */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <School className="w-5 h-5 text-primary" />
                  My Groups
                </CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myGroups.map((group) => (
                  <div key={group.id} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{group.name}</h4>
                        <p className="text-sm text-muted-foreground">{group.diploma}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">{group.students} students</div>
                        <div className="text-xs text-muted-foreground">
                          Last: {new Date(group.lastSession).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Attendance</div>
                        <div className="flex items-center gap-2">
                          <Progress value={group.avgAttendance} className="flex-1 h-2" />
                          <span className="text-sm font-medium text-foreground">{group.avgAttendance}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Avg Grade</div>
                        <div className="flex items-center gap-2">
                          <Progress value={group.avgGrades} className="flex-1 h-2" />
                          <span className="text-sm font-medium text-foreground">{group.avgGrades}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingClasses.map((class_, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-sm text-foreground">{class_.group}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{class_.room}</span>
                  </div>
                  <div className="text-sm text-foreground mb-1">{class_.subject}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {class_.time} • {class_.date}
                  </div>
                </div>
              ))}
              
              <Button className="w-full" size="sm" variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-20 flex-col gap-2" variant="outline">
            <ClipboardCheck className="w-6 h-6" />
            <span>Take Attendance</span>
          </Button>
          <Button className="h-20 flex-col gap-2" variant="outline">
            <BookOpen className="w-6 h-6" />
            <span>Grade Assignments</span>
          </Button>
          <Button className="h-20 flex-col gap-2" variant="outline">
            <MessageSquare className="w-6 h-6" />
            <span>Raise Ticket</span>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}