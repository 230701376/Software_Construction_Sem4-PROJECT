
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Home, Building } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isBuilder, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">Chennai Property Connect</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link to="/properties" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
              Properties
            </Link>
            
            {isAuthenticated ? (
              <>
                {isBuilder ? (
                  <Link to="/builder/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
                    Builder Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
                      Dashboard
                    </Link>
                    <Link to="/add-property" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
                      Add Property
                    </Link>
                  </>
                )}
                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <span className="mr-2 text-sm font-medium text-gray-700">{user?.name}</span>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center">
                      <LogOut className="h-4 w-4 mr-1" />
                      Logout
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
                  Login
                </Link>
                <Link to="/signup" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
                  Signup
                </Link>
                <Link to="/builder/login" className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-700 hover:text-primary">
                  <Building className="h-4 w-4 mr-1" />
                  Builder Login
                </Link>
              </>
            )}
          </div>
          
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Properties
            </Link>
            
            {isAuthenticated ? (
              <>
                {isBuilder ? (
                  <Link 
                    to="/builder/dashboard" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Builder Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/add-property" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Add Property
                    </Link>
                  </>
                )}
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="px-4 flex items-center">
                    <div className="flex-shrink-0">
                      <User className="h-8 w-8 bg-gray-100 rounded-full p-1" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{user?.name}</div>
                      <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary w-full text-left flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
                <Link 
                  to="/builder/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Builder Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
