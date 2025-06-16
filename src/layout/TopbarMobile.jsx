import { Menu, Info } from "lucide-react";
import { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

const TopbarMobile = () => {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <>
      {/* Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#7D0A0A] text-[#EAD196] px-4 py-3 flex justify-between items-center z-50 shadow-md">
        <button
          onClick={() => setLeftOpen(true)}
          className="active:scale-95 transition-transform"
        >
          <Menu size={26} />
        </button>
        <h1 className="text-xl font-semibold tracking-wide">Local Legends</h1>
        <button
          onClick={() => setRightOpen(true)}
          className="active:scale-95 transition-transform"
        >
          <Info size={26} />
        </button>
      </div>

      {/* Push content below Topbar */}
      <div className="md:hidden h-[60px]" />

      {/* Left Sidebar Drawer */}
      {leftOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setLeftOpen(false)}
        >
          <div
            className="bg-[#EAD196] w-3/4 h-full p-4 rounded-r-2xl shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0"
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
            className="bg-[#EAD196] w-3/4 h-full p-4 rounded-l-2xl shadow-lg ml-auto transform transition-transform duration-300 ease-in-out translate-x-0"
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
