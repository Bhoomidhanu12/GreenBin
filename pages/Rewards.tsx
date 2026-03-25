
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RewardsProgress from '@/components/rewards/RewardsProgress';

const Rewards = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <RewardsProgress />
      </div>
      <Footer />
    </div>
  );
};

export default Rewards;
