import { Menu, Info } from "lucide-react";
import { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

const TopbarMobile = () => {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#7D0A0A] text-[#EAD196] p-3 flex justify-between items-center z-50">
        <button onClick={() => setLeftOpen(true)}>
          <Menu size={28} />
        </button>
        <h1 className="text-lg font-bold">Local Legends</h1>
        <button onClick={() => setRightOpen(true)}>
          <Info size={28} />
        </button>
      </div>

      {/* Left Sidebar Drawer */}
      {leftOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setLeftOpen(false)}
        >
          <div
            className="bg-[#EAD196] w-3/4 h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <LeftSidebar />
          </div>
        </div>
      )}

      {/* Right Sidebar Drawer */}
      {rightOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setRightOpen(false)}
        >
          <div
            className="bg-[#EAD196] w-3/4 h-full p-4 ml-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default TopbarMobile;
