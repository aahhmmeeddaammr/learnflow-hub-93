import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Video, 
  Copy, 
  Play, 
  Square, 
  Users, 
  Clock, 
  Calendar as CalendarIcon,
  Download,
  Search,
  Filter,
  Plus,
  Timer,
  TrendingUp,
  FileText
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockSessions = [
  {
    id: 1,
    title: "Data Structures - Arrays & Linked Lists",
    zoomLink: "https://zoom.us/j/123456789",
    status: "scheduled",
    startTime: new Date(2024, 11, 20, 10, 0),
    endTime: new Date(2024, 11, 20, 11, 30),
    actualStartTime: null,
    actualEndTime: null,
    attendanceCount: 0,
    totalStudents: 25
  },
  {
    id: 2,
    title: "Algorithm Analysis - Big O Notation",
    zoomLink: "https://zoom.us/j/987654321",
    status: "ongoing",
    startTime: new Date(2024, 11, 18, 14, 0),
    endTime: new Date(2024, 11, 18, 15, 30),
    actualStartTime: new Date(2024, 11, 18, 14, 5),
    actualEndTime: null,
    attendanceCount: 18,
    totalStudents: 25
  },
  {
    id: 3,
    title: "Database Design Fundamentals",
    zoomLink: "https://zoom.us/j/456789123",
    status: "ended",
    startTime: new Date(2024, 11, 15, 9, 0),
    endTime: new Date(2024, 11, 15, 10, 30),
    actualStartTime: new Date(2024, 11, 15, 9, 2),
    actualEndTime: new Date(2024, 11, 15, 10, 28),
    attendanceCount: 22,
    totalStudents: 25
  }
];

const mockAttendance = [
  { id: 1, sessionId: 2, studentName: "Ahmed Hassan", status: "present", joinTime: "14:05", leaveTime: null },
  { id: 2, sessionId: 2, studentName: "Fatima Al-Zahra", status: "present", joinTime: "14:03", leaveTime: null },
  { id: 3, sessionId: 2, studentName: "Omar Khaled", status: "present", joinTime: "14:07", leaveTime: null },
  { id: 4, sessionId: 2, studentName: "Nour Mahmoud", status: "absent", joinTime: null, leaveTime: null },
  { id: 5, sessionId: 2, studentName: "Youssef Ahmed", status: "present", joinTime: "14:02", leaveTime: null },
];

export default function InstructorGroupDetails() {
  const [sessions, setSessions] = useState(mockSessions);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newSession, setNewSession] = useState({
    title: "",
    date: undefined as Date | undefined,
    startTime: "",
    endTime: "",
    description: ""
  });

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const currentAttendance = mockAttendance.filter(a => a.sessionId === selectedSession);

  const handleStartSession = (sessionId: number) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: "ongoing" as const, actualStartTime: new Date() }
        : session
    ));
    toast({ title: "Session started successfully!" });
  };

  const handleEndSession = (sessionId: number) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: "ended" as const, actualEndTime: new Date() }
        : session
    ));
    toast({ title: "Session ended successfully!" });
  };

  const handleCopyZoomLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({ title: "Zoom link copied to clipboard!" });
  };

  const handleCreateSession = () => {
    if (!newSession.title || !newSession.date || !newSession.startTime || !newSession.endTime) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    const session = {
      id: Date.now(),
      title: newSession.title,
      zoomLink: `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`,
      status: "scheduled" as const,
      startTime: new Date(newSession.date.getTime() + 
        parseInt(newSession.startTime.split(':')[0]) * 60 * 60 * 1000 + 
        parseInt(newSession.startTime.split(':')[1]) * 60 * 1000),
      endTime: new Date(newSession.date.getTime() + 
        parseInt(newSession.endTime.split(':')[0]) * 60 * 60 * 1000 + 
        parseInt(newSession.endTime.split(':')[1]) * 60 * 1000),
      actualStartTime: null,
      actualEndTime: null,
      attendanceCount: 0,
      totalStudents: 25
    };

    setSessions(prev => [...prev, session]);
    setNewSession({ title: "", date: undefined, startTime: "", endTime: "", description: "" });
    setIsCreateModalOpen(false);
    toast({ title: "Session created successfully!" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case "ongoing":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Ongoing</Badge>;
      case "ended":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Ended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTimeUntilSession = (startTime: Date) => {
    const now = new Date();
    const diff = startTime.getTime() - now.getTime();
    if (diff <= 0) return "Session time";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <DashboardLayout role="instructor">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Online Sessions</h1>
            <p className="text-muted-foreground">Manage your online sessions and track attendance</p>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Session
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Session</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Session Title *</Label>
                  <Input
                    id="title"
                    value={newSession.title}
                    onChange={(e) => setNewSession(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter session title"
                  />
                </div>
                <div>
                  <Label>Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newSession.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newSession.date ? format(newSession.date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newSession.date}
                        onSelect={(date) => setNewSession(prev => ({ ...prev, date }))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newSession.startTime}
                      onChange={(e) => setNewSession(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newSession.endTime}
                      onChange={(e) => setNewSession(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newSession.description}
                    onChange={(e) => setNewSession(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Optional description"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateSession} className="flex-1">
                    Create Session
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-bold">{sessions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Attendance</p>
                  <p className="text-2xl font-bold">87%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold">1.5h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="ended">Ended</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sessions List */}
        <div className="grid gap-4">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{session.title}</h3>
                      {getStatusBadge(session.status)}
                      {session.status === "scheduled" && (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          <Timer className="w-3 h-3 mr-1" />
                          {getTimeUntilSession(session.startTime)}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span>📅 {format(session.startTime, "MMM dd, yyyy")}</span>
                      <span>🕐 {format(session.startTime, "HH:mm")} - {format(session.endTime, "HH:mm")}</span>
                      <span>👥 {session.attendanceCount}/{session.totalStudents} present</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <Input
                        value={session.zoomLink}
                        readOnly
                        className="flex-1 text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyZoomLink(session.zoomLink)}
                        className="flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {session.status === "scheduled" && (
                      <Button
                        onClick={() => handleStartSession(session.id)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <Play className="w-4 h-4" />
                        Start Session
                      </Button>
                    )}
                    
                    {session.status === "ongoing" && (
                      <Button
                        onClick={() => handleEndSession(session.id)}
                        variant="destructive"
                        className="flex items-center gap-2"
                      >
                        <Square className="w-4 h-4" />
                        End Session
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      onClick={() => setSelectedSession(selectedSession === session.id ? null : session.id)}
                      className="flex items-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      {selectedSession === session.id ? "Hide" : "View"} Attendance
                    </Button>
                  </div>
                </div>
                
                {/* Attendance Table */}
                {selectedSession === session.id && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Live Attendance</h4>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {currentAttendance.filter(a => a.status === "present").length}/{currentAttendance.length} Present
                      </Badge>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Join Time</TableHead>
                            <TableHead>Leave Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentAttendance.map((attendance) => (
                            <TableRow key={attendance.id}>
                              <TableCell className="font-medium">{attendance.studentName}</TableCell>
                              <TableCell>
                                {attendance.status === "present" ? (
                                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    ✅ Present
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                                    ❌ Absent
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>{attendance.joinTime || "-"}</TableCell>
                              <TableCell>{attendance.leaveTime || "Still in session"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No sessions found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Create your first online session to get started"
                }
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  Create First Session
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}