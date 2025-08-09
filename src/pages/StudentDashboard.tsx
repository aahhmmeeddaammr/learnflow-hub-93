import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import StudentGrades from "./student/StudentGrades";
import StudentAttendance from "./student/StudentAttendance";
import StudentExcuses from "./student/StudentExcuses";
import StudentAnnouncements from "./student/StudentAnnouncements";
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
  Target,
  CheckCircle,
  BarChart
} from "lucide-react";

function StudentOverview() {
  const stats = [
    {
      title: "Current Courses",
      value: "4",
      icon: BookOpen,
      description: "Active enrollments",
      color: "text-primary"
    },
    {
      title: "Completed Assignments",
      value: "23",
      icon: CheckCircle,
      description: "+3 this week",
      color: "text-success"
    },
    {
      title: "Overall Grade",
      value: "A-",
      icon: BarChart,
      description: "86.5% average",
      color: "text-warning"
    },
    {
      title: "Attendance",
      value: "95%",
      icon: Calendar,
      description: "Above average",
      color: "text-primary"
    }
  ];

  const upcomingAssignments = [
    { 
      title: "React Fundamentals Project", 
      due: "Tomorrow", 
      subject: "Frontend Development", 
      priority: "high",
      progress: 85
    },
    { 
      title: "Database Design Assignment", 
      due: "3 days", 
      subject: "Backend Development", 
      priority: "medium",
      progress: 60
    },
    { 
      title: "UI/UX Case Study", 
      due: "1 week", 
      subject: "Design Thinking", 
      priority: "low",
      progress: 30
    },
  ];

  const recentGrades = [
    { subject: "JavaScript Advanced", grade: "A+", date: "2 days ago", score: 98 },
    { subject: "Node.js Basics", grade: "A", date: "1 week ago", score: 92 },
    { subject: "React Components", grade: "A-", date: "2 weeks ago", score: 88 },
  ];

  const currentCourses = [
    { name: "Frontend Development", progress: 78, instructor: "John Smith", nextClass: "Today 2:00 PM" },
    { name: "Backend Development", progress: 65, instructor: "Sarah Wilson", nextClass: "Tomorrow 10:00 AM" },
    { name: "Database Design", progress: 82, instructor: "Mike Johnson", nextClass: "Wed 3:00 PM" },
    { name: "UI/UX Design", progress: 45, instructor: "Emily Davis", nextClass: "Thu 11:00 AM" },
  ];

  return (
    <div className="space-y-8">
      {/* Professional Header */}
      <div className="animate-fade-in">
        <h1 className="text-display gradient-primary bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        <p className="text-subtitle mt-3">
          Track your learning progress and stay on top of your assignments
        </p>
      </div>

      {/* Professional Stats Grid */}
      <div className="grid-responsive">
        {stats.map((stat, index) => (
          <div key={index} className="dashboard-metric-card animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-caption">{stat.title}</p>
                <div className="p-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{stat.value}</p>
              <p className="text-caption text-success">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Upcoming Assignments */}
        <div className="xl:col-span-2 section-container animate-fade-in-left">
          <h3 className="text-title mb-6 flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            Upcoming Assignments
          </h3>
          <div className="space-y-4">
            {upcomingAssignments.map((assignment, index) => (
              <div key={index} className="action-card animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`w-3 h-3 rounded-full mt-2 ${assignment.priority === 'high' ? 'bg-destructive' : assignment.priority === 'medium' ? 'bg-warning' : 'bg-success'} animate-pulse`}></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{assignment.title}</h4>
                        <p className="text-caption truncate">{assignment.subject}</p>
                      </div>
                    </div>
                    <div className={`text-2xs px-3 py-1 rounded-full ${assignment.due === 'Tomorrow' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`}>
                      Due {assignment.due}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xs text-muted-foreground">Progress</span>
                      <span className="text-2xs text-foreground font-medium">{assignment.progress}%</span>
                    </div>
                    <Progress value={assignment.progress} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Grades & Current Courses */}
        <div className="space-y-6">
          {/* Recent Grades */}
          <div className="section-container animate-fade-in-right">
            <h3 className="text-title mb-6 flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Award className="w-5 h-5 text-success" />
              </div>
              Recent Grades
            </h3>
            <div className="space-y-3">
              {recentGrades.map((grade, index) => (
                <div key={index} className="action-card animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{grade.subject}</p>
                      <p className="text-caption">{grade.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-lg font-bold text-success">{grade.grade}</p>
                        <p className="text-2xs text-muted-foreground">{grade.score}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Courses */}
          <div className="section-container animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-title mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              Current Courses
            </h3>
            <div className="space-y-3">
              {currentCourses.map((course, index) => (
                <div key={index} className="action-card animate-fade-in" style={{ animationDelay: `${0.05 * index}s` }}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{course.name}</p>
                        <p className="text-caption">{course.instructor}</p>
                      </div>
                      <Badge variant="outline" className="text-2xs">
                        {course.progress}%
                      </Badge>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-2xs text-muted-foreground">Next: {course.nextClass}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="section-container animate-fade-in-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-title">This Week's Goals</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="action-card text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <p className="text-sm font-medium text-foreground">Complete 3 Assignments</p>
            <p className="text-caption">2 of 3 completed</p>
          </div>
          <div className="action-card text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-warning" />
            </div>
            <p className="text-sm font-medium text-foreground">Study 15 Hours</p>
            <p className="text-caption">12 of 15 hours</p>
          </div>
          <div className="action-card text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">Improve Grade</p>
            <p className="text-caption">Target: A average</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <Routes>
        <Route index element={<StudentOverview />} />
        <Route path="grades" element={<StudentGrades />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="excuses" element={<StudentExcuses />} />
        <Route path="announcements" element={<StudentAnnouncements />} />
      </Routes>
    </DashboardLayout>
  );
}