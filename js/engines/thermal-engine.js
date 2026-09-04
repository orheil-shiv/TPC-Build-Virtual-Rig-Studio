// TPC BUILD - Real-Time Hardware Thermal Simulation Engine
// Calculates Idle, Background, and Gaming Peak temperatures for CPU & GPU

import { COMPONENTS } from '../data/components.js';

export function calculateTemperatures(build, loadType = 'idle') {
  const cpu = (COMPONENTS.cpu || []).find(p => p.id === build.cpu);
  const cooler = (COMPONENTS.cooler || []).find(p => p.id === build.cooler);
  const gpu = (COMPONENTS.gpu || []).find(p => p.id === build.gpu);
  const pcCase = (COMPONENTS.case || []).find(p => p.id === build.case);

  const ambient = 22; // 22?C ambient room temperature

  if (!cpu) {
    return {
      idleCpu: 0,
      peakCpu: 0,
      idleGpu: 0,
      peakGpu: 0,
      status: 'off'
    };
  }

  // Cooler heat dissipation factor
  let coolerEfficiency = 0.5; // default fallback
  if (cooler) {
    if (cooler.type.includes('Liquid 360')) {
      coolerEfficiency = 0.88; // 360mm AIO dissipates rapidly
    } else if (cooler.type.includes('Dual-Tower Air')) {
      coolerEfficiency = 0.72; // Dual-tower heatsink
    } else {
      coolerEfficiency = 0.55;
    }
  } else {
    coolerEfficiency = 0.10; // No cooler mounted! Extreme overheating!
  }

  // Case airflow modifier
  let caseAirflowFactor = 1.0;
  if (pcCase && pcCase.tags && pcCase.tags.some(t => t.includes('Airflow'))) {
    caseAirflowFactor = 0.95; // 5% cooler case
  }

  // 1. CPU Idle / Background Temperature
  // With 360 AIO: ~28-33?C. With air: ~34-39?C.
  let idleCpu = Math.round(ambient + (cpu.tdp * 0.12) * (1.2 - coolerEfficiency) * caseAirflowFactor);
  idleCpu = Math.max(26, Math.min(55, idleCpu));

  // 2. CPU Gaming Peak Load Temperature
  // Games draw 40% - 70% of CPU TDP
  let peakCpu = Math.round(ambient + (cpu.tdp * 0.45) * (1.6 - coolerEfficiency) * caseAirflowFactor);
  if (!cooler) peakCpu = 100; // Thermal shutdown
  peakCpu = Math.max(48, Math.min(100, peakCpu));

  // 3. CPU 100% Stress Load Temperature (Blender/Cinebench)
  let stressCpu = Math.round(ambient + (cpu.tdp * 0.65) * (1.8 - coolerEfficiency) * caseAirflowFactor);
  if (!cooler) stressCpu = 100;
  stressCpu = Math.max(58, Math.min(100, stressCpu));

  // 4. GPU Temperatures
  let idleGpu = 34; // Fans stopped (0dB mode)
  let peakGpu = 65;

  if (gpu) {
    idleGpu = Math.round(ambient + 12 * caseAirflowFactor);
    peakGpu = Math.round(ambient + (gpu.tdp * 0.15) * caseAirflowFactor);
    peakGpu = Math.max(55, Math.min(84, peakGpu));
  }

  // Health Rating
  let cpuHealth = 'cool';
  let cpuBadge = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  let thermalMessage = 'Chilled & Safe: Well below 80?C thermal throttle threshold.';

  if (peakCpu >= 95) {
    cpuHealth = 'critical';
    cpuBadge = 'text-red-400 bg-red-500/10 border-red-500/30';
    thermalMessage = '?? Critical Throttling: CPU is hitting 95-100?C TjMax! Cooler upgrade required.';
  } else if (peakCpu >= 82) {
    cpuHealth = 'warm';
    cpuBadge = 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    thermalMessage = '? Warm Under Load: CPU boost clocks may slightly reduce under sustained gaming.';
  }

  return {
    ambient,
    idleCpu,
    peakCpu,
    stressCpu,
    idleGpu,
    peakGpu,
    cpuHealth,
    cpuBadge,
    thermalMessage,
    coolerType: cooler ? cooler.type : 'None'
  };
}
