import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { useData } from "../context/DataContext";
import { db } from "../firebase/firebaseConfig";

const defaultAvatar =
  "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg";

const CommunityPage = () => {
  const { allData, loading: storiesLoading } = useData(); // from DataContext
  const [topContributors, setTopContributors] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true); // Combined loading

  // Fetch testimonials from Firestore
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const fetched = querySnapshot.docs.map((doc) => doc.data());
        setTestimonials(fetched);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  // Calculate Top Storytellers
  useEffect(() => {
    if (allData && allData.length > 0) {
      const userStoryCount = {};

      allData.forEach((story) => {
        const userInfo = story.userInfo;
        if (userInfo && userInfo.length >= 4) {
          const uid = userInfo[2];
          const name = userInfo[0];
          const img = userInfo[3];

          if (!userStoryCount[uid]) {
            userStoryCount[uid] = { count: 0, name, img };
          }
          userStoryCount[uid].count += 1;
        }
      });

      const sorted = Object.entries(userStoryCount)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 3)
        .map(([uid, data], index) => ({
          name: data.name,
          count: data.count,
          role:
            index === 0
              ? "🥇 Top Storyteller"
              : index === 1
              ? "🥈 2nd Place Contributor"
              : "🥉 3rd Place Contributor",
          image: data.img || defaultAvatar,
          story: `${data.name} has shared ${data.count} local stories.`,
        }));

      setTopContributors(sorted);
      setLoading(false); // only when stories processed
    }
  }, [allData]);

  if (loading || storiesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-[#7D0A0A]">
        🔄 Loading Community Content...
      </div>
    );
  }

  return (
    <div className="bg-[#F2EFE7] text-[#7D0A0A] min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl text-[#0ABAB5] md:text-5xl font-bold text-center mb-10"
        >
          Community Highlights & Testimonials
        </motion.h1>

        {/* Top Storytellers */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {topContributors.map((user, idx) => (
            <div
              key={idx}
              className="bg-gray-200 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 hover:shadow-xl transition"
            >
              <img
                src={user.image}
                onError={(e) => (e.target.src = defaultAvatar)}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#BF3131]"
              />
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm italic text-[#BF3131]">{user.role}</p>
                <p className="mt-1 text-sm">{user.story}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl text-[#0ABAB5]/65 font-semibold mt-16 mb-6 text-center"
        >
          What Our Community Says?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#0ABAB5]/10 text-[#7D0A0A] p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <p className="text-lg font-medium">“{t.feedback}”</p>
              <p className="mt-4 font-semibold text-right">— {t.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityPage;
