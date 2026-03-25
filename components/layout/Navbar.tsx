import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Award, BarChart2, Camera, Home, Map, Menu, Recycle, UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const links = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Scanner', path: '/scanner', icon: Camera },
    { name: 'Map', path: '/map', icon: Map },
    { name: 'Rewards', path: '/rewards', icon: Award },
    { name: 'Profile', path: '/addprofile', icon: UserPlus },
    { name: 'Waste Trends', path: '/waste-trends', icon: BarChart2 },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
            >
              <Recycle className="h-8 w-8 text-green-600" />
              <span className="font-bold text-xl text-gray-900">GreenBin</span>
            </Link>
          </div>
          
          {!isMobile ? (
            <nav className="hidden md:flex space-x-4 items-center">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-green-100 text-green-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <Icon className="h-4 w-4" />
                      <span>{link.name}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          ) : (
            <div className="flex items-center space-x-2">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 p-0">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex justify-between items-center py-4 mb-8">
                    <div className="flex items-center space-x-2">
                      <Recycle className="h-6 w-6 text-green-600" />
                      <span className="font-bold text-lg text-gray-900">GreenBin</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsOpen(false)}
                      className="h-9 w-9 p-0"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    {links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                            isActive(link.path)
                              ? 'bg-green-100 text-green-600'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            <span>{link.name}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

