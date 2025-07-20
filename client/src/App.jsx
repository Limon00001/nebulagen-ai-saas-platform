/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Route, Routes } from 'react-router-dom';

// Internal Imports
import BlogTitles from './pages/BlogTitles';
import Community from './pages/Community';
import Dashboard from './pages/Dashboard';
import GenerateImages from './pages/GenerateImages';
import Home from './pages/Home';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import RemoveBackground from './pages/RemoveBackground';
import RemoveObject from './pages/RemoveObject';
import ReviewResume from './pages/ReviewResume';
import WriteArticle from './pages/WriteArticle';

// App Component
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="community" element={<Community />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="review-resume" element={<ReviewResume />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// Export
export default App;
