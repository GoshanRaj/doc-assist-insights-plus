
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-medical-light to-transparent opacity-70"></div>
      <div className="container py-16 md:py-24 lg:py-32 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Your Health, <span className="medical-gradient-text">Our Priority</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Book doctor appointments with ease, store your health records securely, and get personalized health tips from our AI assistant.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/signup">
              <Button size="lg" className="medical-gradient">
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
            </Link>
            <Link to="/health-tips">
              <Button size="lg" variant="outline">
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Health Tips
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center text-sm text-muted-foreground">
            <svg className="w-4 h-4 mr-1 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Trusted by 10,000+ patients</span>
            <span className="mx-3">•</span>
            <svg className="w-4 h-4 mr-1 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100+ specialist doctors</span>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt="Doctor with patient"
              className="w-full h-auto object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-xs">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-medical flex items-center justify-center text-white">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold">Next available slot</p>
                <p className="text-xs text-muted-foreground">Today, 3:00 PM</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-medical flex items-center justify-center text-white">
                  <span className="text-xs font-bold">+5</span>
                </div>
                <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/86.jpg" alt="User" />
              </div>
              <p className="ml-2 text-xs">Doctors online now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
