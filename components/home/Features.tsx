
import { Search, Globe, Award, BarChart, MapPin, MessageSquare } from 'lucide-react';

const features = [
  {
    name: 'AI Waste Detection',
    description: 'Our advanced computer vision identifies plastic and e-waste in real-time with high accuracy.',
    icon: Search,
    color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
  },
  {
    name: 'Voice Assistant',
    description: 'Multilingual voice guidance provides detailed information about waste and recycling methods.',
    icon: MessageSquare,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
  },
  {
    name: 'Global Waste Map',
    description: 'Visualize global waste pollution hotspots with our interactive 3D map.',
    icon: Globe,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
  },
  {
    name: 'Environmental Impact',
    description: 'Understand the impact of your waste on ecosystems and learn sustainable alternatives.',
    icon: BarChart,
    color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300',
  },
  {
    name: 'Recycling Centers',
    description: 'Locate nearby recycling facilities that accept your specific type of waste.',
    icon: MapPin,
    color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
  },
  {
    name: 'Rewards System',
    description: 'Earn points, badges, and real-world rewards for your recycling efforts.',
    icon: Award,
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300',
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Next-Generation Waste Management
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Enhanced GreenBin combines AI technology, interactive visualization, and gamification to 
            revolutionize how we manage waste.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="eco-card h-full p-6 flex flex-col">
                  <div>
                    <span className={`inline-flex items-center justify-center p-3 rounded-md ${feature.color}`}>
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
