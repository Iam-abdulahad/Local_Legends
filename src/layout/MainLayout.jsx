import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import TopbarMobile from "./TopbarMobile";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-[#EEEEEE] text-[#7D0A0A] relative">
      {/* Mobile Topbar with own sidebars */}
      <TopbarMobile />

      {/* Left Sidebar (Desktop Only) */}
      <div className="hidden md:flex w-64 bg-[#7D0A0A] flex-col p-4">
        <LeftSidebar />
      </div>

      {/* Main Feed */}
      <main className="flex-1 overflow-y-auto scrollbar-hide bg-[#7D0A0A] md:pt-0 pt-[60px]">
        <Outlet />
      </main>

      {/* Right Sidebar (Large Screens Only) */}
      <div className="hidden lg:flex w-72 bg-[#7D0A0A] flex-col p-4 md:pt-4 pt-[60px]">
        <RightSidebar />
      </div>
    </div>
  );
};

export default MainLayout;
