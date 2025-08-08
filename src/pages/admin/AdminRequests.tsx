import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar, CheckCircle, XCircle } from "lucide-react";

const requests = [
  {
    id: 1,
    type: "Leave Request",
    requester: "John Smith",
    role: "Student",
    date: "Dec 15, 2024",
    reason: "Medical appointment",
    status: "pending",
  },
  {
    id: 2,
    type: "Grade Change",
    requester: "Emily Davis",
    role: "Student",
    date: "Dec 14, 2024",
    reason: "Assignment resubmission",
    status: "approved",
  },
  {
    id: 3,
    type: "Schedule Change",
    requester: "Dr. Sarah Johnson",
    role: "Instructor",
    date: "Dec 13, 2024",
    reason: "Room conflict",
    status: "pending",
  },
  {
    id: 4,
    type: "Equipment Request",
    requester: "Alex Thompson",
    role: "Mentor",
    date: "Dec 12, 2024",
    reason: "Projector for presentation",
    status: "rejected",
  },
];

export default function AdminRequests() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Requests</h1>
            <p className="text-muted-foreground">
              Review and manage all system requests
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {request.type}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      From: {request.requester} ({request.role})
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {request.date}
                    </div>
                    <p className="text-sm text-foreground mt-1">
                      {request.reason}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      request.status === "approved"
                        ? "default"
                        : request.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}