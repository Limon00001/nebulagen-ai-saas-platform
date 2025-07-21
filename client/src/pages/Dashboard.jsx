/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Protect } from '@clerk/clerk-react';
import { Gem, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

// Internal Imports
import { dummyCreationData } from '../assets/assets';
import CreationItem from '../components/CreationItem';

// Dashboard Component
const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  // Fetch Creations
  const fetchCreations = async () => {
    try {
      setCreations(dummyCreationData);
    } catch (error) {
      console.log(error);
    }
  };

  // Use Effect
  useEffect(() => {
    fetchCreations();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        <div className="flex items-center justify-between w-72 p-4 px-6 bg-white rounded-lg border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588f2] to-[#0bb0d7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        <div className="flex items-center justify-between w-72 p-4 px-6 bg-white rounded-lg border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff61c5] to-[#9e53ee] text-white flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="mt-6 mb-4">Recent Creations</p>
        {creations.map((item) => (
          <CreationItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// Export
export default Dashboard;
