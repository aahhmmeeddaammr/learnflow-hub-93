import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, Clock, Users, TrendingUp, Copy, Play, Square, Video, MapPin, Globe, 
  CheckCircle2, XCircle, Plus, FileText, Download, Eye, Edit, Trash2, 
  User, BookOpen, MessageSquare, BarChart3, Filter, Search, SortAsc
} from 'lucide-react';
import { format, parseISO, differenceInHours, differenceInMinutes, isToday, isFuture, isPast } from 'date-fns';

interface Student {
  id: string;
  name: string;
  email: string;
  joinTime?: string | null;
  leaveTime?: string | null;
  attendanceStatus: 'Present' | 'Absent' | 'Late' | 'Excused';
  notes?: string;
}

interface SessionNote {
  id: string;
  content: string;
  timestamp: string;
  author: string;
}

interface Session {
  id: string;
  title: string;
  description?: string;
  status: 'Ended' | 'Scheduled' | 'Ongoing';
  variant: 'Instructor' | 'Mentor';
  type: 'Online' | 'offline' | 'online';
  branch: string;
  room?: string;
  date: string;
  startTime?: string | null;
  endTime?: string | null;
  from?: string;
  to?: string;
  link?: string;
  linkId?: number;
  students?: Student[];
  notes?: SessionNote[];
  materialsCovered?: string[];
  homework?: string;
  nextTopics?: string[];
}

// Enhanced mock data with more details
const mockSessions: Session[] = [
  {
    id: "68d484bb089b6064c2d7484e",
    title: "Advanced React Patterns & State Management",
    description: "Deep dive into React hooks, context API, and advanced patterns",
    status: "Ended",
    variant: "Instructor",
    type: "Online",
    branch: "online",
    date: "2025-09-24T23:54:35.741Z",
    startTime: "2025-09-24T23:59:20.111Z",
    endTime: "2025-09-25T03:13:18Z",
    link: "https://us06web.zoom.us/s/83754431817",
    linkId: 83754431817,
    students: [
      {
        id: "1",
        name: "Ahmed Hassan",
        email: "ahmed.hassan@example.com",
        joinTime: "2025-09-24T23:59:30.000Z",
        leaveTime: "2025-09-25T03:13:00.000Z",
        attendanceStatus: "Present",
        notes: "Very engaged, asked good questions"
      },
      {
        id: "2", 
        name: "Sara Mohamed",
        email: "sara.mohamed@example.com",
        joinTime: "2025-09-25T00:05:00.000Z",
        leaveTime: "2025-09-25T03:13:18.000Z",
        attendanceStatus: "Late",
        notes: "Joined 5 minutes late but caught up quickly"
      },
      {
        id: "3",
        name: "Omar Ali",
        email: "omar.ali@example.com",
        attendanceStatus: "Absent",
        notes: "Informed about absence beforehand"
      }
    ],
    materialsCovered: [
      "React useContext hook",
      "Custom hooks creation",
      "State management patterns",
      "Performance optimization"
    ],
    homework: "Create a custom hook for form validation",
    nextTopics: ["Redux Toolkit", "React Query", "Testing React components"],
    notes: [
      {
        id: "1",
        content: "Students showed great understanding of context API",
        timestamp: "2025-09-25T01:30:00.000Z",
        author: "Ali Osama"
      },
      {
        id: "2", 
        content: "Need to review custom hooks in next session",
        timestamp: "2025-09-25T03:00:00.000Z",
        author: "Ali Osama"
      }
    ]
  },
  {
    id: "68d4839bc6f0a92d4551fa3c",
    title: "Database Design & SQL Fundamentals",
    description: "Introduction to relational databases and SQL queries",
    status: "Scheduled",
    variant: "Instructor",
    type: "offline",
    branch: "Dokki",
    room: "Lab 205",
    date: "2025-09-25T00:00:00.000Z",
    from: "10:00",
    to: "13:00",
    students: [
      {
        id: "4",
        name: "Fatima Ahmed",
        email: "fatima.ahmed@example.com",
        attendanceStatus: "Present"
      },
      {
        id: "5",
        name: "Mahmoud Khaled",
        email: "mahmoud.khaled@example.com", 
        attendanceStatus: "Present"
      }
    ],
    materialsCovered: [],
    nextTopics: ["Database normalization", "Advanced SQL queries", "Stored procedures"]
  },
  {
    id: "68d48523089b6064c2d7486c",
    title: "Machine Learning Workshop with Mentor Youssef",
    description: "Hands-on session covering supervised learning algorithms",
    status: "Scheduled",
    variant: "Mentor",
    type: "online",
    branch: "Online",
    date: "2025-09-25T00:00:00.000Z",
    from: "19:00",
    to: "22:00",
    startTime: null,
    endTime: null,
    students: [
      {
        id: "6",
        name: "Nour Hassan",
        email: "nour.hassan@example.com",
        attendanceStatus: "Present"
      },
      {
        id: "7",
        name: "Karim Ali",
        email: "karim.ali@example.com",
        attendanceStatus: "Present"
      },
      {
        id: "8",
        name: "Aya Mohamed",
        email: "aya.mohamed@example.com",
        attendanceStatus: "Present"
      }
    ],
    materialsCovered: [],
    homework: "Practice linear regression with provided dataset",
    nextTopics: ["Decision Trees", "Random Forest", "Model Evaluation"]
  },
  {
    id: "session-4",
    title: "Advanced JavaScript & ES6+ Features",
    description: "Modern JavaScript concepts and best practices",
    status: "Ongoing",
    variant: "Instructor",
    type: "offline",
    branch: "Maadi",
    room: "Room 302", 
    date: "2025-09-25T00:00:00.000Z",
    from: "10:00",
    to: "13:00",
    startTime: "2025-09-25T10:00:00.000Z",
    endTime: null,
    students: [
      {
        id: "9",
        name: "Yasmin Ali",
        email: "yasmin.ali@example.com",
        joinTime: "2025-09-25T10:02:00.000Z",
        attendanceStatus: "Present"
      },
      {
        id: "10",
        name: "Amr Hassan",
        email: "amr.hassan@example.com",
        joinTime: "2025-09-25T10:00:00.000Z",
        attendanceStatus: "Present"
      }
    ],
    materialsCovered: ["Arrow functions", "Destructuring", "Template literals"],
    nextTopics: ["Async/Await", "Modules", "Classes"]
  },
  {
    id: "session-5",
    title: "React Fundamentals",
    status: "Scheduled",
    variant: "Instructor",
    type: "online",
    branch: "Online",
    date: "2025-09-26T00:00:00.000Z",
    from: "14:00",
    to: "16:00"
  },
  {
    id: "session-6",
    title: "Database Design Session",
    status: "Ended",
    variant: "Mentor",
    type: "offline",
    branch: "Nasr City",
    date: "2025-09-23T00:00:00.000Z",
    startTime: "2025-09-23T09:00:00.000Z",
    endTime: "2025-09-23T11:30:00.000Z"
  }
];

