// TPC BUILD - Realistic Game FPS Prediction Engine
// Derived from hardware reviews, real-world benchmark curves, and resolution scaling physics

import { COMPONENTS } from '../data/components.js';
import { GAMES, RESOLUTION_MODIFIERS, PRESET_MODIFIERS } from '../data/games.js';

export function calculateGameFps(build, gameId, options = {}) {
  const {
    resolution = '1440p',
    preset = 'ultra',
    rayTracing = false,
    dlssMode = 'off' // 'off', 'quality', 'performance', 'framegen'
  } = options;

  const game = GAMES.find(g => g.id === gameId) || GAMES[0];
  const cpu = (COMPONENTS.cpu || []).find(p => p.id === build.cpu);
  const gpu = (COMPONENTS.gpu || []).find(p => p.id === build.gpu);
  const ram = (COMPONENTS.ram || []).find(p => p.id === build.ram);

  if (!cpu || !gpu) {
    return {
      avgFps: 0,
      onePercentLow: 0,
      frameTimeMs: 0,
      tier: 'unplayable',
      limitingFactor: 'missing-hardware'
    };
  }

  // 1. Base Game FPS on reference flagship (RTX 4090 + 7800X3D at 1080p Ultra)
  const baseFps = game.baseFps;

  // 2. CPU Performance Factor
  let cpuScore = cpu.gamingScore;
  // If game is esports/cache-sensitive and CPU has 3D V-Cache
  if (game.esports && cpu.has3dCache) {
    cpuScore *= 1.12; // Extra cache uplift in esports titles
  }
  const cpuRatio = Math.max(0.3, cpuScore / 130); // 7800X3D = 130 (1.0 baseline)

  // 3. GPU Performance Factor
  let gpuScore = gpu.rasterScore;
  if (rayTracing && game.rtAvailable) {
    // Ray tracing calculation uses rayTracingScore
    const rtEfficiency = gpu.rayTracingScore / 100;
    gpuScore = gpuScore * (1 - game.rtPenalty * (1.2 - rtEfficiency * 0.4));
  }
  const gpuRatio = Math.max(0.15, gpuScore / 100); // RTX 4090 = 100 (1.0 baseline)

  // 4. Resolution & Preset Modifiers
  const resData = RESOLUTION_MODIFIERS[resolution] || RESOLUTION_MODIFIERS['1440p'];
  const presetData = PRESET_MODIFIERS[preset] || PRESET_MODIFIERS['ultra'];

  // Weighted CPU vs GPU bottleneck at this resolution
  // High resolution shifts load heavily to GPU, low resolution shifts to CPU
  let effectiveCpuWeight = game.cpuWeight * resData.cpuImpact;
  let effectiveGpuWeight = game.gpuWeight * resData.gpuImpact;
  const totalWeight = effectiveCpuWeight + effectiveGpuWeight;
  effectiveCpuWeight /= totalWeight;
  effectiveGpuWeight /= totalWeight;

  // Compute core FPS with bottleneck sensitivity
  // A weak CPU limits the ceiling even if GPU is massive
  const hardwareRatio = (cpuRatio * effectiveCpuWeight) + (gpuRatio * effectiveGpuWeight);

  let predictedFps = baseFps * hardwareRatio * resData.factor * presetData.factor;

  // 5. RAM Bandwidth & Capacity Modifier
  if (ram) {
    if (ram.capacity < 16) {
      predictedFps *= 0.85; // Severe stutter penalty for <16GB
    } else if (ram.type === 'DDR5') {
      predictedFps *= 1.04; // Fast DDR5 speed benefit
    }
  }

  // 6. VRAM Capacity Throttling
  const vramNeeded = game.vramNeeds[resolution] || 8;
  if (gpu.vram < vramNeeded) {
    const vramDeficit = vramNeeded - gpu.vram;
    const vramPenalty = Math.min(0.40, vramDeficit * 0.08); // 8% per missing GB
    predictedFps *= (1 - vramPenalty);
  }

  // 7. DLSS / FSR / Frame Generation Upscaling Multipliers
  if (dlssMode === 'quality') {
    predictedFps *= 1.32;
  } else if (dlssMode === 'performance') {
    predictedFps *= 1.55;
  } else if (dlssMode === 'framegen') {
    predictedFps *= 1.68; // Native Frame Generation boost
  }

  // Round results & calculate 1% lows
  const avgFps = Math.max(8, Math.round(predictedFps));
  
  // 1% Lows calculation (stability and frame consistency)
  let stabilityFactor = 0.76;
  if (cpuRatio > 0.9 && ram && ram.capacity >= 32) stabilityFactor = 0.84;
  if (gpu.vram < vramNeeded) stabilityFactor -= 0.15; // Texture swapping hitching
  const onePercentLow = Math.max(4, Math.round(avgFps * stabilityFactor));

  // Frame time in milliseconds
  const frameTimeMs = (1000 / avgFps).toFixed(1);

  // Performance Rating Badge
  let tier = 'smooth';
  let tierLabel = 'Smooth 60+ FPS';
  let tierColor = 'text-emerald-400';
  let tierBg = 'bg-emerald-500/10 border-emerald-500/30';

  if (avgFps >= 240) {
    tier = 'competitive';
    tierLabel = '? 240+ FPS Esports God';
    tierColor = 'text-cyan-400';
    tierBg = 'bg-cyan-500/10 border-cyan-500/30';
  } else if (avgFps >= 144) {
    tier = 'ultra-smooth';
    tierLabel = '?? 144Hz Ultra Smooth';
    tierColor = 'text-blue-400';
    tierBg = 'bg-blue-500/10 border-blue-500/30';
  } else if (avgFps >= 60) {
    tier = 'smooth';
    tierLabel = '?? 60+ FPS Solid Gameplay';
    tierColor = 'text-emerald-400';
    tierBg = 'bg-emerald-500/10 border-emerald-500/30';
  } else if (avgFps >= 30) {
    tier = 'playable';
    tierLabel = '?? 30-60 FPS Playable Console Tier';
    tierColor = 'text-yellow-400';
    tierBg = 'bg-yellow-500/10 border-yellow-500/30';
  } else {
    tier = 'unplayable';
    tierLabel = '?? <30 FPS Choppy / Insufficient';
    tierColor = 'text-red-400';
    tierBg = 'bg-red-500/10 border-red-500/30';
  }

  // Determine what is holding performance back
  let limitingFactor = 'balanced';
  if (cpuRatio < gpuRatio * 0.70) {
    limitingFactor = 'cpu';
  } else if (gpuRatio < cpuRatio * 0.70) {
    limitingFactor = 'gpu';
  } else if (gpu.vram < vramNeeded) {
    limitingFactor = 'vram';
  }

  return {
    gameId,
    gameTitle: game.title,
    resolution,
    preset,
    avgFps,
    onePercentLow,
    frameTimeMs,
    tier,
    tierLabel,
    tierColor,
    tierBg,
    limitingFactor
  };
}

export function calculateAllGamesFps(build, options = {}) {
  return GAMES.map(game => calculateGameFps(build, game.id, options));
}
