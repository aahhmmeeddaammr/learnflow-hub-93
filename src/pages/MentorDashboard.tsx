import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import MentorGroups from "./mentor/MentorGroups";
import MentorAssignments from "./mentor/MentorAssignments";
import MentorTickets from "./mentor/MentorTickets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  School, 
  BookOpen, 
  Users,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  MessageSquare,
  FileText
} from "lucide-react";

export default function MentorDashboard() {
  const myGroups = [
    {
      id: 1,
      name: "CS-101",
      diploma: "Computer Science",
      students: 28,
      assignments: 8,
      submitted: 24,
      graded: 20
    },
    {
      id: 2,
      name: "DS-101",
      diploma: "Data Science", 
      students: 22,
      assignments: 6,
      submitted: 20,
      graded: 18
    }
  ];

  const recentAssignments = [
    {
      id: 1,
      title: "Database Design Project",
      group: "CS-101",
      dueDate: "2024-01-20",
      submitted: 24,
      total: 28,
      status: "active"
    },
    {
      id: 2,
      title: "Data Visualization Report",
      group: "DS-101",
      dueDate: "2024-01-18",
      submitted: 22,
      total: 22,
      status: "completed"
    },
    {
      id: 3,
      title: "Algorithm Analysis",
      group: "CS-101",
      dueDate: "2024-01-25",
      submitted: 0,
      total: 28,
      status: "upcoming"
    }
  ];

  const pendingGrading = [
    {
      student: "Alice Johnson",
      assignment: "Database Design",
      group: "CS-101",
      submitted: "2024-01-15"
    },
    {
      student: "Bob Smith",
      assignment: "Data Viz Report",
      group: "DS-101", 
      submitted: "2024-01-14"
    },
    {
      student: "Carol Davis",
      assignment: "Database Design",
      group: "CS-101",
      submitted: "2024-01-15"
    }
  ];

  const monthlyTickets = {
    used: 2,
    limit: 10
  };

  return (
    <DashboardLayout role="mentor">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mentor Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Guide students through assignments and track their progress
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
              <p className="text-xs text-muted-foreground">Active mentoring groups</p>
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
              <p className="text-xs text-muted-foreground">Under mentorship</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Grading
              </CardTitle>
              <FileText className="w-5 h-5 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{pendingGrading.length}</div>
              <p className="text-xs text-muted-foreground">Assignments to grade</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Assignments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Recent Assignments
                </CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground">{assignment.group}</p>
                      </div>
                      <Badge 
                        variant={
                          assignment.status === 'completed' ? 'default' :
                          assignment.status === 'active' ? 'secondary' : 'outline'
                        }
                        className="text-xs"
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Due date:</span>
                        <span className="font-medium text-foreground">
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Submissions:</span>
                        <span className="font-medium text-foreground">
                          {assignment.submitted}/{assignment.total}
                        </span>
                      </div>
                      <Progress 
                        value={(assignment.submitted / assignment.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Grading */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                Pending Grading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingGrading.map((item, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{item.student}</h4>
                      <span className={`role-badge role-student`}>
                        {item.group}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.assignment}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Submitted: {new Date(item.submitted).toLocaleDateString()}
                      </span>
                      <Button size="sm" variant="outline">
                        Grade Now
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  View All Submissions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Group Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Group Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myGroups.map((group) => (
                <div key={group.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{group.name}</h4>
                      <p className="text-sm text-muted-foreground">{group.diploma}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">{group.students}</div>
                      <div className="text-xs text-muted-foreground">students</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Assignments Created</span>
                        <span className="font-medium text-foreground">{group.assignments}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Submissions</span>
                        <span className="font-medium text-foreground">{group.submitted}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Graded</span>
                        <span className="font-medium text-foreground">{group.graded}</span>
                      </div>
                      <Progress 
                        value={(group.graded / group.submitted) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-20 flex-col gap-2" variant="outline">
            <BookOpen className="w-6 h-6" />
            <span>Create Assignment</span>
          </Button>
          <Button className="h-20 flex-col gap-2" variant="outline">
            <CheckCircle className="w-6 h-6" />
            <span>Grade Submissions</span>
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