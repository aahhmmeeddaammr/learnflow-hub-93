import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

const attendanceData = [
  {
    subject: "Advanced Programming",
    instructor: "Dr. Sarah Johnson",
    totalClasses: 24,
    attended: 23,
    percentage: 95.8,
  },
  {
    subject: "Database Systems",
    instructor: "Prof. Michael Chen",
    totalClasses: 20,
    attended: 18,
    percentage: 90.0,
  },
  {
    subject: "Software Engineering",
    instructor: "Dr. Emily Rodriguez",
    totalClasses: 22,
    attended: 19,
    percentage: 86.4,
  },
];

const recentAttendance = [
  {
    date: "Dec 15, 2024",
    subject: "Advanced Programming",
    status: "present",
    time: "10:00 AM",
  },
  {
    date: "Dec 14, 2024",
    subject: "Database Systems",
    status: "present",
    time: "2:00 PM",
  },
  {
    date: "Dec 13, 2024",
    subject: "Software Engineering",
    status: "absent",
    time: "9:00 AM",
  },
  {
    date: "Dec 12, 2024",
    subject: "Advanced Programming",
    status: "present",
    time: "10:00 AM",
  },
];

export default function StudentAttendance() {
  const overallAttendance = Math.round(
    attendanceData.reduce((acc, item) => acc + item.percentage, 0) / attendanceData.length
  );

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Attendance</h1>
            <p className="text-muted-foreground">
              Track your class attendance and view attendance history
            </p>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{overallAttendance}%</h3>
              <p className="text-muted-foreground">Overall Attendance</p>
              <Badge variant={overallAttendance >= 90 ? "default" : "secondary"} className="mt-2">
                {overallAttendance >= 90 ? "Excellent" : "Good"}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Subject-wise Attendance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Subject-wise Attendance</h3>
          <div className="space-y-4">
            {attendanceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">{item.subject}</h4>
                  <p className="text-sm text-muted-foreground">{item.instructor}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-foreground">
                      {item.percentage}%
                    </span>
                    <Badge variant={item.percentage >= 90 ? "default" : "secondary"}>
                      {item.attended}/{item.totalClasses}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Attendance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Attendance</h3>
          <div className="space-y-3">
            {recentAttendance.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    record.status === "present" ? "bg-green-100" : "bg-red-100"
                  }`}>
                    {record.status === "present" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{record.subject}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {record.date}
                      <Clock className="w-3 h-3" />
                      {record.time}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={record.status === "present" ? "default" : "destructive"}
                >
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}