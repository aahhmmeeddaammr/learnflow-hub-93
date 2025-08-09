import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, TrendingUp, Users, GraduationCap } from "lucide-react";

const reports = [
  {
    title: "Attendance Report",
    description: "Student attendance statistics by group and time period",
    icon: Users,
    lastGenerated: "Dec 15, 2024",
  },
  {
    title: "Academic Performance",
    description: "Grade distributions and academic progress tracking",
    icon: TrendingUp,
    lastGenerated: "Dec 14, 2024",
  },
  {
    title: "Graduation Rates",
    description: "Completion rates and diploma statistics",
    icon: GraduationCap,
    lastGenerated: "Dec 10, 2024",
  },
  {
    title: "System Usage",
    description: "Platform activity and user engagement metrics",
    icon: BarChart3,
    lastGenerated: "Dec 12, 2024",
  },
];

export default function AdminReports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and download comprehensive system reports</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <report.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">{report.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                <p className="text-xs text-muted-foreground mb-4">Last generated: {report.lastGenerated}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-primary text-primary-foreground">
                    Generate Report
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Attendance</p>
              <p className="text-2xl font-bold text-foreground">94.2%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Students</p>
              <p className="text-2xl font-bold text-foreground">1,247</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Graduation Rate</p>
              <p className="text-2xl font-bold text-foreground">89.5%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
