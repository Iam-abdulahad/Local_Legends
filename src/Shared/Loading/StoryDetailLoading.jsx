import { motion } from "framer-motion";

const Skeleton = ({ className }) => (
  <div className={`bg-[#EAD196] rounded-md animate-pulse ${className}`} />
);

const StoryDetailLoading = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Image Placeholder */}
      <Skeleton className="w-full h-64 md:h-96 rounded-2xl shadow-md" />

      {/* Title Placeholder */}
      <Skeleton className="h-8 w-3/4 md:w-1/2" />

      {/* Author & Meta Info */}
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-3" />
        </div>
      </div>

      {/* Tags or Reactions */}
      <div className="flex gap-3">
        <Skeleton className="w-20 h-6 rounded-full" />
        <Skeleton className="w-16 h-6 rounded-full" />
        <Skeleton className="w-24 h-6 rounded-full" />
      </div>

      {/* Paragraphs Placeholder */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

export default StoryDetailLoading;
