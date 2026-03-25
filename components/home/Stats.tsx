
import { useState, useEffect } from 'react';
import { Trash, Battery, Map, Award } from 'lucide-react';

interface Stat {
  id: number;
  name: string;
  value: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const statsData: Stat[] = [
  {
    id: 1,
    name: 'Plastic Waste Detected',
    value: '3.5M',
    icon: Trash,
    description: 'Tons of plastic waste identified through our scanning system',
    color: 'text-greenbin-primary',
  },
  {
    id: 2,
    name: 'E-Waste Recycled',
    value: '850K',
    icon: Battery,
    description: 'Tons of electronic waste properly recycled with our guidance',
    color: 'text-greenbin-secondary',
  },
  {
    id: 3,
    name: 'Recycling Centers',
    value: '12K+',
    icon: Map,
    description: 'Global recycling locations mapped and available in our system',
    color: 'text-greenbin-info',
  },
  {
    id: 4,
    name: 'Rewards Earned',
    value: '1.2M',
    icon: Award,
    description: 'Total rewards points earned by our active user community',
    color: 'text-greenbin-warning',
  },
];

const Stats = () => {
  const [stats, setStats] = useState<Stat[]>(statsData.map(stat => ({ ...stat, value: '0' })));
  
  useEffect(() => {
    // Simulate loading with animated counting
    const intervalId = setInterval(() => {
      setStats(prevStats => 
        prevStats.map((stat, index) => {
          const targetValue = statsData[index].value;
          
          // If it's already at target, don't change
          if (stat.value === targetValue) return stat;
          
          // For values with M or K suffix
          if (targetValue.includes('M') || targetValue.includes('K')) {
            const numPart = parseFloat(targetValue);
            const suffix = targetValue.includes('M') ? 'M' : 'K';
            const currentNum = parseFloat(stat.value === '0' ? '0' : stat.value);
            const step = numPart / 20; // Divide animation into 20 steps
            
            const newValue = currentNum + step;
            if (newValue >= numPart) {
              return { ...stat, value: targetValue };
            }
            return { ...stat, value: newValue.toFixed(1) + suffix };
          }
          
          // For regular numeric values
          const target = parseInt(targetValue);
          const current = parseInt(stat.value);
          const step = Math.max(1, Math.floor(target / 20));
          const newValue = Math.min(current + step, target);
          
          return { ...stat, value: newValue.toString() };
        })
      );
    }, 100);
    
    // Cleanup interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-12 bg-greenbin-light dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Our Environmental Impact
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Together we're making a measurable difference in waste reduction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-greenbin-light dark:bg-gray-700 rounded-md p-3">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        {stat.name}
                      </dt>
                      <dd>
                        <div className={`text-lg font-medium ${stat.color}`}>
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
