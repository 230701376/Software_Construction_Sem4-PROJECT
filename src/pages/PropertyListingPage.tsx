
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, GridIcon, ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertySearch from "@/components/properties/PropertySearch";
import { amenities, Property, fetchPropertiesByFilters } from "@/data/propertyData";
import { Checkbox } from "@/components/ui/checkbox";

const PropertyListingPage = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  
  // Filters
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      
      const filters = {
        city: searchParams.get("city") || "",
        area: searchParams.get("area") || "",
        bhk: searchParams.get("bhk") ? parseInt(searchParams.get("bhk") as string) : undefined,
        type: searchParams.get("type") || "",
        minPrice: minPrice ? parseInt(minPrice) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
        amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
      };
      
      const fetchedProperties = await fetchPropertiesByFilters(filters);
      
      // Sort properties
      let sortedProperties = [...fetchedProperties];
      if (sortBy === "newest") {
        sortedProperties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (sortBy === "price_low") {
        sortedProperties.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price_high") {
        sortedProperties.sort((a, b) => b.price - a.price);
      }
      
      setProperties(sortedProperties);
      setLoading(false);
    };
    
    fetchProperties();
  }, [searchParams, minPrice, maxPrice, selectedAmenities, sortBy]);
  
  const handleAmenityChange = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Properties</h1>
      
      <div className="mb-6">
        <PropertySearch isHorizontal />
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="md:hidden mb-4">
          <Button 
            variant="outline" 
            className="w-full flex justify-center items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
        
        <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-lg shadow p-5 sticky top-4">
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="flex space-x-2">
                  <div>
                    <label htmlFor="minPrice" className="block text-sm mb-1">Min</label>
                    <input 
                      type="number"
                      id="minPrice"
                      placeholder="₹"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxPrice" className="block text-sm mb-1">Max</label>
                    <input 
                      type="number"
                      id="maxPrice"
                      placeholder="₹"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Sort By</h4>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Amenities</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <Checkbox
                        id={`amenity-${amenity}`}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityChange(amenity)}
                      />
                      <label
                        htmlFor={`amenity-${amenity}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Properties Grid */}
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
            </p>
            <div className="flex gap-2">
              <Button
                variant={isGridView ? "default" : "outline"}
                size="sm"
                onClick={() => setIsGridView(true)}
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={!isGridView ? "default" : "outline"}
                size="sm"
                onClick={() => setIsGridView(false)}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : properties.length > 0 ? (
            <div className={isGridView ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-bold mb-2">No properties found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to find more properties</p>
              <Button onClick={() => {
                setSelectedAmenities([]);
                setMinPrice("");
                setMaxPrice("");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyListingPage;
