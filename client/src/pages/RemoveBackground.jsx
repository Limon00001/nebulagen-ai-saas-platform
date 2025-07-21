/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Eraser, Sparkles } from 'lucide-react';
import { useState } from 'react';

// Remove Background Component
const RemoveBackground = () => {
  const [inputData, setInputData] = useState('');

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Side */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 text-[#ff4938]" />
          <h1 className="text-xl font-semibold">Background Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Image</p>

        {/* File Input */}
        <input
          type="file"
          name="article-topic"
          id="article-topic"
          accept="image/*"
          className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
          onChange={(e) => setInputData(e.target.files[0])}
        />

        {/* File Support */}
        <p className="text-xs text-gray-500 font-light mt-1">
          Supports PNG, JPEG, JPG and other image formats
        </p>

        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#f6ab41] to-[#ff4938] text-white px-4 py-2 rounded-lg text-sm mt-6 transition cursor-pointer">
          <Eraser className="w-5 text-white" />
          Remove Background
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Eraser className="w-5 h-5 text-[#8e37eb]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center gap-5 text-sm text-gray-400">
            <Eraser className="w-9 h-9" />
            <p>Upload an image and click "Remove Background" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export
export default RemoveBackground;
