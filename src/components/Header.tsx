
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="w-full py-4 bg-white border-b sticky top-0 z-50">
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Calendar className="h-6 w-6 text-medical-dark mr-2" />
            <span className="text-xl font-bold text-foreground">MediCare</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium hover:text-medical-dark transition-colors ${
              isActive("/") ? "text-medical-dark" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/doctors" 
            className={`text-sm font-medium hover:text-medical-dark transition-colors ${
              isActive("/doctors") ? "text-medical-dark" : "text-muted-foreground"
            }`}
          >
            Doctors
          </Link>
          <Link 
            to="/services" 
            className={`text-sm font-medium hover:text-medical-dark transition-colors ${
              isActive("/services") ? "text-medical-dark" : "text-muted-foreground"
            }`}
          >
            Services
          </Link>
          <Link 
            to="/health-tips" 
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-medical-dark transition-colors"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Health Tips
          </Link>
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline" size="sm">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg md:hidden">
            <div className="flex flex-col p-4 space-y-4">
              <Link
                to="/"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  isActive("/")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/doctors"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  isActive("/doctors")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Doctors
              </Link>
              <Link
                to="/services"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  isActive("/services")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/health-tips"
                className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
                  isActive("/health-tips")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Health Tips
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
