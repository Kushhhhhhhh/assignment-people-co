'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  status: z.enum(['Active', 'Inactive']),
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Invalid email format'),
  team: z.string().min(1, 'Team is required'),
});

const EditUserDialog = ({ isOpen, onClose, user, onSave }) => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isOpen && user) {
      reset({
        name: user.name,
        status: user.status,
        role: user.role,
        email: user.email,
        team: user.team,
      });
    } else {
      reset({ name: '', status: 'Active', role: '', email: '', team: '' });
    }
  }, [isOpen, user, reset]);

  const onSubmit = (data) => {
    onSave({ ...user, ...data });
    onClose();
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg w-96 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Edit User</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                {...register('name')}
                className={`border border-gray-300 rounded-lg px-4 py-2 w-full ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                {...register('status')}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                {...register('role')}
                className={`border border-gray-300 rounded-lg px-4 py-2 w-full ${errors.role ? 'border-red-500' : ''}`}
              />
              {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register('email')}
                className={`border border-gray-300 rounded-lg px-4 py-2 w-full ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Team</label>
              <input
                type="text"
                {...register('team')}
                className={`border border-gray-300 rounded-lg px-4 py-2 w-full ${errors.team ? 'border-red-500' : ''}`}
              />
              {errors.team && <span className="text-red-500 text-sm">{errors.team.message}</span>}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default EditUserDialog;