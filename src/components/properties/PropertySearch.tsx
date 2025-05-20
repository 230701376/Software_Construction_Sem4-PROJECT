
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { tamilNaduCities, areas } from "@/data/propertyData";

interface PropertySearchProps {
  isHorizontal?: boolean;
  onSearch?: (filters: any) => void;
}

const PropertySearch = ({ isHorizontal = false, onSearch }: PropertySearchProps) => {
  const navigate = useNavigate();
  const [city, setCity] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [bhk, setBhk] = useState<string>("");
  const [currentAreas, setCurrentAreas] = useState<string[]>([]);

  useEffect(() => {
    if (city && city in areas) {
      setCurrentAreas(areas[city as keyof typeof areas]);
    } else {
      setCurrentAreas([]);
    }
    setArea("");
  }, [city]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters: Record<string, string> = {};
    if (city) filters.city = city;
    if (area) filters.area = area;
    if (type) filters.type = type;
    if (bhk) filters.bhk = bhk;
    
    if (onSearch) {
      onSearch(filters);
    } else {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => params.append(key, filters[key]));
      navigate(`/properties?${params.toString()}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`bg-white rounded-lg shadow-md p-6 ${isHorizontal ? 'grid grid-cols-1 md:grid-cols-5 gap-4' : 'space-y-4'}`}
    >
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
        <select
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select City</option>
          {tamilNaduCities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">Area</label>
        <select
          id="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          disabled={!city}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
        >
          <option value="">Select Area</option>
          {currentAreas.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="bhk" className="block text-sm font-medium text-gray-700 mb-1">BHK</label>
        <select
          id="bhk"
          value={bhk}
          onChange={(e) => setBhk(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select BHK</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
          <option value="4">4 BHK</option>
          <option value="5">5+ BHK</option>
        </select>
      </div>
      
      <div className={isHorizontal ? 'self-end' : ''}>
        <Button type="submit" className="w-full flex items-center justify-center">
          <Search className="h-4 w-4 mr-2" />
          Search Properties
        </Button>
      </div>
    </form>
  );
};

export default PropertySearch;
