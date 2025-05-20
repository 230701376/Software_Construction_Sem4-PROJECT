
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building, Home, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertySearch from "@/components/properties/PropertySearch";
import PropertyCard from "@/components/properties/PropertyCard";
import { fetchAllProperties, Property, dummyBuilderProjects } from "@/data/propertyData";

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      const allProperties = await fetchAllProperties();
      setFeaturedProperties(allProperties.slice(0, 3));
    };
    
    fetchFeaturedProperties();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold">Find Your Perfect Property in Tamil Nadu</h1>
              <p className="text-xl">
                Connect with trusted property sellers, agents, and builders across Tamil Nadu. Find your dream home today!
              </p>
              <div className="flex gap-4">
                <Button asChild className="bg-white text-blue-700 hover:bg-gray-100">
                  <Link to="/properties">Browse Properties</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                  <Link to="/add-property">List Property</Link>
                </Button>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <PropertySearch />
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Properties Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <Button asChild variant="outline" className="flex items-center">
              <Link to="/properties">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Featured Builder Projects */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Builder Projects</h2>
            <Button asChild variant="outline" className="flex items-center">
              <Link to="/projects">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dummyBuilderProjects.map((project) => (
              <div key={project.id} className="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.images[0]} 
                    alt={project.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-primary text-white px-2 py-1 text-sm font-medium">
                    {project.status}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{project.name}</h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center text-gray-500 mb-4">
                    <Building className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.location.area}, {project.location.city}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">₹{project.priceRange.min.toLocaleString()} - ₹{project.priceRange.max.toLocaleString()}</span>
                    <Button asChild size="sm">
                      <Link to={`/projects/${project.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Chennai Property Connect</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Properties</h3>
              <p className="text-gray-600">All properties on our platform are verified for authenticity to ensure a safe and trustworthy experience.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Review System</h3>
              <p className="text-gray-600">Make informed decisions with our review system that helps you verify sellers and their past dealings.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Builder Connection</h3>
              <p className="text-gray-600">Direct connection with trusted builders showcasing their latest projects and developments.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
