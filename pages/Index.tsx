
import CallToAction from '@/components/home/CallToAction';
import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
     



        <Hero />
        <Features />
        <Stats />
        <CallToAction />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
