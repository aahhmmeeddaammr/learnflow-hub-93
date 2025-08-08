import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Search, Book, MessageCircle, Phone, Mail } from "lucide-react";

const faqItems = [
  {
    question: "How do I check my grades?",
    answer: "Navigate to the 'My Grades' section in your dashboard to view all your current grades and academic performance.",
  },
  {
    question: "How do I view my attendance?",
    answer: "Go to the 'Attendance' section to see your attendance records for all subjects and overall attendance percentage.",
  },
  {
    question: "How do I submit assignments?",
    answer: "Assignments can be submitted through the course portal. Check with your instructor for specific submission guidelines.",
  },
  {
    question: "Who do I contact for technical issues?",
    answer: "For technical issues, you can raise a support ticket or contact the IT helpdesk at support@school.edu.",
  },
];

export default function Help() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
            <p className="text-muted-foreground">Find answers and get assistance</p>
          </div>
        </div>

        {/* Search */}
        <Card className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for help articles..."
              className="pl-12 h-12"
            />
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">User Guide</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive guide to using the platform
            </p>
            <Button variant="outline" className="w-full">
              Read Guide
            </Button>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Chat with our support team
            </p>
            <Button className="w-full bg-primary text-primary-foreground">
              Start Chat
            </Button>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Call us for immediate assistance
            </p>
            <Button variant="outline" className="w-full">
              Call Now
            </Button>
          </Card>
        </div>

        {/* FAQ */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h3 className="font-medium text-foreground mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Email Support</p>
                <p className="text-sm text-muted-foreground">support@school.edu</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Phone Support</p>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}