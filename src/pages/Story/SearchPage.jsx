import StoryCard from "./StoryCard";
import { useState } from "react";
import { useData } from "../../context/DataContext";
import SearchInput from "./SearchInput";
import LoadingCard from "../../Shared/Loading/LoadingCard";

const SearchPage = () => {
  const { filteredData } = useData();
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState("");


  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <SearchInput
        setSearchTriggered={setSearchTriggered}
        setLocalLoading={setLocalLoading}
        setError={setError}
      />

      {error && <div className="text-center text-red-600 my-4">{error}</div>}

      {!searchTriggered ? (
        <p className="text-center text-gray-400 mt-10">
          
        </p>
      ) : localLoading ? (
        <LoadingCard></LoadingCard>
      ) : filteredData.length === 0 ? (
        <p className="text-center text-red mt-6">No stories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
          {filteredData.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
