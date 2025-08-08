import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus } from "lucide-react";

const tickets = [
  { id: 1, title: "Student Grade Query", status: "open", priority: "medium" },
  { id: 2, title: "Assignment Extension Request", status: "resolved", priority: "low" },
];

export default function MentorTickets() {
  return (
    <DashboardLayout role="mentor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <Button><Plus className="w-4 h-4 mr-2" />New Ticket</Button>
        </div>
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <MessageSquare className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{ticket.title}</h3>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={ticket.status === "resolved" ? "default" : "secondary"}>
                    {ticket.status}
                  </Badge>
                  <Badge variant="outline">{ticket.priority}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}