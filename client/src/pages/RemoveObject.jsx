/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Scissors, Sparkles } from 'lucide-react';
import { useState } from 'react';

// Remove Object Component
const RemoveObject = () => {
  const [inputData, setInputData] = useState('');
  const [object, setObject] = useState('');

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
          <Sparkles className="w-5 text-sky-600" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
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

        {/* Description Input */}
        <p className="mt-6 text-sm font-medium">Describe object to remove</p>

        <textarea
          rows={4}
          name="article-topic"
          id="article-topic"
          className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="e.g. cat, dog, etc. Only one object at a time"
          required
          value={object}
          onChange={(e) => setObject(e.target.value)}
        />

        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-700 to-sky-600 text-white px-4 py-2 rounded-lg text-sm mt-6 transition cursor-pointer">
          <Scissors className="w-5 text-white" />
          Remove Object
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-cyan-600" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center gap-5 text-sm text-gray-400">
            <Scissors className="w-9 h-9" />
            <p>Upload an image and click "Remove Object" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export
export default RemoveObject;
