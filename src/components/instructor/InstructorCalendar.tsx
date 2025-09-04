import { useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddNoteModal } from './AddNoteModal';
import { EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/core';

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

// Mock sessions data
const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Mathematics - CS-2024-A',
    start: '2025-01-06T09:00:00',
    end: '2025-01-06T11:00:00',
    backgroundColor: 'hsl(var(--primary))',
    borderColor: 'hsl(var(--primary))',
    textColor: 'hsl(var(--primary-foreground))',
    extendedProps: {
      type: 'session',
      group: 'CS-2024-A',
      subject: 'Mathematics',
      room: 'Room 101'
    }
  },
  {
    id: '2',
    title: 'Physics - CS-2024-B',
    start: '2025-01-06T14:00:00',
    end: '2025-01-06T16:00:00',
    backgroundColor: 'hsl(var(--secondary))',
    borderColor: 'hsl(var(--secondary))',
    textColor: 'hsl(var(--secondary-foreground))',
    extendedProps: {
      type: 'session',
      group: 'CS-2024-B',
      subject: 'Physics',
      room: 'Room 203'
    }
  },
  {
    id: '3',
    title: 'Mathematics - CS-2024-A',
    start: '2025-01-08T10:00:00',
    end: '2025-01-08T12:00:00',
    backgroundColor: 'hsl(var(--primary))',
    borderColor: 'hsl(var(--primary))',
    textColor: 'hsl(var(--primary-foreground))',
    extendedProps: {
      type: 'session',
      group: 'CS-2024-A',
      subject: 'Mathematics',
      room: 'Room 101'
    }
  }
];

export function InstructorCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockSessions);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo.startStr);
    setIsNoteModalOpen(true);
  }, []);

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (clickInfo.event.extendedProps.type === 'note') {
      const shouldDelete = window.confirm(
        `Delete note: "${clickInfo.event.title}"?`
      );
      if (shouldDelete) {
        setEvents(prev => prev.filter(event => event.id !== clickInfo.event.id));
      }
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