/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Edit, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Markdown from 'react-markdown';

// Base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Write Article Component
const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [inputData, setInputData] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enable Loading Indicator
      setLoading(true);

      // Generate Article
      const prompt = `Write an article about ${inputData} in ${selectedLength.text}.`;

      // Api Call
      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      // If api call is successful
      if (data?.success) {
        setContent(data?.content);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }

    // Disable Loading Indicator
    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Side */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 text-[#4a7aff]" />
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Article Topic</p>

        <input
          type="text"
          name="article-topic"
          id="article-topic"
          className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The topic of your article"
          required
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />

        <p className="mt-4 text-sm font-medium">Article Length</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articleLength.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedLength.length === item.length
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 border-gray-300'
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>
        <br />

        <button
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#3588f2] to-[#0bb0d7] text-white px-4 py-2 rounded-lg text-sm mt-6 transition ${
            loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              Generating Article ...
            </>
          ) : (
            <>
              <Edit className="w-5 text-white" />
              Generate Article
            </>
          )}
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="w-5 h-5 text-[#4a7aff]" />
          <h1 className="text-xl font-semibold">Article Preview</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col items-center gap-5 text-sm text-gray-400">
              <Edit className="w-9 h-9" />
              <p>Enter a topic and click "Generate Article" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-2 overflow-y-scroll h-full text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Export
export default WriteArticle;
