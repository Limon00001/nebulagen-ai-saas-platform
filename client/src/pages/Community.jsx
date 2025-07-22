/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

// Internal Imports
import Loader from '../components/Loader';

// Base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Community Component
const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get User
  const { user } = useUser();

  // Get User Token
  const { getToken } = useAuth();

  // Fetch Creations
  const fetchCreations = async () => {
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      // If api call is successful
      if (data?.success) {
        setCreations(data?.creations);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }

    // Disable Loading Indicator
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        '/api/user/toggle-like-creation',
        { id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      // If api call is successful
      if (data?.success) {
        toast.success(data?.message);
        fetchCreations();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  // Use Effect to fetch creations
  useEffect(() => {
    if (!user) return;
    fetchCreations();
  }, [user]);

  return !loading ? (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      Creations
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
          >
            <img
              src={creation.content}
              alt="creation"
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Creation Details */}
            <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
              <p className="text-sm hidden group-hover:block">
                {creation.prompt}
              </p>
              <div className="flex gap-1 items-center">
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation.id)}
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                    creation.likes.includes(user.id)
                      ? 'text-red-600 fill-red-500'
                      : 'text-white'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

// Export
export default Community;
