
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { tamilNaduCities, areas, amenities } from "@/data/propertyData";

const AddPropertyPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [bhk, setBhk] = useState("");
  const [sqft, setSqft] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [forSaleBy, setForSaleBy] = useState("Owner");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  
  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = [...images];
      for (let i = 0; i < files.length; i++) {
        if (newImages.length < 5) {  // Limit to 5 images
          newImages.push(files[i]);
        } else {
          toast({
            title: "Maximum 5 images allowed",
            description: "You can upload up to 5 images per property.",
            variant: "destructive",
          });
          break;
        }
      }
      setImages(newImages);
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to list a property.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo, just show success and navigate
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Property listed successfully",
        description: "Your property has been added and is now visible to potential buyers.",
      });
      
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Error adding property:", error);
      toast({
        title: "Failed to add property",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const availableAreas = city ? areas[city as keyof typeof areas] || [] : [];
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">List Your Property</h1>
      
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Basic Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Property Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g., 3 BHK Spacious Apartment in Anna Nagar" 
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Describe your property in detail..." 
                  className="min-h-[150px]" 
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder="e.g., 5000000" 
                  required
                />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <select 
                  id="city" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  required
                >
                  <option value="">Select City</option>
                  {tamilNaduCities.map((cityName) => (
                    <option key={cityName} value={cityName}>{cityName}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="area">Area</Label>
                <select 
                  id="area" 
                  value={area} 
                  onChange={(e) => setArea(e.target.value)} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  disabled={!city}
                  required
                >
                  <option value="">Select Area</option>
                  {availableAreas.map((areaName) => (
                    <option key={areaName} value={areaName}>{areaName}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bhk">BHK</Label>
                <select 
                  id="bhk" 
                  value={bhk} 
                  onChange={(e) => setBhk(e.target.value)} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  required
                >
                  <option value="">Select BHK</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                  <option value="0">Not Applicable</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="sqft">Area (sq.ft)</Label>
                <Input 
                  id="sqft" 
                  type="number" 
                  value={sqft} 
                  onChange={(e) => setSqft(e.target.value)} 
                  placeholder="e.g., 1200" 
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <select 
                  id="propertyType" 
                  value={propertyType} 
                  onChange={(e) => setPropertyType(e.target.value)} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="forSaleBy">For Sale By</Label>
                <select 
                  id="forSaleBy" 
                  value={forSaleBy} 
                  onChange={(e) => setForSaleBy(e.target.value)} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  required
                >
                  <option value="Owner">Owner</option>
                  <option value="Agent">Agent</option>
                  <option value="Builder">Builder</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`amenity-${amenity}`}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityChange(amenity)}
                  />
                  <Label htmlFor={`amenity-${amenity}`} className="cursor-pointer">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Upload Images</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB (Max 5 images)</p>
                <Input 
                  id="images" 
                  type="file" 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                />
                <Label htmlFor="images" className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                  Select Files
                </Label>
              </div>
              
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={URL.createObjectURL(image)} 
                        alt={`Property ${index + 1}`} 
                        className="h-24 w-full object-cover rounded-md" 
                      />
                      <button 
                        type="button" 
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Minus className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                  Listing Property...
                </span>
              ) : "List Property"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddPropertyPage;
