
import React from 'react';
import { Pedal } from '@/lib/types';
import { Trash2 } from 'lucide-react';

interface PedalCardProps {
  pedal: Pedal;
  onRemove?: (id: string) => void;
  isEditable?: boolean;
}

const PedalCard: React.FC<PedalCardProps> = ({ 
  pedal, 
  onRemove,
  isEditable = false
}) => {
  // Map pedal types to background colors
  const getPedalColor = (type: string) => {
    const colors: Record<string, string> = {
      'Overdrive': 'bg-amber-100 border-amber-200',
      'Distortion': 'bg-orange-100 border-orange-200',
      'Fuzz': 'bg-red-100 border-red-200',
      'Delay': 'bg-blue-100 border-blue-200',
      'Reverb': 'bg-indigo-100 border-indigo-200',
      'Chorus': 'bg-purple-100 border-purple-200',
      'Phaser': 'bg-violet-100 border-violet-200',
      'Flanger': 'bg-fuchsia-100 border-fuchsia-200',
      'Tremolo': 'bg-pink-100 border-pink-200',
      'Compressor': 'bg-yellow-100 border-yellow-200',
      'EQ': 'bg-lime-100 border-lime-200',
      'Wah': 'bg-green-100 border-green-200',
      'Tuner': 'bg-emerald-100 border-emerald-200',
      'Volume': 'bg-teal-100 border-teal-200',
      'Looper': 'bg-cyan-100 border-cyan-200',
      'Multi-effect': 'bg-sky-100 border-sky-200'
    };
    
    return colors[type] || 'bg-gray-100 border-gray-200';
  };

  return (
    <div className={`relative p-4 rounded-lg border ${getPedalColor(pedal.type)} animate-scale-in mb-3`}>
      <div className="flex justify-between items-start">
        <div>
          <span className="inline-block px-2 py-1 text-xs font-medium bg-white/50 backdrop-blur-sm rounded-md mb-2">
            {pedal.type}
          </span>
          <h3 className="font-medium text-sm">
            {pedal.brand} {pedal.name}
          </h3>
        </div>
        
        {isEditable && onRemove && (
          <button 
            onClick={() => onRemove(pedal.id)}
            className="p-1 rounded-full hover:bg-white/50 transition-colors"
            aria-label="Remove pedal"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        )}
      </div>
      
      {pedal.settings.knobs.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-medium mb-1">Settings:</p>
          <div className="grid grid-cols-2 gap-2">
            {pedal.settings.knobs.map(knob => (
              <div key={knob.id} className="text-xs">
                <span className="font-medium">{knob.name}:</span> {knob.value}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {pedal.notes && (
        <div className="mt-2 text-xs text-gray-600 italic">
          {pedal.notes}
        </div>
      )}
    </div>
  );
};

export default PedalCard;
