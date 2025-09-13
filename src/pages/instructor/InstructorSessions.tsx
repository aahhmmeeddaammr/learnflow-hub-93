import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Users, TrendingUp, Copy, FileDown, Eye, Video, BarChart3 } from 'lucide-react';
import { format, isWithinInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachWeekOfInterval, parseISO } from 'date-fns';

// Mock data for sessions
const mockSessions = [
  {
    id: '1',
    title: 'Advanced React Concepts',
    date: '2024-01-15',
    startTime: '09:00',
    endTime: '11:00',
    status: 'Ended' as const,
    zoomLink: 'https://zoom.us/j/123456789',
    groupName: 'Group A',
    students: [
      { id: '1', name: 'Ahmed Hassan', joinTime: '09:02', leaveTime: '11:00', status: 'Present' as const },
      { id: '2', name: 'Sara Ahmed', joinTime: '09:05', leaveTime: '10:45', status: 'Present' as const },
      { id: '3', name: 'Mohamed Ali', joinTime: null, leaveTime: null, status: 'Absent' as const },
      { id: '4', name: 'Fatima Nour', joinTime: '09:15', leaveTime: '11:00', status: 'Present' as const },
    ]
  },
  {
    id: '2',
    title: 'JavaScript Fundamentals',
    date: '2024-01-16',
    startTime: '14:00',
    endTime: '16:00',
    status: 'Ended' as const,
    zoomLink: 'https://zoom.us/j/987654321',
    groupName: 'Group B',
    students: [
      { id: '5', name: 'Omar Khaled', joinTime: '14:00', leaveTime: '16:00', status: 'Present' as const },
      { id: '6', name: 'Layla Mohamed', joinTime: '14:10', leaveTime: '15:30', status: 'Present' as const },
      { id: '7', name: 'Youssef Ibrahim', joinTime: '14:05', leaveTime: '16:00', status: 'Present' as const },
    ]
  },
  {
    id: '3',
    title: 'Database Design Workshop',
    date: '2024-01-18',
    startTime: '10:00',
    endTime: '12:30',
    status: 'Scheduled' as const,
    zoomLink: 'https://zoom.us/j/456789123',
    groupName: 'Group A',
    students: [
      { id: '1', name: 'Ahmed Hassan', joinTime: null, leaveTime: null, status: 'Scheduled' as const },
      { id: '2', name: 'Sara Ahmed', joinTime: null, leaveTime: null, status: 'Scheduled' as const },
      { id: '3', name: 'Mohamed Ali', joinTime: null, leaveTime: null, status: 'Scheduled' as const },
      { id: '4', name: 'Fatima Nour', joinTime: null, leaveTime: null, status: 'Scheduled' as const },
    ]
  },
  {
    id: '4',
    title: 'Frontend Development Best Practices',
    date: '2024-01-20',
    startTime: '13:00',
    endTime: '15:00',
    status: 'Scheduled' as const,
    zoomLink: 'https://zoom.us/j/789123456',
    groupName: 'Group B',
    students: [
      { id: '5', name: 'Omar Khaled', joinTime: null, leaveTime: null, status: 'Scheduled' as const },
      { id: '6', name: 'Layla Mohamed', joinTime: null, leaveTime: null, status: 'Scheduled' as const },
      { id: '7', name: 'Youssef Ibrahim', joinTime: null, leaveTime: null, status: 'Scheduled' as const },
    ]
  },
  {
    id: '5',
    title: 'API Integration Workshop',
    date: '2024-01-22',
    startTime: '09:30',
    endTime: '11:30',
    status: 'Ongoing' as const,
    zoomLink: 'https://zoom.us/j/321654987',
    groupName: 'Group A',
    students: [
      { id: '1', name: 'Ahmed Hassan', joinTime: '09:32', leaveTime: null, status: 'Present' as const },
      { id: '2', name: 'Sara Ahmed', joinTime: '09:35', leaveTime: null, status: 'Present' as const },
      { id: '3', name: 'Mohamed Ali', joinTime: null, leaveTime: null, status: 'Absent' as const },
      { id: '4', name: 'Fatima Nour', joinTime: '09:40', leaveTime: null, status: 'Present' as const },
    ]
  },
];

const months = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const years = ['2024', '2023', '2022'];

