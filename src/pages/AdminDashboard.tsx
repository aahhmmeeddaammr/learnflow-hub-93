import { DashboardLayout } from "@/components/layouts/DashboardLayout";
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

export default function AdminDashboard() {
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
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your educational institution efficiently
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="dashboard-card hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <span className="text-success">{stat.change}</span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Requests */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Requests
                </CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{request.type}</h4>
                        <span className={`role-badge role-${request.role.toLowerCase()}`}>
                          {request.role}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        From {request.from} • {new Date(request.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {request.status === 'pending' ? (
                        <>
                          <Button size="sm" variant="outline" className="h-8">
                            Decline
                          </Button>
                          <Button size="sm" className="h-8">
                            Approve
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center gap-1 text-success">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Approved</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Add New Student
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <School className="w-4 h-4 mr-2" />
                Create Group
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <GraduationCap className="w-4 h-4 mr-2" />
                Add Diploma
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <UserCheck className="w-4 h-4 mr-2" />
                Invite Staff
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Alerts */}
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="w-5 h-5" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • Monthly ticket limit reached for 3 instructors
              </p>
              <p className="text-sm text-muted-foreground">
                • 5 pending grade submissions require review
              </p>
              <p className="text-sm text-muted-foreground">
                • Attendance report for Group CS-101 is overdue
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}