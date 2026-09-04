// TPC BUILD - Strict Assembly & Hardware Compatibility Validator
// Enforces real-world physical build requirements: No incomplete builds can power on or run tests!

import { COMPONENTS, HARDWARE_CATEGORIES } from '../data/components.js';

export const REQUIRED_PARTS = [
  { id: 'cpu', name: 'Processor (CPU)', reason: 'The central brain of the computer. Without a CPU, the motherboard cannot execute BIOS instructions.' },
  { id: 'cooler', name: 'CPU Cooler', reason: 'Thermal protection. Modern high-performance CPUs reach 100?C within seconds without heatsink/AIO cooling and will auto-shutdown.' },
  { id: 'motherboard', name: 'Motherboard', reason: 'The nervous system. All circuits, PCIe lanes, power rails, and IO ports require the mainboard.' },
  { id: 'ram', name: 'Memory (RAM)', reason: 'System workspace. The memory controller cannot initialize without at least one DIMM module installed (Motherboard emits 3 error beeps).' },
  { id: 'storage', name: 'Storage (SSD)', reason: 'Non-volatile storage. An OS boot drive is mandatory to load operating system, game files, and drivers.' },
  { id: 'gpu', name: 'Graphics Card (GPU)', reason: 'Dedicated pixel rendering. Crucial for 3D games, high-resolution monitors, and GPUs without integrated graphics.' },
  { id: 'psu', name: 'Power Supply (PSU)', reason: 'Electrical power. Delivers 12V, 5V, and 3.3V power rails. Without a PSU, the rig has 0W and cannot turn on!' },
  { id: 'case', name: 'PC Case (Chassis)', reason: 'Structural frame. Houses all components, grounds against ESD, and directs fan airflow across VRMs and radiators.' }
];

export function validateBuildCompleteness(build) {
  const missingParts = [];
  const installedParts = [];

  for (const part of REQUIRED_PARTS) {
    const partId = build[part.id];
    if (!partId) {
      missingParts.push(part);
    } else {
      const partObj = (COMPONENTS[part.id] || []).find(p => p.id === partId);
      installedParts.push({ ...part, item: partObj });
    }
  }

  const isComplete = missingParts.length === 0;
  const progressPercent = Math.round((installedParts.length / REQUIRED_PARTS.length) * 100);

  return {
    isComplete,
    missingParts,
    installedParts,
    completedCount: installedParts.length,
    totalRequired: REQUIRED_PARTS.length,
    progressPercent,
    statusMessage: isComplete 
      ? 'All 8 essential components installed. Rig is physically assembled and ready to boot!' 
      : `Incomplete Build: ${missingParts.length} essential ${missingParts.length === 1 ? 'part is' : 'parts are'} missing before the PC can turn on.`
  };
}

