import { Sound, SoundCategory } from './types';

/**
 * INSTRUCTIONS FOR USER:
 * 1. Place your audio files (mp3, wav, ogg) in a folder named 'sounds' inside your 'public' directory.
 *    e.g., public/sounds/my-sound.mp3
 * 2. Add an entry to the SOUND_LIBRARY array below for each file.
 * 3. The 'filename' property must match the actual file name.
 */

// Prefix for sound files. If hosted on a sub-path (like GitHub Pages), this might need adjustment.
// For standard Vercel/Root deployments, '/sounds/' works if files are in 'public/sounds'.
export const SOUND_BASE_PATH = '/sounds/';

export const SOUND_LIBRARY: Sound[] = [
  {
    id: '1',
    filename: 'success_bell.mp3', // Placeholder: Ensure this file exists in public/sounds/ or replace with a URL
    title: 'Success Bell',
    category: SoundCategory.UI,
    description: 'A cheerful chime indicating a successful action.',
    duration: '0:02'
  },
  {
    id: '2',
    filename: 'error_buzzer.mp3',
    title: 'Error Buzzer',
    category: SoundCategory.UI,
    description: 'A flat buzzer sound for validation errors.',
    duration: '0:01'
  },
  {
    id: '3',
    filename: 'forest_ambience.mp3',
    title: 'Forest Morning',
    category: SoundCategory.AMBIENCE,
    description: 'Light wind through trees with distant birds.',
    duration: '0:15'
  },
  {
    id: '4',
    filename: 'coin_pickup.wav',
    title: 'Coin Pickup',
    category: SoundCategory.GAME,
    description: 'Classic retro 8-bit coin collect sound.',
    duration: '0:01'
  },
  {
    id: '5',
    filename: 'message_pop.mp3',
    title: 'Message Pop',
    category: SoundCategory.NOTIFICATION,
    description: 'Soft bubble pop for incoming messages.',
    duration: '0:01'
  },
  {
    id: '6',
    filename: 'laser_shoot.wav',
    title: 'Laser Blast',
    category: SoundCategory.GAME,
    description: 'Futuristic sci-fi laser weapon fire.',
    duration: '0:02'
  },
  {
    id: '7',
    filename: 'rain_heavy.mp3',
    title: 'Heavy Rain',
    category: SoundCategory.AMBIENCE,
    description: 'Intense rainstorm against a window.',
    duration: '0:30'
  }
];

// Using external placeholder URLs for demo purposes so the UI isn't broken initially.
// In production, remove this map and rely on SOUND_BASE_PATH + filename.
export const DEMO_URL_MAP: Record<string, string> = {
  'success_bell.mp3': 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  'error_buzzer.mp3': 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3',
  'forest_ambience.mp3': 'https://assets.mixkit.co/active_storage/sfx/249/249-preview.mp3',
  'coin_pickup.wav': 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  'message_pop.mp3': 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3',
  'laser_shoot.wav': 'https://assets.mixkit.co/active_storage/sfx/1507/1507-preview.mp3',
  'rain_heavy.mp3': 'https://assets.mixkit.co/active_storage/sfx/246/246-preview.mp3',
};
