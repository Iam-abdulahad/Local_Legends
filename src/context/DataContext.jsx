import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]); // All Firestore data
  const [filteredData, setFilteredData] = useState([]); // For search/filter use
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "yourCollectionName")
        );
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(docs);
        setFilteredData(docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Example: Search Function
  const searchByKeyword = (keyword) => {
    const keywordLower = keyword.toLowerCase();
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(keywordLower)
    );
    setFilteredData(filtered);
  };

  return (
    <DataContext.Provider
      value={{ data, filteredData, loading, searchByKeyword }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook
export const useData = () => useContext(DataContext);
