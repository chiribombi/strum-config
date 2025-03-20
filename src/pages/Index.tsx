
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import AddButton from '@/components/AddButton';
import PedalboardCard from '@/components/PedalboardCard';
import { Pedalboard } from '@/lib/types';
import { MoveVertical, Search, X } from 'lucide-react';

// Sample data for demonstration
import { samplePedalboards } from '@/lib/sampleData';

const Index: React.FC = () => {
  const [pedalboards, setPedalboards] = useState<Pedalboard[]>([]);
  const [filteredPedalboards, setFilteredPedalboards] = useState<Pedalboard[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // In a real app, we would fetch data from API or local storage
    setPedalboards(samplePedalboards);
    setFilteredPedalboards(samplePedalboards);
  }, []);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPedalboards(pedalboards);
      return;
    }
    
    const filtered = pedalboards.filter(board => 
      board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.pedals.some(pedal => 
        pedal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedal.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    setFilteredPedalboards(filtered);
  }, [searchTerm, pedalboards]);

  return (
    <div className="min-h-screen bg-background pb-safe-bottom">
      <Header 
        title="Pedalboards" 
        showSearch={!searchVisible}
        onSearchClick={() => setSearchVisible(true)}
      />
      
      {/* Search bar */}
      {searchVisible && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border pt-safe-top animate-slide-up">
          <div className="flex items-center px-4 h-14">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search pedalboards..."
                className="w-full h-10 pl-10 pr-10 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <button 
              onClick={() => {
                setSearchVisible(false);
                setSearchTerm('');
              }}
              className="ml-3 text-sm font-medium text-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <main className="p-4 pt-20">
        {filteredPedalboards.length > 0 ? (
          <div className="space-y-4">
            {filteredPedalboards.map(pedalboard => (
              <PedalboardCard key={pedalboard.id} pedalboard={pedalboard} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <div className="bg-secondary/80 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <MoveVertical className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium">No pedalboards found</h2>
            <p className="text-muted-foreground mt-2 max-w-xs">
              {searchTerm ? 'Try a different search term' : 'Create your first pedalboard by clicking the + button'}
            </p>
          </div>
        )}
      </main>
      
      <AddButton />
    </div>
  );
};

export default Index;
