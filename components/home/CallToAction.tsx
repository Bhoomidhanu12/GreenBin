
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-gradient-to-r from-greenbin-primary to-greenbin-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-8 lg:mb-0 lg:mr-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to start your recycling journey?
            </h2>
            <p className="mt-4 text-lg text-white opacity-90 max-w-xl">
              Join thousands of environmentally conscious users who are making a difference. 
              Start scanning, learning, and earning rewards today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="bg-white text-greenbin-primary hover:bg-gray-100"
              onClick={() => navigate('/scanner')}
            >
              Try Scanner Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-green-500"

              onClick={() => navigate('/waste-trends')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
