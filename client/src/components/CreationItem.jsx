/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 21 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useState } from 'react';
import Markdown from 'react-markdown';

// CreationItem Component
const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2>{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="bg-[#eff6ff] border border-[#bfdbfe] text-[#1e40af] px-4 py-1 rounded-full">
          {item.type}
        </button>
      </div>

      {/* If expanded then show content */}
      {expanded && (
        <div>
          {item.type === 'image' ? (
            <div>
              <img
                src={item.content}
                alt="image"
                className="w-full mt-3 max-w-md"
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Export
export default CreationItem;
