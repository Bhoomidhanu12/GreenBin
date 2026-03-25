import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'

const FactCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Lightbulb className="h-6 w-6 text-yellow-500 mx-auto" />
      </CardHeader>
      <CardContent className="text-center">
        <CardTitle className="text-lg mb-2">1 Plastic Bottle = 10 Liters of Oil</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Recycling one plastic bottle saves enough energy to power a 100W bulb for 6 hours.
        </p>
      </CardContent>
    </Card>
  )
}

export default FactCard
