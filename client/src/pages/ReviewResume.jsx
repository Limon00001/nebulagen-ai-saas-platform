/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { FileText, Sparkles } from 'lucide-react';
import { useState } from 'react';

// Review Resume
const ReviewResume = () => {
  const [inputData, setInputData] = useState('');

  // Form Submit Handler
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Side */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 text-emerald-600" />
          <h1 className="text-xl font-semibold">Resume Review</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Resume</p>

        {/* File Input */}
        <input
          type="file"
          name="article-topic"
          id="article-topic"
          accept="application/pdf"
          className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
          onChange={(e) => setInputData(e.target.files[0])}
        />

        {/* File Support */}
        <p className="text-xs text-gray-500 font-light mt-1">
          Only PDF files are supported
        </p>

        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-600/90 text-white px-4 py-2 rounded-lg text-sm mt-6 transition cursor-pointer">
          <FileText className="w-5 text-white" />
          Review Resume
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-emerald-600" />
          <h1 className="text-xl font-semibold">Analysis Results</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center gap-5 text-sm text-gray-400">
            <FileText className="w-9 h-9" />
            <p>Upload a resume and click "Review Resume" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export
export default ReviewResume;
