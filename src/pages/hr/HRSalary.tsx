import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  DollarSign, 
  Users,
  Download,
  Clock,
  TrendingUp,
  Edit,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHR } from "@/contexts/HRContext";
import * as XLSX from 'xlsx';

export default function HRSalary() {
  const { toast } = useToast();
  const { 
    employees, 
    addEmployee, 
    updateEmployee, 
    deleteEmployee, 
    calculateSalary, 
    getTotalHours,
    workLogs,
    addWorkLog 
  } = useHR();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isWorkLogDialogOpen, setIsWorkLogDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "instructor" as "instructor" | "mentor",
    department: "",
    hourlyRate: 0
  });

  const [editingEmployee, setEditingEmployee] = useState({
    name: "",
    email: "",
    role: "instructor" as "instructor" | "mentor",
    department: "",
    hourlyRate: 0
  });

  const [newWorkLog, setNewWorkLog] = useState({
    employeeId: "",
    date: "",
    hoursWorked: 0,
    description: "",
    sessionType: ""
  });

  const activeEmployees = employees.filter(emp => emp.isActive).length;
  const totalSalaryBudget = employees.reduce((sum, emp) => sum + calculateSalary(emp.id), 0);
  const averageHourlyRate = employees.length > 0 ? employees.reduce((sum, emp) => sum + emp.hourlyRate, 0) / employees.length : 0;
  const totalHours = employees.reduce((sum, emp) => sum + getTotalHours(emp.id), 0);

  const handleAddEmployee = () => {
    addEmployee({
      name: newEmployee.name,
      email: newEmployee.email,
      role: newEmployee.role as any,
      department: newEmployee.department,
      hourlyRate: newEmployee.hourlyRate,
      totalHours: 0,
      joinDate: new Date().toISOString().split('T')[0],
      isActive: true
    });

    setNewEmployee({
      name: "",
      email: "",
      role: "instructor",
      department: "",
      hourlyRate: 0
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Employee Added",
      description: "New employee has been added successfully.",
    });
  };

  const handleEditEmployee = () => {
    if (!selectedEmployee) return;

    updateEmployee(selectedEmployee.id, {
      name: editingEmployee.name,
      email: editingEmployee.email,
      role: editingEmployee.role as any,
      department: editingEmployee.department,
      hourlyRate: editingEmployee.hourlyRate
    });

    setIsEditDialogOpen(false);
    setSelectedEmployee(null);
    
    toast({
      title: "Employee Updated",
      description: "Employee information has been updated successfully.",
    });
  };

  const handleDeleteEmployee = (employeeId: string) => {
    deleteEmployee(employeeId);
    
    toast({
      title: "Employee Deleted",
      description: "Employee has been removed from the system.",
    });
  };

  const handleAddWorkLog = () => {
    addWorkLog({
      employeeId: newWorkLog.employeeId,
      date: newWorkLog.date,
      hoursWorked: newWorkLog.hoursWorked,
      description: newWorkLog.description,
      sessionType: newWorkLog.sessionType
    });

    setNewWorkLog({
      employeeId: "",
      date: "",
      hoursWorked: 0,
      description: "",
      sessionType: ""
    });
    setIsWorkLogDialogOpen(false);
    
    toast({
      title: "Work Log Added",
      description: "Work hours have been logged successfully.",
    });
  };

  const openEditDialog = (employee: any) => {
    setSelectedEmployee(employee);
    setEditingEmployee({
      name: employee.name,
      email: employee.email,
      role: employee.role,
      department: employee.department,
      hourlyRate: employee.hourlyRate
    });
    setIsEditDialogOpen(true);
  };

  const exportToExcel = () => {
    const data = employees.map(employee => ({
      'Employee Name': employee.name,
      'Email': employee.email,
      'Role': employee.role,
      'Department': employee.department,
      'Total Worked Hours': getTotalHours(employee.id),
      'Hourly Rate': `$${employee.hourlyRate}`,
      'Total Calculated Salary': `$${calculateSalary(employee.id).toFixed(2)}`
    }));

    // Add summary row
    data.push({
      'Employee Name': '',
      'Email': '',
      'Role': '',
      'Department': '',
      'Total Worked Hours': '',
      'Hourly Rate': '',
      'Total Calculated Salary': ''
    });

    data.push({
      'Employee Name': 'SUMMARY',
      'Email': '',
      'Role': '',
      'Department': '',
      'Total Worked Hours': totalHours,
      'Hourly Rate': `$${averageHourlyRate.toFixed(2)} (avg)`,
      'Total Calculated Salary': `$${totalSalaryBudget.toFixed(2)}`
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Salary Report');
    
    // Generate Excel file and download
    XLSX.writeFile(workbook, 'salary-report.xlsx');

    toast({
      title: "Export Complete",
      description: "Salary report has been downloaded as Excel file.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Salary Management</h1>
          <p className="text-muted-foreground mt-1">
            Track employee hours, rates, and generate salary reports
          </p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isWorkLogDialogOpen} onOpenChange={setIsWorkLogDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Log Hours
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Work Hours</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="employee">Select Employee</Label>
                  <Select 
                    value={newWorkLog.employeeId} 
                    onValueChange={(value) => setNewWorkLog({...newWorkLog, employeeId: value})}
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newWorkLog.date}
                      onChange={(e) => setNewWorkLog({...newWorkLog, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hours">Hours Worked</Label>
                    <Input
                      id="hours"
                      type="number"
                      step="0.5"
                      value={newWorkLog.hoursWorked}
                      onChange={(e) => setNewWorkLog({...newWorkLog, hoursWorked: parseFloat(e.target.value)})}
                      placeholder="8"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="sessionType">Session Type</Label>
                  <Select 
                    value={newWorkLog.sessionType} 
                    onValueChange={(value) => setNewWorkLog({...newWorkLog, sessionType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lecture">Lecture</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="mentoring">Mentoring</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="preparation">Preparation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newWorkLog.description}
                    onChange={(e) => setNewWorkLog({...newWorkLog, description: e.target.value})}
                    placeholder="Brief description of work done"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsWorkLogDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddWorkLog}>
                  Log Hours
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Employee Name</Label>
                    <Input
                      id="name"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      placeholder="employee@route.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="role">Role</Label>
                  <Select value={newEmployee.role} onValueChange={(value: "instructor" | "mentor") => setNewEmployee({...newEmployee, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instructor">Instructor</SelectItem>
                      <SelectItem value="mentor">Mentor</SelectItem>
                    </SelectContent>
                  </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                      placeholder="Department"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    step="0.01"
                    value={newEmployee.hourlyRate}
                    onChange={(e) => setNewEmployee({...newEmployee, hourlyRate: parseFloat(e.target.value) || 0})}
                    placeholder="25.00"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEmployee}>
                  Add Employee
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Employees
            </CardTitle>
            <Users className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{employees.length}</div>
            <p className="text-xs text-muted-foreground">All employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Employees
            </CardTitle>
            <Users className="w-5 h-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeEmployees}</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Salary Budget
            </CardTitle>
            <DollarSign className="w-5 h-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalSalaryBudget.toFixed(2)}</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-3 h-3 text-success" />
              <span className="text-success">+5%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Hourly Rate
            </CardTitle>
            <Clock className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${averageHourlyRate.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Export */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Export Salary Report:</span>
            </div>
            
            <div className="ml-auto">
              <Button variant="outline" onClick={exportToExcel}>
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Salary Details ({employees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Hours Worked</TableHead>
                <TableHead>Hourly Rate</TableHead>
                <TableHead>Total Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={employee.role === 'instructor' ? 'default' : 'secondary'}>
                      {employee.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">{employee.department}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{getTotalHours(employee.id)}h</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${employee.hourlyRate}/hr</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-success">
                      ${calculateSalary(employee.id).toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={employee.isActive ? 'default' : 'secondary'}>
                      {employee.isActive ? 'active' : 'inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openEditDialog(employee)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteEmployee(employee.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editName">Employee Name</Label>
                <Input
                  id="editName"
                  value={editingEmployee.name}
                  onChange={(e) => setEditingEmployee({...editingEmployee, name: e.target.value})}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={editingEmployee.email}
                  onChange={(e) => setEditingEmployee({...editingEmployee, email: e.target.value})}
                  placeholder="employee@route.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editRole">Role</Label>
                <Select value={editingEmployee.role} onValueChange={(value: "instructor" | "mentor") => setEditingEmployee({...editingEmployee, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="mentor">Mentor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editDepartment">Department</Label>
                <Input
                  id="editDepartment"
                  value={editingEmployee.department}
                  onChange={(e) => setEditingEmployee({...editingEmployee, department: e.target.value})}
                  placeholder="Department"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="editHourlyRate">Hourly Rate ($)</Label>
              <Input
                id="editHourlyRate"
                type="number"
                step="0.01"
                value={editingEmployee.hourlyRate}
                onChange={(e) => setEditingEmployee({...editingEmployee, hourlyRate: parseFloat(e.target.value) || 0})}
                placeholder="25.00"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEmployee}>
              Update Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}