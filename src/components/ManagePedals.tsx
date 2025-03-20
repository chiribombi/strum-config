
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { Pedal, PedalType } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';
import PedalCard from './PedalCard';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ManagePedalsProps {
  pedals: Pedal[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (pedals: Pedal[]) => void;
}

const ManagePedals: React.FC<ManagePedalsProps> = ({ 
  pedals, 
  open, 
  onOpenChange, 
  onSave 
}) => {
  const [managedPedals, setManagedPedals] = useState<Pedal[]>([...pedals]);
  const [addPedalOpen, setAddPedalOpen] = useState(false);
  const [editingPedal, setEditingPedal] = useState<Pedal | null>(null);

  // New pedal form state
  const [pedalName, setPedalName] = useState('');
  const [pedalBrand, setPedalBrand] = useState('');
  const [pedalType, setPedalType] = useState<PedalType>('Overdrive');
  const [pedalNotes, setPedalNotes] = useState('');

  const handleSave = () => {
    onSave(managedPedals);
    onOpenChange(false);
    toast({
      title: "Pedales actualizados",
      description: "Los cambios se han guardado correctamente",
    });
  };

  const handleAddPedal = () => {
    if (!pedalName.trim() || !pedalBrand.trim()) {
      toast({
        title: "Error",
        description: "Nombre y marca son campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    const newPedal: Pedal = {
      id: `p${Date.now()}`,
      name: pedalName,
      brand: pedalBrand,
      type: pedalType,
      position: managedPedals.length + 1,
      settings: {
        knobs: [],
        switches: [],
      },
      notes: pedalNotes || undefined,
    };

    setManagedPedals(prev => [...prev, newPedal]);
    resetPedalForm();
    setAddPedalOpen(false);
    toast({
      title: "Pedal añadido",
      description: `${pedalBrand} ${pedalName} añadido correctamente`,
    });
  };

  const handleRemovePedal = (id: string) => {
    setManagedPedals(prev => {
      const filtered = prev.filter(p => p.id !== id);
      // Reorder positions
      return filtered.map((p, idx) => ({ ...p, position: idx + 1 }));
    });
    toast({
      title: "Pedal eliminado",
      description: "El pedal ha sido eliminado correctamente",
    });
  };

  const handleMovePedal = (id: string, direction: 'up' | 'down') => {
    setManagedPedals(prev => {
      const index = prev.findIndex(p => p.id === id);
      if (index === -1) return prev;

      const newPedals = [...prev];
      if (direction === 'up' && index > 0) {
        // Swap with previous pedal
        [newPedals[index - 1], newPedals[index]] = [newPedals[index], newPedals[index - 1]];
      } else if (direction === 'down' && index < newPedals.length - 1) {
        // Swap with next pedal
        [newPedals[index], newPedals[index + 1]] = [newPedals[index + 1], newPedals[index]];
      }

      // Update positions
      return newPedals.map((p, idx) => ({ ...p, position: idx + 1 }));
    });
  };

  const resetPedalForm = () => {
    setPedalName('');
    setPedalBrand('');
    setPedalType('Overdrive');
    setPedalNotes('');
    setEditingPedal(null);
  };

  const pedalTypes: PedalType[] = [
    'Overdrive', 'Distortion', 'Fuzz', 'Delay', 'Reverb', 
    'Chorus', 'Phaser', 'Flanger', 'Tremolo', 'Compressor', 
    'EQ', 'Wah', 'Tuner', 'Volume', 'Looper', 'Multi-effect', 'Other'
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Gestionar pedales</DialogTitle>
          </DialogHeader>

          <div className="py-4 max-h-[60vh] overflow-y-auto">
            {managedPedals.length === 0 ? (
              <div className="text-center text-muted-foreground p-8">
                No hay pedales en este pedalboard. Añade tu primer pedal.
              </div>
            ) : (
              <div className="space-y-3">
                {managedPedals.map((pedal) => (
                  <div key={pedal.id} className="flex items-center gap-2">
                    <div className="flex-grow">
                      <PedalCard pedal={pedal} isEditable={true} onRemove={() => handleRemovePedal(pedal.id)} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMovePedal(pedal.id, 'up')}
                        disabled={pedal.position === 1}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMovePedal(pedal.id, 'down')}
                        disabled={pedal.position === managedPedals.length}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="flex sm:justify-between gap-2">
            <Button variant="outline" onClick={() => setAddPedalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Añadir pedal
            </Button>
            <Button onClick={handleSave}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={addPedalOpen} onOpenChange={setAddPedalOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Añadir nuevo pedal</SheetTitle>
          </SheetHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                value={pedalBrand}
                onChange={(e) => setPedalBrand(e.target.value)}
                placeholder="Boss, MXR, Ibanez..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={pedalName}
                onChange={(e) => setPedalName(e.target.value)}
                placeholder="TS9, DD-7, Carbon Copy..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <select
                id="type"
                value={pedalType}
                onChange={(e) => setPedalType(e.target.value as PedalType)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {pedalTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notas (opcional)</Label>
              <Textarea
                id="notes"
                value={pedalNotes}
                onChange={(e) => setPedalNotes(e.target.value)}
                placeholder="Configuración, usos recomendados..."
              />
            </div>
          </div>
          
          <SheetFooter className="mt-4">
            <Button onClick={handleAddPedal}>Añadir pedal</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ManagePedals;
