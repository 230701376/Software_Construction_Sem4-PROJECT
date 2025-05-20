
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  Calendar, 
  Home, 
  Maximize, 
  Phone, 
  Mail, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Star,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Property, fetchPropertyById, fetchReviewsByUserId, Review, amenities } from "@/data/propertyData";
import { formatCurrency } from "@/lib/utils";

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error("Property ID not found");
        }
        
        const fetchedProperty = await fetchPropertyById(id);
        
        if (!fetchedProperty) {
          throw new Error("Property not found");
        }
        
        setProperty(fetchedProperty);
        
        // Fetch reviews for the property owner
        const propertyReviews = await fetchReviewsByUserId(fetchedProperty.postedBy.id);
        setReviews(propertyReviews);
        
      } catch (error) {
        console.error("Error fetching property:", error);
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPropertyDetails();
  }, [id]);
  
  const nextImage = () => {
    if (!property) return;
    setCurrentImageIndex((currentImageIndex + 1) % property.images.length);
  };
  
  const prevImage = () => {
    if (!property) return;
    setCurrentImageIndex((currentImageIndex - 1 + property.images.length) % property.images.length);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || "Property not found"}</h2>
        <Button asChild>
          <Link to="/properties">Back to Properties</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/properties" className="text-primary hover:underline flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Properties
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="relative rounded-lg overflow-hidden h-96 mb-6">
            <img 
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            {property.images.length > 1 && (
              <>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
            
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
          
          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="flex gap-2 mb-8 overflow-x-auto">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`h-20 w-20 object-cover cursor-pointer rounded ${
                    index === currentImageIndex ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
          
          {/* Property Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{property.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              <span>{property.location.area}, {property.location.city}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-4 pb-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Price</span>
                  <span className="font-bold text-xl text-primary">{formatCurrency(property.price)}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Property Type</span>
                  <span className="font-semibold">{property.type}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">BHK</span>
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-1 text-gray-600" />
                    <span className="font-semibold">{property.bhk} BHK</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Built-up Area</span>
                  <div className="flex items-center">
                    <Maximize className="h-4 w-4 mr-1 text-gray-600" />
                    <span className="font-semibold">{property.sqft} sq.ft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
          </div>
          
          {/* Amenities */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          {/* Contact Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact {property.forSaleBy}</h2>
            
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-gray-200 p-3">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-3">
                <h3 className="font-semibold">{property.postedBy.name}</h3>
                <p className="text-sm text-gray-500">{property.forSaleBy}</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <Button className="w-full flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" />
                {property.postedBy.phone}
              </Button>
              
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                <span className="text-sm text-gray-600">
                  Posted on {new Date(property.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Reviews */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
              
              {isAuthenticated && (
                <Button size="sm" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Add Review
                </Button>
              )}
            </div>
            
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-center mb-2">
                      <User className="h-5 w-5 text-gray-600 mr-2" />
                      <span className="font-medium">Anonymous User</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600">No reviews yet</p>
              </div>
            )}
            
            {!isAuthenticated && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm text-center">
                <Link to="/login" className="text-primary hover:underline">Sign in</Link> to post a review
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
