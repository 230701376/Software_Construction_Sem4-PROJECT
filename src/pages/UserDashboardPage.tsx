
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Home, Star, User, Settings, HelpCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Property, fetchAllProperties } from "@/data/propertyData";
import PropertyCard from "@/components/properties/PropertyCard";

const UserDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Fetch user properties
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch user's properties from an API
        const allProperties = await fetchAllProperties();
        // Filter for demo to show some properties as if they belong to the user
        const userProperties = allProperties.filter(prop => prop.postedBy.id === "user-001" || prop.id === "prop-001");
        setMyProperties(userProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast({
          title: "Error",
          description: "Failed to load your properties. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, [isAuthenticated, navigate, toast]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <Button asChild className="flex items-center">
          <Link to="/add-property">
            <Plus className="h-4 w-4 mr-2" />
            Add New Property
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{myProperties.length}</CardTitle>
            <div className="text-sm text-gray-500">Properties Listed</div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">0</CardTitle>
            <div className="text-sm text-gray-500">Interested Buyers</div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">0</CardTitle>
            <div className="text-sm text-gray-500">Reviews Received</div>
          </CardHeader>
        </Card>
      </div>
      
      <Tabs defaultValue="properties">
        <TabsList className="mb-6">
          <TabsTrigger value="properties" className="flex items-center">
            <Home className="h-4 w-4 mr-2" />
            My Properties
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center">
            <Star className="h-4 w-4 mr-2" />
            Saved Properties
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center">
            <Star className="h-4 w-4 mr-2" />
            My Reviews
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="properties">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : myProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Home className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">No properties listed yet</h3>
              <p className="text-gray-600 mb-4">Get started by listing your first property</p>
              <Button asChild>
                <Link to="/add-property">Add Property</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Star className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">No saved properties yet</h3>
            <p className="text-gray-600 mb-4">Save properties that interest you for easy access later</p>
            <Button asChild>
              <Link to="/properties">Browse Properties</Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Star className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">No reviews yet</h3>
            <p className="text-gray-600 mb-4">Reviews from your property transactions will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="profile">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">My Profile</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      value={user?.name || ""}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      value={user?.email || ""}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                      type="text" 
                      placeholder="Enter your phone number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input 
                      type="text" 
                      placeholder="City, State"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>Update Profile</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Change Password</span>
                <ArrowUpRight className="h-4 w-4" />
              </li>
              <li className="flex justify-between items-center">
                <span>Privacy Settings</span>
                <ArrowUpRight className="h-4 w-4" />
              </li>
              <li className="flex justify-between items-center">
                <span>Notification Preferences</span>
                <ArrowUpRight className="h-4 w-4" />
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Contact Support</span>
                <ArrowUpRight className="h-4 w-4" />
              </li>
              <li className="flex justify-between items-center">
                <span>FAQs</span>
                <ArrowUpRight className="h-4 w-4" />
              </li>
              <li className="flex justify-between items-center">
                <span>User Guide</span>
                <ArrowUpRight className="h-4 w-4" />
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardPage;
