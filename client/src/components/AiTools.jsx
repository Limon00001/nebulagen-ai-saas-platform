/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import AiToolList from './AiToolList';

// Ai Tools Component
const AiTools = () => {
  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24">
      {/* Heading */}
      <div className="text-center">
        <h2>
          <span className="text-primary text-[42px] font-semibold">
            AI Tools
          </span>
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Everything you need to generate content for your website, blog, or
          social media.
        </p>
      </div>

      {/* List of AI tools */}
      <AiToolList />
    </div>
  );
};

// Export
export default AiTools;
