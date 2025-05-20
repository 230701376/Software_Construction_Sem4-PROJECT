
import { Link } from "react-router-dom";
import { MapPin, Home, Maximize } from "lucide-react";
import { Property } from "@/data/propertyData";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link to={`/properties/${property.id}`} className="block rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-primary text-white px-2 py-1 text-sm font-medium">
          {property.forSaleBy}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{property.title}</h3>
        
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location.area}, {property.location.city}</span>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-gray-600">
            <Home className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bhk} BHK</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Maximize className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.sqft} sq.ft</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-t border-gray-100 pt-3">
          <span className="font-bold text-lg text-primary">{formatCurrency(property.price)}</span>
          <span className="text-xs text-gray-500">Posted on {new Date(property.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
