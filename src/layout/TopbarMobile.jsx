import { Menu, Info, X } from "lucide-react";
import { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { useAuth } from "../context/AuthContex";

const TopbarMobile = () => {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const { userData } = useAuth();

  const handleClose = () => {
    setLeftOpen(false);
    setRightOpen(false);
  };

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-[60px] bg-[#7D0A0A] text-[#EAD196] px-4 flex justify-between items-center z-50 shadow-md">
        <button
          onClick={
            leftOpen
              ? handleClose
              : () => {
                  setLeftOpen(true);
                  setRightOpen(false);
                }
          }
          className="active:scale-95 transition-transform"
        >
          {leftOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <h1 className="text-xl font-semibold font-[cursive] italic tracking-wide">Local Legends</h1>

        <button
          onClick={
            rightOpen
              ? handleClose
              : () => {
                  setRightOpen(true);
                  setLeftOpen(false);
                }
          }
          className="active:scale-95 transition-transform"
        >
          {rightOpen ? (
            <X size={26} />
          ) : userData?.photoURL ? (
            <img
              src={userData.photoURL}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
          ) : (
            <Info size={26} />
          )}
        </button>
      </div>

      {/* Spacer for content */}
      <div className="md:hidden h-[60px]" />

      {/* Left Sidebar (Mobile Only) */}
      {leftOpen && (
        <div
          className="absolute top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-transparent z-40"
          onClick={handleClose}
        >
          <div
            className="bg-[#7D0A0A] w-4/5 h-full p-4 rounded-r-2xl shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <LeftSidebar onLinkClick={handleClose} />
          </div>
        </div>
      )}

      {/* Right Sidebar (Mobile Only) */}
      {rightOpen && (
        <div
          className="absolute top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-transparent z-40"
          onClick={handleClose}
        >
          <div
            className="bg-[#7D0A0A] w-4/5 h-full p-4 rounded-l-2xl ml-auto shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <RightSidebar onLinkClick={handleClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default TopbarMobile;
