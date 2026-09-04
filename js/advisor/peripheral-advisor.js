// TPC BUILD - Customer Service Peripheral Advisor & Aesthetic Matching Engine
// Curates monitors, keyboards, mice, and audio within budget, matching customer aesthetics (Snow White / Stealth Black / RGB)

import { PERIPHERALS } from '../data/peripherals.js';
import { COMPONENTS } from '../data/components.js';

export const ADVISOR_QUESTIONS = [
  {
    id: 'primaryUse',
    title: '1. What is the primary purpose for your new rig?',
    description: 'We will tailor your display refresh rate, mouse weight, and keyboard response.',
    options: [
      { value: 'esports', label: '? Competitive Esports FPS', sub: 'High refresh rate, 1ms fast panel, ultra-light flick mouse' },
      { value: 'gaming', label: '?? Cinematic AAA Gaming', sub: 'OLED / 4K visual immersion, spatial surround audio, deep contrast' },
      { value: 'work', label: '?? Creative Workstation & Studio', sub: 'Color-accurate IPS display, quiet typing, ergonomic hand comfort' },
      { value: 'all-rounder', label: '?? All-Rounder Hybrid', sub: 'Balanced setup for day-time productivity and evening gaming' }
    ]
  },
  {
    id: 'aestheticStyle',
    title: '2. What aesthetic vibe & color palette do you want?',
    description: 'We will coordinate matching colors for your PC parts, case, and desk peripherals.',
    options: [
      { value: 'all-white', label: '?? Pure Snow White Aesthetic', sub: 'White case, white AIO cooler, white RAM & matching white peripherals' },
      { value: 'stealth-black', label: '?? Stealth Blackout Minimalist', sub: 'Clean matte black hardware, zero RGB distractions, professional look' },
      { value: 'rgb-cyber', label: '?? Cyberpunk RGB Overdrive', sub: 'Vibrant ARGB synchronized lighting across rig, keyboard, and mouse' }
    ]
  },
  {
    id: 'keyboardPreference',
    title: '3. What keyboard typing feel do you prefer?',
    description: 'Choose your desired key actuation, switch mechanics, and sound profile.',
    options: [
      { value: 'mechanical', label: '?? Mechanical / Rapid-Trigger', sub: 'Crisp individual switches, tactile feel, rapid actuation (Linear / Tactile)' },
      { value: 'membrane', label: '?? Quiet Membrane / Low-Profile', sub: 'Whisper-quiet typing, soft scissor keys, zero distraction' }
    ]
  },
  {
    id: 'mousePreference',
    title: '4. What mouse grip and weight fits your hand?',
    description: 'Select between agile featherweight esports mice and ergonomic contour designs.',
    options: [
      { value: 'ultralight', label: '?? Featherweight Ultralight (<65g)', sub: 'Flick shots, fast crosshair repositioning, minimal wrist fatigue' },
      { value: 'ergonomic', label: '??? Ergonomic Palm & Productivity', sub: 'Full hand palm support, thumb wheels, thumb rests, all-day comfort' }
    ]
  },
  {
    id: 'audioPreference',
    title: '5. What audio setup fits your gaming space?',
    description: 'Pinpoint directional footsteps or enjoy immersive soundstages.',
    options: [
      { value: 'spatial-headset', label: '?? Spatial Surround Headset with Mic', sub: 'Noise-canceling voice mic and directional positional audio' },
      { value: 'comfortable-light', label: '?? Lightweight Long-Session Comfort', sub: 'Soft breathable ear cushions for marathon gaming or remote work' }
    ]
  }
];

