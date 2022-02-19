import React from 'react';
import AddForm from '../../components/ui/AddForm';

export default function HomeAdd({ ...props }) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-3xl">Add a New Talk</h1>
      <AddForm />
    </div>
  );
}
