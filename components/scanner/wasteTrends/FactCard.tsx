
import React from 'react';
import { Info, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type FactCardProps = {
  loading: boolean;
  randomFact: string;
  refreshFact: () => void;
};

const FactCard = ({ loading, randomFact, refreshFact }: FactCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Info className="h-5 w-5 mr-2 text-amber-500" />
            Did You Know?
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={refreshFact}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Interesting recycling facts</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center min-h-[120px]">
        {loading ? (
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-200 italic">
            "{randomFact}"
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default FactCard;
