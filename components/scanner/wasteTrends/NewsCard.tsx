
import React from 'react';
import { Newspaper } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export type NewsItem = {
  id: number;
  title: string;
  summary: string;
  source: string;
  date: string;
  category: string;
};

type NewsCardProps = {
  loading: boolean;
  activeNews: NewsItem;
  switchNews: (direction: 'next' | 'prev') => void;
};

const NewsCard = ({ loading, activeNews, switchNews }: NewsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Newspaper className="h-5 w-5 mr-2 text-blue-500" />
            Recycling News
          </CardTitle>
          <div className="flex space-x-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => switchNews('prev')}
            >
              ←
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => switchNews('next')}
            >
              →
            </Button>
          </div>
        </div>
        <CardDescription>Latest updates from the recycling world</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <>
            <Badge className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
              {activeNews.category}
            </Badge>
            <h3 className="font-medium text-lg mb-2">{activeNews.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {activeNews.summary}
            </p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{activeNews.source}</span>
              <span>{activeNews.date}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsCard;
