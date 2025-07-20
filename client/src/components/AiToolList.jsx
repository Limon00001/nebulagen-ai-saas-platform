/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

// Internal Imports
import { AiToolsData } from '../assets/assets';

// List of AI tools
const AiToolList = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="flex flex-wrap justify-center mt-10">
      {AiToolsData.map((tool, index) => (
        <div
          key={index}
          onClick={() => user && navigate(tool.path)}
          className="p-8 m-4 max-w-xs rounded-lg bg-[#fdfdfe] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          <tool.Icon
            className="w-12 h-12 p-3 text-whit rounded-xl"
            style={{
              background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
            }}
          />
          <h3 className="mt-6 mb-3 text-lg font-semibold">{tool.title}</h3>
          <p className="text-gray-400 text-sm max-w-[95%]">
            {tool.description}
          </p>
        </div>
      ))}
    </div>
  );
};

// Export
export default AiToolList;
