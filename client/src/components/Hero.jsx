/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useNavigate } from 'react-router-dom';

// Internal Imports
import { assets } from '../assets/assets';

// Hero Component
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url('/gradientBackground.png')] bg-cover bg-no-repeat min-h-screen">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
          Create Stunning Content <br /> with{' '}
          <span className="text-primary">AI Tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Our AI tools are designed to help you create stunning content for your
          website, blog, or social media.
        </p>
      </div>

      {/* Button Group */}
      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate('/ai')}
          className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer"
        >
          Start Creating Now
        </button>
        <button className="bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer">
          Watch Demo
        </button>
      </div>

      {/* Trusted By Users */}
      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={assets.user_group} alt="Users" className="h-8" /> Trusted by
        <span className="text-primary font-semibold">10000+</span>users
      </div>
    </div>
  );
};

// Export
export default Hero;
