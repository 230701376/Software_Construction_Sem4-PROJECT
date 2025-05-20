
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Building, Eye, Edit, Trash, Upload, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { dummyBuilderProjects, BuilderProject } from "@/data/propertyData";

const BuilderDashboardPage = () => {
  const { user, isAuthenticated, isBuilder } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [projects, setProjects] = useState<BuilderProject[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated and is a builder
    if (!isAuthenticated) {
      navigate("/builder/login");
      return;
    }
    
    if (!isBuilder) {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You must be logged in as a builder to access this page.",
        variant: "destructive",
      });
      return;
    }
    
    // Fetch builder projects
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch from an API
        setProjects(dummyBuilderProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [isAuthenticated, isBuilder, navigate, toast]);
  
  const handleDeleteProject = (projectId: string) => {
    // In a real app, this would make an API call
    setProjects(projects.filter(project => project.id !== projectId));
    toast({
      title: "Project deleted",
      description: "The project has been successfully deleted.",
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Builder Dashboard</h1>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add New Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{projects.length}</CardTitle>
            <CardDescription>Total Projects</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {projects.reduce((total, project) => total + project.unitsSold, 0)}
            </CardTitle>
            <CardDescription>Units Sold</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {projects.filter(project => project.status === "Ready to Move").length}
            </CardTitle>
            <CardDescription>Ready to Move Projects</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 mb-4">Your Projects</h2>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : projects.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full object-cover" 
                          src={project.images[0]} 
                          alt={project.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500">{project.projectType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{project.location.area}</div>
                    <div className="text-sm text-gray-500">{project.location.city}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${project.status === 'Ready to Move' ? 'bg-green-100 text-green-800' : 
                        project.status === 'Under Construction' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.unitsSold} / {project.unitsTotal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">No projects yet</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first project</p>
          <Button className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Button>
        </div>
      )}
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Tips for Successful Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Add high-quality images to showcase your properties effectively.</li>
              <li>Keep project details up-to-date, especially construction status and availability.</li>
              <li>Respond promptly to inquiries from potential buyers.</li>
              <li>Highlight unique selling points and amenities to stand out.</li>
              <li>Regularly update your project page with construction progress and milestones.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuilderDashboardPage;
