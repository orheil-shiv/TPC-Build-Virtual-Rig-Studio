// TPC BUILD - Game Profiles & Benchmark Calibration Data

export const GAMES = [
  {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    genre: 'Open-World Action RPG',
    icon: 'flame',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
    description: 'Graphically demanding futuristic night city with full path-tracing support.',
    baseFps: 155, // RTX 4090 + 7800X3D @ 1080p Ultra (No RT)
    cpuWeight: 0.28,
    gpuWeight: 0.72,
    rtPenalty: 0.45,
    rtAvailable: true,
    vramNeeds: { '1080p': 8, '1440p': 10, '4k': 16, 'ultrawide': 12 },
    esports: false
  },
  {
    id: 'fortnite',
    title: 'Fortnite (UE5)',
    genre: 'Battle Royale',
    icon: 'crosshair',
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=500&auto=format&fit=crop&q=80',
    description: 'Unreal Engine 5 with Nanite and Lumen lighting or High FPS Performance mode.',
    baseFps: 290,
    cpuWeight: 0.55, // Highly CPU and 3D V-Cache dependent
    gpuWeight: 0.45,
    rtPenalty: 0.38,
    rtAvailable: true,
    vramNeeds: { '1080p': 6, '1440p': 8, '4k': 12, 'ultrawide': 10 },
    esports: true
  },
  {
    id: 'valorant',
    title: 'Valorant',
    genre: 'Tactical Shooter',
    icon: 'target',
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&auto=format&fit=crop&q=80',
    description: 'Ultra high refresh esports title heavily reliant on CPU single-core IPC and cache.',
    baseFps: 650,
    cpuWeight: 0.85, // Almost entirely CPU limited
    gpuWeight: 0.15,
    rtPenalty: 0.0,
    rtAvailable: false,
    vramNeeds: { '1080p': 4, '1440p': 6, '4k': 8, 'ultrawide': 6 },
    esports: true
  },
  {
    id: 'cod-warzone',
    title: 'Call of Duty: Warzone',
    genre: 'Battle Royale FPS',
    icon: 'shield-alert',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&auto=format&fit=crop&q=80',
    description: 'Large battle royale map requiring balanced CPU memory bandwidth and GPU raster power.',
    baseFps: 210,
    cpuWeight: 0.45,
    gpuWeight: 0.55,
    rtPenalty: 0.25,
    rtAvailable: true,
    vramNeeds: { '1080p': 8, '1440p': 12, '4k': 16, 'ultrawide': 12 },
    esports: true
  },
  {
    id: 'gta-v',
    title: 'Grand Theft Auto V / VI Ready',
    genre: 'Open World',
    icon: 'car',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=80',
    description: 'Massive open world with complex NPC simulation and extended distance scaling.',
    baseFps: 220,
    cpuWeight: 0.40,
    gpuWeight: 0.60,
    rtPenalty: 0.30,
    rtAvailable: true,
    vramNeeds: { '1080p': 6, '1440p': 8, '4k': 12, 'ultrawide': 10 },
    esports: false
  },
  {
    id: 'black-myth-wukong',
    title: 'Black Myth: Wukong',
    genre: 'Action RPG',
    icon: 'sword',
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=500&auto=format&fit=crop&q=80',
    description: 'Stunning next-gen UE5 action epic featuring intense shader computation and hair rendering.',
    baseFps: 140,
    cpuWeight: 0.25,
    gpuWeight: 0.75,
    rtPenalty: 0.40,
    rtAvailable: true,
    vramNeeds: { '1080p': 8, '1440p': 12, '4k': 16, 'ultrawide': 12 },
    esports: false
  },
  {
    id: 'apex-legends',
    title: 'Apex Legends',
    genre: 'Hero Shooter',
    icon: 'zap',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80',
    description: 'High-speed shooter capped up to 300 FPS engine limit with dynamic particle effects.',
    baseFps: 300,
    cpuWeight: 0.45,
    gpuWeight: 0.55,
    rtPenalty: 0.0,
    rtAvailable: false,
    vramNeeds: { '1080p': 6, '1440p': 8, '4k': 10, 'ultrawide': 8 },
    esports: true
  },
  {
    id: 'rdr2',
    title: 'Red Dead Redemption 2',
    genre: 'Cinematic Open World',
    icon: 'compass',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
    description: 'Photorealistic western landscape with volumetric lighting and water physics.',
    baseFps: 175,
    cpuWeight: 0.32,
    gpuWeight: 0.68,
    rtPenalty: 0.0,
    rtAvailable: false,
    vramNeeds: { '1080p': 8, '1440p': 10, '4k': 14, 'ultrawide': 12 },
    esports: false
  },
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    genre: 'Dark Fantasy RPG',
    icon: 'shield',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=80',
    description: 'FromSoftware sprawling Lands Between with complex boss VFX and shadow cascades.',
    baseFps: 120, // Engine uncapped representation
    cpuWeight: 0.35,
    gpuWeight: 0.65,
    rtPenalty: 0.35,
    rtAvailable: true,
    vramNeeds: { '1080p': 6, '1440p': 8, '4k': 12, 'ultrawide': 10 },
    esports: false
  },
  {
    id: 'starfield',
    title: 'Starfield',
    genre: 'Space Exploration RPG',
    icon: 'globe',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
    description: 'Dense planetary cities and space battles with heavy CPU draw calls and texture loads.',
    baseFps: 130,
    cpuWeight: 0.40,
    gpuWeight: 0.60,
    rtPenalty: 0.0,
    rtAvailable: false,
    vramNeeds: { '1080p': 8, '1440p': 12, '4k': 16, 'ultrawide': 12 },
    esports: false
  },
  {
    id: 'helldivers-2',
    title: 'Helldivers 2',
    genre: 'Co-op Extraction Shooter',
    icon: 'rocket',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    description: 'High enemy swarm density, explosions, and real-time physics calculations.',
    baseFps: 160,
    cpuWeight: 0.48,
    gpuWeight: 0.52,
    rtPenalty: 0.0,
    rtAvailable: false,
    vramNeeds: { '1080p': 8, '1440p': 10, '4k': 14, 'ultrawide': 10 },
    esports: false
  },
  {
    id: 'cs2',
    title: 'Counter-Strike 2',
    genre: 'Tactical Esports FPS',
    icon: 'crosshair',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
    description: 'Source 2 responsive smoke particles and sub-tick architecture favoring high single-core IPC.',
    baseFps: 520,
    cpuWeight: 0.70,
    gpuWeight: 0.30,
    rtPenalty: 0.0,
    rtAvailable: false,
    vramNeeds: { '1080p': 4, '1440p': 6, '4k': 8, 'ultrawide': 6 },
    esports: true
  }
];

export const RESOLUTION_MODIFIERS = {
  '1080p': { label: '1080p FHD (1920x1080)', factor: 1.00, cpuImpact: 1.00, gpuImpact: 0.70 },
  '1440p': { label: '1440p QHD (2560x1440)', factor: 0.73, cpuImpact: 0.85, gpuImpact: 0.90 },
  '4k': { label: '4K UHD (3840x2160)', factor: 0.44, cpuImpact: 0.65, gpuImpact: 1.00 },
  'ultrawide': { label: 'Ultrawide (3440x1440)', factor: 0.64, cpuImpact: 0.80, gpuImpact: 0.95 }
};

export const PRESET_MODIFIERS = {
  'low': { label: 'Low / Esports', factor: 1.48 },
  'medium': { label: 'Medium', factor: 1.22 },
  'high': { label: 'High', factor: 1.08 },
  'ultra': { label: 'Ultra / Maximum', factor: 1.00 }
};
