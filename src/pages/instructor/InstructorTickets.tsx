import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Calendar } from "lucide-react";

const tickets = [
  {
    id: 1,
    title: "Classroom Projector Issue",
    description: "Projector in Room 301 not working properly",
    status: "open",
    priority: "high",
    createdAt: "Dec 15, 2024",
  },
  {
    id: 2,
    title: "Student Grade Correction",
    description: "Need to update final grade for Emily Davis",
    status: "in-progress",
    priority: "medium",
    createdAt: "Dec 14, 2024",
  },
  {
    id: 3,
    title: "Schedule Conflict",
    description: "Two classes scheduled at same time in same room",
    status: "resolved",
    priority: "high",
    createdAt: "Dec 12, 2024",
  },
];

export default function InstructorTickets() {
  return (
    <DashboardLayout role="instructor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>
            <p className="text-muted-foreground">
              Raise tickets and track support requests
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>

        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">
                      {ticket.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {ticket.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {ticket.createdAt}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      ticket.status === "resolved"
                        ? "default"
                        : ticket.status === "in-progress"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {ticket.status}
                  </Badge>
                  <Badge
                    variant={
                      ticket.priority === "high"
                        ? "destructive"
                        : ticket.priority === "medium"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {ticket.priority}
                  </Badge>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}