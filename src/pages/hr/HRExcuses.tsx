import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Eye, 
  Filter, 
  Download,
  Calendar,
  Clock,
  User,
  FileText,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHR } from "@/contexts/HRContext";
import * as XLSX from 'xlsx';

export default function HRExcuses() {
  const { toast } = useToast();
  const { excuses, employees, addExcuse, updateExcuseStatus } = useHR();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  const [newExcuse, setNewExcuse] = useState({
    employeeId: "",
    employeeName: "",
    type: "",
    reason: "",
    startDate: "",
    endDate: "",
    notes: ""
  });

  const filteredExcuses = excuses.filter(excuse => {
    const statusMatch = selectedStatus === "all" || excuse.status === selectedStatus;
    const typeMatch = selectedType === "all" || excuse.type === selectedType;
    return statusMatch && typeMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sick': return 'bg-red-100 text-red-800';
      case 'personal': return 'bg-blue-100 text-blue-800';
      case 'emergency': return 'bg-orange-100 text-orange-800';
      case 'vacation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitExcuse = () => {
    const selectedEmployee = employees.find(emp => emp.id === newExcuse.employeeId);
    
    addExcuse({
      employeeId: newExcuse.employeeId,
      employeeName: selectedEmployee?.name || "",
      type: newExcuse.type as any,
      reason: newExcuse.reason,
      startDate: newExcuse.startDate,
      endDate: newExcuse.endDate,
      status: 'pending',
      notes: newExcuse.notes
    });

    setNewExcuse({
      employeeId: "",
      employeeName: "",
      type: "",
      reason: "",
      startDate: "",
      endDate: "",
      notes: ""
    });
    setIsSubmitDialogOpen(false);
    
    toast({
      title: "Excuse Submitted",
      description: "The excuse request has been submitted successfully.",
    });
  };

  const handleStatusUpdate = (excuseId: string, newStatus: 'approved' | 'rejected') => {
    updateExcuseStatus(excuseId, newStatus, "HR Manager");

    toast({
      title: `Excuse ${newStatus}`,
      description: `The excuse request has been ${newStatus}.`,
    });
  };

  const exportToExcel = () => {
    const data = filteredExcuses.map(excuse => ({
      'Employee Name': excuse.employeeName,
      'Employee ID': excuse.employeeId,
      'Type': excuse.type,
      'Reason': excuse.reason,
      'Start Date': excuse.startDate,
      'End Date': excuse.endDate,
      'Status': excuse.status,
      'Submitted At': new Date(excuse.submittedAt).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Excuses Report');
    
    XLSX.writeFile(workbook, 'excuses-report.xlsx');

    toast({
      title: "Export Complete",
      description: "Excuses report has been downloaded as Excel file.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Excuse Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage employee excuse requests and attendance adjustments
          </p>
        </div>
        
        <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Submit Excuse
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Submit New Excuse</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="employee">Select Employee</Label>
                <Select 
                  value={newExcuse.employeeId} 
                  onValueChange={(value) => {
                    const employee = employees.find(emp => emp.id === value);
                    setNewExcuse({
                      ...newExcuse, 
                      employeeId: value,
                      employeeName: employee?.name || ""
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map(employee => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name} - {employee.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Excuse Type</Label>
                <Select value={newExcuse.type} onValueChange={(value) => setNewExcuse({...newExcuse, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newExcuse.startDate}
                    onChange={(e) => setNewExcuse({...newExcuse, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newExcuse.endDate}
                    onChange={(e) => setNewExcuse({...newExcuse, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Reason</Label>
                <Input
                  id="reason"
                  value={newExcuse.reason}
                  onChange={(e) => setNewExcuse({...newExcuse, reason: e.target.value})}
                  placeholder="Brief reason"
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={newExcuse.notes}
                  onChange={(e) => setNewExcuse({...newExcuse, notes: e.target.value})}
                  placeholder="Any additional information..."
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitExcuse}>
                Submit Excuse
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Export */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sick">Sick Leave</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="vacation">Vacation</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto">
              <Button variant="outline" onClick={exportToExcel}>
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Excuses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Excuse Requests ({filteredExcuses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExcuses.map((excuse) => (
                <TableRow key={excuse.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{excuse.employeeName}</div>
                      <div className="text-sm text-muted-foreground">ID: {excuse.employeeId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(excuse.type)}>
                      {excuse.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{excuse.startDate}</div>
                      {excuse.startDate !== excuse.endDate && (
                        <div className="text-muted-foreground">to {excuse.endDate}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{excuse.reason}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(excuse.status)}>
                      {excuse.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {new Date(excuse.submittedAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Excuse Details</SheetTitle>
                          </SheetHeader>
                          <div className="space-y-4 mt-6">
                            <div>
                              <Label className="text-sm font-medium">Employee</Label>
                              <p className="text-foreground">{excuse.employeeName} ({excuse.employeeId})</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Type</Label>
                              <p className="text-foreground capitalize">{excuse.type}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Period</Label>
                              <p className="text-foreground">
                                {excuse.startDate}
                                {excuse.startDate !== excuse.endDate && ` to ${excuse.endDate}`}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Reason</Label>
                              <p className="text-foreground">{excuse.reason}</p>
                            </div>
                            {excuse.notes && (
                              <div>
                                <Label className="text-sm font-medium">Notes</Label>
                                <p className="text-foreground">{excuse.notes}</p>
                              </div>
                            )}
                            <div>
                              <Label className="text-sm font-medium">Status</Label>
                              <Badge className={getStatusColor(excuse.status)}>
                                {excuse.status}
                              </Badge>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Submitted</Label>
                              <p className="text-foreground">
                                {new Date(excuse.submittedAt).toLocaleString()}
                              </p>
                            </div>
                            {excuse.reviewedBy && (
                              <div>
                                <Label className="text-sm font-medium">Reviewed By</Label>
                                <p className="text-foreground">
                                  {excuse.reviewedBy} on {new Date(excuse.reviewedAt!).toLocaleString()}
                                </p>
                              </div>
                            )}
                            
                            {excuse.status === 'pending' && (
                              <div className="flex gap-2 pt-4">
                                <Button 
                                  size="sm" 
                                  onClick={() => handleStatusUpdate(excuse.id, 'approved')}
                                  className="flex-1"
                                >
                                  <Check className="w-4 h-4 mr-2" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleStatusUpdate(excuse.id, 'rejected')}
                                  className="flex-1"
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </SheetContent>
                      </Sheet>
                      
                      {excuse.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleStatusUpdate(excuse.id, 'approved')}
                          >
                            <Check className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleStatusUpdate(excuse.id, 'rejected')}
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}