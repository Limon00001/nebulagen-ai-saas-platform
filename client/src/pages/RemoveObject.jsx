/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Scissors, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

// Base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Remove Object Component
const RemoveObject = () => {
  const [inputData, setInputData] = useState('');
  const [object, setObject] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  // Get User Token
  const { getToken } = useAuth();

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enable Loading Indicator
      setLoading(true);

      if (object.split(' ').length > 1) {
        toast.error('Please enter a single object.');
        return;
      }

      // Form Data for image
      const formData = new FormData();
      formData.append('image', inputData);
      formData.append('object', object);

      // Api Call
      const { data } = await axios.post(
        '/api/ai/remove-image-object',
        formData,
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

        <button
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-700 to-sky-600 text-white px-4 py-2 rounded-lg text-sm mt-6 transition ${
            loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              Removing Object ...
            </>
          ) : (
            <>
              <Scissors className="w-5 text-white" />
              Remove Object
            </>
          )}
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-cyan-600" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col items-center gap-5 text-sm text-gray-400">
              <Scissors className="w-9 h-9" />
              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>
        ) : (
          <img src={content} alt="image" className="mt-3 h-full w-full" />
        )}
      </div>
    </div>
  );
};

// Export
export default RemoveObject;
