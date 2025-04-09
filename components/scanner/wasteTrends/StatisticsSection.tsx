
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export type StatisticItem = {
  label: string;
  value: string;
  change: string;
  period: string;
  trend: string;
};

type StatisticsSectionProps = {
  loading: boolean;
  statistics: StatisticItem[];
};

const StatisticsSection = ({ loading, statistics }: StatisticsSectionProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <BarChart2 className="h-5 w-5 mr-2 text-green-500" />
        Global Recycling Statistics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statistics.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                  <Skeleton className="h-6 w-1/3 mx-auto" />
                  <Skeleton className="h-4 w-1/4 mx-auto" />
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                  <div className={`text-xs flex items-center justify-center ${
                    stat.trend === 'up' && stat.label !== 'Ocean plastic pollution' 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }`}>
                    {stat.trend === 'up' ? '↑' : '↓'} {stat.change} per {stat.period}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;