export function validateCompatibility(build) {
  const issues = [];
  const warnings = [];
  const successes = [];

  const cpu = (COMPONENTS.cpu || []).find(p => p.id === build.cpu);
  const mobo = (COMPONENTS.motherboard || []).find(p => p.id === build.motherboard);
  const ram = (COMPONENTS.ram || []).find(p => p.id === build.ram);
  const gpu = (COMPONENTS.gpu || []).find(p => p.id === build.gpu);
  const psu = (COMPONENTS.psu || []).find(p => p.id === build.psu);
  const cooler = (COMPONENTS.cooler || []).find(p => p.id === build.cooler);
  const pcCase = (COMPONENTS.case || []).find(p => p.id === build.case);

  // 1. Socket Check (CPU vs Motherboard)
  if (cpu && mobo) {
    if (cpu.socket === mobo.socket) {
      successes.push({
        title: 'CPU Socket Compatible',
        description: `${cpu.name} matches ${mobo.name} on the ${cpu.socket} socket platform.`
      });
    } else {
      issues.push({
        severity: 'critical',
        title: 'Incompatible CPU & Motherboard Socket!',
        description: `CPU uses socket ${cpu.socket}, but motherboard is ${mobo.socket}. They cannot physically fit or connect!`
      });
    }
  }

  // 2. RAM Type Check (DDR4 vs DDR5)
  if (ram && mobo) {
    if (ram.type === mobo.memoryType) {
      successes.push({
        title: 'Memory Type Match',
        description: `Both motherboard and RAM support ${ram.type} architecture.`
      });
    } else {
      issues.push({
        severity: 'critical',
        title: 'RAM / Motherboard Memory Generation Mismatch!',
        description: `Selected RAM is ${ram.type}, but motherboard only accepts ${mobo.memoryType} memory slots.`
      });
    }
  }

  // 3. Power Supply Wattage vs Total System TDP
  let totalTdp = 70; // baseline for fans, motherboard chipset, RGB, and NVMe SSD
  if (cpu) totalTdp += cpu.tdp;
  if (gpu) totalTdp += gpu.tdp;

  const recommendedPsuWattage = Math.round(totalTdp * 1.30); // 30% safety headroom for transient spikes

  if (psu) {
    if (psu.wattage < totalTdp) {
      issues.push({
        severity: 'critical',
        title: 'Insufficient Power Supply Wattage!',
        description: `Total system peak draw is ~${totalTdp}W, but your PSU is only rated for ${psu.wattage}W. The PC will trip OCP (Over-Current Protection) and crash under gaming load.`
      });
    } else if (psu.wattage < recommendedPsuWattage) {
      warnings.push({
        severity: 'warning',
        title: 'Tight Power Supply Headroom',
        description: `Total system peak is ~${totalTdp}W. Your ${psu.wattage}W PSU works, but we advise at least ${recommendedPsuWattage}W for healthy 20-30% efficiency curve and transient power spikes.`
      });
    } else {
      successes.push({
        title: 'Power Supply Capacity Optimal',
        description: `Your ${psu.wattage}W PSU provides ample headroom over the ~${totalTdp}W estimated load.`
      });
    }
  }

  // 4. GPU Length vs Case Max Clearance
  if (gpu && pcCase) {
    if (gpu.lengthMm > pcCase.maxGpuLength) {
      issues.push({
        severity: 'critical',
        title: 'GPU Exceeds PC Case Length Clearance!',
        description: `${gpu.name} is ${gpu.lengthMm}mm long, exceeding the case maximum limit of ${pcCase.maxGpuLength}mm. The graphics card will hit front fans or the radiator!`
      });
    } else {
      successes.push({
        title: 'GPU Case Clearance OK',
        description: `${gpu.lengthMm}mm GPU fits comfortably in ${pcCase.maxGpuLength}mm chassis space (${pcCase.maxGpuLength - gpu.lengthMm}mm buffer).`
      });
    }
  }

  // 5. Cooler TDP vs CPU TDP
  if (cooler && cpu) {
    if (cooler.tdpRating < cpu.tdp) {
      warnings.push({
        severity: 'warning',
        title: 'Cooler May Thermal Throttle CPU',
        description: `${cooler.name} is rated for ~${cooler.tdpRating}W dissipation, while ${cpu.name} can draw up to ${cpu.tdp}W under full multi-threaded loads.`
      });
    }
  }

  return {
    totalTdp,
    recommendedPsuWattage,
    issues,
    warnings,
    successes,
    hasCriticalIssues: issues.length > 0
  };
}

export function calculateBuildCosts(build, selectedPeripherals = []) {
  let partsTotal = 0;
  const breakdown = [];

  for (const cat of HARDWARE_CATEGORIES) {
    const partId = build[cat.id];
    if (partId) {
      const part = (COMPONENTS[cat.id] || []).find(p => p.id === partId);
      if (part) {
        partsTotal += part.price;
        breakdown.push({
          category: cat.name,
          categoryId: cat.id,
          name: part.name,
          price: part.price,
          brand: part.brand,
          links: part.links
        });
      }
    }
  }

  let peripheralsTotal = 0;
  for (const item of selectedPeripherals) {
    peripheralsTotal += item.price;
  }

  return {
    partsTotal,
    peripheralsTotal,
    grandTotal: partsTotal + peripheralsTotal,
    breakdown,
    partsCount: breakdown.length
  };
}
