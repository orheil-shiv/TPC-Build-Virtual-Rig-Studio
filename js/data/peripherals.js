// TPC BUILD - Peripherals Database

export const PERIPHERAL_CATEGORIES = [
  { id: 'monitor', name: 'Monitors', icon: 'tv', desc: 'Display for esports or 4K visual fidelity' },
  { id: 'keyboard', name: 'Keyboards', icon: 'keyboard', desc: 'Mechanical, rapid-trigger or membrane switches' },
  { id: 'mouse', name: 'Gaming Mice', icon: 'mouse', desc: 'Ultralight esports or ergonomic precision' },
  { id: 'headset', name: 'Headsets & Audio', icon: 'headphones', desc: 'Spatial directional sound & noise-canceling mic' }
];

export const PERIPHERALS = {
  monitor: [
    {
      id: 'asus-rog-swift-oled-pg27aqdm',
      name: 'ASUS ROG Swift OLED PG27AQDM 27" 1440p 240Hz 0.03ms',
      brand: 'ASUS ROG',
      price: 749,
      tier: 'enthusiast',
      resolution: '1440p QHD',
      refreshRate: '240 Hz',
      panelType: 'OLED (Infinite Contrast)',
      responseTime: '0.03 ms',
      purpose: ['gaming', 'esports'],
      recommendedGpuTier: 'high-end',
      features: ['240Hz Ultra High Refresh', 'Infinite Contrast 0.03ms OLED', 'G-Sync Compatible', 'Custom Heatsink'],
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=ASUS+ROG+Swift+OLED+PG27AQDM',
        newegg: 'https://www.newegg.com/p/pl?d=ASUS+ROG+Swift+OLED+PG27AQDM',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=ASUS+PG27AQDM'
      }
    },
    {
      id: 'lg-27gr93u-b-4k-144hz',
      name: 'LG UltraGear 27GR93U-B 27" 4K UHD 144Hz 1ms IPS',
      brand: 'LG',
      price: 499,
      tier: 'high-end',
      resolution: '4K UHD (3840x2160)',
      refreshRate: '144 Hz',
      panelType: 'Fast IPS (95% DCI-P3)',
      responseTime: '1 ms',
      purpose: ['gaming', 'work', 'all-rounder'],
      recommendedGpuTier: 'high-end',
      features: ['Crisp 4K 3840x2160', '144Hz Refresh', 'VESA DisplayHDR 400', 'HDMI 2.1 VRR'],
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=LG+UltraGear+27GR93U-B',
        newegg: 'https://www.newegg.com/p/pl?d=LG+UltraGear+27GR93U-B',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=LG+27GR93U'
      }
    },
    {
      id: 'dell-g2724d-1440p-165hz',
      name: 'Dell G2724D 27" 1440p Fast IPS 165Hz (Best Value 1440p)',
      brand: 'Dell',
      price: 199,
      tier: 'midrange',
      resolution: '1440p QHD',
      refreshRate: '165 Hz',
      panelType: 'Fast IPS',
      responseTime: '1 ms',
      purpose: ['gaming', 'work', 'all-rounder'],
      recommendedGpuTier: 'midrange',
      features: ['Sweet Spot 1440p', '165Hz Fast IPS', 'G-Sync & FreeSync Premium', 'Ergonomic Stand'],
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Dell+G2724D+1440p',
        newegg: 'https://www.newegg.com/p/pl?d=Dell+G2724D',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Dell+G2724D'
      }
    },
    {
      id: 'aoc-24g2sp-1080p-165hz',
      name: 'AOC 24G2SP 24" 1080p FHD 165Hz IPS Gaming Monitor',
      brand: 'AOC',
      price: 119,
      tier: 'budget',
      resolution: '1080p FHD',
      refreshRate: '165 Hz',
      panelType: 'IPS',
      responseTime: '1 ms MPRT',
      purpose: ['gaming', 'esports', 'all-rounder'],
      recommendedGpuTier: 'budget',
      features: ['High FPS 165Hz', 'Vibrant IPS Colors', 'Height Adjustable', 'Frameless Design'],
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=AOC+24G2SP+165Hz',
        newegg: 'https://www.newegg.com/p/pl?d=AOC+24G2SP',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=AOC+24G2SP'
      }
    }
  ],

  keyboard: [
    {
      id: 'wooting-60he-plus',
      name: 'Wooting 60HE+ Hall Effect Analog Rapid Trigger',
      brand: 'Wooting',
      price: 179,
      tier: 'enthusiast',
      switchType: 'mechanical-linear',
      switchCategory: 'mechanical',
      soundProfile: 'Smooth Linear (Custom 0.1mm Rapid Trigger)',
      connectivity: 'Wired (Ultra Low Latency)',
      size: '60% Compact',
      rgb: true,
      purpose: ['esports', 'gaming'],
      features: ['Analog Hall Effect Magnetic Switches', 'Rapid Trigger 0.1mm Actuation', 'Zero Input Lag', 'Web-Based Configurator'],
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Wooting+60HE',
        newegg: 'https://www.newegg.com/p/pl?d=Wooting+60HE',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Wooting+60HE'
      }
    },
    {
      id: 'keychron-q1-pro-wireless',
      name: 'Keychron Q1 Pro Custom Mechanical (CNC Aluminum)',
      brand: 'Keychron',
      price: 199,
      tier: 'high-end',
      switchType: 'mechanical-tactile',
      switchCategory: 'mechanical',
      soundProfile: 'Deep Thocky Tactile (Banana Switches)',
      connectivity: 'Wireless Bluetooth / Wired Type-C',
      size: '75% Layout with Knob',
      rgb: true,
      purpose: ['work', 'all-rounder', 'gaming'],
      features: ['Full CNC Machined Aluminum Body', 'Double-Gasket Mount Design', 'Hot-Swappable Switches', 'Programmable Rotary Knob'],
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Keychron+Q1+Pro',
        newegg: 'https://www.newegg.com/p/pl?d=Keychron+Q1+Pro',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Keychron+Q1'
      }
    },
    {
      id: 'epomaker-th80-pro-v2',
      name: 'EPOMAKER TH80 Pro V2 Gasket-Mount RGB Hot-Swap',
      brand: 'EPOMAKER',
      price: 89,
      tier: 'midrange',
      switchType: 'mechanical-linear',
      switchCategory: 'mechanical',
      soundProfile: 'Creamy Factory Lubed Linear (Flamingo)',
      connectivity: 'Tri-Mode (2.4GHz / BT / Wired)',
      size: '75% Compact',
      rgb: true,
      purpose: ['gaming', 'work', 'all-rounder'],
      features: ['Tri-Mode Wireless & Wired', 'Factory Lubed Mechanical Switches', 'Customizable Mini LCD Screen', 'South-Facing RGB'],
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=EPOMAKER+TH80+Pro',
        newegg: 'https://www.newegg.com/p/pl?d=EPOMAKER+TH80+Pro',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=EPOMAKER+Keyboard'
      }
    },
    {
      id: 'redragon-k552-kumara',
      name: 'Redragon K552 Mechanical RGB (Red Linear Switches)',
      brand: 'Redragon',
      price: 36,
      tier: 'budget',
      switchType: 'mechanical-linear',
      switchCategory: 'mechanical',
      soundProfile: 'Clicky / Tactile Budget Mechanical',
      connectivity: 'Wired USB',
      size: 'Tenkeyless (TKL)',
      rgb: true,
      purpose: ['gaming', 'all-rounder'],
      features: ['True Mechanical Switches', 'Rainbow RGB Backlighting', 'Compact Tenkeyless Form', 'Durable Metal-ABS Construction'],
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Redragon+K552+RGB',
        newegg: 'https://www.newegg.com/p/pl?d=Redragon+K552+RGB',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Redragon+K552'
      }
    },
    {
      id: 'logitech-mx-keys-s',
      name: 'Logitech MX Keys S Quiet Low-Profile Membrane',
      brand: 'Logitech',
      price: 109,
      tier: 'midrange',
      switchType: 'membrane',
      switchCategory: 'membrane',
      soundProfile: 'Whisper Quiet Spherically Dished Keys',
      connectivity: 'Wireless Logi Bolt / Bluetooth',
      size: 'Full Size 100% with Numpad',
      rgb: false,
      purpose: ['work', 'all-rounder'],
      features: ['Silent Low-Profile Scissor Keys', 'Smart Backlighting with Hand Proximity', 'Multi-Device Easy-Switch (3 PCs)', 'USB-C Rechargeable'],
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Logitech+MX+Keys+S',
        newegg: 'https://www.newegg.com/p/pl?d=Logitech+MX+Keys+S',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Logitech+MX+Keys'
      }
    },
    {
      id: 'steelseries-apex-3-tkl',
      name: 'SteelSeries Apex 3 TKL Quiet Gaming Membrane (RGB)',
      brand: 'SteelSeries',
      price: 44,
      tier: 'budget',
      switchType: 'membrane',
      switchCategory: 'membrane',
      soundProfile: 'Silent Whisper Membrane with Tactile Feel',
      connectivity: 'Wired USB (IP32 Water Resistant)',
      size: 'Tenkeyless (TKL)',
      rgb: true,
      purpose: ['gaming', 'all-rounder', 'work'],
      features: ['Whisper-Quiet Membrane Gaming Switches', 'IP32 Spill Water Resistance', '8-Zone RGB Lighting', 'Dedicated Multimedia Roller'],
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=SteelSeries+Apex+3+TKL',
        newegg: 'https://www.newegg.com/p/pl?d=SteelSeries+Apex+3+TKL',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=SteelSeries+Apex+3'
      }
    }
  ],

  mouse: [
    {
      id: 'logitech-g-pro-x-superlight-2',
      name: 'Logitech G PRO X SUPERLIGHT 2 Wireless (60g)',
      brand: 'Logitech G',
      price: 159,
      tier: 'enthusiast',
      weight: '60 grams (Ultralight)',
      sensor: 'HERO 2 32,000 DPI (4000Hz Polling)',
      gripType: 'Symmetrical / Claw & Fingertip',
      connectivity: 'LIGHTSPEED Wireless',
      purpose: ['esports', 'gaming'],
      features: ['60g Featherweight Esports Standard', 'LIGHTFORCE Hybrid Optical-Mechanical Switches', '95-Hour Continuous Battery', 'Zero-Additive PTFE Feet'],
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Logitech+G+PRO+X+SUPERLIGHT+2',
        newegg: 'https://www.newegg.com/p/pl?d=Logitech+G+PRO+X+SUPERLIGHT+2',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Logitech+SUPERLIGHT+2'
      }
    },
    {
      id: 'razer-deathadder-v3-pro',
      name: 'Razer DeathAdder V3 Pro Wireless Ergonomic (63g)',
      brand: 'Razer',
      price: 139,
      tier: 'high-end',
      weight: '63 grams',
      sensor: 'Focus Pro 30K Optical',
      gripType: 'Ergonomic Palm / Claw',
      connectivity: 'HyperSpeed Wireless',
      purpose: ['gaming', 'esports', 'all-rounder'],
      features: ['Legendary Ergonomic Palm Shape', 'Gen-3 Optical Mouse Switches (90M clicks)', '90-Hour Battery Life', 'Speedflex USB-C Charging'],
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Razer+DeathAdder+V3+Pro',
        newegg: 'https://www.newegg.com/p/pl?d=Razer+DeathAdder+V3+Pro',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Razer+DeathAdder+V3'
      }
    },
    {
      id: 'logitech-mx-master-3s',
      name: 'Logitech MX Master 3S Ergonomic Productivity Mouse',
      brand: 'Logitech',
      price: 99,
      tier: 'midrange',
      weight: '141 grams (Ergonomic Work)',
      sensor: 'Darkfield 8000 DPI (Works on Glass)',
      gripType: 'Full Ergonomic Palm + Thumb Rest',
      connectivity: 'Bluetooth / Logi Bolt Wireless',
      purpose: ['work', 'all-rounder'],
      features: ['MagSpeed Electromagnetic Scroll (1,000 lines/sec)', 'Quiet Clicks (90% Noise Reduction)', 'Thumb Gesture & Horizontal Wheel', 'Multi-Computer Flow'],
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Logitech+MX+Master+3S',
        newegg: 'https://www.newegg.com/p/pl?d=Logitech+MX+Master+3S',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=MX+Master+3S'
      }
    },
    {
      id: 'razer-cobra-wired-58g',
      name: 'Razer Cobra Lightweight Wired RGB Gaming Mouse (58g)',
      brand: 'Razer',
      price: 39,
      tier: 'budget',
      weight: '58 grams',
      sensor: '8,500 DPI Optical',
      gripType: 'Claw / Fingertip',
      connectivity: 'Speedflex Cable (Wired)',
      purpose: ['gaming', 'esports', 'all-rounder'],
      features: ['58g Lightweight Design', 'Chroma RGB Underglow Lighting', 'Gen-3 Optical Switches', '100% PTFE Mouse Feet'],
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=Razer+Cobra+Wired',
        newegg: 'https://www.newegg.com/p/pl?d=Razer+Cobra+Wired',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Razer+Cobra'
      }
    }
  ],

  headset: [
    {
      id: 'steelseries-arctis-nova-pro-wireless',
      name: 'SteelSeries Arctis Nova Pro Wireless ANC Headset',
      brand: 'SteelSeries',
      price: 349,
      tier: 'enthusiast',
      type: 'Wireless with Active Noise Cancelling',
      drivers: 'High-Res 40mm Neodymium',
      mic: 'AI-Powered ClearCast Retractable',
      connectivity: 'Dual Wireless 2.4GHz + Bluetooth',
      purpose: ['gaming', 'work', 'all-rounder'],
      features: ['Active Noise Cancellation (ANC)', 'Hot-Swappable Dual Battery System', 'Multi-System Base Station OLED', 'Sonar Spatial Audio EQ'],
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=SteelSeries+Arctis+Nova+Pro+Wireless',
        newegg: 'https://www.newegg.com/p/pl?d=SteelSeries+Arctis+Nova+Pro+Wireless',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=Arctis+Nova+Pro'
      }
    },
    {
      id: 'hyperx-cloud-iii-wireless',
      name: 'HyperX Cloud III Wireless 120-Hour Battery Headset',
      brand: 'HyperX',
      price: 149,
      tier: 'midrange',
      type: 'Over-Ear Wireless Gaming Headset',
      drivers: 'Angled 53mm Drivers (DTS Spatial Audio)',
      mic: 'Detachable 10mm Noise-Cancelling Mic',
      connectivity: '2.4GHz Low Latency Wireless (120hr battery)',
      purpose: ['gaming', 'esports', 'all-rounder'],
      features: ['Up to 120 Hours Battery Life', 'Signature HyperX Memory Foam Comfort', 'DTS Headphone:X Spatial Audio', 'Crystal Clear 10mm Mic'],
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=HyperX+Cloud+III+Wireless',
        newegg: 'https://www.newegg.com/p/pl?d=HyperX+Cloud+III+Wireless',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=HyperX+Cloud+III'
      }
    },
    {
      id: 'hyperx-cloud-stinger-2',
      name: 'HyperX Cloud Stinger 2 Lightweight Wired Headset',
      brand: 'HyperX',
      price: 39,
      tier: 'budget',
      type: 'Lightweight Over-Ear Wired Headset',
      drivers: '50mm Directional Drivers',
      mic: 'Swivel-to-Mute Microphone',
      connectivity: '3.5mm Audio Jack',
      purpose: ['gaming', 'all-rounder'],
      features: ['Lightweight Comfortable 275g Frame', '50mm Directional Drivers', 'Swivel-to-Mute Noise Cancelling Mic', 'On-Ear Audio Controls'],
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
      links: {
        amazon: 'https://www.amazon.com/s?k=HyperX+Cloud+Stinger+2',
        newegg: 'https://www.newegg.com/p/pl?d=HyperX+Cloud+Stinger+2',
        bestbuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=HyperX+Cloud+Stinger'
      }
    }
  ]
};
