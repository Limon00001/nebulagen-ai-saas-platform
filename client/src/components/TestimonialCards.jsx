/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import { assets } from '../assets/assets';

// Testimonial Component Cards
const TestimonialCards = ({ dummyTestimonialData }) => {
  return (
    <div className="flex flex-wrap mt-10 justify-center">
      {dummyTestimonialData.map((testimonial, index) => (
        <div
          key={index}
          className="p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <img
                  key={index}
                  src={
                    index < testimonial.rating
                      ? assets.star_icon
                      : assets.star_dull_icon
                  }
                  alt="star"
                />
              ))}
          </div>
          <p className="text-gray-500 text-sm my-5">"{testimonial.content}"</p>
          <hr className="mb-5 border-gray-300" />
          <div className="flex items-center gap-4">
            <img
              src={testimonial.image}
              className="w-12 object-contain rounded-full"
              alt=""
            />
            <div className="text-sm text-gray-600">
              <h3 className="font-medium">{testimonial.name}</h3>
              <p className="text-xs text-gray-500">{testimonial.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Export
export default TestimonialCards;
