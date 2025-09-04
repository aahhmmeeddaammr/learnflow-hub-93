import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, StickyNote, Edit, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  start: string;
  extendedProps: {
    type: 'note';
    content: string;
  };
}

interface NoteDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  onUpdate: (noteId: string, noteData: { title: string; content: string }) => void;
  onDelete: (noteId: string) => void;
}

export function NoteDetailsModal({ isOpen, onClose, note, onUpdate, onDelete }: NoteDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEdit = () => {
    if (note) {
      setTitle(note.title);
      setContent(note.extendedProps.content || '');
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (!note || !title.trim()) return;
    
    onUpdate(note.id, {
      title: title.trim(),
      content: content.trim()
    });
    
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!note) return;
    
    const shouldDelete = window.confirm(`Delete note: "${note.title}"?`);
    if (shouldDelete) {
      onDelete(note.id);
      onClose();
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    setTitle('');
    setContent('');
    onClose();
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!note) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StickyNote className="w-5 h-5" />
            {isEditing ? 'Edit Note' : 'Note Details'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(note.start)}</span>
          </div>

          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="note-title">Title</Label>
                <Input
                  id="note-title"
                  placeholder="Enter note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground">
                  {title.length}/50 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note-content">Content (Optional)</Label>
                <Textarea
                  id="note-content"
                  placeholder="Add additional details..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground">
                  {content.length}/200 characters
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={!title.trim()}
                >
                  Save Changes
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground">{note.title}</h3>
                </div>
                
                {note.extendedProps.content && (
                  <div>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {note.extendedProps.content}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleDelete} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button onClick={handleEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}