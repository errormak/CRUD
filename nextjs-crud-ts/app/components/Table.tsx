'use client';

import { useState } from 'react';

interface Record {
  id: number;
  name: string;
  email: string;
}

interface TableProps {
  records: Record[];
  onEdit: (record: Record) => void;
  onDelete: (id: number) => void;
}

export default function Table({ records, onEdit, onDelete }: TableProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filteredRecords = records.filter((r:any) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedRecords = filteredRecords.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRecords.map((record:any) => (
            <tr key={record.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{record.name}</td>
              <td className="border border-gray-300 p-2">{record.email}</td>
              <td className="border border-gray-300 p-2 flex space-x-2 justify-center">
              <button
                  onClick={() => onEdit(record)}
                  className="px-3 py-1 text-blue-500 hover:text-blue-700 rounded-md hover:bg-blue-100 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(record.id)}
                  className="px-3 py-1 text-red-500 hover:text-red-700 rounded-md hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(filteredRecords.length / itemsPerPage)}
        </span>
        <button
          onClick={() =>
            setPage((prev) =>
              prev < Math.ceil(filteredRecords.length / itemsPerPage) ? prev + 1 : prev
            )
          }
          disabled={page === Math.ceil(filteredRecords.length / itemsPerPage)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
