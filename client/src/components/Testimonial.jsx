/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import { dummyTestimonialData } from '../assets/assets';
import TestimonialCards from './TestimonialCards';

// Testimonial Component
const Testimonial = () => {
  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Loved by Creators
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>

      {/* Testimonial Cards */}
      <TestimonialCards dummyTestimonialData={dummyTestimonialData} />
    </div>
  );
};

// Export
export default Testimonial;
