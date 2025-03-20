
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pedalboard } from '@/lib/types';
import { Star, Clock } from 'lucide-react';

interface PedalboardCardProps {
  pedalboard: Pedalboard;
}

const PedalboardCard: React.FC<PedalboardCardProps> = ({ pedalboard }) => {
  const navigate = useNavigate();
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(new Date(date));
  };

  return (
    <div 
      className="rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden animate-fade-in"
      onClick={() => navigate(`/pedalboard/${pedalboard.id}`)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{pedalboard.name}</h3>
          {pedalboard.favorite && (
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          )}
        </div>
        
        {pedalboard.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{pedalboard.description}</p>
        )}
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatDate(pedalboard.updatedAt)}</span>
          </div>
          <div>
            {pedalboard.pedals.length} {pedalboard.pedals.length === 1 ? 'pedal' : 'pedals'}
          </div>
        </div>
      </div>
      
      {pedalboard.pedals.length > 0 && (
        <div className="px-4 py-3 bg-secondary/50 border-t border-border flex flex-wrap gap-1">
          {pedalboard.pedals.slice(0, 3).map(pedal => (
            <span 
              key={pedal.id} 
              className="px-2 py-1 bg-background rounded-md text-xs inline-block"
            >
              {pedal.name}
            </span>
          ))}
          {pedalboard.pedals.length > 3 && (
            <span className="px-2 py-1 bg-background rounded-md text-xs inline-block">
              +{pedalboard.pedals.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PedalboardCard;
