import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Users, TrendingUp, Copy, Play, Square, Video, MapPin, Globe, CheckCircle2, XCircle, Plus } from 'lucide-react';
import { format, parseISO, differenceInHours, differenceInMinutes, isToday, isFuture, isPast } from 'date-fns';

interface Session {
  id: string;
  title: string;
  status: 'Ended' | 'Scheduled' | 'Ongoing';
  variant: 'Instructor' | 'Mentor';
  type: 'Online' | 'offline' | 'online';
  branch: string;
  date: string;
  startTime?: string | null;
  endTime?: string | null;
  from?: string;
  to?: string;
  link?: string;
  linkId?: number;
}

// Mock data based on your JSON structure
const mockSessions: Session[] = [
  {
    id: "68d484bb089b6064c2d7484e",
    title: "Session with Instructor Ali Osama",
    status: "Ended",
    variant: "Instructor",
    type: "Online",
    branch: "online",
    date: "2025-09-24T23:54:35.741Z",
    startTime: "2025-09-24T23:59:20.111Z",
    endTime: "2025-09-25T03:13:18Z",
    link: "https://us06web.zoom.us/s/83754431817?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMiIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJ3ZWIiLCJjbHQiOjAsIm1udW0iOiI4Mzc1NDQzMTgxNyIsImF1ZCI6ImNsaWVudHNtIiwidWlkIjoiMG80YWJoNUpUU3E0SUx1c19ranNIQSIsInppZCI6IjdmM2NmMWI2NGJlNjRlMTQ5NTgyMzhlMTUxZTcyYmNiIiwic2siOiIwIiwic3R5IjoxMDAsIndjZCI6InVzMDYiLCJleHAiOjE3NTg3NjUyNzQsImlhdCI6MTc1ODc1ODA3NCwiYWlkIjoicEdEY0xXUVNUVmFwX0N5dndpbzB3USIsImNpZCI6IiJ9.Wxy8zPBpb4h8DtXlRhO_VUu9EAbtSVBOjMD3mzZ5nmM",
    linkId: 83754431817
  },
  {
    id: "68d4839bc6f0a92d4551fa3c",
    title: "Session with Instructor Ali Osama",
    status: "Scheduled",
    variant: "Instructor",
    type: "offline",
    branch: "Dokki",
    date: "2025-09-25T00:00:00.000Z"
  },
  {
    id: "68d48523089b6064c2d7486c",
    title: "Postponed Session with Mentor Youssef",
    status: "Scheduled",
    variant: "Mentor",
    type: "online",
    branch: "Online",
    date: "2025-09-25T00:00:00.000Z",
    from: "19:00",
    to: "22:00",
    startTime: null,
    endTime: null
  },
  {
    id: "session-4",
    title: "Advanced JavaScript Workshop",
    status: "Ongoing",
    variant: "Instructor",
    type: "offline",
    branch: "Maadi",
    date: "2025-09-25T00:00:00.000Z",
    startTime: "2025-09-25T10:00:00.000Z",
    endTime: null
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
  const { toast } = useToast();

  // Filter sessions based on selected filter
  const filteredSessions = useMemo(() => {
    return sessions.filter(session => {
      const sessionDate = parseISO(session.date);
      
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
    });
  }, [sessions, selectedFilter]);

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
        
        {/* Filter */}
        <div className="flex items-center space-x-4">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[180px]">
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
              <div className="pt-2">
                {renderSessionActions(session)}
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