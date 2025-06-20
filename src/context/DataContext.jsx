import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all stories from Firestore
  const fetchAllStories = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "stories"));
      const storiesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllData(storiesList);
      setFilteredData(storiesList); // default view
    } catch (error) {
      console.error("Error loading stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStories();
  }, []);

  // Helper to format Firestore timestamps for keyword search
  const formatDate = (timestamp) => {
    try {
      if (!timestamp || !timestamp.toDate) return "";
      const date = timestamp.toDate();
      return date.toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  // Search function
  const searchByKeyword = (keyword) => {
    const lower = keyword.toLowerCase();

    const filtered = allData.filter((story) => {
      const title = story.title?.toLowerCase() || "";
      const storyText = story.story?.toLowerCase() || "";
      const tags = Array.isArray(story.tags)
        ? story.tags.map((tag) => tag.toLowerCase()).join(" ")
        : "";
      const name = story.name?.toLowerCase() || "";
      const location = story.location?.toLowerCase() || "";
      const createdDate = formatDate(story.createdAt).toLowerCase();

      return (
        title.includes(lower) ||
        storyText.includes(lower) ||
        tags.includes(lower) ||
        name.includes(lower) ||
        location.includes(lower) ||
        createdDate.includes(lower)
      );
    });

    setFilteredData(filtered);
  };

  // Get featured stories
  const getFeaturedStories = () => {
    return allData.filter((item) => item.isFeatured === true);
  };

  // Get saved stories for a user
  const getSavedStories = (uid) => {
    return allData.filter((item) => item.savedBy?.includes(uid));
  };

  // Reset filters to show all
  const resetFilter = () => {
    setFilteredData(allData);
  };

  return (
    <DataContext.Provider
      value={{
        allData,
        filteredData,
        loading,
        searchByKeyword,
        getFeaturedStories,
        getSavedStories,
        resetFilter,
        fetchAllStories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hooks for consuming the context
export const useData = () => useContext(DataContext);
export const useDataContext = () => useContext(DataContext);
