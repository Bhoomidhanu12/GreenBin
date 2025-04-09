
import { Button } from "@/components/ui/button";
import { Award, Map, Search } from "lucide-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-greenbin-light to-white dark:from-gray-900 dark:to-gray-800 py-16 sm:py-24">
      {/* Decorative circles */}
      <div className="hidden sm:block sm:absolute sm:inset-0 sm:overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20 dark:opacity-10">
          <div className="h-96 w-96 rounded-full bg-greenbin-primary animate-pulse-slow"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 opacity-20 dark:opacity-10">
          <div className="h-64 w-64 rounded-full bg-greenbin-secondary animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
        onMouseEnter={() => setIsAnimated(true)}
        onMouseLeave={() => setIsAnimated(false)}
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-greenbin-dark dark:text-white tracking-tight">
              <span className="block">AI-Powered</span>
              <span className="block text-greenbin-primary">Waste Management</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
              Join our mission to reduce plastic and e-waste pollution with Enhanced GreenBin's 
              intelligent recognition system, interactive global waste map, and rewarding 
              recycling experience.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-greenbin-primary hover:bg-greenbin-secondary text-white"
                onClick={() => navigate('/scanner')}
              >
                <Search className="mr-2 h-5 w-5" />
                Scan Waste
              </Button>
              <Button 
                size="lg" 
                className="bg-greenbin-primary hover:bg-greenbin-secondary text-white"
                onClick={() => navigate('/scanner')}
              >
                <Search className="mr-2 h-5 w-5" /><a href="">Try Detection Model</a>
                
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-greenbin-primary text-greenbin-primary hover:bg-greenbin-light dark:hover:bg-gray-700"
                onClick={() => navigate('/map')}
              >
                
                <Map className="mr-2 h-5 w-5" />
                Explore Waste Map
              </Button>
            </div>
            <div className="mt-8 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Award className="flex-shrink-0 mr-1.5 h-5 w-5 text-greenbin-warning" />
              Earn rewards while saving the planet
            </div>
          </div>
          

          <div className="relative lg:ml-10">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 ease-in-out">
              <div className="px-4 py-5 sm:p-6">
                <img 
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="AI Waste Detection" 
                  className="rounded-lg shadow-md"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Multi-Object Waste Detection</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Our AI can identify different types of plastic and electronic waste to provide 
                    accurate recycling information.
                  </p>
                </div>
              </div>
            </div>

            <div className={`absolute top-1/2 -right-12 transform transition-all duration-700 ${isAnimated ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 max-w-xs">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-greenbin-primary flex items-center justify-center">
                      <Search className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Voice Assistant</h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Multilingual support to guide you through the recycling process
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`absolute -bottom-8 left-1/4 transform transition-all duration-700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 max-w-xs">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-greenbin-secondary flex items-center justify-center">
                      <Map className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Global Waste Map</h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Visualize pollution hotspots and recycling centers near you
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      
    <section className="bg-green-50 dark:bg-gray-900 py-12 px-6 md:px-16 text-center rounded-xl shadow-md mt-10 mx-4">
      <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-200 mb-4">
        Join Our Eco-Friendly Marketplace
      </h2>
      <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg mb-6">
        Be a part of our mission to make the planet greener. 
        <h2>Whether you're a buyer or seller, our upcoming platform lets you trade eco-friendly products, support sustainability, and make a real difference.
        </h2></p>
        <Button 
                size="lg" 
                className="bg-greenbin-primary hover:bg-greenbin-secondary text-white"
                onClick={() => navigate('')}
              >
                <Search className="mr-2 h-5 w-5" />
                Join Our Ecommerce Platform Now
              </Button>
    </section>
  );
      </div>
    </div>
  );
};

export default Hero;