const filterOptions = [
  { value: 'all', label: 'All Sessions' },
  { value: 'today', label: 'Today' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
  { value: 'ongoing', label: 'Ongoing' }
];

export default function InstructorSessions() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'status'>('date');
  const { toast } = useToast();

  // Filter and search sessions
  const filteredSessions = useMemo(() => {
    let filtered = sessions.filter(session => {
      const sessionDate = parseISO(session.date);
      
      // Filter by status
      const statusMatch = (() => {
        switch (selectedFilter) {
          case 'today':
            return isToday(sessionDate);
          case 'upcoming':
            return session.status === 'Scheduled' || (session.status === 'Ongoing' && isFuture(sessionDate));
          case 'completed':
            return session.status === 'Ended';
          case 'ongoing':
            return session.status === 'Ongoing';
          default:
            return true;
        }
      })();

      // Filter by search term
      const searchMatch = searchTerm === '' || 
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.variant.toLowerCase().includes(searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    });

    // Sort sessions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  }, [sessions, selectedFilter, searchTerm, sortBy]);

  // Calculate analytics
  const analytics = useMemo(() => {
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.status === 'Ended').length;
    const nonCompletedSessions = sessions.filter(s => s.status !== 'Ended').length;
    
    // Calculate total hours from completed sessions
    const totalHours = sessions.reduce((acc, session) => {
      if (session.startTime && session.endTime) {
        const start = parseISO(session.startTime);
        const end = parseISO(session.endTime);
        const hours = differenceInHours(end, start);
        const minutes = differenceInMinutes(end, start) % 60;
        return acc + hours + (minutes / 60);
      } else if (session.from && session.to) {
        const [fromHour, fromMin] = session.from.split(':').map(Number);
        const [toHour, toMin] = session.to.split(':').map(Number);
        const fromMinutes = fromHour * 60 + fromMin;
        const toMinutes = toHour * 60 + toMin;
        return acc + (toMinutes - fromMinutes) / 60;
      }
      return acc;
    }, 0);

    return {
      totalSessions,
      totalHours: Math.round(totalHours * 100) / 100,
      completedSessions,
      nonCompletedSessions
    };
  }, [sessions]);

  // Handle session actions
  const handleStartSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'Ongoing' as const, startTime: new Date().toISOString() }
        : session
    ));
    toast({
      title: 'Session Started',
      description: 'The session has been started successfully.',
    });
  };

  const handleEndSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'Ended' as const, endTime: new Date().toISOString() }
        : session
    ));
    toast({
      title: 'Session Ended',
      description: 'The session has been ended successfully.',
    });
  };

  const handleCreateSession = (sessionId: string) => {
    // Mock creating a session link
    const mockLink = `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`;
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, link: mockLink, linkId: Math.floor(Math.random() * 1000000000) }
        : session
    ));
    toast({
      title: 'Session Created',
      description: 'Online session link has been created successfully.',
    });
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: 'Link Copied',
      description: 'Session link has been copied to clipboard.',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case 'Ongoing':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Ongoing</Badge>;
      case 'Ended':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Ended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getVariantBadge = (variant: string, type: string) => {
    const isOnline = type.toLowerCase().includes('online');
    if (variant === 'Instructor') {
      return (
        <Badge variant="outline" className={`${isOnline ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
          {isOnline ? <Globe className="w-3 h-3 mr-1" /> : <MapPin className="w-3 h-3 mr-1" />}
          {variant} - {isOnline ? 'Online' : 'Offline'}
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className={`${isOnline ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
          {isOnline ? <Globe className="w-3 h-3 mr-1" /> : <MapPin className="w-3 h-3 mr-1" />}
          {variant} - {isOnline ? 'Online' : 'Offline'}
        </Badge>
      );
    }
  };

  const formatDuration = (session: Session) => {
    if (session.startTime && session.endTime) {
      const start = parseISO(session.startTime);
      const end = parseISO(session.endTime);
      const hours = differenceInHours(end, start);
      const minutes = differenceInMinutes(end, start) % 60;
      return `${hours}h ${minutes}m`;
    } else if (session.from && session.to) {
      const [fromHour, fromMin] = session.from.split(':').map(Number);
      const [toHour, toMin] = session.to.split(':').map(Number);
      const fromMinutes = fromHour * 60 + fromMin;
      const toMinutes = toHour * 60 + toMin;
      const totalMinutes = toMinutes - fromMinutes;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h ${minutes}m`;
    }
    return 'N/A';
  };

  const renderSessionActions = (session: Session) => {
    const isOffline = session.type === 'offline';
    const isOnline = session.type.toLowerCase().includes('online');

    if (isOffline) {
      // Offline session logic
      if (!session.startTime) {
        return (
          <Button 
            onClick={() => handleStartSession(session.id)}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-3 h-3 mr-1" />
            Start
          </Button>
        );
      } else if (session.startTime && !session.endTime) {
        return (
          <Button 
            onClick={() => handleEndSession(session.id)}
            size="sm"
            variant="destructive"
          >
            <Square className="w-3 h-3 mr-1" />
            End
          </Button>
        );
      } else {
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      }
    } else if (isOnline) {
      // Online session logic
      if (!session.link) {
        return (
          <Button 
            onClick={() => handleCreateSession(session.id)}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-3 h-3 mr-1" />
            Create Session
          </Button>
        );
      } else {
        return (
          <div className="flex items-center space-x-2">
            <Video className="h-4 w-4 text-blue-600" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyLink(session.link!)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy Link
            </Button>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sessions Management</h1>
          <p className="text-muted-foreground">
            Manage your teaching sessions and track progress
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter sessions" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: 'date' | 'title' | 'status') => setSortBy(value)}>
            <SelectTrigger className="w-[140px]">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              All scheduled sessions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalHours}h</div>
            <p className="text-xs text-muted-foreground">
              Teaching time logged
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analytics.completedSessions}</div>
            <p className="text-xs text-muted-foreground">
              Successfully finished
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non-Completed</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{analytics.nonCompletedSessions}</div>
            <p className="text-xs text-muted-foreground">
              Pending or in progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSessions.map((session) => (
          <Card key={session.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg line-clamp-2">{session.title}</CardTitle>
                  <CardDescription>{session.branch}</CardDescription>
                </div>
                {getStatusBadge(session.status)}
              </div>
              <div className="flex flex-wrap gap-2">
                {getVariantBadge(session.variant, session.type)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date and Time */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(parseISO(session.date), 'MMM dd, yyyy')}</span>
              </div>
              
              {/* Duration */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  {session.from && session.to ? `${session.from} - ${session.to}` : 'Duration: '}
                  {formatDuration(session)}
                </span>
              </div>

              {/* Session Actions */}
              <div className="pt-2 flex flex-col space-y-2">
                <div className="flex space-x-2">
                  {renderSessionActions(session)}
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedSession(session)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                    <DialogHeader>
                      <DialogTitle className="text-xl">{selectedSession?.title}</DialogTitle>
                      <DialogDescription>
                        {selectedSession?.description || 'Session details and management'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    {selectedSession && (
                      <ScrollArea className="max-h-[70vh] pr-4">
                        <div className="space-y-6">
                          {/* Session Overview */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Session Info</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Date:</span>
                                  <span className="text-sm font-medium">{format(parseISO(selectedSession.date), 'MMM dd, yyyy')}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Time:</span>
                                  <span className="text-sm font-medium">
                                    {selectedSession.from && selectedSession.to ? `${selectedSession.from} - ${selectedSession.to}` : 'TBD'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Duration:</span>
                                  <span className="text-sm font-medium">{formatDuration(selectedSession)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Type:</span>
                                  <div>{getVariantBadge(selectedSession.variant, selectedSession.type)}</div>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Status:</span>
                                  <div>{getStatusBadge(selectedSession.status)}</div>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Location:</span>
                                  <span className="text-sm font-medium">
                                    {selectedSession.room ? `${selectedSession.branch} - ${selectedSession.room}` : selectedSession.branch}
                                  </span>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Attendance Summary */}
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Summary</CardTitle>
                              </CardHeader>
                              <CardContent>
                                {selectedSession.students ? (
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Total Students:</span>
                                      <span className="text-sm font-medium">{selectedSession.students.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Present:</span>
                                      <span className="text-sm font-medium text-green-600">
                                        {selectedSession.students.filter(s => s.attendanceStatus === 'Present').length}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Absent:</span>
                                      <span className="text-sm font-medium text-red-600">
                                        {selectedSession.students.filter(s => s.attendanceStatus === 'Absent').length}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Late:</span>
                                      <span className="text-sm font-medium text-orange-600">
                                        {selectedSession.students.filter(s => s.attendanceStatus === 'Late').length}
                                      </span>
                                    </div>
                                    <div className="mt-2">
                                      <Progress 
                                        value={(selectedSession.students.filter(s => s.attendanceStatus === 'Present' || s.attendanceStatus === 'Late').length / selectedSession.students.length) * 100} 
                                        className="h-2"
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground">No attendance data available</p>
                                )}
                              </CardContent>
                            </Card>
                          </div>

                          {/* Student Attendance Table */}
                          {selectedSession.students && (
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <Users className="h-5 w-5" />
                                  Student Attendance
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Student Name</TableHead>
                                      <TableHead>Email</TableHead>
                                      <TableHead>Join Time</TableHead>
                                      <TableHead>Leave Time</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead>Notes</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {selectedSession.students.map((student) => (
                                      <TableRow key={student.id}>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{student.email}</TableCell>
                                        <TableCell className="text-sm">
                                          {student.joinTime ? format(parseISO(student.joinTime), 'HH:mm') : 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                          {student.leaveTime ? format(parseISO(student.leaveTime), 'HH:mm') : 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                          <Badge variant="outline" className={
                                            student.attendanceStatus === 'Present' ? 'bg-green-50 text-green-700 border-green-200' :
                                            student.attendanceStatus === 'Late' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                            student.attendanceStatus === 'Absent' ? 'bg-red-50 text-red-700 border-red-200' :
                                            'bg-blue-50 text-blue-700 border-blue-200'
                                          }>
                                            {student.attendanceStatus}
                                          </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                                          {student.notes || 'No notes'}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </CardContent>
                            </Card>
                          )}

                          {/* Materials Covered & Homework */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedSession.materialsCovered && selectedSession.materialsCovered.length > 0 && (
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    Materials Covered
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <ul className="space-y-2">
                                    {selectedSession.materialsCovered.map((material, index) => (
                                      <li key={index} className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                                        {material}
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                              </Card>
                            )}

                            {selectedSession.homework && (
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Homework Assigned
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm">{selectedSession.homework}</p>
                                </CardContent>
                              </Card>
                            )}
                          </div>

                          {/* Session Notes */}
                          {selectedSession.notes && selectedSession.notes.length > 0 && (
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <MessageSquare className="h-5 w-5" />
                                  Session Notes
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  {selectedSession.notes.map((note) => (
                                    <div key={note.id} className="p-3 bg-muted/30 rounded-lg">
                                      <p className="text-sm mb-2">{note.content}</p>
                                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>By: {note.author}</span>
                                        <span>{format(parseISO(note.timestamp), 'MMM dd, yyyy HH:mm')}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          {/* Export Options */}
                          <div className="flex justify-end space-x-2 pt-4">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export Attendance
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Generate Report
                            </Button>
                          </div>
                        </div>
                      </ScrollArea>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No sessions found</h3>
            <p className="text-sm text-muted-foreground text-center">
              {selectedFilter === 'all' 
                ? 'You don\'t have any sessions yet.' 
                : `No sessions match the selected filter: ${filterOptions.find(f => f.value === selectedFilter)?.label}`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}