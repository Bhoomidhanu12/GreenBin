import { ExternalLink, Github, Heart, Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            
            <Link to="/" className="flex items-center">
              <Recycle className="h-8 w-8 text-greenbin-primary mr-2" />
              <span className="text-xl font-bold text-greenbin-dark dark:text-greenbin-light">
                Enhanced<span className="text-greenbin-primary">GreenBin</span>
              </span>
            </Link>
          </div>
          
          <div className="mt-8 md:mt-0">
            <p className="text-center md:text-right text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Enhanced GreenBin. All rights reserved.
            </p>
            <p className="flex justify-center md:justify-end items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              Made with 
              <Heart className="h-4 w-4 mx-1 text-greenbin-danger" /> 
              for a greener planet
            </p>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase">
              Features
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/scanner" className="text-sm text-gray-600 dark:text-gray-400 hover:text-greenbin-primary dark:hover:text-greenbin-accent">
                  Waste Scanner
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-sm text-gray-600 dark:text-gray-400 hover:text-greenbin-primary dark:hover:text-greenbin-accent">
                  Global Waste Map
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="text-sm text-gray-600 dark:text-gray-400 hover:text-greenbin-primary dark:hover:text-greenbin-accent">
                  Rewards System
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/learn" className="text-sm text-gray-600 dark:text-gray-400 hover:text-greenbin-primary dark:hover:text-greenbin-accent">
                  Learning Center
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-greenbin-primary dark:hover:text-greenbin-accent">
                  Environmental Impact
                </Link>
              </li>
              <li>
                <Link to="/centers" className="text-sm text-gray-600 dark:text-gray-400 hover:text-greenbin-primary dark:hover:text-greenbin-accent">
                  Recycling Centers
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-greenbin-primary dark:hover:text-greenbin-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-sm text-gray-600 dark:text-gray-400 hover:text-greenbin-primary dark:hover:text-greenbin-accent">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-greenbin-primary dark:hover:text-greenbin-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-greenbin-primary dark:hover:text-greenbin-accent">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-greenbin-primary dark:hover:text-greenbin-accent">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-greenbin-primary dark:hover:text-greenbin-accent"
                >
                  <Github className="h-4 w-4 mr-1" />
                  GitHub
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
