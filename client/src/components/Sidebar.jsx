/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

// NavLinks
const navLinks = [
  { id: crypto.randomUUID(), to: '/ai', label: 'Dashboard', Icon: House },
  {
    id: crypto.randomUUID(),
    to: '/ai/write-article',
    label: 'Write Article',
    Icon: SquarePen,
  },
  {
    id: crypto.randomUUID(),
    to: '/ai/community',
    label: 'Community',
    Icon: Users,
  },
  {
    id: crypto.randomUUID(),
    to: '/ai/remove-object',
    label: 'Remove Object',
    Icon: Scissors,
  },
  {
    id: crypto.randomUUID(),
    to: '/ai/remove-background',
    label: 'Remove Background',
    Icon: Eraser,
  },
  {
    id: crypto.randomUUID(),
    to: '/ai/generate-images',
    label: 'Generate Images',
    Icon: Image,
  },
  {
    id: crypto.randomUUID(),
    to: '/ai/blog-titles',
    label: 'Blog Titles',
    Icon: Hash,
  },
  {
    id: crypto.randomUUID(),
    to: '/ai/review-resume',
    label: 'Review Resume',
    Icon: FileText,
  },
];

// Sidebar Component
const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
        sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
      } transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        <img
          src={user.imageUrl}
          alt="user"
          className="w-13 rounded-full mx-auto"
        />
        <h1 className="mt-1 text-center">{user.fullName}</h1>

        <div className="mt-7 mb-7 w-full flex flex-col items-start gap-1 ps-3 space-y-1 text-sm text-gray-600 font-medium">
          {navLinks.map(({ id, to, label, Icon }) => (
            <NavLink
              to={to}
              key={id}
              end
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2 rounded transition-colors duration-200 $${
                  isActive
                    ? 'bg-indigo-500 text-indigo-500 border-r-4 border-indigo-600'
                    : 'text-gray-700 hover:bg-indigo-100/50'
                }`
              }
              onClick={() => setSidebar(false)}
            >
              <Icon className="w-6 h-6 m-auto" />{' '}
              <span className="flex-1 text-left">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="w-full bordert-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={user.imageUrl} alt="user" className="w-8 rounded-full" />
          <div>
            <h1 className="font-semibold text-sm">{user.fullName}</h1>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="w-4.5 text-gray-400 hover:text-red-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
};

// Export
export default Sidebar;
