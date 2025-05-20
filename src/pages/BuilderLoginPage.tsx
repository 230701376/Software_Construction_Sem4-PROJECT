
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const BuilderLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password, "builder");
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to Chennai Property Connect!",
        });
        navigate("/builder/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-blue-100 p-3">
              <Building className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Builder Login</CardTitle>
          <CardDescription className="text-center">
            Access your builder dashboard to manage your projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="company@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                  Logging in...
                </span>
              ) : "Log in"}
            </Button>
            
            <div className="text-center text-sm">
              <p>
                Demo credentials: builder@example.com / password
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm w-full">
            <p>
              Not a builder?{" "}
              <Link to="/login" className="text-primary hover:underline">
                User Login
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BuilderLoginPage;
