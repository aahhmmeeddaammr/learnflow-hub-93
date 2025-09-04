import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, StickyNote } from 'lucide-react';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (noteData: { title: string; content: string }) => void;
  date: string;
}

export function AddNoteModal({ isOpen, onClose, onSave, date }: AddNoteModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;
    
    onSave({
      title: title.trim(),
      content: content.trim()
    });
    
    // Reset form
    setTitle('');
    setContent('');
  };

  const handleClose = () => {
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StickyNote className="w-5 h-5" />
            Add Personal Note
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(date)}</span>
          </div>

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
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!title.trim()}
            >
              Add Note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}