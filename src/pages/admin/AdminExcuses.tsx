import { useState } from 'react';
import { useExcuse } from '@/contexts/ExcuseContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, CheckCircle, XCircle, Calendar, User } from 'lucide-react';
import { Excuse } from '@/types/excuse';

export default function AdminExcuses() {
  const { excuses, updateExcuseStatus, getPendingExcuses } = useExcuse();
  const [selectedExcuse, setSelectedExcuse] = useState<Excuse | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const pendingExcuses = getPendingExcuses();
  const approvedExcuses = excuses.filter(e => e.status === 'approved');
  const rejectedExcuses = excuses.filter(e => e.status === 'rejected');

  const handleApprove = (excuseId: string) => {
    updateExcuseStatus(excuseId, 'approved', reviewNotes);
    setSelectedExcuse(null);
    setReviewNotes('');
  };

  const handleReject = (excuseId: string) => {
    updateExcuseStatus(excuseId, 'rejected', reviewNotes);
    setSelectedExcuse(null);
    setReviewNotes('');
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

  const ExcuseCard = ({ excuse }: { excuse: Excuse }) => {
    const StatusIcon = statusIcons[excuse.status];
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-medium text-foreground">{excuse.studentName}</h3>
              <p className="text-sm text-muted-foreground">{excuse.reason}</p>
            </div>
            <Badge className={statusColors[excuse.status]}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {excuse.status}
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              <span>Date: {new Date(excuse.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-3 h-3" />
              <span>Submitted: {new Date(excuse.submittedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <p className="text-sm text-foreground mt-2 line-clamp-2">
            {excuse.description}
          </p>
          
          <div className="flex gap-2 mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedExcuse(excuse)}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Excuse Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Student</label>
                      <p className="text-sm text-muted-foreground">{excuse.studentName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Badge className={`${statusColors[excuse.status]} ml-2`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {excuse.status}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Reason</label>
                      <p className="text-sm text-muted-foreground">{excuse.reason}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Date</label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(excuse.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <p className="text-sm text-muted-foreground mt-1">{excuse.description}</p>
                  </div>
                  
                  {excuse.reviewNotes && (
                    <div>
                      <label className="text-sm font-medium">Review Notes</label>
                      <p className="text-sm text-muted-foreground mt-1">{excuse.reviewNotes}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Reviewed by {excuse.reviewedBy} on {excuse.reviewedAt && new Date(excuse.reviewedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  
                  {excuse.status === 'pending' && (
                    <div className="space-y-3 pt-4 border-t">
                      <label className="text-sm font-medium">Review Notes</label>
                      <Textarea
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        placeholder="Add your review notes..."
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleApprove(excuse.id)}
                          className="flex-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handleReject(excuse.id)}
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Excuse Management</h1>
        <p className="text-muted-foreground">Review and manage student excuse requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingExcuses.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedExcuses.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedExcuses.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingExcuses.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedExcuses.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedExcuses.length})</TabsTrigger>
          <TabsTrigger value="all">All ({excuses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingExcuses.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No pending excuses</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingExcuses.map((excuse) => (
                <ExcuseCard key={excuse.id} excuse={excuse} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approvedExcuses.map((excuse) => (
              <ExcuseCard key={excuse.id} excuse={excuse} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rejectedExcuses.map((excuse) => (
              <ExcuseCard key={excuse.id} excuse={excuse} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {excuses.map((excuse) => (
              <ExcuseCard key={excuse.id} excuse={excuse} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}