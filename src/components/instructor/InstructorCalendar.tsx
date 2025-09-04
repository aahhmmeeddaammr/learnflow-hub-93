import { useState, useCallback, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddNoteModal } from './AddNoteModal';
import { NoteDetailsModal } from './NoteDetailsModal';
import { EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/core';

interface Group {
  id: number;
  name: string;
  diploma: string;
  students: number;
  avgAttendance: number;
  avgGrades: number;
  lastSession: string;
  schedule: {
    day: string;
    time: string;
    room: string;
  }[];
}

interface Session {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: {
    type: 'session';
    group: string;
    subject: string;
    room: string;
  };
}

interface Note {
  id: string;
  title: string;
  start: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: {
    type: 'note';
    content: string;
  };
}

type CalendarEvent = Session | Note;

interface InstructorCalendarProps {
  groups: Group[];
}

// Generate recurring events for the next 4 weeks
const generateGroupSessions = (groups: Group[]): Session[] => {
  const sessions: Session[] = [];
  const today = new Date();
  const weeksToGenerate = 4;
  
  // Day name to number mapping
  const dayMap: { [key: string]: number } = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  };

  groups.forEach(group => {
    group.schedule.forEach(scheduleItem => {
      const targetDay = dayMap[scheduleItem.day.toLowerCase()];
      const [startTime, endTime] = scheduleItem.time.split('-');
      
      // Generate sessions for the next few weeks
      for (let week = 0; week < weeksToGenerate; week++) {
        const startDate = new Date(today);
        startDate.setDate(today.getDate() + (targetDay - today.getDay() + 7 * week));
        
        const endDate = new Date(startDate);
        
        // Parse time and set hours
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        
        startDate.setHours(startHour, startMinute, 0, 0);
        endDate.setHours(endHour, endMinute, 0, 0);

        sessions.push({
          id: `${group.id}-${week}-${scheduleItem.day}`,
          title: `${group.name} - ${group.diploma}`,
          start: startDate.toISOString(),
          end: endDate.toISOString(),
          backgroundColor: group.id === 1 ? 'hsl(var(--primary))' : 
                          group.id === 2 ? 'hsl(var(--secondary))' : 'hsl(var(--accent))',
          borderColor: group.id === 1 ? 'hsl(var(--primary))' : 
                      group.id === 2 ? 'hsl(var(--secondary))' : 'hsl(var(--accent))',
          textColor: 'hsl(var(--primary-foreground))',
          extendedProps: {
            type: 'session',
            group: group.name,
            subject: group.diploma,
            room: scheduleItem.room
          }
        });
      }
    });
  });

  return sessions;
};

