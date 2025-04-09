
import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import NewsCard from './NewsCard';
import FactCard from './FactCard';
import StatisticsSection from './StatisticsSection';
import { mockNews, recyclingFacts, mockStatistics } from './data';

const WasteTrends = () => {
  const [loading, setLoading] = useState(true);
  const [activeNews, setActiveNews] = useState(mockNews[0]);
  const [randomFact, setRandomFact] = useState('');
  const [statistics, setStatistics] = useState(mockStatistics);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
      setRandomFact(recyclingFacts[Math.floor(Math.random() * recyclingFacts.length)]);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const refreshFact = () => {
    setRandomFact(recyclingFacts[Math.floor(Math.random() * recyclingFacts.length)]);
  };
  
  const switchNews = (direction: 'next' | 'prev') => {
    const currentIndex = mockNews.findIndex(news => news.id === activeNews.id);
    
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % mockNews.length;
      setActiveNews(mockNews[nextIndex]);
    } else {
      const prevIndex = currentIndex === 0 ? mockNews.length - 1 : currentIndex - 1;
      setActiveNews(mockNews[prevIndex]);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mt-8">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-greenbin-primary" />
          Real-time Waste Trends
        </h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NewsCard 
            loading={loading} 
            activeNews={activeNews} 
            switchNews={switchNews} 
          />
          
          <FactCard 
            loading={loading} 
            randomFact={randomFact} 
            refreshFact={refreshFact} 
          />
        </div>
        
        <StatisticsSection loading={loading} statistics={statistics} />
        
        <div className="mt-6 text-center">
          <Button variant="outline" className="border-greenbin-primary text-greenbin-primary hover:bg-greenbin-light">
            View Complete Recycling Report
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WasteTrends;
