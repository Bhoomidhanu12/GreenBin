import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Newspaper } from 'lucide-react'

const NewsCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <Newspaper className="h-5 w-5 text-greenbin-secondary" />
        <CardTitle className="text-lg">New EU Recycling Targets</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          The EU has set ambitious new targets for plastic recycling rates by 2030.
        </p>
        <div className="flex items-center text-xs text-gray-500">
          <span>2 days ago</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default NewsCard