export default function InstructorSessions() {
  const [selectedMonth, setSelectedMonth] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedSession, setSelectedSession] = useState<typeof mockSessions[0] | null>(null);
  const { toast } = useToast();

  // Filter sessions based on selected month and year
  const filteredSessions = useMemo(() => {
    return mockSessions.filter(session => {
      const sessionDate = parseISO(session.date);
      const selectedDate = new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1);
      return isWithinInterval(sessionDate, {
        start: startOfMonth(selectedDate),
        end: endOfMonth(selectedDate)
      });
    });
  }, [selectedMonth, selectedYear]);

  // Calculate analytics
  const analytics = useMemo(() => {
    const totalSessions = filteredSessions.length;
    const totalHours = filteredSessions.reduce((acc, session) => {
      const start = new Date(`2024-01-01 ${session.startTime}`);
      const end = new Date(`2024-01-01 ${session.endTime}`);
      return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    }, 0);

    const completedSessions = filteredSessions.filter(s => s.status === 'Ended');
    const totalStudents = completedSessions.reduce((acc, session) => acc + session.students.length, 0);
    const presentStudents = completedSessions.reduce((acc, session) => 
      acc + session.students.filter(s => s.status === 'Present').length, 0);
    
    const averageAttendance = totalStudents > 0 ? (presentStudents / totalStudents) * 100 : 0;

    return {
      totalSessions,
      totalHours: Math.round(totalHours * 100) / 100,
      averageAttendance: Math.round(averageAttendance * 100) / 100,
      completedSessions: completedSessions.length
    };
  }, [filteredSessions]);

  // Calculate duration for a session
  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2024-01-01 ${startTime}`);
    const end = new Date(`2024-01-01 ${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // Copy zoom link to clipboard
  const copyZoomLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: 'Success',
      description: 'Zoom link copied to clipboard',
    });
  };

  // Export attendance to CSV
  const exportAttendance = (session: typeof mockSessions[0]) => {
    const csvContent = [
      ['Student Name', 'Join Time', 'Leave Time', 'Status'],
      ...session.students.map(student => [
        student.name,
        student.joinTime || 'N/A',
        student.leaveTime || 'N/A',
        student.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${session.title}-${session.date}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Success',
      description: 'Attendance report exported successfully',
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

  const getAttendanceStatusBadge = (status: string) => {
    switch (status) {
      case 'Present':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Present</Badge>;
      case 'Absent':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Absent</Badge>;
      case 'Scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Sessions</h1>
          <p className="text-muted-foreground">
            Manage and track your teaching sessions and attendance
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full md:w-[120px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year}>
                  {year}
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
              {analytics.completedSessions} completed
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
              Teaching time
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground">
              Student participation
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Excellent</div>
            <p className="text-xs text-muted-foreground">
              Above average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sessions Overview</CardTitle>
          <CardDescription>
            All your sessions for {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Zoom Link</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{session.title}</div>
                        <div className="text-sm text-muted-foreground">{session.groupName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{format(parseISO(session.date), 'MMM dd, yyyy')}</div>
                        <div className="text-sm text-muted-foreground">
                          {session.startTime} - {session.endTime}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {calculateDuration(session.startTime, session.endTime)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(session.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Video className="h-4 w-4 text-blue-600" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyZoomLink(session.zoomLink)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedSession(session)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Attendance
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="min-w-[600px] sm:max-w-[800px]">
                          <SheetHeader>
                            <SheetTitle>Attendance Report</SheetTitle>
                            <SheetDescription>
                              {selectedSession?.title} - {selectedSession && format(parseISO(selectedSession.date), 'MMM dd, yyyy')}
                            </SheetDescription>
                          </SheetHeader>
                          
                          {selectedSession && (
                            <div className="mt-6 space-y-6">
                              {/* Session Info */}
                              <Card>
                                <CardContent className="pt-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Group</p>
                                      <p className="font-medium">{selectedSession.groupName}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Duration</p>
                                      <p className="font-medium">
                                        {calculateDuration(selectedSession.startTime, selectedSession.endTime)}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Total Students</p>
                                      <p className="font-medium">{selectedSession.students.length}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Present</p>
                                      <p className="font-medium text-green-600">
                                        {selectedSession.students.filter(s => s.status === 'Present').length}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              <Separator />
                              
                              {/* Export Button */}
                              <div className="flex justify-end">
                                <Button
                                  onClick={() => exportAttendance(selectedSession)}
                                  className="mb-4"
                                >
                                  <FileDown className="h-4 w-4 mr-2" />
                                  Export to CSV
                                </Button>
                              </div>
                              
                              {/* Attendance Table */}
                              <div className="overflow-x-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Student Name</TableHead>
                                      <TableHead>Join Time</TableHead>
                                      <TableHead>Leave Time</TableHead>
                                      <TableHead>Status</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {selectedSession.students.map((student) => (
                                      <TableRow key={student.id}>
                                        <TableCell className="font-medium">
                                          {student.name}
                                        </TableCell>
                                        <TableCell>
                                          {student.joinTime || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                          {student.leaveTime || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                          {getAttendanceStatusBadge(student.status)}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          )}
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredSessions.length === 0 && (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No sessions found for the selected period.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}