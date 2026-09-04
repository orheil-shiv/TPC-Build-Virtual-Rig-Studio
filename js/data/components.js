// TPC BUILD - Hardware Components Catalog
export const HARDWARE_CATEGORIES = [
  { id: 'cpu', name: 'Processor (CPU)', icon: 'cpu', required: true, description: 'The brain of your PC' },
  { id: 'cooler', name: 'CPU Cooler', icon: 'fan', required: true, description: 'Liquid AIO or Air Heatsink cooling' },
  { id: 'motherboard', name: 'Motherboard', icon: 'circuit-board', required: true, description: 'Main circuit board' },
  { id: 'ram', name: 'Memory (RAM)', icon: 'memory-stick', required: true, description: 'Active memory (DDR4 / DDR5)' },
  { id: 'gpu', name: 'Graphics Card (GPU)', icon: 'gamepad-2', required: true, description: 'Drives gaming FPS & visual rendering' },
  { id: 'storage', name: 'Storage (SSD)', icon: 'hard-drive', required: true, description: 'Ultra-fast NVMe M.2 solid state drive' },
  { id: 'psu', name: 'Power Supply (PSU)', icon: 'zap', required: true, description: 'Clean electrical power with surge protection' },
  { id: 'case', name: 'PC Case (Chassis)', icon: 'box', required: true, description: 'Tempered glass cabinet with airflow fans' }
];

