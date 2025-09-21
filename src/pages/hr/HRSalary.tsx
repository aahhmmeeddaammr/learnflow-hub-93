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
  Download,
  Edit,
  DollarSign,
  Clock,
  Calculator,
  TrendingUp,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  role: 'instructor' | 'mentor';
  hourlyRate: number;
  hoursWorked: number;
  totalSalary: number;
  department: string;
  status: 'active' | 'inactive';
}

export default function HRSalary() {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState("2024-03");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  
  // Mock data
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "John Smith",
      employeeId: "EMP001",
      role: "instructor",
      hourlyRate: 25,
      hoursWorked: 160,
      totalSalary: 4000,
      department: "Computer Science",
      status: "active"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      employeeId: "EMP002",
      role: "mentor",
      hourlyRate: 20,
      hoursWorked: 120,
      totalSalary: 2400,
      department: "Data Science",
      status: "active"
    },
    {
      id: "3",
      name: "Mike Wilson",
      employeeId: "EMP003",
      role: "instructor",
      hourlyRate: 30,
      hoursWorked: 140,
      totalSalary: 4200,
      department: "Web Development",
      status: "active"
    },
    {
      id: "4",
      name: "Emily Davis",
      employeeId: "EMP004",
      role: "mentor",
      hourlyRate: 22,
      hoursWorked: 100,
      totalSalary: 2200,
      department: "UI/UX Design",
      status: "active"
    },
    {
      id: "5",
      name: "David Brown",
      employeeId: "EMP005",
      role: "instructor",
      hourlyRate: 28,
      hoursWorked: 180,
      totalSalary: 5040,
      department: "Mobile Development",
      status: "active"
    }
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    employeeId: "",
    role: "",
    hourlyRate: "",
    hoursWorked: "",
    department: ""
  });

  const filteredEmployees = employees.filter(employee => {
    const roleMatch = selectedRole === "all" || employee.role === selectedRole;
    return roleMatch && employee.status === "active";
  });

  const totalStats = {
    totalEmployees: filteredEmployees.length,
    totalHours: filteredEmployees.reduce((sum, emp) => sum + emp.hoursWorked, 0),
    totalSalary: filteredEmployees.reduce((sum, emp) => sum + emp.totalSalary, 0),
    avgHourlyRate: filteredEmployees.length > 0 
      ? filteredEmployees.reduce((sum, emp) => sum + emp.hourlyRate, 0) / filteredEmployees.length 
      : 0
  };

  const handleAddEmployee = () => {
    const hoursWorked = parseFloat(newEmployee.hoursWorked);
    const hourlyRate = parseFloat(newEmployee.hourlyRate);
    
    const employee: Employee = {
      id: (employees.length + 1).toString(),
      name: newEmployee.name,
      employeeId: newEmployee.employeeId,
      role: newEmployee.role as any,
      hourlyRate: hourlyRate,
      hoursWorked: hoursWorked,
      totalSalary: hoursWorked * hourlyRate,
      department: newEmployee.department,
      status: "active"
    };

    setEmployees([...employees, employee]);
    setNewEmployee({
      name: "",
      employeeId: "",
      role: "",
      hourlyRate: "",
      hoursWorked: "",
      department: ""
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Employee Added",
      description: "Employee salary information has been added successfully.",
    });
  };

  const handleEditEmployee = () => {
    if (!editingEmployee) return;

    const updatedEmployees = employees.map(emp => 
      emp.id === editingEmployee.id 
        ? {
            ...editingEmployee,
            totalSalary: editingEmployee.hoursWorked * editingEmployee.hourlyRate
          }
        : emp
    );

    setEmployees(updatedEmployees);
    setEditingEmployee(null);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Employee Updated",
      description: "Employee salary information has been updated successfully.",
    });
  };

  const exportToExcel = () => {
    const headers = [
      'Employee Name', 
      'Employee ID', 
      'Role', 
      'Department', 
      'Hourly Rate ($)', 
      'Hours Worked', 
      'Total Salary ($)'
    ];
    
    const csvData = filteredEmployees.map(emp => [
      emp.name,
      emp.employeeId,
      emp.role,
      emp.department,
      emp.hourlyRate.toString(),
      emp.hoursWorked.toString(),
      emp.totalSalary.toString()
    ]);

    // Add summary row
    csvData.push([]);
    csvData.push(['SUMMARY', '', '', '', '', '', '']);
    csvData.push(['Total Employees:', totalStats.totalEmployees.toString(), '', '', '', '', '']);
    csvData.push(['Total Hours:', totalStats.totalHours.toString(), '', '', '', '', '']);
    csvData.push(['Total Salary:', `$${totalStats.totalSalary.toFixed(2)}`, '', '', '', '', '']);
    csvData.push(['Average Hourly Rate:', `$${totalStats.avgHourlyRate.toFixed(2)}`, '', '', '', '', '']);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salary-report-${selectedMonth}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Salary report has been downloaded.",
    });
  };

  const getRoleColor = (role: string) => {
    return role === 'instructor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
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
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    value={newEmployee.employeeId}
                    onChange={(e) => setNewEmployee({...newEmployee, employeeId: e.target.value})}
                    placeholder="EMP001"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={newEmployee.role} onValueChange={(value) => setNewEmployee({...newEmployee, role: value})}>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={newEmployee.hourlyRate}
                    onChange={(e) => setNewEmployee({...newEmployee, hourlyRate: e.target.value})}
                    placeholder="25.00"
                  />
                </div>
                <div>
                  <Label htmlFor="hoursWorked">Hours Worked</Label>
                  <Input
                    id="hoursWorked"
                    type="number"
                    value={newEmployee.hoursWorked}
                    onChange={(e) => setNewEmployee({...newEmployee, hoursWorked: e.target.value})}
                    placeholder="160"
                  />
                </div>
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
            <div className="text-2xl font-bold text-foreground">{totalStats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Active staff</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Hours
            </CardTitle>
            <Clock className="w-5 h-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalStats.totalHours}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Salary
            </CardTitle>
            <DollarSign className="w-5 h-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalStats.totalSalary.toFixed(2)}</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-3 h-3 text-success" />
              <span className="text-success">+8%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Hourly Rate
            </CardTitle>
            <Calculator className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalStats.avgHourlyRate.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Export */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Period:</span>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01">January 2024</SelectItem>
                  <SelectItem value="2024-02">February 2024</SelectItem>
                  <SelectItem value="2024-03">March 2024</SelectItem>
                  <SelectItem value="2024-04">April 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Role:</span>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="instructor">Instructors</SelectItem>
                  <SelectItem value="mentor">Mentors</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto">
              <Button onClick={exportToExcel}>
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
          <CardTitle>Employee Salary Details ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Hourly Rate</TableHead>
                <TableHead>Hours Worked</TableHead>
                <TableHead>Total Salary</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.employeeId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(employee.role)}>
                      {employee.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-foreground">{employee.department}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">${employee.hourlyRate.toFixed(2)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-foreground">{employee.hoursWorked} hrs</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">${employee.totalSalary.toFixed(2)}</div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setEditingEmployee(employee);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
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
            <DialogTitle>Edit Employee Salary</DialogTitle>
          </DialogHeader>
          
          {editingEmployee && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editName">Employee Name</Label>
                  <Input
                    id="editName"
                    value={editingEmployee.name}
                    onChange={(e) => setEditingEmployee({...editingEmployee, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="editEmployeeId">Employee ID</Label>
                  <Input
                    id="editEmployeeId"
                    value={editingEmployee.employeeId}
                    onChange={(e) => setEditingEmployee({...editingEmployee, employeeId: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editRole">Role</Label>
                  <Select 
                    value={editingEmployee.role} 
                    onValueChange={(value) => setEditingEmployee({...editingEmployee, role: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editHourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="editHourlyRate"
                    type="number"
                    value={editingEmployee.hourlyRate}
                    onChange={(e) => setEditingEmployee({...editingEmployee, hourlyRate: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="editHoursWorked">Hours Worked</Label>
                  <Input
                    id="editHoursWorked"
                    type="number"
                    value={editingEmployee.hoursWorked}
                    onChange={(e) => setEditingEmployee({...editingEmployee, hoursWorked: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <Label>Calculated Total Salary</Label>
                <div className="text-2xl font-bold text-primary">
                  ${(editingEmployee.hoursWorked * editingEmployee.hourlyRate).toFixed(2)}
                </div>
              </div>
            </div>
          )}

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