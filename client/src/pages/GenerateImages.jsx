/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Image, Sparkles } from 'lucide-react';
import { useState } from 'react';

// Generate Images Component
const GenerateImages = () => {
  const imageStyle = [
    'Realistic Style',
    'Cartoon Style',
    'Anime Style',
    'Fantasy Style',
    '3D Style',
    'Portrait Style',
    'Ghibli Style',
  ];

  const [selectedStyle, setSelectedStyle] = useState('Realistic Style');
  const [inputData, setInputData] = useState('');
  const [publish, setPublish] = useState(false);

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
          <Sparkles className="w-5 text-teal-500" />
          <h1 className="text-xl font-semibold">AI Image Generation</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Describe Your Image</p>

        <textarea
          rows={4}
          name="article-topic"
          id="article-topic"
          className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Describe what you want to generate..."
          required
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {imageStyle.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedStyle === item
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-500 border-gray-300'
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Publish Toggle */}
        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-teal-500 transition"></div>
            <span className="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">Make this image public</p>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm mt-6 transition cursor-pointer">
          <Image className="w-5 text-white" />
          Generate Image
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-teal-500" />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center gap-5 text-sm text-gray-400">
            <Image className="w-9 h-9" />
            <p>Enter a topic and click "Generate Image" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export
export default GenerateImages;
