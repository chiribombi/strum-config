
import { Pedalboard, Pedal } from './types';

// Sample pedals for demonstration
const pedals: Pedal[] = [
  {
    id: 'p1',
    name: 'TS9',
    brand: 'Ibanez',
    type: 'Overdrive',
    position: 1,
    settings: {
      knobs: [
        { id: 'k1', name: 'Drive', value: 7, min: 0, max: 10 },
        { id: 'k2', name: 'Tone', value: 5, min: 0, max: 10 },
        { id: 'k3', name: 'Level', value: 8, min: 0, max: 10 },
      ],
      switches: [],
    },
    notes: 'Classic transparent overdrive, great for pushing the amp',
  },
  {
    id: 'p2',
    name: 'Carbon Copy',
    brand: 'MXR',
    type: 'Delay',
    position: 2,
    settings: {
      knobs: [
        { id: 'k4', name: 'Regen', value: 3, min: 0, max: 10 },
        { id: 'k5', name: 'Mix', value: 4, min: 0, max: 10 },
        { id: 'k6', name: 'Delay', value: 2, min: 0, max: 10 },
      ],
      switches: [
        { id: 's1', name: 'Mod', options: ['On', 'Off'], value: 'On' },
      ],
    },
    notes: 'Warm analog delay with modulation',
  },
  {
    id: 'p3',
    name: 'Holy Grail',
    brand: 'Electro-Harmonix',
    type: 'Reverb',
    position: 3,
    settings: {
      knobs: [
        { id: 'k7', name: 'Blend', value: 5, min: 0, max: 10 },
      ],
      switches: [
        { id: 's2', name: 'Type', options: ['Spring', 'Hall', 'Flerb'], value: 'Hall' },
      ],
    },
  },
  {
    id: 'p4',
    name: 'Rat',
    brand: 'ProCo',
    type: 'Distortion',
    position: 1,
    settings: {
      knobs: [
        { id: 'k8', name: 'Distortion', value: 6, min: 0, max: 10 },
        { id: 'k9', name: 'Filter', value: 4, min: 0, max: 10 },
        { id: 'k10', name: 'Volume', value: 7, min: 0, max: 10 },
      ],
      switches: [],
    },
    notes: 'Classic distortion with a wide range of tones',
  },
  {
    id: 'p5',
    name: 'Phase 90',
    brand: 'MXR',
    type: 'Phaser',
    position: 2,
    settings: {
      knobs: [
        { id: 'k11', name: 'Speed', value: 3, min: 0, max: 10 },
      ],
      switches: [],
    },
  },
  {
    id: 'p6',
    name: 'CE-2',
    brand: 'Boss',
    type: 'Chorus',
    position: 3,
    settings: {
      knobs: [
        { id: 'k12', name: 'Rate', value: 2, min: 0, max: 10 },
        { id: 'k13', name: 'Depth', value: 7, min: 0, max: 10 },
      ],
      switches: [],
    },
    notes: 'Classic chorus with lush analog tone',
  },
  {
    id: 'p7',
    name: 'Polytune 3',
    brand: 'TC Electronic',
    type: 'Tuner',
    position: 1,
    settings: {
      knobs: [],
      switches: [
        { id: 's3', name: 'Buffer', options: ['On', 'Off'], value: 'On' },
      ],
    },
  },
];

// Sample pedalboards for demonstration
export const samplePedalboards: Pedalboard[] = [
  {
    id: 'pb1',
    name: 'Blues Setup',
    description: 'My go-to pedalboard for blues gigs',
    pedals: [pedals[0], pedals[1], pedals[2]],
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-06-10'),
    favorite: true,
  },
  {
    id: 'pb2',
    name: 'Rock Configuration',
    description: 'Heavier setup for rock and hard rock',
    pedals: [pedals[3], pedals[4], pedals[5]],
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2023-06-05'),
    favorite: false,
  },
  {
    id: 'pb3',
    name: 'Minimalist',
    description: 'Simple setup for clean sound with just the essentials',
    pedals: [pedals[6], pedals[0]],
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-01'),
    favorite: true,
  },
];
