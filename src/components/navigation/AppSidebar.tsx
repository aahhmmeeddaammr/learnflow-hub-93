import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen,
  ClipboardCheck,
  BarChart3,
  Settings,
  HelpCircle,
  School,
  UserCheck,
  FileText,
  Calendar,
  MessageSquare
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserRole } from "@/types/auth";

interface AppSidebarProps {
  role: UserRole;
}

const adminItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Instructors", url: "/admin/instructors", icon: Users },
  { title: "Mentors", url: "/admin/mentors", icon: UserCheck },
  { title: "Diplomas", url: "/admin/diplomas", icon: GraduationCap },
  { title: "Groups", url: "/admin/groups", icon: School },
  { title: "Requests", url: "/admin/requests", icon: MessageSquare },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
];

const instructorItems = [
  { title: "Dashboard", url: "/instructor", icon: LayoutDashboard },
  { title: "My Groups", url: "/instructor/groups", icon: School },
  { title: "Marks & Attendance", url: "/instructor/marks", icon: ClipboardCheck },
  { title: "Raise Ticket", url: "/instructor/tickets", icon: MessageSquare },
];

const mentorItems = [
  { title: "Dashboard", url: "/mentor", icon: LayoutDashboard },
  { title: "My Groups", url: "/mentor/groups", icon: School },
  { title: "Assignments", url: "/mentor/assignments", icon: BookOpen },
  { title: "Raise Ticket", url: "/mentor/tickets", icon: MessageSquare },
];

const studentItems = [
  { title: "Dashboard", url: "/student", icon: LayoutDashboard },
  { title: "My Grades", url: "/student/grades", icon: ClipboardCheck },
  { title: "Attendance", url: "/student/attendance", icon: Calendar },
  { title: "Announcements", url: "/student/announcements", icon: FileText },
];

const commonItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

export function AppSidebar({ role }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const getMenuItems = () => {
    switch (role) {
      case 'admin':
        return adminItems;
      case 'instructor':
        return instructorItems;
      case 'mentor':
        return mentorItems;
      case 'student':
        return studentItems;
      default:
        return [];
    }
  };

  const isActive = (path: string) => {
    if (path === `/${role}`) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const menuItems = getMenuItems();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r bg-white/50 backdrop-blur-sm">
      <SidebarContent className="py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {!isCollapsed && 'Main Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink
                      to={item.url}
                      className={({ isActive: linkActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive(item.url) || linkActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`
                      }
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Common Items */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {!isCollapsed && 'General'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {commonItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink
                      to={item.url}
                      className={({ isActive: linkActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          linkActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`
                      }
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}