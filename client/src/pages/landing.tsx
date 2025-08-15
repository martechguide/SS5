import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, GraduationCap, UserPlus, LogIn } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginForm {
  email: string;
  password: string;
}

export default function Landing() {
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("login");
  const [signupForm, setSignupForm] = useState<SignupForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: ""
  });
  const { toast } = useToast();

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: async (userData: Omit<SignupForm, 'confirmPassword'>) => {
      const response = await apiRequest("/api/auth/signup", "POST", userData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Account created successfully. You can now login.",
      });
      setActiveTab("login");
      setSignupForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    },
    onError: (error: any) => {
      console.error("Signup error:", error);
      // Extract error message from the error
      let errorMessage = "Failed to create account";
      if (error.message) {
        // Parse error message if it's in format "400: {"message":"..."}"
        try {
          const match = error.message.match(/\d+: (.+)/);
          if (match) {
            const errorData = JSON.parse(match[1]);
            errorMessage = errorData.message || errorMessage;
          } else {
            errorMessage = error.message;
          }
        } catch {
          errorMessage = error.message;
        }
      }
      setError(errorMessage);
    }
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginForm) => {
      const response = await apiRequest("/api/auth/login", "POST", credentials);
      return response.json();
    },
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      // Extract error message from the error
      let errorMessage = "Invalid email or password";
      if (error.message) {
        try {
          const match = error.message.match(/\d+: (.+)/);
          if (match) {
            const errorData = JSON.parse(match[1]);
            errorMessage = errorData.message || errorMessage;
          } else {
            errorMessage = error.message;
          }
        } catch {
          errorMessage = error.message;
        }
      }
      setError(errorMessage);
    }
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!signupForm.firstName || !signupForm.lastName || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (signupForm.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupForm.email)) {
      setError("Please enter a valid email address");
      return;
    }

    signupMutation.mutate({
      firstName: signupForm.firstName,
      lastName: signupForm.lastName,
      email: signupForm.email,
      password: signupForm.password
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginForm.email || !loginForm.password) {
      setError("Please enter both email and password");
      return;
    }

    loginMutation.mutate(loginForm);
  };

  const handleGoogleSignIn = () => {
    setError(null);
    // For now, redirect to simple login until Google OAuth is fully configured
    toast({
      title: "Google Sign-In",
      description: "Please use email/password signup for now. Google authentication will be available soon.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="text-white text-2xl" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Learn Here Free</h2>
          <p className="mt-2 text-gray-600">Access your personalized learning content</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn size={16} />
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center gap-2">
                <UserPlus size={16} />
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardContent className="p-6 pt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleGoogleSignIn}
                  className="w-full mt-4 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50"
                  variant="outline"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup">
              <CardContent className="p-6 pt-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={signupForm.firstName}
                        onChange={(e) => setSignupForm({...signupForm, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={signupForm.lastName}
                        onChange={(e) => setSignupForm({...signupForm, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="john@example.com"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Minimum 6 characters"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Repeat your password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={signupMutation.isPending}
                  >
                    {signupMutation.isPending ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>By signing up, you agree to our terms of service</p>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>

          {error && (
            <div className="px-6 pb-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}