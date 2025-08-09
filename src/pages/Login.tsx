import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, GraduationCap, Users, BookOpen, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import loginHero from "@/assets/login-hero.jpg";
import routeLogo from "@/assets/route-logo.png";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        // Navigate based on user role
        const email = formData.email.toLowerCase();
        if (email.includes('admin')) {
          navigate('/admin');
        } else if (email.includes('instructor')) {
          navigate('/instructor');
        } else if (email.includes('mentor')) {
          navigate('/mentor');
        } else {
          navigate('/student');
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary via-primary-light to-primary-lighter relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-light/80" />
        
        {/* Hero Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={loginHero} 
            alt="Education platform illustration" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm p-2">
                <img src={routeLogo} alt="Route" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Route</h1>
                <p className="text-white/80 text-sm">ERP Management System</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Streamline Your
              <span className="block gradient-text">Educational Operations</span>
            </h2>
            
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              A comprehensive ERP platform designed for educational institutions to manage 
              users, track attendance, handle excuses, and streamline administrative processes.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span>Comprehensive user management</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span>Role-based access control</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <span>Excuse & attendance management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 p-2">
                  <img src={routeLogo} alt="Route" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Welcome to Route</h1>
                <p className="text-muted-foreground mt-2">
                  Sign in to your ERP account to continue
                </p>
              </div>
            </CardHeader>
            
            <CardContent>
              {error && (
                <Alert className="mb-4" variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-2">Demo Accounts:</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Admin: admin@route.com / password</p>
                  <p>Instructor: instructor@route.com / password</p>
                  <p>Mentor: mentor@route.com / password</p>
                  <p>Student: student@route.com / password</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}