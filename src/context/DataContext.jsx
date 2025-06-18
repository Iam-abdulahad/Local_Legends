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

  // 🔍 Search stories by keyword (title or story)
  const searchByKeyword = (keyword) => {
    const keywordLower = keyword.toLowerCase();
    const filtered = allData.filter(
      (item) =>
        item.title?.toLowerCase().includes(keywordLower) ||
        item.story?.toLowerCase().includes(keywordLower)
    );
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
