import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import routeLogo from "@/assets/route-logo.png";
import { useTranslation } from 'react-i18next';
import {
  Users,
  GraduationCap,
  School,
  FileText,
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Calendar,
  UserCheck,
  LayoutDashboard,
  BarChart3,
  Building2,
  DollarSign
} from "lucide-react";

interface AppSidebarProps {
  role: UserRole;
}

export function AppSidebar({ role }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["main"]);

  const adminMenuItems = [
    { title: t('nav.dashboard'), url: "/admin", icon: LayoutDashboard },
    { title: t('nav.users'), url: "/admin/users", icon: Users },
    { title: t('nav.instructors'), url: "/admin/instructors", icon: Users },
    { title: t('nav.mentors'), url: "/admin/mentors", icon: UserCheck },
    { title: "Diplomas", url: "/admin/diplomas", icon: GraduationCap },
    { title: t('nav.groups'), url: "/admin/groups", icon: School },
    { title: t('nav.excuses'), url: "/admin/excuses", icon: FileText },
    { title: "Requests", url: "/admin/requests", icon: FileText },
    { title: t('nav.reports'), url: "/admin/reports", icon: BarChart3 },
  ];

  const instructorMenuItems = [
    { title: t('nav.dashboard'), url: "/instructor", icon: LayoutDashboard },
    { title: t('nav.groups'), url: "/instructor/groups", icon: School },
    { title: "Marks & Attendance", url: "/instructor/marks", icon: ClipboardCheck },
    { title: "Tickets", url: "/instructor/tickets", icon: MessageSquare },
  ];

  const mentorMenuItems = [
    { title: t('nav.dashboard'), url: "/mentor", icon: LayoutDashboard },
    { title: t('nav.groups'), url: "/mentor/groups", icon: School },
    { title: "Assignments", url: "/mentor/assignments", icon: BookOpen },
    { title: "Tickets", url: "/mentor/tickets", icon: MessageSquare },
  ];

  const studentMenuItems = [
    { title: t('nav.dashboard'), url: "/student", icon: LayoutDashboard },
    { title: "Grades", url: "/student/grades", icon: BarChart3 },
    { title: "Attendance", url: "/student/attendance", icon: Calendar },
    { title: t('nav.excuses'), url: "/student/excuses", icon: FileText },
    { title: "Announcements", url: "/student/announcements", icon: MessageSquare },
  ];

  const hrMenuItems = [
    { title: t('nav.dashboard'), url: "/hr", icon: LayoutDashboard },
    { title: "Excuse Management", url: "/hr/excuses", icon: FileText },
    { title: "Salary Management", url: "/hr/salary", icon: DollarSign },
  ];

  const commonItems = [
    { title: t('nav.settings'), url: "/settings", icon: Settings },
    { title: t('nav.help'), url: "/help", icon: HelpCircle },
  ];

  const getMenuItems = () => {
    switch (role) {
      case 'admin':
        return adminMenuItems;
      case 'instructor':
        return instructorMenuItems;
      case 'mentor':
        return mentorMenuItems;
      case 'student':
        return studentMenuItems;
      case 'hr':
        return hrMenuItems;
      default:
        return [];
    }
  };

  const isActive = (path: string) => {
    if (path === `/${role}`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="border-r bg-sidebar border-sidebar-border">
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-4 py-3">
          <img src={routeLogo} alt="Route" className="w-8 h-8 object-contain" />
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-foreground">Route</h2>
              <p className="text-xs text-muted-foreground">ERP System</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        {/* Main Navigation */}
        <SidebarGroup className={expandedGroups.includes("main") ? "expanded" : ""}>
          <SidebarGroupLabel 
            className="px-4 py-2 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider cursor-pointer flex items-center justify-between"
            onClick={() => toggleGroup("main")}
          >
            {!collapsed && 'Navigation'}
            {!collapsed && (
              expandedGroups.includes("main") 
                ? <ChevronDown className="w-3 h-3" />
                : <ChevronRight className="w-3 h-3" />
            )}
          </SidebarGroupLabel>
          
          {(collapsed || expandedGroups.includes("main")) && (
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive(item.url)
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm font-semibold'
                            : 'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/70'
                        }`}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        {/* Common Items */}
        <SidebarGroup className={`mt-8 ${expandedGroups.includes("general") ? "expanded" : ""}`}>
          <SidebarGroupLabel 
            className="px-4 py-2 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider cursor-pointer flex items-center justify-between"
            onClick={() => toggleGroup("general")}
          >
            {!collapsed && 'General'}
            {!collapsed && (
              expandedGroups.includes("general") 
                ? <ChevronDown className="w-3 h-3" />
                : <ChevronRight className="w-3 h-3" />
            )}
          </SidebarGroupLabel>
          
          {(collapsed || expandedGroups.includes("general")) && (
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-2">
                {commonItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="w-full">
                      <Link
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          location.pathname === item.url
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm font-semibold'
                            : 'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/70'
                        }`}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">
                {user?.name.split(' ').map(n => n[0]).join('') || role.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user?.name || 'User Name'}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role || role}</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-3 justify-start text-muted-foreground hover:text-foreground"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('nav.logout')}
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}