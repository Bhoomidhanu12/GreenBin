import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, BarChart3, TrendingUp } from 'lucide-react'
import FactCard from './FactCard'
import NewsCard from './NewsCard'
import StatisticsSection from './StatisticsSection'

const WasteTrendsContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Global Waste Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatisticsSection />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Latest Waste Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Recent developments in waste management and recycling
            </p>
            <NewsCard />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Interesting Facts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FactCard />
            <FactCard />
            <FactCard />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WasteTrendsContent
