
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Pedalboard } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import ManagePedals from '@/components/ManagePedals';

// Sample data for demonstration
import { samplePedalboards } from '@/lib/sampleData';

const EditPedalboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pedalboard, setPedalboard] = useState<Pedalboard | null>(null);
  const [managePedalsOpen, setManagePedalsOpen] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch data from API or local storage
    const board = samplePedalboards.find(b => b.id === id);
    if (board) {
      setPedalboard(board);
      setName(board.name);
      setDescription(board.description || '');
    }
    setLoading(false);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would update the data in API or local storage
    // For now we'll just show a success message and navigate back
    toast({
      title: "Pedalboard actualizado",
      description: "Los cambios se han guardado correctamente",
    });
    
    navigate(`/pedalboard/${id}`);
  };

  const handleUpdatePedals = (updatedPedals: Pedalboard['pedals']) => {
    if (pedalboard) {
      setPedalboard({
        ...pedalboard,
        pedals: updatedPedals,
        updatedAt: new Date(),
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Cargando..." showBackButton />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="animate-pulse">Cargando...</div>
        </div>
      </div>
    );
  }

  if (!pedalboard) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="No encontrado" showBackButton />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <p className="text-lg">El pedalboard no existe o ha sido eliminado</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-safe-bottom">
      <Header title="Editar Pedalboard" showBackButton />
      
      <main className="p-4 pt-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nombre
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del pedalboard"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Descripción (opcional)
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción del pedalboard"
              className="w-full min-h-[100px]"
            />
          </div>
          
          <h3 className="text-lg font-medium pt-4">Pedales</h3>
          <div className="bg-secondary/30 p-4 rounded-lg">
            <p className="text-center text-sm text-muted-foreground">
              {pedalboard.pedals.length === 0 
                ? "No hay pedales en este pedalboard" 
                : `${pedalboard.pedals.length} pedales configurados`}
            </p>
            
            <Button 
              type="button"
              variant="outline" 
              className="w-full mt-3"
              onClick={() => setManagePedalsOpen(true)}
            >
              Gestionar pedales
            </Button>
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Guardar cambios
            </Button>
          </div>
        </form>
      </main>

      <ManagePedals
        pedals={pedalboard.pedals}
        open={managePedalsOpen}
        onOpenChange={setManagePedalsOpen}
        onSave={handleUpdatePedals}
      />
    </div>
  );
};

export default EditPedalboard;
