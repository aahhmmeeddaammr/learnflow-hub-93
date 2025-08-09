import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import AdminUsers from "./admin/AdminUsers";
import AdminInstructors from "./admin/AdminInstructors";
import AdminMentors from "./admin/AdminMentors";
import AdminDiplomas from "./admin/AdminDiplomas";
import AdminGroups from "./admin/AdminGroups";
import AdminExcuses from "./admin/AdminExcuses";
import AdminRequests from "./admin/AdminRequests";
import AdminReports from "./admin/AdminReports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  GraduationCap, 
  School, 
  UserCheck,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

function AdminOverview() {
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      icon: Users,
      change: "+12%",
      color: "text-primary"
    },
    {
      title: "Active Groups",
      value: "45",
      icon: School,
      change: "+8%",
      color: "text-success"
    },
    {
      title: "Diplomas",
      value: "12",
      icon: GraduationCap,
      change: "+2%",
      color: "text-warning"
    },
    {
      title: "Staff Members",
      value: "89",
      icon: UserCheck,
      change: "+5%",
      color: "text-primary"
    }
  ];

  const recentRequests = [
    {
      id: 1,
      type: "Sick Leave",
      from: "John Smith",
      role: "Instructor",
      date: "2024-01-15",
      status: "pending"
    },
    {
      id: 2,
      type: "Vacation",
      from: "Sarah Wilson",
      role: "Mentor",
      date: "2024-01-14",
      status: "approved"
    },
    {
      id: 3,
      type: "Grade Correction",
      from: "Mike Johnson",
      role: "Instructor",
      date: "2024-01-13",
      status: "pending"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Professional Header */}
      <div className="animate-fade-in">
        <h1 className="text-display gradient-primary bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-subtitle mt-3">
          Manage your educational institution efficiently with real-time insights
        </p>
      </div>

      {/* Professional Stats Grid */}
      <div className="grid-responsive">
        {stats.map((stat, index) => (
          <div key={index} className="dashboard-stat-card animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption">{stat.title}</p>
                <p className="text-3xl lg:text-4xl font-bold text-foreground mt-2">{stat.value}</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-success font-medium">{stat.change}</span>
                  <span className="text-caption">from last month</span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl micro-float">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Professional Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Professional Recent Requests */}
        <div className="lg:col-span-2 section-container animate-fade-in-left">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-title flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              Recent Requests
            </h3>
            <Button variant="outline" size="sm" className="micro-bounce">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentRequests.map((request, index) => (
              <div key={request.id} className="action-card animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-foreground">{request.type}</h4>
                      <span className={`role-badge role-${request.role.toLowerCase()}`}>
                        {request.role}
                      </span>
                    </div>
                    <p className="text-caption">
                      From {request.from} • {new Date(request.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {request.status === 'pending' ? (
                      <>
                        <Button size="sm" variant="outline" className="h-8 micro-bounce">
                          Decline
                        </Button>
                        <Button size="sm" className="h-8 btn-primary">
                          Approve
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Approved</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Quick Actions */}
        <div className="section-container animate-fade-in-right">
          <h3 className="text-title mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start btn-primary micro-glow">
              <Users className="w-4 h-4 mr-3" />
              Add New Student
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <School className="w-4 h-4 mr-3" />
              Create Group
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <GraduationCap className="w-4 h-4 mr-3" />
              Add Diploma
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <UserCheck className="w-4 h-4 mr-3" />
              Invite Staff
            </Button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="text-sm font-medium mb-4">System Status</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-caption">Server Status</span>
                <div className="flex items-center gap-2">
                  <div className="status-dot status-online"></div>
                  <span className="text-sm text-success">Online</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-caption">Database</span>
                <div className="flex items-center gap-2">
                  <div className="status-dot status-online"></div>
                  <span className="text-sm text-success">Connected</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-caption">Backup</span>
                <div className="flex items-center gap-2">
                  <div className="status-dot status-busy"></div>
                  <span className="text-sm text-warning">In Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional System Alerts */}
      <div className="section-container border-warning/30 bg-gradient-to-r from-warning/5 to-warning/10 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-warning/15 rounded-lg animate-pulse">
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <h3 className="text-title text-warning">System Alerts</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="action-card border-warning/20">
            <div className="flex items-start gap-3">
              <div className="status-dot status-busy mt-2"></div>
              <div>
                <p className="text-sm font-medium text-foreground">Resource Limit</p>
                <p className="text-caption">Monthly ticket limit reached for 3 instructors</p>
              </div>
            </div>
          </div>
          <div className="action-card border-warning/20">
            <div className="flex items-start gap-3">
              <div className="status-dot status-away mt-2"></div>
              <div>
                <p className="text-sm font-medium text-foreground">Pending Reviews</p>
                <p className="text-caption">5 pending grade submissions require review</p>
              </div>
            </div>
          </div>
          <div className="action-card border-warning/20">
            <div className="flex items-start gap-3">
              <div className="status-dot status-busy mt-2"></div>
              <div>
                <p className="text-sm font-medium text-foreground">Overdue Report</p>
                <p className="text-caption">Attendance report for Group CS-101 is overdue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="instructors" element={<AdminInstructors />} />
        <Route path="mentors" element={<AdminMentors />} />
        <Route path="diplomas" element={<AdminDiplomas />} />
        <Route path="groups" element={<AdminGroups />} />
        <Route path="excuses" element={<AdminExcuses />} />
        <Route path="requests" element={<AdminRequests />} />
        <Route path="reports" element={<AdminReports />} />
      </Routes>
    </DashboardLayout>
  );
}