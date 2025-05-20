
import { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "builder";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isBuilder: boolean;
  login: (email: string, password: string, role: "user" | "builder") => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: "user" | "builder") => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string, role: "user" | "builder"): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // Simulate login for demo
      const mockUsers = {
        user: {
          id: "user-123",
          name: "John Doe",
          email: "user@example.com",
          password: "password",
          role: "user"
        },
        builder: {
          id: "builder-123",
          name: "ABC Constructions",
          email: "builder@example.com",
          password: "password",
          role: "builder"
        }
      };

      let loggedInUser = null;
      
      if (role === "user" && email === mockUsers.user.email && password === mockUsers.user.password) {
        loggedInUser = { ...mockUsers.user };
        delete loggedInUser.password;
      } else if (role === "builder" && email === mockUsers.builder.email && password === mockUsers.builder.password) {
        loggedInUser = { ...mockUsers.builder };
        delete loggedInUser.password;
      }
      
      if (loggedInUser) {
        setUser(loggedInUser as User);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, role: "user" | "builder"): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For demo, just simulate creating a user
      const newUser = {
        id: `${role}-${Date.now()}`,
        name,
        email,
        role
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isBuilder: user?.role === "builder",
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
