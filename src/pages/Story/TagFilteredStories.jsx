import { useParams } from "react-router-dom";
import StoryCard from "./StoryCard";
import { useDataContext } from "../../context/DataContext";

const TagFilteredStories = () => {
  const { tagName } = useParams();
  const { allData } = useDataContext();

  const filtered = allData.filter((story) =>
    story.tags?.map((t) => t.toLowerCase()).includes(tagName.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Showing results for #{tagName}
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((story) => <StoryCard key={story.id} story={story} />)
        ) : (
          <p>No stories found with this tag.</p>
        )}
      </div>
    </div>
  );
};

export default TagFilteredStories;
