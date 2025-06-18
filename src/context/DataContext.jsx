// src/context/DataContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllStories = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "stories"));
      const storiesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllData(storiesList);
      setFilteredData(storiesList);
    } catch (error) {
      console.error("Error loading stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStories();
  }, []);

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

  const getFeaturedStories = () => {
    return allData.filter((item) => item.isFeatured === true);
  };

  const getSavedStories = (uid) => {
    return allData.filter((item) => item.savedBy?.includes(uid));
  };

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hooks
export const useData = () => useContext(DataContext);
export const useDataContext = () => useContext(DataContext);
