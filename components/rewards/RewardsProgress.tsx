
import { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Recycle, Gift, Trash, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  unlocked: boolean;
  progress?: number;
}

interface Reward {
  id: number;
  name: string;
  points: number;
  description: string;
  image: string;
  available: boolean;
}

// Mock data for badges
const mockBadges: Badge[] = [
  { 
    id: 1, 
    name: 'Recycling Rookie', 
    description: 'Scan your first 5 items for recycling', 
    icon: Recycle, 
    color: 'text-green-500', 
    unlocked: true, 
    progress: 100,
  },
  { 
    id: 2, 
    name: 'Plastic Hunter', 
    description: 'Identify and recycle 20 plastic items', 
    icon: Trash, 
    color: 'text-blue-500', 
    unlocked: true, 
    progress: 100,
  },
  { 
    id: 3, 
    name: 'E-Waste Warrior', 
    description: 'Properly dispose of 10 electronic items', 
    icon: Award, 
    color: 'text-purple-500', 
    unlocked: false, 
    progress: 70,
  },
  { 
    id: 4, 
    name: 'Global Guardian', 
    description: 'Use the global waste map to find 5 recycling centers', 
    icon: Award, 
    color: 'text-amber-500', 
    unlocked: false, 
    progress: 40,
  },
];

// Mock data for rewards
const mockRewards: Reward[] = [
  {
    id: 1,
    name: 'Zero-Waste Starter Kit',
    points: 500,
    description: 'A kit containing reusable items to help reduce your waste footprint.',
    image: 'https://images.unsplash.com/photo-1610024062303-58e9c0b43bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    available: true,
  },
  {
    id: 2,
    name: '$10 Donation to Ocean Cleanup',
    points: 300,
    description: 'We\'ll donate $10 to The Ocean Cleanup project on your behalf.',
    image: 'https://images.unsplash.com/photo-1565693413579-8ff3fdc1b03b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    available: true,
  },
  {
    id: 3,
    name: 'Plant 5 Trees',
    points: 200,
    description: 'We\'ll plant 5 trees through our reforestation partners to offset carbon.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    available: true,
  },
  {
    id: 4,
    name: 'Premium Account Upgrade',
    points: 1000,
    description: 'Upgrade to our premium account with additional features and insights.',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    available: false,
  },
];

const RewardsProgress = () => {
  const [badges, setBadges] = useState<Badge[]>(mockBadges);
  const [rewards, setRewards] = useState<Reward[]>(mockRewards);
  const [userPoints, setUserPoints] = useState(450);
  const [activeTab, setActiveTab] = useState<'badges' | 'rewards'>('badges');
  
  // Simulate redeeming a reward
  const handleRedeemReward = (reward: Reward) => {
    if (userPoints >= reward.points) {
      // Update user points
      setUserPoints(prev => prev - reward.points);
      
      // Show success message
      toast.success(`Reward Redeemed: ${reward.name}`, {
        description: 'Instructions for claiming your reward have been sent to your email.'
      });
    } else {
      // Show error message
      toast.error('Not enough points', {
        description: `You need ${reward.points - userPoints} more points to redeem this reward.`
      });
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-greenbin-dark dark:text-white">Rewards & Achievements</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Track your progress and earn rewards for your recycling efforts.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Award className="mr-2 h-6 w-6 text-greenbin-warning" />
                <span>{userPoints}</span>
                <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">points</span>
              </h2>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Keep recycling to earn more points!</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={activeTab === 'badges' ? 'default' : 'outline'} 
                className={activeTab === 'badges' ? 'bg-greenbin-primary text-white' : ''}
                onClick={() => setActiveTab('badges')}
              >
                <Award className="mr-2 h-5 w-5" />
                Badges
              </Button>
              <Button 
                variant={activeTab === 'rewards' ? 'default' : 'outline'} 
                className={activeTab === 'rewards' ? 'bg-greenbin-primary text-white' : ''}
                onClick={() => setActiveTab('rewards')}
              >
                <Gift className="mr-2 h-5 w-5" />
                Rewards
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {badges.map((badge) => (
            <Card key={badge.id} className={`${badge.unlocked ? 'border-green-200 dark:border-green-800' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      badge.unlocked 
                        ? 'bg-green-100 dark:bg-green-900' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <badge.icon className={`h-5 w-5 ${badge.unlocked ? badge.color : 'text-gray-400 dark:text-gray-500'}`} />
                    </div>
                    <div className="ml-3">
                      <CardTitle className={`text-lg ${badge.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {badge.name}
                      </CardTitle>
                      <CardDescription>
                        {badge.description}
                      </CardDescription>
                    </div>
                  </div>
                  {badge.unlocked && (
                    <div className="flex-shrink-0 h-6 w-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!badge.unlocked && badge.progress !== undefined && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Progress</span>
                      <span className="font-medium">{badge.progress}%</span>
                    </div>
                    <Progress value={badge.progress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {activeTab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {rewards.map((reward) => (
            <Card key={reward.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src={reward.image} 
                  alt={reward.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-greenbin-primary text-white px-2 py-1 rounded-full text-sm font-medium">
                  {reward.points} points
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{reward.name}</CardTitle>
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className={`w-full ${
                    userPoints >= reward.points && reward.available
                      ? 'bg-greenbin-primary hover:bg-greenbin-secondary text-white' 
                      : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={userPoints < reward.points || !reward.available}
                  onClick={() => handleRedeemReward(reward)}
                >
                  {userPoints >= reward.points && reward.available
                    ? 'Redeem Reward' 
                    : !reward.available
                      ? 'Currently Unavailable'
                      : `Need ${reward.points - userPoints} more points`
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-greenbin-primary">27</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Items Recycled</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-greenbin-secondary">12.5 kg</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Waste Diverted</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-greenbin-warning">3.2 kg</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">CO₂ Saved</div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Upcoming Achievements</h3>
            <div className="space-y-4">
              {badges.filter(badge => !badge.unlocked).map(badge => (
                <div key={badge.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <badge.icon className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{badge.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{badge.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  {badge.progress !== undefined && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Progress</span>
                        <span className="font-medium">{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsProgress;