export function InstructorCalendar({ groups }: InstructorCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isNoteDetailsModalOpen, setIsNoteDetailsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Generate sessions from groups data
  useEffect(() => {
    const generatedSessions = generateGroupSessions(groups);
    setEvents(generatedSessions);
  }, [groups]);

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo.startStr);
    setIsNoteModalOpen(true);
  }, []);

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (clickInfo.event.extendedProps.type === 'note') {
      const noteData: Note = {
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        start: clickInfo.event.startStr,
        backgroundColor: clickInfo.event.backgroundColor || 'hsl(var(--accent))',
        borderColor: clickInfo.event.borderColor || 'hsl(var(--accent-foreground))',
        textColor: clickInfo.event.textColor || 'hsl(var(--accent-foreground))',
        extendedProps: {
          type: 'note',
          content: clickInfo.event.extendedProps.content || ''
        }
      };
      setSelectedNote(noteData);
      setIsNoteDetailsModalOpen(true);
    }
  }, []);

  const handleAddNote = useCallback((noteData: { title: string; content: string }) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: noteData.title,
      start: selectedDate,
      backgroundColor: 'hsl(var(--accent))',
      borderColor: 'hsl(var(--accent-foreground))',
      textColor: 'hsl(var(--accent-foreground))',
      extendedProps: {
        type: 'note',
        content: noteData.content
      }
    };

    setEvents(prev => [...prev, newNote]);
    setIsNoteModalOpen(false);
  }, [selectedDate]);

  const handleUpdateNote = useCallback((noteId: string, noteData: { title: string; content: string }) => {
    setEvents(prev => prev.map(event => {
      if (event.id === noteId && event.extendedProps.type === 'note') {
        return {
          ...event,
          title: noteData.title,
          extendedProps: {
            ...event.extendedProps,
            content: noteData.content
          }
        } as Note;
      }
      return event;
    }));
    setIsNoteDetailsModalOpen(false);
  }, []);

  const handleDeleteNote = useCallback((noteId: string) => {
    setEvents(prev => prev.filter(event => event.id !== noteId));
  }, []);

  const renderEventContent = useCallback((eventInfo: any) => {
    const { event } = eventInfo;
    const isSession = event.extendedProps.type === 'session';
    
    return (
      <div className="p-1 text-xs">
        <div className="font-medium truncate">{event.title}</div>
        {isSession && (
          <div className="text-xs opacity-80 truncate">
            {event.extendedProps.room} • {eventInfo.timeText}
          </div>
        )}
      </div>
    );
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-foreground">My Calendar</h2>
          <p className="text-sm text-muted-foreground">
            View your sessions and add personal notes
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setSelectedDate(new Date().toISOString().split('T')[0]);
            setIsNoteModalOpen(true);
          }}
        >
          Add Note
        </Button>
      </div>

      <Card className="p-6">
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={events}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={3}
            weekends={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            height="auto"
            aspectRatio={1.8}
            eventDisplay="block"
            dayHeaderClassNames="text-sm font-medium text-muted-foreground p-2"
            dayCellClassNames="border-border"
            eventClassNames="rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            moreLinkClassNames="text-primary hover:text-primary/80 text-xs font-medium"
            nowIndicatorClassNames="bg-destructive"
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            allDaySlot={false}
            slotDuration="01:00:00"
            snapDuration="00:15:00"
          />
        </div>

        <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary"></div>
            <span>Sessions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-accent"></div>
            <span>Personal Notes</span>
          </div>
        </div>
      </Card>

      <AddNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={handleAddNote}
        date={selectedDate}
      />

      <NoteDetailsModal
        isOpen={isNoteDetailsModalOpen}
        onClose={() => setIsNoteDetailsModalOpen(false)}
        note={selectedNote}
        onUpdate={handleUpdateNote}
        onDelete={handleDeleteNote}
      />

      <style>{`
        .fc {
          --fc-border-color: hsl(var(--border));
          --fc-button-text-color: hsl(var(--foreground));
          --fc-button-bg-color: hsl(var(--background));
          --fc-button-border-color: hsl(var(--border));
          --fc-button-hover-bg-color: hsl(var(--accent));
          --fc-button-hover-border-color: hsl(var(--accent-foreground));
          --fc-button-active-bg-color: hsl(var(--primary));
          --fc-button-active-border-color: hsl(var(--primary));
          --fc-today-bg-color: hsl(var(--accent) / 0.1);
        }
        
        .fc .fc-button {
          background-color: var(--fc-button-bg-color);
          border: 1px solid var(--fc-button-border-color);
          color: var(--fc-button-text-color);
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
        }
        
        .fc .fc-button:hover {
          background-color: var(--fc-button-hover-bg-color);
          border-color: var(--fc-button-hover-border-color);
        }
        
        .fc .fc-button:focus,
        .fc .fc-button-active {
          background-color: var(--fc-button-active-bg-color);
          border-color: var(--fc-button-active-border-color);
          color: hsl(var(--primary-foreground));
        }
        
        .fc .fc-toolbar-title {
          color: hsl(var(--foreground));
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .fc .fc-col-header-cell {
          background-color: hsl(var(--muted));
        }
        
        .fc .fc-daygrid-day {
          background-color: hsl(var(--background));
        }
        
        .fc .fc-day-today {
          background-color: var(--fc-today-bg-color);
        }
        
        .fc .fc-scrollgrid {
          border: 1px solid hsl(var(--border));
          border-radius: 0.5rem;
        }
        
        .fc .fc-event {
          border-radius: 0.375rem;
          font-size: 0.75rem;
          margin: 1px 2px;
        }
      `}</style>
    </div>
  );
}