import React from 'react';
import Image from 'next/image';
import { FaRegBell } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="p-4 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-purple-700 lg:text-4xl">PEOPLE.CO</h1>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <FaRegBell className="text-gray-600 text-xl" />

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="relative w-9 h-9">
            <Image
              src="/logo.jpg"
              alt="User Profile Picture"
              className="rounded-full object-cover"
              width={32}
              height={32}
              priority
            />
          </div>
          <span className="hidden md:inline text-sm font-medium text-gray-800">Jane Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;