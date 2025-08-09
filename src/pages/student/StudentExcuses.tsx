import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useExcuse } from '@/contexts/ExcuseContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, FileText, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { ExcuseFormData } from '@/types/excuse';

export default function StudentExcuses() {
  const { user } = useAuth();
  const { submitExcuse, getUserExcuses } = useExcuse();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<ExcuseFormData>({
    reason: '',
    date: '',
    description: ''
  });

  const userExcuses = user ? getUserExcuses(user.id) : [];

  const handleSubmit = () => {
    if (!formData.reason || !formData.date || !formData.description) return;
    
    submitExcuse(formData);
    setFormData({ reason: '', date: '', description: '' });
    setIsDialogOpen(false);
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const statusIcons = {
    pending: Clock,
    approved: CheckCircle,
    rejected: XCircle
  };

  const reasonOptions = [
    'Medical Appointment',
    'Family Emergency',
    'Illness',
    'Transportation Issues',
    'Personal Matters',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Excuses</h1>
          <p className="text-muted-foreground">Submit and track your excuse requests</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Submit Excuse
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit New Excuse</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reason">Reason</Label>
                <Select value={formData.reason} onValueChange={(value) => setFormData(prev => ({ ...prev, reason: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {reasonOptions.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide detailed explanation..."
                  rows={4}
                />
              </div>
              
              <Button onClick={handleSubmit} className="w-full">
                Submit Excuse
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Excuses</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userExcuses.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userExcuses.filter(e => e.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userExcuses.filter(e => e.status === 'approved').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Excuse History</CardTitle>
        </CardHeader>
        <CardContent>
          {userExcuses.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No excuses submitted yet</p>
              <p className="text-sm text-muted-foreground">Click "Submit Excuse" to create your first excuse request</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userExcuses.map((excuse) => {
                const StatusIcon = statusIcons[excuse.status];
                
                return (
                  <div key={excuse.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-foreground">{excuse.reason}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(excuse.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge className={statusColors[excuse.status]}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {excuse.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {excuse.description}
                    </p>
                    
                    <div className="text-xs text-muted-foreground">
                      Submitted on {new Date(excuse.submittedAt).toLocaleDateString()}
                    </div>
                    
                    {excuse.reviewNotes && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium text-foreground">Review Notes:</p>
                        <p className="text-sm text-muted-foreground">{excuse.reviewNotes}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Reviewed by {excuse.reviewedBy} on {excuse.reviewedAt && new Date(excuse.reviewedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}