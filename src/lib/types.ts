
export type PedalType = 
  | 'Overdrive' 
  | 'Distortion' 
  | 'Fuzz' 
  | 'Delay' 
  | 'Reverb' 
  | 'Chorus' 
  | 'Phaser' 
  | 'Flanger' 
  | 'Tremolo' 
  | 'Compressor' 
  | 'EQ' 
  | 'Wah' 
  | 'Tuner'
  | 'Volume'
  | 'Looper'
  | 'Multi-effect'
  | 'Other';

export interface Knob {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
}

export interface Switch {
  id: string;
  name: string;
  options: string[];
  value: string;
}

export interface Pedal {
  id: string;
  name: string;
  brand: string;
  type: PedalType;
  settings: {
    knobs: Knob[];
    switches: Switch[];
  };
  notes?: string;
  position: number;
}

export interface Pedalboard {
  id: string;
  name: string;
  description?: string;
  pedals: Pedal[];
  createdAt: Date;
  updatedAt: Date;
  favorite: boolean;
}
