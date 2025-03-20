
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import PedalCard from '@/components/PedalCard';
import { Pedalboard } from '@/lib/types';
import { Share2, Star, Edit, Trash2, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Sample data for demonstration
import { samplePedalboards } from '@/lib/sampleData';

const PedalboardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pedalboard, setPedalboard] = useState<Pedalboard | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, we would fetch data from API or local storage
    const board = samplePedalboards.find(b => b.id === id);
    if (board) {
      setPedalboard(board);
    }
    setLoading(false);
  }, [id]);
  
  const handleShare = () => {
    // In a real app, implement sharing functionality
    toast({
      title: "Sharing",
      description: "This functionality will be available in the next update",
    });
  };
  
  const toggleFavorite = () => {
    if (pedalboard) {
      setPedalboard({
        ...pedalboard,
        favorite: !pedalboard.favorite
      });
      toast({
        title: pedalboard.favorite ? "Removed from favorites" : "Added to favorites",
        duration: 2000,
      });
    }
  };
  
  const handleDelete = () => {
    // In a real app, implement deletion with confirmation
    toast({
      title: "Pedalboard deleted",
      description: "Your pedalboard has been deleted",
    });
    navigate('/');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Loading..." showBackButton />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }
  
  if (!pedalboard) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Not Found" showBackButton />
        <div className="flex flex-col items-center justify-center h-[70vh] p-4 text-center">
          <div className="bg-secondary/80 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-medium">Pedalboard not found</h2>
          <p className="text-muted-foreground mt-2 max-w-xs">
            The pedalboard you're looking for doesn't exist or has been deleted.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-safe-bottom">
      <Header title={pedalboard.name} showBackButton />
      
      <main className="p-4 pt-20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-medium">{pedalboard.name}</h1>
          <div className="flex gap-1">
            <button 
              onClick={toggleFavorite}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label={pedalboard.favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star className={`h-5 w-5 ${pedalboard.favorite ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
            </button>
            <button 
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Share"
            >
              <Share2 className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        {pedalboard.description && (
          <p className="text-sm text-muted-foreground mb-6">{pedalboard.description}</p>
        )}
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Pedal Chain</h2>
          <div className="space-y-3">
            {pedalboard.pedals.length > 0 ? (
              <div>
                {/* Signal chain visualization */}
                <div className="relative mb-4 px-4">
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-secondary"></div>
                  <div className="relative flex justify-between">
                    <div className="bg-primary rounded-full w-3 h-3 z-10"></div>
                    <div className="bg-primary rounded-full w-3 h-3 z-10"></div>
                  </div>
                </div>
                
                {/* Pedals list */}
                <div>
                  {pedalboard.pedals
                    .sort((a, b) => a.position - b.position)
                    .map(pedal => (
                      <PedalCard key={pedal.id} pedal={pedal} />
                    ))
                  }
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No pedals added to this pedalboard</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => navigate(`/edit/${pedalboard.id}`)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/70 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default PedalboardDetail;
