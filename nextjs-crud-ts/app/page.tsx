'use client';

import { useState, useEffect } from 'react';
import Form from './components/Form';
import Table from './components/Table';

interface MyRecord {
  id: number;
  name: string;
  email: string;
  password:string;
}

export default function Home() {
  const [records, setRecords] = useState<MyRecord[]>([]);
  const [editingRecord, setEditingRecord] = useState<MyRecord | null>(null);

  const handleSubmit = (data: MyRecord) => {
    if (editingRecord) {
      // Update existing record
      setRecords((prevRecords) =>
        prevRecords.map((record) => (record.id === data.id ? data : record))
      );
      alert('Record updated successfully!');
      console.log('Record updated:', data);
    } else {
      // Add new record
      setRecords((prevRecords) => [
        ...prevRecords,
        { ...data, id: prevRecords.length + 1 }, // Assuming id is auto-incremented
      ]);
      alert('New record added successfully!');
      console.log('New record added:', data);
    }
    setEditingRecord(null); // Reset editing state
  };

  const handleDelete = (id: number) => {
    setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
    alert('Record deleted successfully!');
    console.log('Record deleted with id:', id);
  };

  useEffect(() => {
    // Load initial records if needed
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">CRUD with Search & Pagination</h1>
        <div className="bg-white rounded-md shadow-md p-6 text-gray-900">
          <Form onSubmit={handleSubmit} editingRecord={editingRecord} />
        </div>
        <div className="bg-white rounded-md shadow-md p-6 mt-8 text-gray-900">
          <Table records={records} onEdit={setEditingRecord} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
