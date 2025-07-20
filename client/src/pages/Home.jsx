/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import AiTools from '../components/AiTools';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Plan from '../components/Plan';
import Testimonial from '../components/Testimonial';

// Home Component
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AiTools />
      <Testimonial />
      <Plan />
    </>
  );
};

// Export
export default Home;
