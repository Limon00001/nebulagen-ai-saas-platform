/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Logo Component
const Logo = () => {
  const naviage = useNavigate();

  return (
    <div
      onClick={() => {
        window.scrollTo(0, 0);
        naviage('/');
      }}
      className="flex items-center gap-2 cursor-pointer text-primary"
    >
      <Bot className="w-8 h-8" />
      <h1 className="font-bold text-2xl">NebulaGen</h1>
    </div>
  );
};

// Export
export default Logo;
