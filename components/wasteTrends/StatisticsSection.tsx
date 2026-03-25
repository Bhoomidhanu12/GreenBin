import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import { data } from './data.ts'

const StatisticsSection = () => {
  const stats = data.stats || []

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.slice(0,3).map((stat, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-greenbin-primary">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <TrendingUp className="h-5 w-5 text-greenbin-primary" />
          <CardTitle>Recent Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Waste generation increased by 15% in urban areas this year.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatisticsSection
