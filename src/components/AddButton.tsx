
import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/add')}
      className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all z-10"
      aria-label="Add new pedalboard"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
};

export default AddButton;
