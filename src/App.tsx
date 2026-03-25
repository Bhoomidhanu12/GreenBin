import { Route, Routes } from 'react-router-dom'
import AddProfile from '../pages/AddProfile.tsx'
import Index from '../pages/Index.tsx'
import MapPage from '../pages/Map.tsx'
import NotFound from '../pages/NotFound.tsx'
import Rewards from '../pages/Rewards.tsx'
import Scanner from '../pages/Scanner.tsx'
import WasteTrends from '../pages/WasteTrends.tsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/addprofile" element={<AddProfile />} />
      <Route path="/waste-trends" element={<WasteTrends />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
