/* eslint-disable @next/next/no-img-element */
import React from 'react';

const UserDetailsDialog = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        <div className="bg-gray-800 text-white p-6 rounded-t-lg">
          <div className="flex items-center">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover"
              width={96}
              height={96}
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6">
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Nationality:</strong> {user.nationality}</p>
          <p><strong>Contact:</strong> {user.contact}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Work Address:</strong> {user.workAddress}</p>
          <p><strong>Research:</strong> {user.research}</p>
          <p><strong>Publications:</strong> {user.publications}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsDialog;