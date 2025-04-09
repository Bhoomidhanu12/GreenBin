
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Award, BarChart2, Camera, Home, Map, Menu, MessageSquare, Recycle, UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../scanner/ThemeToggle';

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
    {name: 'GreenBot', path:'/FloatingMessengerButton', icon:MessageSquare},
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
            >
              <Recycle className="h-8 w-8 text-greenbin-primary" />
              <span className="font-bold text-xl text-greenbin-dark dark:text-white">GreenBin</span>
            </Link>
          </div>
          
          {!isMobile ? (
            <nav className="hidden md:flex space-x-4">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-greenbin-light text-greenbin-primary'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <Icon className="h-4 w-4" />
                      <span>{link.name}</span>
                    </div>
                  </Link>
                );
              })}
              <div className="ml-4">
                <ThemeToggle />
              </div>
            </nav>
          ) : (
            <div className="flex items-center">
              <ThemeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="ml-2">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-2">
                      <Recycle className="h-6 w-6 text-greenbin-primary" />
                      <span className="font-bold text-lg text-greenbin-dark dark:text-white">GreenBin</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-4 mt-4">
                    {links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`px-4 py-3 rounded-md font-medium transition-colors ${
                            isActive(link.path)
                              ? 'bg-greenbin-light text-greenbin-primary'
                              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="h-5 w-5" />
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
