// TPC BUILD - Productivity & Professional Applications Benchmark Engine
// Predicts render speeds, export times, CPU compute scores, and local AI throughput

import { COMPONENTS } from '../data/components.js';

export function calculateProductivityBenchmarks(build) {
  const cpu = (COMPONENTS.cpu || []).find(p => p.id === build.cpu);
  const gpu = (COMPONENTS.gpu || []).find(p => p.id === build.gpu);
  const ram = (COMPONENTS.ram || []).find(p => p.id === build.ram);
  const storage = (COMPONENTS.storage || []).find(p => p.id === build.storage);

  if (!cpu || !gpu) {
    return null;
  }

  // Baseline ratings
  const cpuSingle = cpu.singleCoreScore; // 120 max
  const cpuMulti = cpu.multiCoreScore;   // 155 max
  const gpuRaster = gpu.rasterScore;     // 100 max
  const gpuAi = gpu.aiScore || gpu.rasterScore;
  const ramGb = ram ? ram.capacity : 16;
  const vramGb = gpu.vram;

  // 1. Blender 3D Cycles (Classroom scene render time in seconds - lower is better)
  // RTX 4090 renders in ~7.2 seconds; RTX 4060 in ~36 seconds
  const blenderSeconds = Math.max(5.5, Math.round(7.2 / (gpuRaster / 100)));
  const blenderSamplesPerSec = Math.round(5200 * (gpuRaster / 100));

  // 2. Adobe Premiere Pro / DaVinci Resolve (4K 60fps ProRes timeline export speed)
  // High-end system exports 4K 60fps at 4.2x real-time speed
  const ramExportBonus = ramGb >= 32 ? 1.15 : 0.88;
  const nvmeBonus = storage && storage.dramCache ? 1.08 : 0.95;
  const exportSpeedMultiplier = Number(( (gpuRaster * 0.4 + cpuMulti * 0.6) / 45 * ramExportBonus * nvmeBonus ).toFixed(1));
  const tenMinuteVideoExportTime = Math.round(600 / Math.max(0.5, exportSpeedMultiplier));

  // 3. Cinebench R23 (CPU Render Engine)
  // Flagship i9-14900K = ~40,000 multi-core, 2,250 single-core
  const cinebenchMulti = Math.round((cpuMulti / 150) * 39500);
  const cinebenchSingle = Math.round((cpuSingle / 120) * 2250);

  // 4. Local AI Inference: Llama-3 8B (Tokens per second)
  // RTX 4090 delivers ~95 tokens/sec INT4, RTX 4060 delivers ~32 tokens/sec
  const aiTokenSpeed = Math.round((gpuAi / 100) * 95);

  // 5. Stable Diffusion XL (1024x1024 images generated per minute)
  // RTX 4090 = ~14 images/min; RTX 4060 = ~3.2 images/min
  const sdxlImagesPerMin = Number(( (gpuAi / 100) * 14 ).toFixed(1));

  // 6. Unreal Engine 5 Viewport Smoothness (Lumen + Nanite)
  const ue5ViewportFps = Math.round((gpuRaster * 0.7 + cpuSingle * 0.3) * 0.85);

  return {
    blender: {
      name: 'Blender 3D Cycles',
      scene: 'Classroom Benchmark',
      renderTimeSeconds: blenderSeconds,
      samplesPerSec: blenderSamplesPerSec,
      rating: blenderSeconds <= 12 ? 'Hollywood Studio Grade' : blenderSeconds <= 25 ? 'Fast Pro 3D' : 'Casual 3D Hobbyist'
    },
    premiere: {
      name: 'Adobe Premiere Pro / DaVinci',
      test: '4K 60fps ProRes H.265 Timeline',
      exportMultiplier: `${exportSpeedMultiplier}x real-time`,
      tenMinExportFormatted: `${Math.floor(tenMinuteVideoExportTime / 60)}m ${tenMinuteVideoExportTime % 60}s`,
      rating: exportSpeedMultiplier >= 3.0 ? 'Smooth 4K Multicam Pro' : exportSpeedMultiplier >= 1.5 ? 'Fast 4K Editing' : '1080p Smooth / 4K Proxy'
    },
    cinebench: {
      name: 'Cinebench R23 CPU Test',
      multiCoreScore: cinebenchMulti.toLocaleString(),
      singleCoreScore: cinebenchSingle.toLocaleString(),
      rating: cinebenchMulti > 30000 ? 'Extreme Workstation Compute' : cinebenchMulti > 18000 ? 'Heavy Multitasking' : 'Mainstream Productivity'
    },
    aiInference: {
      name: 'Local Generative AI & LLMs',
      test: 'Llama-3 8B & Stable Diffusion XL',
      tokensPerSec: `${aiTokenSpeed} tokens/sec`,
      sdxlImagesPerMin: `${sdxlImagesPerMin} images/min`,
      rating: vramGb >= 16 ? 'Large Model Local AI Ready (16-24GB VRAM)' : vramGb >= 12 ? 'Fast 8B LLMs & SDXL' : 'Light AI / Quantized Models'
    },
    unrealEngine: {
      name: 'Unreal Engine 5 Editor',
      viewportFps: `${ue5ViewportFps} FPS`,
      rating: ue5ViewportFps >= 60 ? 'Real-Time AAA Development' : 'Playable Indie Dev'
    }
  };
}
