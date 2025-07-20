/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Internal Imports
import Logo from './Logo';

// Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed w-full z-5 backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      {/* Logo */}
      <Logo onClick={() => navigate('/')} />

      {user ? (
        <UserButton />
      ) : (
        // Button Group
        <button
          onClick={openSignIn}
          className="group flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
        >
          Get Started{' '}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all group-hover:duration-300" />
        </button>
      )}
    </div>
  );
};

// Export
export default Navbar;
