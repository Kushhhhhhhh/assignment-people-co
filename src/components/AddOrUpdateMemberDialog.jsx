'use client';
import React, { useState, useEffect } from 'react';

const AddOrUpdateMemberDialog = ({ onSave, onClose, user }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Active');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setStatus(user.status);
      setRole(user.role);
      setEmail(user.email);
      setTeam(user.team);
    } else {
      setName('');
      setStatus('Active');
      setRole('');
      setEmail('');
      setTeam('');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      id: Date.now(), // or generate a unique ID
      name,
      status,
      role,
      email,
      team,
    };
    onSave(newMember);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">{user ? 'Edit Member' : 'Add Member'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          <input
            type="text"
            placeholder="Team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
            >
              {user ? 'Update' : 'Add'} Member
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrUpdateMemberDialog;