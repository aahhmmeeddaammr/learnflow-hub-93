import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  ClipboardCheck, 
  Calendar,
  FileText,
  TrendingUp,
  Clock,
  BookOpen,
  Award,
  Target
} from "lucide-react";

export default function StudentDashboard() {
  const studentInfo = {
    name: "Sarah Wilson",
    group: "CS-101",
    diploma: "Computer Science",
    studentId: "CS2024001"
  };

  const academicProgress = {
    overallGrade: 87,
    attendance: 94,
    assignmentsCompleted: 15,
    totalAssignments: 18
  };

  const recentGrades = [
    {
      assignment: "Database Design Project",
      subject: "Database Systems",
      grade: 92,
      maxGrade: 100,
      submittedDate: "2024-01-15",
      gradedDate: "2024-01-17"
    },
    {
      assignment: "Algorithm Analysis",
      subject: "Data Structures",
      grade: 85,
      maxGrade: 100,
      submittedDate: "2024-01-12",
      gradedDate: "2024-01-14"
    },
    {
      assignment: "Web Development Project",
      subject: "Frontend Development",
      grade: 90,
      maxGrade: 100,
      submittedDate: "2024-01-10",
      gradedDate: "2024-01-12"
    }
  ];

  const upcomingAssignments = [
    {
      title: "Machine Learning Project",
      subject: "AI Fundamentals",
      dueDate: "2024-01-25",
      status: "not_started"
    },
    {
      title: "System Architecture Design",
      subject: "Software Engineering",
      dueDate: "2024-01-28",
      status: "in_progress"
    },
    {
      title: "Data Visualization Report",
      subject: "Data Science",
      dueDate: "2024-01-30",
      status: "not_started"
    }
  ];

  const recentAnnouncements = [
    {
      title: "Midterm Exam Schedule Released",
      from: "Dr. Johnson",
      date: "2024-01-16",
      type: "exam"
    },
    {
      title: "Guest Lecture on AI Ethics",
      from: "Prof. Smith",
      date: "2024-01-15",
      type: "event"
    },
    {
      title: "Assignment Extension for Database Project",
      from: "Dr. Brown",
      date: "2024-01-14",
      type: "assignment"
    }
  ];

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-xl p-6 border border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, {studentInfo.name}!</h1>
              <p className="text-muted-foreground">
                {studentInfo.group} • {studentInfo.diploma} • ID: {studentInfo.studentId}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overall Grade
              </CardTitle>
              <Award className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{academicProgress.overallGrade}%</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-success">+3%</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Attendance
              </CardTitle>
              <Calendar className="w-5 h-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{academicProgress.attendance}%</div>
              <Progress value={academicProgress.attendance} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Assignments
              </CardTitle>
              <ClipboardCheck className="w-5 h-5 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {academicProgress.assignmentsCompleted}/{academicProgress.totalAssignments}
              </div>
              <Progress 
                value={(academicProgress.assignmentsCompleted / academicProgress.totalAssignments) * 100} 
                className="mt-2 h-2" 
              />
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Upcoming Due
              </CardTitle>
              <Target className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{upcomingAssignments.length}</div>
              <p className="text-xs text-muted-foreground">Assignments due soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Grades */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Recent Grades
                </CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentGrades.map((grade, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{grade.assignment}</h4>
                        <p className="text-sm text-muted-foreground">{grade.subject}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">
                          {grade.grade}/{grade.maxGrade}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((grade.grade / grade.maxGrade) * 100)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Progress value={(grade.grade / grade.maxGrade) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Submitted: {new Date(grade.submittedDate).toLocaleDateString()}</span>
                        <span>Graded: {new Date(grade.gradedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm text-foreground">{assignment.title}</h4>
                    <Badge 
                      variant={assignment.status === 'in_progress' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {assignment.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{assignment.subject}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
              
              <Button className="w-full" size="sm" variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                View All Assignments
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Announcements
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{announcement.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        From {announcement.from} • {new Date(announcement.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge 
                      variant={
                        announcement.type === 'exam' ? 'destructive' :
                        announcement.type === 'event' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {announcement.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}