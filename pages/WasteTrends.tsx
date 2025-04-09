
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WasteTrendsContent from '@/components/wasteTrends/WasteTrendsContent';
import WasteDatabase from '@/components/wasteTrends/WasteDatabase';

const WasteTrends = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-greenbin-dark dark:text-greenbin-light mb-8">
          Waste Trends & Resources
        </h1>
        
        <WasteDatabase />
        
        <div className="mt-10">
          <WasteTrendsContent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WasteTrends;
