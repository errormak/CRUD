'use client';

import { useState, useEffect } from 'react';

export default function Form({ 
  onSubmit, 
  editingRecord 
}: { 
  onSubmit: (data: any) => void; 
  editingRecord: any 
}) {
  const [formData, setFormData] = useState(editingRecord || { name: '', email: '', password: '' });

  useEffect(() => {
    if (editingRecord) setFormData(editingRecord);
  }, [editingRecord]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {editingRecord ? 'Edit Record' : 'Add New Record'}
      </h2>
      
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium text-gray-600 mb-1">Name</label>
        <input
          id="name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">Email</label>
        <input
          id="email"
          name="email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1">Password</label>
        <input
          id="password"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        {editingRecord ? 'Update Record' : 'Add Record'}
      </button>
    </form>
  );
}