export const COMPONENTS = {
  cpu: [
    {
      id: 'ryzen-7-9800x3d',
      name: 'AMD Ryzen 7 9800X3D',
      brand: 'AMD',
      price: 479,
      socket: 'AM5',
      cores: 8,
      threads: 16,
      baseClock: '4.7 GHz',
      boostClock: '5.2 GHz',
      tdp: 120,
      cache: '104 MB (3D V-Cache)',
      integratedGpu: true,
      singleCoreScore: 118,
      multiCoreScore: 110,
      gamingScore: 135,
      has3dCache: true,
      tierLabel: '?? World #1 Gaming CPU',
      tags: ['AM5 Socket', '?? 3D V-Cache', '?? Best Gaming CPU', '120W TDP', 'PCIe 5.0'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=AMD+Ryzen+7+9800X3D',
        newegg: 'https://www.newegg.com/p/pl?d=AMD+Ryzen+7+9800X3D',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+7+9800X3D'
      }
    },
    {
      id: 'ryzen-7-7800x3d',
      name: 'AMD Ryzen 7 7800X3D',
      brand: 'AMD',
      price: 439,
      socket: 'AM5',
      cores: 8,
      threads: 16,
      baseClock: '4.2 GHz',
      boostClock: '5.0 GHz',
      tdp: 120,
      cache: '104 MB (3D V-Cache)',
      integratedGpu: true,
      singleCoreScore: 105,
      multiCoreScore: 100,
      gamingScore: 130,
      has3dCache: true,
      tierLabel: '? Esports Legend',
      tags: ['AM5 Socket', '?? 3D V-Cache', '? Esports King', '120W TDP'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=AMD+Ryzen+7+7800X3D',
        newegg: 'https://www.newegg.com/p/pl?d=AMD+Ryzen+7+7800X3D',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+7+7800X3D'
      }
    },
    {
      id: 'intel-i9-14900k',
      name: 'Intel Core i9-14900K (24-Core 6.0 GHz)',
      brand: 'Intel',
      price: 549,
      socket: 'LGA1700',
      cores: 24,
      threads: 32,
      baseClock: '3.2 GHz',
      boostClock: '6.0 GHz',
      tdp: 253,
      cache: '36 MB',
      integratedGpu: true,
      singleCoreScore: 120,
      multiCoreScore: 150,
      gamingScore: 122,
      has3dCache: false,
      tierLabel: '?? 6.0 GHz Creator Titan',
      tags: ['LGA1700', '24 Cores (8P+16E)', '?? 6.0 GHz Boost', 'Heavy Multitasking', 'DDR4/DDR5'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Intel+Core+i9-14900K',
        newegg: 'https://www.newegg.com/p/pl?d=Intel+Core+i9-14900K',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i9-14900K'
      }
    },
    {
      id: 'ryzen-5-7600x',
      name: 'AMD Ryzen 5 7600X (6-Core AM5)',
      brand: 'AMD',
      price: 199,
      socket: 'AM5',
      cores: 6,
      threads: 12,
      baseClock: '4.7 GHz',
      boostClock: '5.3 GHz',
      tdp: 105,
      cache: '38 MB',
      integratedGpu: true,
      singleCoreScore: 104,
      multiCoreScore: 78,
      gamingScore: 104,
      has3dCache: false,
      tierLabel: '?? 1440p Sweet Spot Value',
      tags: ['AM5 Socket', '?? 1440p Sweet Spot', 'High Clock 5.3GHz', 'DDR5 Only'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=AMD+Ryzen+5+7600X',
        newegg: 'https://www.newegg.com/p/pl?d=AMD+Ryzen+5+7600X',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+5+7600X'
      }
    },
    {
      id: 'intel-i5-13600k',
      name: 'Intel Core i5-13600K (14-Core)',
      brand: 'Intel',
      price: 259,
      socket: 'LGA1700',
      cores: 14,
      threads: 20,
      baseClock: '3.5 GHz',
      boostClock: '5.1 GHz',
      tdp: 181,
      cache: '24 MB',
      integratedGpu: true,
      singleCoreScore: 107,
      multiCoreScore: 102,
      gamingScore: 110,
      has3dCache: false,
      tierLabel: '?? Gamer/Streamer Favorite',
      tags: ['LGA1700', '14 Cores', 'Streamer Ready', 'DDR4/DDR5 Support'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Intel+Core+i5-13600K',
        newegg: 'https://www.newegg.com/p/pl?d=Intel+Core+i5-13600K',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i5-13600K'
      }
    },
    {
      id: 'ryzen-5-5600x',
      name: 'AMD Ryzen 5 5600X (AM4 Value King)',
      brand: 'AMD',
      price: 129,
      socket: 'AM4',
      cores: 6,
      threads: 12,
      baseClock: '3.7 GHz',
      boostClock: '4.6 GHz',
      tdp: 65,
      cache: '35 MB',
      integratedGpu: false,
      singleCoreScore: 84,
      multiCoreScore: 62,
      gamingScore: 82,
      has3dCache: false,
      tierLabel: '?? Ultra Budget King',
      tags: ['AM4 Socket', '?? Ultra Budget', 'Low 65W Power', 'Affordable DDR4'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=AMD+Ryzen+5+5600X',
        newegg: 'https://www.newegg.com/p/pl?d=AMD+Ryzen+5+5600X',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=AMD+Ryzen+5+5600X'
      }
    },
    {
      id: 'intel-i3-12100f',
      name: 'Intel Core i3-12100F (4-Core / 8-Thread)',
      brand: 'Intel',
      price: 84,
      socket: 'LGA1700',
      cores: 4,
      threads: 8,
      baseClock: '3.3 GHz',
      boostClock: '4.3 GHz',
      tdp: 58,
      cache: '12 MB',
      integratedGpu: false,
      singleCoreScore: 78,
      multiCoreScore: 45,
      gamingScore: 68,
      has3dCache: false,
      tierLabel: '??? Under $90 Entry Gamer',
      tags: ['LGA1700', 'Sub-$90 Entry', '58W Efficient', 'Fast Single Core'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Intel+Core+i3-12100F',
        newegg: 'https://www.newegg.com/p/pl?d=Intel+Core+i3-12100F',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Intel+Core+i3-12100F'
      }
    }
  ],

  cooler: [
    {
      id: 'arctic-liquid-freezer-iii-360',
      name: 'ARCTIC Liquid Freezer III 360 A-RGB',
      brand: 'ARCTIC',
      price: 110,
      type: 'AIO Liquid 360mm',
      coolingType: 'water-aio',
      radiatorSize: 360,
      fanRpm: '2000 RPM',
      noiseLevel: '22 dBA',
      tdpRating: 300,
      rgb: true,
      tierLabel: '?? 360mm Liquid AIO (Best Thermal)',
      tags: ['?? Water Cooled / AIO', '360mm Radiator', '?? ARGB Fans', '300W Extreme Cooling', 'VRM Fan'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=ARCTIC+Liquid+Freezer+III+360',
        newegg: 'https://www.newegg.com/p/pl?d=ARCTIC+Liquid+Freezer+III+360',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=ARCTIC+Liquid+Freezer+III+360'
      }
    },
    {
      id: 'nzxt-kraken-elite-360-rgb',
      name: 'NZXT Kraken Elite 360 RGB White (Custom LCD Display)',
      brand: 'NZXT',
      price: 279,
      type: 'AIO Liquid 360mm',
      coolingType: 'water-aio',
      radiatorSize: 360,
      fanRpm: '2000 RPM',
      noiseLevel: '28 dBA',
      tdpRating: 320,
      rgb: true,
      hasLcd: true,
      tierLabel: '?? Premium White AIO with LCD Screen',
      tags: ['?? Water Cooled / AIO', '?? LCD Display', '?? RGB Radiator', '320W Extreme', '?? Snow White Aesthetic'],
      color: 'white',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=NZXT+Kraken+Elite+360+RGB+White',
        newegg: 'https://www.newegg.com/p/pl?d=NZXT+Kraken+Elite+360+RGB+White',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=NZXT+Kraken+Elite+360'
      }
    },
    {
      id: 'thermalright-peerless-assassin-120-se',
      name: 'Thermalright Peerless Assassin 120 SE',
      brand: 'Thermalright',
      price: 36,
      type: 'Dual-Tower Air',
      coolingType: 'air-heatsink',
      radiatorSize: 0,
      fanRpm: '1550 RPM',
      noiseLevel: '25 dBA',
      tdpRating: 245,
      rgb: false,
      tierLabel: '??? #1 Best Value Air Cooler',
      tags: ['??? Air Cooler', 'Dual-Tower Heatsink', '?? $36 Budget King', '245W TDP', 'Zero Maintenance'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Thermalright+Peerless+Assassin+120+SE',
        newegg: 'https://www.newegg.com/p/pl?d=Thermalright+Peerless+Assassin+120+SE',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Thermalright+Peerless+Assassin'
      }
    },
    {
      id: 'noctua-nh-d15-chromax',
      name: 'Noctua NH-D15 chromax.black (Ultra Quiet Air)',
      brand: 'Noctua',
      price: 119,
      type: 'Dual-Tower Air',
      coolingType: 'air-heatsink',
      radiatorSize: 0,
      fanRpm: '1500 RPM',
      noiseLevel: '19 dBA',
      tdpRating: 260,
      rgb: false,
      tierLabel: '?? Silent Studio Air Cooler',
      tags: ['??? Air Cooler', '?? Whisper Quiet 19dBA', 'Legendary Reliability', '260W TDP'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Noctua+NH-D15+chromax.black',
        newegg: 'https://www.newegg.com/p/pl?d=Noctua+NH-D15+chromax.black',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Noctua+NH-D15'
      }
    }
  ],

  motherboard: [
    {
      id: 'msi-mag-b650-tomahawk-wifi',
      name: 'MSI MAG B650 TOMAHAWK WIFI',
      brand: 'MSI',
      price: 199,
      socket: 'AM5',
      formFactor: 'ATX',
      memoryType: 'DDR5',
      maxMemory: '192 GB',
      pcieGen: 'PCIe 4.0 / 5.0 M.2',
      wifi: 'Wi-Fi 6E + 2.5GbE',
      m2Slots: 3,
      tierLabel: '? Best Value AM5 Board',
      tags: ['AM5 Socket', 'DDR5 RAM', '?? Wi-Fi 6E', '3x NVMe M.2 Slots', 'Heavy VRM Heatsinks'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=MSI+MAG+B650+TOMAHAWK+WIFI',
        newegg: 'https://www.newegg.com/p/pl?d=MSI+MAG+B650+TOMAHAWK+WIFI',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=MSI+MAG+B650+TOMAHAWK'
      }
    },
    {
      id: 'gigabyte-z790-aorus-elite-ax',
      name: 'GIGABYTE Z790 AORUS Elite AX',
      brand: 'GIGABYTE',
      price: 229,
      socket: 'LGA1700',
      formFactor: 'ATX',
      memoryType: 'DDR5',
      maxMemory: '192 GB',
      pcieGen: 'PCIe 5.0',
      wifi: 'Wi-Fi 6E + 2.5GbE',
      m2Slots: 4,
      tierLabel: '? Intel 13th/14th Gen Overclocking',
      tags: ['LGA1700 Socket', 'DDR5 RAM', 'PCIe 5.0', '?? Wi-Fi 6E', '4x M.2 NVMe'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=GIGABYTE+Z790+AORUS+Elite+AX',
        newegg: 'https://www.newegg.com/p/pl?d=GIGABYTE+Z790+AORUS+Elite+AX',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=GIGABYTE+Z790+AORUS+Elite'
      }
    },
    {
      id: 'msi-b550-gaming-plus',
      name: 'MSI B550 GAMING PLUS (AM4 DDR4)',
      brand: 'MSI',
      price: 119,
      socket: 'AM4',
      formFactor: 'ATX',
      memoryType: 'DDR4',
      maxMemory: '128 GB',
      pcieGen: 'PCIe 4.0',
      wifi: 'None (Ethernet 1GbE)',
      m2Slots: 2,
      tierLabel: '?? Budget AM4 Motherboard',
      tags: ['AM4 Socket', 'DDR4 RAM', 'PCIe 4.0', '2x NVMe M.2', 'Budget Choice'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=MSI+B550+GAMING+PLUS',
        newegg: 'https://www.newegg.com/p/pl?d=MSI+B550+GAMING+PLUS',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=MSI+B550+GAMING'
      }
    }
  ],

  ram: [
    {
      id: 'corsair-vengeance-rgb-ddr5-32gb-6000',
      name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5-6000 CL30',
      brand: 'Corsair',
      price: 119,
      type: 'DDR5',
      capacity: 32,
      modules: '2x16GB',
      speed: '6000 MHz',
      casLatency: 'CL30 (AMD Expo & Intel XMP)',
      rgb: true,
      tierLabel: '?? DDR5 6000MHz Sweet Spot',
      tags: ['DDR5', '? 6000 MHz', '?? CL30 Low Latency', '32GB (2x16GB)', '?? Dynamic RGB'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Corsair+Vengeance+RGB+32GB+DDR5+6000+CL30',
        newegg: 'https://www.newegg.com/p/pl?d=Corsair+Vengeance+RGB+32GB+DDR5+6000+CL30',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Corsair+Vengeance+DDR5+6000'
      }
    },
    {
      id: 'teamgroup-t-force-white-ddr5-32gb-6000',
      name: 'TEAMGROUP T-Force Delta RGB White 32GB DDR5-6000 CL30',
      brand: 'TEAMGROUP',
      price: 104,
      type: 'DDR5',
      capacity: 32,
      modules: '2x16GB',
      speed: '6000 MHz',
      casLatency: 'CL30',
      rgb: true,
      tierLabel: '?? Pure White Aesthetic DDR5',
      tags: ['DDR5', '? 6000 MHz', '?? CL30', '32GB (2x16GB)', '?? Pure White', '?? ARGB Diffuser'],
      color: 'white',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=TEAMGROUP+T-Force+Delta+RGB+White+32GB+DDR5+6000',
        newegg: 'https://www.newegg.com/p/pl?d=TEAMGROUP+T-Force+Delta+RGB+White+32GB+DDR5+6000',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=T-Force+Delta+White+32GB'
      }
    },
    {
      id: 'gskill-trident-z5-rgb-ddr5-64gb-6400',
      name: 'G.SKILL Trident Z5 RGB 64GB (2x32GB) DDR5-6400 CL32',
      brand: 'G.SKILL',
      price: 219,
      type: 'DDR5',
      capacity: 64,
      modules: '2x32GB',
      speed: '6400 MHz',
      casLatency: 'CL32',
      rgb: true,
      tierLabel: '?? 64GB Massive Workstation Kit',
      tags: ['DDR5', '? 6400 MHz Ultra', '64GB (2x32GB)', '4K Video Editing', '3D & AI Workstation'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=GSKILL+Trident+Z5+RGB+64GB+DDR5+6400',
        newegg: 'https://www.newegg.com/p/pl?d=GSKILL+Trident+Z5+RGB+64GB+DDR5+6400',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Trident+Z5+64GB'
      }
    },
    {
      id: 'silicon-power-ddr4-16gb-3200',
      name: 'Silicon Power Value Gaming 16GB (2x8GB) DDR4-3200',
      brand: 'Silicon Power',
      price: 29,
      type: 'DDR4',
      capacity: 16,
      modules: '2x8GB',
      speed: '3200 MHz',
      casLatency: 'CL16',
      rgb: false,
      tierLabel: '?? Sub-$30 DDR4 Budget Pair',
      tags: ['DDR4', '? 3200 MHz', '?? CL16', '16GB (2x8GB)', '?? $29 Budget Pair'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Silicon+Power+16GB+DDR4+3200',
        newegg: 'https://www.newegg.com/p/pl?d=Silicon+Power+16GB+DDR4+3200',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Silicon+Power+DDR4'
      }
    }
  ],

  gpu: [
    {
      id: 'rtx-4090',
      name: 'NVIDIA GeForce RTX 4090 24GB',
      brand: 'NVIDIA',
      price: 1799,
      vram: 24,
      vramType: 'GDDR6X',
      tdp: 450,
      recommendedPsu: 850,
      lengthMm: 336,
      rasterScore: 100,
      rayTracingScore: 100,
      dlssSupport: 'DLSS 3.5 (Frame Gen & Ray Reconstruction)',
      aiScore: 100,
      tierLabel: '?? 4K Ultra Max God Tier',
      tags: ['?? 4K Ultra Max (120+ FPS)', '24GB VRAM', 'Path Tracing Monster', 'DLSS 3.5 Frame Gen', 'Local AI Powerhouse'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=GeForce+RTX+4090+24GB',
        newegg: 'https://www.newegg.com/p/pl?d=GeForce+RTX+4090+24GB',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=RTX+4090'
      }
    },
    {
      id: 'rtx-4080-super',
      name: 'NVIDIA GeForce RTX 4080 Super 16GB',
      brand: 'NVIDIA',
      price: 989,
      vram: 16,
      vramType: 'GDDR6X',
      tdp: 320,
      recommendedPsu: 750,
      lengthMm: 310,
      rasterScore: 82,
      rayTracingScore: 84,
      dlssSupport: 'DLSS 3.5 (Frame Gen & Ray Reconstruction)',
      aiScore: 82,
      tierLabel: '?? 4K High Refresh & 1440p 240Hz',
      tags: ['?? 4K High Refresh', '16GB GDDR6X', 'DLSS 3.5', 'Ray Tracing Master', '320W TDP'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=GeForce+RTX+4080+Super+16GB',
        newegg: 'https://www.newegg.com/p/pl?d=GeForce+RTX+4080+Super+16GB',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=RTX+4080+Super'
      }
    },
    {
      id: 'rtx-4070-ti-super',
      name: 'NVIDIA GeForce RTX 4070 Ti Super 16GB',
      brand: 'NVIDIA',
      price: 789,
      vram: 16,
      vramType: 'GDDR6X',
      tdp: 285,
      recommendedPsu: 700,
      lengthMm: 300,
      rasterScore: 71,
      rayTracingScore: 73,
      dlssSupport: 'DLSS 3.5 (Frame Gen)',
      aiScore: 72,
      tierLabel: '? 1440p Max & 4K Ready (16GB)',
      tags: ['?? 1440p Max (160+ FPS)', '16GB VRAM (Future-Proof)', 'DLSS 3.5', '285W TDP'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=GeForce+RTX+4070+Ti+Super+16GB',
        newegg: 'https://www.newegg.com/p/pl?d=GeForce+RTX+4070+Ti+Super+16GB',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=RTX+4070+Ti+Super'
      }
    },
    {
      id: 'rtx-4070-super',
      name: 'NVIDIA GeForce RTX 4070 Super 12GB',
      brand: 'NVIDIA',
      price: 589,
      vram: 12,
      vramType: 'GDDR6X',
      tdp: 220,
      recommendedPsu: 650,
      lengthMm: 267,
      rasterScore: 64,
      rayTracingScore: 65,
      dlssSupport: 'DLSS 3.5 (Frame Gen)',
      aiScore: 63,
      tierLabel: '?? The 1440p Champion Sweet Spot',
      tags: ['?? 1440p High Refresh', '12GB GDDR6X', 'DLSS 3.5 Frame Gen', '? Best Price/Performance', '220W Low Draw'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=GeForce+RTX+4070+Super+12GB',
        newegg: 'https://www.newegg.com/p/pl?d=GeForce+RTX+4070+Super+12GB',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=RTX+4070+Super'
      }
    },
    {
      id: 'rx-7800-xt',
      name: 'AMD Radeon RX 7800 XT 16GB',
      brand: 'AMD',
      price: 489,
      vram: 16,
      vramType: 'GDDR6',
      tdp: 263,
      recommendedPsu: 700,
      lengthMm: 279,
      rasterScore: 63,
      rayTracingScore: 48,
      dlssSupport: 'FSR 3.1 (Fluid Motion Frames)',
      aiScore: 50,
      tierLabel: '?? 16GB VRAM Value King',
      tags: ['?? 1440p High Refresh', '16GB VRAM Under $500', 'AMD FSR 3.1', 'Raw Raster Power'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Radeon+RX+7800+XT+16GB',
        newegg: 'https://www.newegg.com/p/pl?d=Radeon+RX+7800+XT+16GB',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=RX+7800+XT'
      }
    },
    {
      id: 'rtx-4060',
      name: 'NVIDIA GeForce RTX 4060 8GB',
      brand: 'NVIDIA',
      price: 299,
      vram: 8,
      vramType: 'GDDR6',
      tdp: 115,
      recommendedPsu: 500,
      lengthMm: 242,
      rasterScore: 42,
      rayTracingScore: 41,
      dlssSupport: 'DLSS 3.5 (Frame Gen)',
      aiScore: 38,
      tierLabel: '?? 1080p High FPS / Entry 1440p',
      tags: ['?? 1080p Ultra (90+ FPS)', 'Sub-$300 Price', 'DLSS 3.5 Frame Gen', 'Tiny 115W Power Draw'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=GeForce+RTX+4060+8GB',
        newegg: 'https://www.newegg.com/p/pl?d=GeForce+RTX+4060+8GB',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=RTX+4060'
      }
    },
    {
      id: 'rx-6700-xt',
      name: 'AMD Radeon RX 6700 XT 12GB',
      brand: 'AMD',
      price: 279,
      vram: 12,
      vramType: 'GDDR6',
      tdp: 230,
      recommendedPsu: 600,
      lengthMm: 267,
      rasterScore: 46,
      rayTracingScore: 28,
      dlssSupport: 'FSR 3.1',
      aiScore: 32,
      tierLabel: '??? Cheapest 1440p Capable (12GB)',
      tags: ['?? Cheapest 1440p GPU', '12GB VRAM Sub-$280', 'FSR 3.1', 'Great Budget FPS'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Radeon+RX+6700+XT+12GB',
        newegg: 'https://www.newegg.com/p/pl?d=Radeon+RX+6700+XT+12GB',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=RX+6700+XT'
      }
    }
  ],

  storage: [
    {
      id: 'samsung-990-pro-2tb',
      name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD',
      brand: 'Samsung',
      price: 169,
      capacity: '2 TB',
      interface: 'PCIe Gen 4.0 x4',
      storageType: 'nvme-gen4',
      readSpeed: '7,450 MB/s',
      writeSpeed: '6,900 MB/s',
      dramCache: true,
      performanceScore: 100,
      tierLabel: '? 7,450 MB/s Ultra Fast NVMe',
      tags: ['? NVMe PCIe 4.0', '?? 7,450 MB/s Read', '?? Dedicated DRAM Cache', '2TB Huge Space', 'Instant Game Loads'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Samsung+990+PRO+2TB',
        newegg: 'https://www.newegg.com/p/pl?d=Samsung+990+PRO+2TB',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Samsung+990+PRO'
      }
    },
    {
      id: 'wd-black-sn850x-2tb',
      name: 'WD_BLACK SN850X 2TB NVMe Gaming SSD',
      brand: 'Western Digital',
      price: 154,
      capacity: '2 TB',
      interface: 'PCIe Gen 4.0 x4',
      storageType: 'nvme-gen4',
      readSpeed: '7,300 MB/s',
      writeSpeed: '6,600 MB/s',
      dramCache: true,
      performanceScore: 98,
      tierLabel: '?? Dedicated Gaming NVMe SSD',
      tags: ['? NVMe PCIe 4.0', '?? Game Mode 2.0', '7,300 MB/s Read', '?? DRAM Cache', '2TB Capacity'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=WD+BLACK+SN850X+2TB',
        newegg: 'https://www.newegg.com/p/pl?d=WD+BLACK+SN850X+2TB',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=WD+SN850X+2TB'
      }
    },
    {
      id: 'crucial-p3-plus-1tb',
      name: 'Crucial P3 Plus 1TB PCIe 4.0 M.2 NVMe SSD',
      brand: 'Crucial',
      price: 68,
      capacity: '1 TB',
      interface: 'PCIe Gen 4.0 x4',
      storageType: 'nvme-gen4',
      readSpeed: '5,000 MB/s',
      writeSpeed: '3,600 MB/s',
      dramCache: false,
      performanceScore: 78,
      tierLabel: '? Best Value 1TB NVMe',
      tags: ['? NVMe PCIe 4.0', '5,000 MB/s Speed', '1TB Space', 'Sub-$70 Sweet Spot'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Crucial+P3+Plus+1TB',
        newegg: 'https://www.newegg.com/p/pl?d=Crucial+P3+Plus+1TB',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Crucial+P3+Plus'
      }
    },
    {
      id: 'kingston-nv2-1tb',
      name: 'Kingston NV2 1TB PCIe 4.0 NVMe SSD',
      brand: 'Kingston',
      price: 54,
      capacity: '1 TB',
      interface: 'PCIe Gen 4.0 x4',
      storageType: 'nvme-gen4',
      readSpeed: '3,500 MB/s',
      writeSpeed: '2,100 MB/s',
      dramCache: false,
      performanceScore: 65,
      tierLabel: '?? $54 Ultra Budget NVMe',
      tags: ['? NVMe PCIe 4.0', '3,500 MB/s Speed', '1TB Space', '?? $54 Budget King'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Kingston+NV2+1TB',
        newegg: 'https://www.newegg.com/p/pl?d=Kingston+NV2+1TB',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Kingston+NV2+1TB'
      }
    }
  ],

  psu: [
    {
      id: 'corsair-rm1000x-shift',
      name: 'Corsair RM1000x Shift 1000W 80+ Gold (ATX 3.0)',
      brand: 'Corsair',
      price: 199,
      wattage: 1000,
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      pcie5Support: true,
      fanMode: 'Zero RPM Silent Fan',
      tierLabel: '? 1000W Heavy Duty ATX 3.0',
      tags: ['? 1000W Massive Power', '80+ Gold Rated', '?? ATX 3.0 & PCIe 5.0 (12VHPWR)', 'Fully Modular', 'Side Interface'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Corsair+RM1000x+Shift+1000W',
        newegg: 'https://www.newegg.com/p/pl?d=Corsair+RM1000x+Shift+1000W',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Corsair+RM1000x'
      }
    },
    {
      id: 'msi-mag-a750gl-pcie5',
      name: 'MSI MAG A750GL 750W 80+ Gold PCIe 5.0 Ready',
      brand: 'MSI',
      price: 89,
      wattage: 750,
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      pcie5Support: true,
      fanMode: 'Quiet 120mm FDB Fan',
      tierLabel: '? 750W 80+ Gold Sweet Spot',
      tags: ['? 750W High Efficiency', '80+ Gold Certified', '?? ATX 3.0 & 12VHPWR', 'Fully Modular', 'Sub-$90 Value'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=MSI+MAG+A750GL+750W',
        newegg: 'https://www.newegg.com/p/pl?d=MSI+MAG+A750GL+750W',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=MSI+MAG+A750GL'
      }
    },
    {
      id: 'thermaltake-smart-600w',
      name: 'Thermaltake Smart 600W 80+ White',
      brand: 'Thermaltake',
      price: 44,
      wattage: 600,
      efficiency: '80+ White',
      modular: 'Non-Modular',
      pcie5Support: false,
      fanMode: 'Standard Fan',
      tierLabel: '?? $44 Budget Power Supply',
      tags: ['? 600W Power', '?? $44 Ultra Budget', 'Budget Gaming Rig Compatible'],
      color: 'black',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Thermaltake+Smart+600W',
        newegg: 'https://www.newegg.com/p/pl?d=Thermaltake+Smart+600W',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Thermaltake+Smart+600W'
      }
    }
  ],

  case: [
    {
      id: 'nzxt-h9-flow',
      name: 'NZXT H9 Flow Dual-Chamber Panoramic Glass (White)',
      brand: 'NZXT',
      price: 159,
      formFactor: 'ATX Mid-Tower',
      maxGpuLength: 435,
      maxCoolerHeight: 165,
      maxRadiator: 360,
      frontPanelUsbC: true,
      sidePanel: 'Panoramic Seamless Glass',
      color: 'white',
      tierLabel: '?? Dual-Chamber Showpiece',
      tags: ['?? Pure Snow White', 'Panoramic Dual-Chamber', 'Seamless Corner Glass', '360mm Rad Support', 'Massive Airflow'],
      image: 'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=NZXT+H9+Flow+White',
        newegg: 'https://www.newegg.com/p/pl?d=NZXT+H9+Flow+White',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=NZXT+H9+Flow'
      }
    },
    {
      id: 'lian-li-o11-dynamic-evo',
      name: 'Lian Li O11 Dynamic EVO (Dual-Chamber Black Glass)',
      brand: 'Lian Li',
      price: 159,
      formFactor: 'ATX Mid-Tower',
      maxGpuLength: 422,
      maxCoolerHeight: 167,
      maxRadiator: 360,
      frontPanelUsbC: true,
      sidePanel: 'Tempered Glass',
      color: 'black',
      tierLabel: '?? Enthusiast Standard Chassis',
      tags: ['Tempered Glass', 'Dual-Chamber Modular', 'Vertical GPU Ready', 'Triple 360mm Rad Support'],
      image: 'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Lian+Li+O11+Dynamic+EVO',
        newegg: 'https://www.newegg.com/p/pl?d=Lian+Li+O11+Dynamic+EVO',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Lian+Li+O11+Dynamic'
      }
    },
    {
      id: 'corsair-4000d-airflow',
      name: 'Corsair 4000D Airflow Tempered Glass Mid-Tower',
      brand: 'Corsair',
      price: 89,
      formFactor: 'ATX Mid-Tower',
      maxGpuLength: 360,
      maxCoolerHeight: 170,
      maxRadiator: 360,
      frontPanelUsbC: true,
      sidePanel: 'Tempered Glass',
      color: 'black',
      tierLabel: '? High Airflow Best Seller',
      tags: ['High Airflow Mesh Front', 'RapidRoute Cable Management', 'Tempered Glass', 'Sub-$90 Champion'],
      image: 'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Corsair+4000D+Airflow',
        newegg: 'https://www.newegg.com/p/pl?d=Corsair+4000D+Airflow',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Corsair+4000D+Airflow'
      }
    },
    {
      id: 'montech-air-903-max',
      name: 'Montech AIR 903 MAX (4x 140mm ARGB Fans Included)',
      brand: 'Montech',
      price: 74,
      formFactor: 'ATX Mid-Tower',
      maxGpuLength: 400,
      maxCoolerHeight: 180,
      maxRadiator: 360,
      frontPanelUsbC: true,
      sidePanel: 'Tempered Glass',
      color: 'black',
      tierLabel: '?? $74 with 4x Pre-Installed Fans',
      tags: ['?? Best Value Case', '4x 140mm ARGB Fans Included', 'Massive Mesh Airflow', '400mm GPU Clearance'],
      image: 'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Montech+AIR+903+MAX',
        newegg: 'https://www.newegg.com/p/pl?d=Montech+AIR+903+MAX',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Montech+AIR+903'
      }
    }
  ]
};
