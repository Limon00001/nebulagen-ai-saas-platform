/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useNavigate } from 'react-router-dom';

// Not Found Page Component
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-sm h-screen mx-auto">
      <p className="font-medium text-lg text-indigo-500">404 Error</p>
      <h2 className="md:text-6xl text-4xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="text-base mt-4 text-gray-500">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => navigate('/')}
          type="button"
          className="bg-primary hover:bg-indigo-600 px-7 py-2.5 text-white rounded active:scale-95 transition-all cursor-pointer"
        >
          Go back home
        </button>
      </div>
    </div>
  );
};

// Export
export default NotFound;
