
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Plus, Save, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Pedal, PedalType, Pedalboard } from '@/lib/types';

const AddPedalboard: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pedals, setPedals] = useState<Pedal[]>([]);
  const [showAddPedal, setShowAddPedal] = useState(false);
  
  // Form state for adding a new pedal
  const [pedalName, setPedalName] = useState('');
  const [pedalBrand, setPedalBrand] = useState('');
  const [pedalType, setPedalType] = useState<PedalType>('Overdrive');
  const [pedalNotes, setPedalNotes] = useState('');
  
  const pedalTypes: PedalType[] = [
    'Overdrive', 'Distortion', 'Fuzz', 'Delay', 'Reverb', 
    'Chorus', 'Phaser', 'Flanger', 'Tremolo', 'Compressor', 
    'EQ', 'Wah', 'Tuner', 'Volume', 'Looper', 'Multi-effect', 'Other'
  ];
  
  const resetPedalForm = () => {
    setPedalName('');
    setPedalBrand('');
    setPedalType('Overdrive');
    setPedalNotes('');
  };
  
  const handleAddPedal = () => {
    if (!pedalName.trim() || !pedalBrand.trim()) {
      toast({
        title: "Error",
        description: "Pedal name and brand are required",
        variant: "destructive",
      });
      return;
    }
    
    const newPedal: Pedal = {
      id: Date.now().toString(),
      name: pedalName.trim(),
      brand: pedalBrand.trim(),
      type: pedalType,
      settings: {
        knobs: [],
        switches: [],
      },
      notes: pedalNotes.trim() || undefined,
      position: pedals.length + 1,
    };
    
    setPedals([...pedals, newPedal]);
    setShowAddPedal(false);
    resetPedalForm();
    
    toast({
      title: "Pedal added",
      description: `${pedalBrand} ${pedalName} has been added to your pedalboard`,
      duration: 2000,
    });
  };
  
  const handleRemovePedal = (id: string) => {
    setPedals(pedals.filter(pedal => pedal.id !== id));
    
    toast({
      title: "Pedal removed",
      duration: 2000,
    });
  };
  
  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Pedalboard name is required",
        variant: "destructive",
      });
      return;
    }
    
    const newPedalboard: Pedalboard = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim() || undefined,
      pedals,
      createdAt: new Date(),
      updatedAt: new Date(),
      favorite: false,
    };
    
    // In a real app, save to local storage or API
    console.log('Saving pedalboard:', newPedalboard);
    
    toast({
      title: "Pedalboard saved",
      description: `${name} has been saved`,
    });
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-safe-bottom">
      <Header title="New Pedalboard" showBackButton />
      
      <main className="p-4 pt-20">
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-medium mb-3">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My awesome pedalboard"
                  className="w-full p-3 rounded-lg border bg-card text-card-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="For playing blues, rock, etc."
                  className="w-full p-3 rounded-lg border bg-card text-card-foreground focus:outline-none focus:ring-1 focus:ring-primary h-24 resize-none"
                />
              </div>
            </div>
          </div>
          
          {/* Pedals */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium">Pedals</h2>
              <button 
                onClick={() => setShowAddPedal(true)}
                className="flex items-center text-sm text-primary hover:underline"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Pedal
              </button>
            </div>
            
            {pedals.length > 0 ? (
              <div className="space-y-3">
                {pedals.map(pedal => (
                  <div key={pedal.id} className="p-4 rounded-lg border bg-card">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-secondary rounded-md mb-1">
                          {pedal.type}
                        </span>
                        <h3 className="font-medium">
                          {pedal.brand} {pedal.name}
                        </h3>
                      </div>
                      
                      <button 
                        onClick={() => handleRemovePedal(pedal.id)}
                        className="p-1 rounded-full hover:bg-secondary/70 active:bg-secondary transition-colors"
                        aria-label="Remove pedal"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                    
                    {pedal.notes && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        {pedal.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No pedals added yet</p>
                <button 
                  onClick={() => setShowAddPedal(true)}
                  className="mt-2 text-primary hover:underline text-sm"
                >
                  Add your first pedal
                </button>
              </div>
            )}
          </div>
          
          {/* Add Pedal Form */}
          {showAddPedal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-card rounded-xl w-full max-w-md max-h-[85vh] overflow-auto p-6 animate-scale-in">
                <h2 className="text-xl font-medium mb-4">Add Pedal</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="pedalBrand" className="block text-sm font-medium mb-1">
                      Brand *
                    </label>
                    <input
                      id="pedalBrand"
                      type="text"
                      value={pedalBrand}
                      onChange={(e) => setPedalBrand(e.target.value)}
                      placeholder="Boss, MXR, etc."
                      className="w-full p-3 rounded-lg border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pedalName" className="block text-sm font-medium mb-1">
                      Name *
                    </label>
                    <input
                      id="pedalName"
                      type="text"
                      value={pedalName}
                      onChange={(e) => setPedalName(e.target.value)}
                      placeholder="DS-1, Carbon Copy, etc."
                      className="w-full p-3 rounded-lg border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pedalType" className="block text-sm font-medium mb-1">
                      Type
                    </label>
                    <select
                      id="pedalType"
                      value={pedalType}
                      onChange={(e) => setPedalType(e.target.value as PedalType)}
                      className="w-full p-3 rounded-lg border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {pedalTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="pedalNotes" className="block text-sm font-medium mb-1">
                      Notes
                    </label>
                    <textarea
                      id="pedalNotes"
                      value={pedalNotes}
                      onChange={(e) => setPedalNotes(e.target.value)}
                      placeholder="Any special settings or notes about this pedal"
                      className="w-full p-3 rounded-lg border bg-background focus:outline-none focus:ring-1 focus:ring-primary h-24 resize-none"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setShowAddPedal(false);
                      resetPedalForm();
                    }}
                    className="flex-1 py-3 rounded-lg border border-input hover:bg-secondary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPedal}
                    className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Add Pedal
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="h-5 w-5" />
              Save Pedalboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddPedalboard;