export function curatePeripherals(answers, budgetLimit = 400, pcBuild = {}) {
  const {
    primaryUse = 'gaming',
    aestheticStyle = 'rgb-cyber',
    keyboardPreference = 'mechanical',
    mousePreference = 'ultralight',
    audioPreference = 'spatial-headset'
  } = answers;

  const gpu = (COMPONENTS.gpu || []).find(p => p.id === pcBuild.gpu);
  let gpuTier = 'midrange';
  if (gpu) {
    if (gpu.rasterScore >= 80) gpuTier = 'high-end';
    else if (gpu.rasterScore <= 45) gpuTier = 'budget';
  }

  // 1. Filter Monitors
  let monitorPool = [...PERIPHERALS.monitor];
  monitorPool.sort((a, b) => {
    if (budgetLimit >= 800 && gpuTier === 'high-end') {
      return b.price - a.price;
    }
    const idealMonitorPrice = budgetLimit * 0.50;
    return Math.abs(a.price - idealMonitorPrice) - Math.abs(b.price - idealMonitorPrice);
  });
  let selectedMonitor = monitorPool[0];

  // 2. Filter Keyboards (consider switch type + aesthetic)
  let keyboardPool = PERIPHERALS.keyboard.filter(k => {
    if (keyboardPreference === 'membrane') {
      return k.switchCategory === 'membrane';
    }
    return k.switchCategory === 'mechanical';
  });
  if (keyboardPool.length === 0) keyboardPool = PERIPHERALS.keyboard;

  const idealKeyboardPrice = budgetLimit * 0.22;
  keyboardPool.sort((a, b) => Math.abs(a.price - idealKeyboardPrice) - Math.abs(b.price - idealKeyboardPrice));
  let selectedKeyboard = keyboardPool[0];

  // 3. Filter Mice
  let mousePool = PERIPHERALS.mouse.filter(m => {
    if (mousePreference === 'ultralight') {
      return m.weight.includes('60') || m.weight.includes('63') || m.weight.includes('58');
    }
    return m.purpose.includes('work') || m.gripType.includes('Ergonomic');
  });
  if (mousePool.length === 0) mousePool = PERIPHERALS.mouse;

  const idealMousePrice = budgetLimit * 0.15;
  mousePool.sort((a, b) => Math.abs(a.price - idealMousePrice) - Math.abs(b.price - idealMousePrice));
  let selectedMouse = mousePool[0];

  // 4. Filter Headsets
  let headsetPool = [...PERIPHERALS.headset];
  const idealHeadsetPrice = budgetLimit * 0.13;
  headsetPool.sort((a, b) => Math.abs(a.price - idealHeadsetPrice) - Math.abs(b.price - idealHeadsetPrice));
  let selectedHeadset = headsetPool[0];

  let totalBundlePrice = selectedMonitor.price + selectedKeyboard.price + selectedMouse.price + selectedHeadset.price;

  // If over budget, downscale items gracefully to fit within budget!
  if (totalBundlePrice > budgetLimit) {
    const budgetMonitors = PERIPHERALS.monitor.filter(m => m.price <= selectedMonitor.price);
    const budgetKeyboards = keyboardPool.filter(k => k.price <= selectedKeyboard.price);
    const budgetMice = mousePool.filter(m => m.price <= selectedMouse.price);
    const budgetHeadsets = PERIPHERALS.headset.filter(h => h.price <= selectedHeadset.price);

    if (budgetMonitors.length > 0) selectedMonitor = budgetMonitors[budgetMonitors.length - 1];
    if (budgetKeyboards.length > 0) selectedKeyboard = budgetKeyboards[budgetKeyboards.length - 1];
    if (budgetMice.length > 0) selectedMouse = budgetMice[budgetMice.length - 1];
    if (budgetHeadsets.length > 0) selectedHeadset = budgetHeadsets[budgetHeadsets.length - 1];

    totalBundlePrice = selectedMonitor.price + selectedKeyboard.price + selectedMouse.price + selectedHeadset.price;
  }

  const bundle = [
    { category: 'Monitor', item: selectedMonitor },
    { category: 'Keyboard', item: selectedKeyboard },
    { category: 'Mouse', item: selectedMouse },
    { category: 'Headset', item: selectedHeadset }
  ];

  let aestheticColorNote = 'Coordinated in sleek dark metals';
  if (aestheticStyle === 'all-white') aestheticColorNote = 'Coordinated in a stunning Pure Snow White aesthetic palette';
  else if (aestheticStyle === 'rgb-cyber') aestheticColorNote = 'Coordinated with synchronized multi-zone ARGB backlighting';

  return {
    budgetLimit,
    totalBundlePrice,
    underBudget: totalBundlePrice <= budgetLimit,
    savings: Math.max(0, budgetLimit - totalBundlePrice),
    bundle,
    aestheticStyle,
    advisorSummary: `Based on your choice for ${primaryUse.toUpperCase()} with a ${aestheticStyle.toUpperCase()} vibe, we curated a complete setup totaling $${totalBundlePrice} (${aestheticColorNote}). Saves $${Math.max(0, budgetLimit - totalBundlePrice)} under your $${budgetLimit} budget limit.`
  };
}
