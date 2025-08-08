import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, User, AlertCircle } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Final Exam Schedule Released",
    content: "The final examination schedule for this semester has been published. Please check your student portal for detailed timing and room assignments.",
    author: "Academic Office",
    date: "Dec 15, 2024",
    priority: "high",
    type: "exam",
  },
  {
    id: 2,
    title: "Holiday Break Announcement",
    content: "Classes will be suspended from December 20th to January 8th for the winter holiday break. Regular classes will resume on January 9th.",
    author: "Administration",
    date: "Dec 14, 2024",
    priority: "normal",
    type: "general",
  },
  {
    id: 3,
    title: "Library Hours Extended",
    content: "The library will extend its operating hours during the exam period. New hours: Monday-Friday 7:00 AM to 11:00 PM, Saturday-Sunday 9:00 AM to 9:00 PM.",
    author: "Library Services",
    date: "Dec 13, 2024",
    priority: "normal",
    type: "facility",
  },
  {
    id: 4,
    title: "Assignment Deadline Reminder",
    content: "Reminder: Software Engineering project submissions are due on December 18th at 11:59 PM. Late submissions will incur penalty points.",
    author: "Dr. Emily Rodriguez",
    date: "Dec 12, 2024",
    priority: "high",
    type: "assignment",
  },
  {
    id: 5,
    title: "Career Fair Registration Open",
    content: "Registration is now open for the Spring Career Fair scheduled for February 15th. Meet with top employers and explore internship opportunities.",
    author: "Career Services",
    date: "Dec 10, 2024",
    priority: "normal",
    type: "event",
  },
];

export default function StudentAnnouncements() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
            <p className="text-muted-foreground">
              Stay updated with important news and notifications
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  {announcement.priority === "high" ? (
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  ) : (
                    <FileText className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-lg">
                      {announcement.title}
                    </h3>
                    <div className="flex gap-2">
                      <Badge
                        variant={announcement.priority === "high" ? "destructive" : "secondary"}
                      >
                        {announcement.priority}
                      </Badge>
                      <Badge variant="outline">
                        {announcement.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {announcement.content}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {announcement.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {announcement.date}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}