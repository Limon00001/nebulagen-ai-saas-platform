/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Hash, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Markdown from 'react-markdown';

// Base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Blog Titles Component
const BlogTitles = () => {
  const blogCategories = [
    'General',
    'Business',
    'Technology',
    'Education',
    'Health',
    'Lifestyle',
    'Travel',
    'Food',
  ];

  const [selectedCategory, setSelectedCategory] = useState('General');
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
      const prompt = `Generate a blog title for the keyword ${inputData} in the category ${selectedCategory}.`;

      // Api Call
      const { data } = await axios.post(
        '/api/ai/generate-blog-title',
        { prompt },
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
          <Sparkles className="w-5 text-[#8e37eb]" />
          <h1 className="text-xl font-semibold">AI Blog Title Generation</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>

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

        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategories.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedCategory === item
                  ? 'bg-purple-50 text-purple-700'
                  : 'text-gray-500 border-gray-300'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        <br />

        <button
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#c341f6] to-[#8e37eb] text-white px-4 py-2 rounded-lg text-sm mt-6 transition ${
            loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              Generating Title ...
            </>
          ) : (
            <>
              <Hash className="w-5 text-white" />
              Generate Title
            </>
          )}
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-[#8e37eb]" />
          <h1 className="text-xl font-semibold">Generated Title</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col items-center gap-5 text-sm text-gray-400">
              <Hash className="w-9 h-9" />
              <p>Enter a topic and click "Generate Title" to get started</p>
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
export default BlogTitles;
