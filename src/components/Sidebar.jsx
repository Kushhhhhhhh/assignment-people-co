'use client';
import React from 'react';
import Link from 'next/link';
import { MdOutlineWindow } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';

const Sidebar = () => {
  const router = useRouter();

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="sidebar hidden md:flex flex-col h-full w-64 p-4">
        <ul className="flex flex-col items-start text-md font-semibold">
          <li className="sidebar-menu-item mt-4 px-4 py-2">
            <Link 
              href="/overview" 
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ease-in-out ${
                router.asPath === "/overview" ? "text-purple-600" : "text-[#212121] hover:text-purple-600"
              }`}
            >
              <MdOutlineWindow className="text-lg" /> 
              Overview
            </Link>
          </li>
          <li className="sidebar-menu-item px-4 py-2">
            <Link 
              href="/people-directory" 
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ease-in-out ${
                router.asPath === "/people-directory" ? "text-purple-600" : "text-[#212121] hover:text-purple-600"
              }`}
            >
              <MdOutlineWindow className="text-lg" /> 
              People Directory
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer for medium and small screens */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-gray-100 border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center p-2">
          <Link 
            href="/overview"
            className={`flex flex-col items-center p-2 transition-colors duration-300 ease-in-out ${
              router.asPath === "/overview" ? "text-purple-600" : "text-[#212121] hover:text-purple-600"
            }`}
          >
            <AiOutlineHome className="text-2xl" />
            <span className="text-xs">Overview</span>
          </Link>
          <Link 
            href="/people-directory"
            className={`flex flex-col items-center p-2 transition-colors duration-300 ease-in-out ${
              router.asPath === "/people-directory" ? "text-purple-600" : "text-[#212121] hover:text-purple-600"
            }`}
          >
            <FaUsers className="text-2xl" />
            <span className="text-xs">People</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;