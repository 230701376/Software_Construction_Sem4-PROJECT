
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Chennai Property Connect</h3>
            <p className="mb-4">
              Your trusted partner for finding properties in Tamil Nadu. We connect buyers, sellers, and builders to create seamless property transactions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-primary">Properties</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-primary">Signup</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Popular Locations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?city=Chennai" className="hover:text-primary">Chennai</Link>
              </li>
              <li>
                <Link to="/properties?city=Coimbatore" className="hover:text-primary">Coimbatore</Link>
              </li>
              <li>
                <Link to="/properties?city=Madurai" className="hover:text-primary">Madurai</Link>
              </li>
              <li>
                <Link to="/properties?city=Salem" className="hover:text-primary">Salem</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Anna Salai, Chennai, Tamil Nadu</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@chennaipropertyconnect.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Chennai Property Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
