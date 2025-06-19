import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import TopbarMobile from "./TopbarMobile";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-[#EEEEEE] text-[#7D0A0A] relative">
      <TopbarMobile />

      {/* Left Sidebar (PC only) */}
      <div className="hidden md:flex w-64 bg-[#7D0A0A] flex-col p-4 border-r border-[#BF3131]">
        <LeftSidebar />
      </div>

      {/* Main Feed */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <Outlet />
      </main>

      {/* Right Sidebar (lg only) */}
      <div className="hidden lg:flex w-72 bg-[#7D0A0A] rounded-s-lg shadow-md flex-col p-4 border-l border-[#BF3131]">
        <RightSidebar />
      </div>
    </div>
  );
};

export default MainLayout;
