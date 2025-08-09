import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/AppSidebar";
import { UserRole } from "@/types/auth";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface DashboardLayoutProps {
  children: ReactNode;
  role: UserRole;
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar role={role} />
        
        <div className="flex-1 flex flex-col">
          {/* Professional Top Navigation */}
          <header className="h-16 border-b gradient-sidebar backdrop-blur-md sticky top-0 z-50 flex items-center px-6 gap-4 border-border shadow-sm">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-smooth micro-bounce" />
            
            <div className="flex-1 flex items-center justify-between">
              <div className="animate-fade-in">
                <h1 className="text-headline text-foreground capitalize">
                  {role} Dashboard
                </h1>
                <p className="text-caption">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="flex items-center gap-4 animate-fade-in-right">
                <ThemeToggle />
                <div className={`role-badge role-${role} micro-pulse`}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </div>
              </div>
            </div>
          </header>

          {/* Professional Main Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto bg-gradient-to-br from-background via-muted/30 to-background">
            <div className="page-container animate-fade-in-up">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}