import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [allData, setAllData] = useState([]); // All Firestore data
  const [filteredData, setFilteredData] = useState([]); // For search/filter use
  const [loading, setLoading] = useState(true);

  const fetchAllStories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "stories"));
      const storiesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllData(storiesList);
    } catch (error) {
      console.error("Error loading stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStories();
  }, []);

  // Example: Search Function
  const searchByKeyword = (keyword) => {
    const keywordLower = keyword.toLowerCase();
    const filtered = allData.filter((item) =>
      item.name.toLowerCase().includes(keywordLower)
    );
    setFilteredData(filtered);
  };

  return (
    <DataContext.Provider
      value={{ allData, filteredData, loading, searchByKeyword }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook
export const useData = () => useContext(DataContext);
