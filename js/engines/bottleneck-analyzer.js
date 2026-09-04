// TPC BUILD - Post-Test Hardware Bottleneck Diagnostic Engine
// Analyzes CPU vs GPU utilization balance, RAM bandwidth, thermal and PSU headroom

import { COMPONENTS } from '../data/components.js';

export function analyzeRigBottlenecks(build, targetResolution = '1440p') {
  const cpu = (COMPONENTS.cpu || []).find(p => p.id === build.cpu);
  const gpu = (COMPONENTS.gpu || []).find(p => p.id === build.gpu);
  const ram = (COMPONENTS.ram || []).find(p => p.id === build.ram);
  const cooler = (COMPONENTS.cooler || []).find(p => p.id === build.cooler);
  const psu = (COMPONENTS.psu || []).find(p => p.id === build.psu);

  if (!cpu || !gpu) {
    return {
      severity: 'none',
      percentage: 0,
      title: 'Incomplete Hardware',
      summary: 'Both CPU and GPU must be selected to analyze hardware bottleneck.',
      bottlenecks: [],
      upgradeRecommendation: null
    };
  }

  const bottlenecks = [];
  let bottleneckPercentage = 5; // Natural realistic baseline variance
  let primaryType = 'balanced';

  // Normalize scores
  const cpuScore = cpu.gamingScore; // 68 to 135
  const gpuScore = gpu.rasterScore; // 42 to 100

  // Resolution impact factor
  // 1080p: CPU is critical. 4K: GPU does almost all the heavy lifting.
  let expectedCpuForGpuRatio = 1.0;
  if (targetResolution === '1080p') {
    expectedCpuForGpuRatio = 1.35; // Demands strong CPU
  } else if (targetResolution === '1440p') {
    expectedCpuForGpuRatio = 1.05;
  } else if (targetResolution === '4k') {
    expectedCpuForGpuRatio = 0.75; // GPU heavy
  }

  // Calculate Relative Balance Index
  const normalizedCpu = cpuScore / 130;
  const normalizedGpu = gpuScore / 100;
  const balanceDelta = (normalizedGpu * expectedCpuForGpuRatio) - normalizedCpu;

  // 1. CPU Bottleneck Detection
  if (balanceDelta > 0.18) {
    primaryType = 'cpu';
    const cpuBottleneckPct = Math.min(48, Math.round(balanceDelta * 65));
    bottleneckPercentage = Math.max(bottleneckPercentage, cpuBottleneckPct);

    bottlenecks.push({
      type: 'cpu',
      component: cpu.name,
      severity: cpuBottleneckPct > 25 ? 'critical' : 'warning',
      title: `CPU Bottleneck Detected (~${cpuBottleneckPct}% at ${targetResolution})`,
      explanation: `Your ${cpu.name} lacks the IPC or core performance to feed frames to your powerful ${gpu.name} at ${targetResolution}. The graphics card will sit at ~${100 - cpuBottleneckPct}% utilization in CPU-heavy games like Warzone, Spider-Man, and Fortnite.`,
      solution: `Upgrade to a faster gaming CPU (such as the AMD Ryzen 7 7800X3D or Ryzen 7 9800X3D) to unlock the remaining ${cpuBottleneckPct}% of your GPU performance.`
    });
  }

  // 2. GPU Bottleneck Detection
  // (In PC gaming at 4K, a GPU bottleneck is normal, but severe mismatches at 1440p/4K waste CPU budget)
  if (balanceDelta < -0.30 && targetResolution !== '1080p') {
    primaryType = 'gpu';
    const gpuBottleneckPct = Math.min(40, Math.round(Math.abs(balanceDelta) * 55));
    bottleneckPercentage = Math.max(bottleneckPercentage, gpuBottleneckPct);

    bottlenecks.push({
      type: 'gpu',
      component: gpu.name,
      severity: 'info',
      title: `GPU-Bound Setup at ${targetResolution}`,
      explanation: `Your ${cpu.name} is extremely powerful, but the ${gpu.name} will reach 100% capacity first at ${targetResolution}. This is standard for cinematic AAA gaming, but your CPU has substantial headroom to drive a higher-tier graphics card.`,
      solution: `If you want higher framerates at ${targetResolution}, consider pairing your processor with an RTX 4070 Super or RTX 4080 Super.`
    });
  }

  // 3. RAM Bottleneck Detection
  if (ram) {
    if (ram.capacity < 16) {
      bottlenecks.push({
        type: 'ram',
        component: ram.name,
        severity: 'critical',
        title: 'Severe RAM Capacity Bottleneck',
        explanation: `${ram.capacity}GB memory is insufficient for modern Windows 11 and AAA titles (like Hogwarts Legacy or Cyberpunk). The operating system will page to the SSD, causing micro-stutters and 1% low drops.`,
        solution: 'Upgrade to a 32GB (2x16GB) DDR5 or DDR4 kit with dual-channel configuration.'
      });
      bottleneckPercentage = Math.max(bottleneckPercentage, 28);
    } else if (ram.type === 'DDR4' && cpu.socket === 'AM5') {
      // Caught in compatibility validator
    }
  }

  // 4. Thermal / Cooler Bottleneck
  if (cooler && cpu && cooler.tdpRating < cpu.tdp) {
    bottlenecks.push({
      type: 'thermal',
      component: cooler.name,
      severity: 'warning',
      title: 'Thermal Throttling Risk',
      explanation: `${cooler.name} (rated ${cooler.tdpRating}W) will run hot under all-core boost on ${cpu.name} (${cpu.tdp}W TDP). The CPU will downclock its boost clock to stay below 95-100?C.`,
      solution: 'Switch to a 360mm AIO Liquid Cooler (like ARCTIC Liquid Freezer III 360) or high-performance dual-tower air cooler.'
    });
  }

  // Determine Overall Status & Badge
  let severityLevel = 'balanced';
  let badgeColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  let badgeText = '?? Perfectly Harmonized Build (<10% Bottleneck)';
  let verdictSummary = `Congratulations! Your ${cpu.name} and ${gpu.name} are extraordinarily well-balanced for ${targetResolution} gaming. Hardware utilization is near 1:1 parity with minimal wasted compute.`;

  if (bottleneckPercentage >= 25) {
    severityLevel = 'severe';
    badgeColor = 'text-red-400 border-red-500/30 bg-red-500/10';
    badgeText = `?? Heavy Bottleneck (${bottleneckPercentage}%)`;
    verdictSummary = `Significant performance imbalance detected. One of your components is restricting your overall system potential by approximately ${bottleneckPercentage}%.`;
  } else if (bottleneckPercentage >= 12) {
    severityLevel = 'mild';
    badgeColor = 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
    badgeText = `?? Mild Bottleneck (${bottleneckPercentage}%)`;
    verdictSummary = `Minor imbalance detected (~${bottleneckPercentage}%). This rig will run very smoothly, but there is some performance left on the table in certain scenarios.`;
  }

  // Generate actionable upgrade suggestion
  let upgradeRecommendation = null;
  if (primaryType === 'cpu') {
    const suggestedCpu = (COMPONENTS.cpu || []).find(c => c.id === 'ryzen-7-7800x3d' || c.id === 'intel-i5-13600k');
    if (suggestedCpu && suggestedCpu.id !== cpu.id) {
      upgradeRecommendation = {
        category: 'Processor (CPU)',
        recommendedItem: suggestedCpu,
        reason: `Eliminates the CPU bottleneck and provides silky-smooth 1% lows for your ${gpu.name}.`
      };
    }
  } else if (primaryType === 'gpu' && targetResolution === '4k') {
    const suggestedGpu = (COMPONENTS.gpu || []).find(g => g.id === 'rtx-4070-super' || g.id === 'rtx-4080-super');
    if (suggestedGpu && suggestedGpu.id !== gpu.id) {
      upgradeRecommendation = {
        category: 'Graphics Card (GPU)',
        recommendedItem: suggestedGpu,
        reason: `Powers native 4K 100+ FPS to match your high-end processor.`
      };
    }
  }

  return {
    severityLevel,
    bottleneckPercentage,
    badgeColor,
    badgeText,
    verdictSummary,
    bottlenecks,
    upgradeRecommendation,
    targetResolution
  };
}
