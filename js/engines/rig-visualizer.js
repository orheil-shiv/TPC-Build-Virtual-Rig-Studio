// TPC BUILD - Interactive Virtual PC Chassis & RGB Canvas Visualizer
// Real-time canvas rendering of motherboard, CPU cooler, RAM, GPU, PSU, spinning fans, and RGB glow

import { COMPONENTS } from '../data/components.js';

export const RGB_THEMES = {
  cyberpunk: { name: 'Cyberpunk Neon', primary: '#00f0ff', secondary: '#ff007f', glow: 'rgba(0, 240, 255, 0.4)' },
  arctic: { name: 'Arctic Ice', primary: '#70d6ff', secondary: '#e0fbfc', glow: 'rgba(112, 214, 255, 0.4)' },
  matrix: { name: 'Matrix Emerald', primary: '#00ff66', secondary: '#003b00', glow: 'rgba(0, 255, 102, 0.4)' },
  crimson: { name: 'ROG Crimson', primary: '#ff0033', secondary: '#990011', glow: 'rgba(255, 0, 51, 0.4)' },
  sunset: { name: 'Sunset Horizon', primary: '#ff7700', secondary: '#9b5de5', glow: 'rgba(255, 119, 0, 0.4)' },
  stealth: { name: 'Stealth Blackout', primary: '#334155', secondary: '#1e293b', glow: 'rgba(51, 65, 85, 0.1)' }
};

export class RigVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.isPoweredOn = false;
    this.sidePanelClosed = true;
    this.currentTheme = 'cyberpunk';
    this.fanAngle = 0;
    this.animationFrameId = null;
    this.buildState = {};

    if (this.canvas) {
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.startLoop();
    }
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : { width: 600 };
    const w = rect.width || 600;
    const h = Math.min(460, Math.max(260, Math.round(w * 0.65)));
    this.canvas.width = w;
    this.canvas.height = h;
  }

  setBuild(buildState) {
    this.buildState = { ...buildState };
  }

  setPower(powerState) {
    this.isPoweredOn = powerState;
  }

  setTheme(themeKey) {
    if (RGB_THEMES[themeKey]) {
      this.currentTheme = themeKey;
    }
  }

  toggleSidePanel() {
    this.sidePanelClosed = !this.sidePanelClosed;
    return this.sidePanelClosed;
  }

  startLoop() {
    const render = () => {
      this.draw();
      if (this.isPoweredOn) {
        this.fanAngle += 0.08; // Fan rotation speed
      }
      this.animationFrameId = requestAnimationFrame(render);
    };
    render();
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    ctx.save();
    const refW = 600;
    const refH = 460;
    ctx.scale(cw / refW, ch / refH);

    const w = refW;
    const h = refH;
    const theme = RGB_THEMES[this.currentTheme];

    // Clear background
    ctx.clearRect(0, 0, w, h);

    // Case outer dimensions (fit inside canvas)
    const caseX = 40;
    const caseY = 30;
    const caseW = w - 80;
    const caseH = h - 60;

    // 1. Draw Outer Case Frame (Chassis metal)
    ctx.fillStyle = '#0f141c';
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(caseX, caseY, caseW, caseH, 12);
    ctx.fill();
    ctx.stroke();

    // 2. Chassis Interior Cavity
    const innerX = caseX + 16;
    const innerY = caseY + 16;
    const innerW = caseW - 32;
    const innerH = caseH - 32;

    ctx.fillStyle = '#07090e';
    ctx.fillRect(innerX, innerY, innerW, innerH);

    // 3. PSU Basement Shroud (Bottom partition)
    const psuShroudH = 70;
    const psuShroudY = innerY + innerH - psuShroudH;
    ctx.fillStyle = '#111722';
    ctx.fillRect(innerX, psuShroudY, innerW, psuShroudH);
    ctx.strokeStyle = '#1e293b';
    ctx.strokeRect(innerX, psuShroudY, innerW, psuShroudH);

    // Cable pass-through rubber grommets on shroud
    ctx.fillStyle = '#0a0d14';
    ctx.beginPath();
    ctx.roundRect(innerX + innerW * 0.45, psuShroudY + 8, 45, 12, 4);
    ctx.fill();

    // PSU mounted indicator
    if (this.buildState.psu) {
      const psuObj = (COMPONENTS.psu || []).find(p => p.id === this.buildState.psu);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(innerX + 10, psuShroudY + 12, 130, psuShroudH - 24);
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(psuObj ? psuObj.brand + ' PSU' : 'POWER SUPPLY', innerX + 20, psuShroudY + 36);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '9px monospace';
      ctx.fillText(psuObj ? `${psuObj.wattage}W ${psuObj.efficiency}` : '850W GOLD', innerX + 20, psuShroudY + 50);

      // Modular cables routing from PSU
      ctx.strokeStyle = '#1e2029';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(innerX + 140, psuShroudY + 35);
      ctx.bezierCurveTo(innerX + 210, psuShroudY + 35, innerX + 220, psuShroudY + 14, innerX + innerW * 0.48, psuShroudY + 14);
      ctx.stroke();
    } else {
      // Empty PSU Slot
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(innerX + 10, psuShroudY + 12, 130, psuShroudH - 24);
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.font = '10px sans-serif';
      ctx.fillText('NO PSU INSTALLED', innerX + 22, psuShroudY + 38);
    }

    // 4. Motherboard PCB Tray
    const moboX = innerX + 70;
    const moboY = innerY + 35;
    const moboW = innerW - 130;
    const moboH = psuShroudY - moboY - 15;

    if (this.buildState.motherboard) {
      // Motherboard PCB
      ctx.fillStyle = '#0b0f19';
      ctx.strokeStyle = '#273549';
      ctx.lineWidth = 2;
      ctx.fillRect(moboX, moboY, moboW, moboH);
      ctx.strokeRect(moboX, moboY, moboW, moboH);

      // VRM Heatsinks (Top and Left of CPU)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(moboX + 15, moboY + 10, 85, 20); // Top VRM
      ctx.fillRect(moboX + 10, moboY + 32, 22, 70); // Left VRM

      // Motherboard Diagnostic POST LED (Top right)
      ctx.beginPath();
      ctx.arc(moboX + moboW - 20, moboY + 20, 4, 0, Math.PI * 2);
      if (this.isPoweredOn) {
        ctx.fillStyle = '#22c55e'; // Green: POST passed
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = '#475569'; // Off / Standby
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      // 5. CPU Socket & Processor
      const cpuSocketX = moboX + 50;
      const cpuSocketY = moboY + 45;
      const cpuSocketSize = 58;

      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.fillRect(cpuSocketX, cpuSocketY, cpuSocketSize, cpuSocketSize);
      ctx.strokeRect(cpuSocketX, cpuSocketY, cpuSocketSize, cpuSocketSize);

      if (this.buildState.cpu) {
        const cpuObj = (COMPONENTS.cpu || []).find(p => p.id === this.buildState.cpu);
        // CPU IHS (Integrated Heat Spreader)
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(cpuSocketX + 5, cpuSocketY + 5, cpuSocketSize - 10, cpuSocketSize - 10);
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 8px monospace';
        ctx.fillText(cpuObj ? cpuObj.brand : 'CPU', cpuSocketX + 10, cpuSocketY + 25);
      }

      // 6. RAM Slots & Sticks
      const ramSlotX = cpuSocketX + cpuSocketSize + 15;
      const ramSlotY = cpuSocketY - 10;
      const ramSlotW = 38;
      const ramSlotH = 80;

      for (let i = 0; i < 4; i++) {
        const slotX = ramSlotX + i * 9;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(slotX, ramSlotY, 6, ramSlotH);

        // If RAM installed, draw glowing RAM modules
        if (this.buildState.ram && (i === 1 || i === 3)) { // Dual channel slots
          ctx.fillStyle = '#334155';
          ctx.fillRect(slotX, ramSlotY, 6, ramSlotH);

          // RGB Lightbar on top of RAM
          if (this.isPoweredOn) {
            ctx.fillStyle = i === 1 ? theme.primary : theme.secondary;
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 10;
            ctx.fillRect(slotX, ramSlotY, 6, 20);
            ctx.shadowBlur = 0;
          }
        }
      }

      // 7. CPU Cooler (Mounted over CPU)
      if (this.buildState.cooler) {
        const coolerObj = (COMPONENTS.cooler || []).find(p => p.id === this.buildState.cooler);
        const isLiquid = coolerObj && coolerObj.type.includes('Liquid');

        if (isLiquid) {
          // AIO Liquid Pump Block over CPU
          const pumpCenterX = cpuSocketX + cpuSocketSize / 2;
          const pumpCenterY = cpuSocketY + cpuSocketSize / 2;

          ctx.beginPath();
          ctx.arc(pumpCenterX, pumpCenterY, 26, 0, Math.PI * 2);
          ctx.fillStyle = '#0f172a';
          ctx.fill();
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 3;
          ctx.stroke();

          // AIO RGB Ring / LCD Screen
          if (this.isPoweredOn) {
            ctx.beginPath();
            ctx.arc(pumpCenterX, pumpCenterY, 18, 0, Math.PI * 2);
            ctx.strokeStyle = theme.primary;
            ctx.lineWidth = 3;
            ctx.shadowColor = theme.primary;
            ctx.shadowBlur = 14;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // LCD simulated temp reading
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 9px monospace';
            ctx.fillText('34?C', pumpCenterX - 11, pumpCenterY + 3);
          }

          // Liquid Cooling Sleeved Tubes running to Top Radiator
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 8;
          ctx.lineCap = 'round';
          // Tube 1
          ctx.beginPath();
          ctx.moveTo(pumpCenterX + 16, pumpCenterY - 10);
          ctx.bezierCurveTo(pumpCenterX + 70, pumpCenterY - 40, innerX + innerW * 0.45, innerY + 40, innerX + innerW * 0.40, innerY + 14);
          ctx.stroke();
          // Tube 2
          ctx.beginPath();
          ctx.moveTo(pumpCenterX + 12, pumpCenterY + 10);
          ctx.bezierCurveTo(pumpCenterX + 60, pumpCenterY - 20, innerX + innerW * 0.55, innerY + 40, innerX + innerW * 0.50, innerY + 14);
          ctx.stroke();

          // Top 360mm Radiator + Fans
          ctx.fillStyle = '#111827';
          ctx.fillRect(innerX + 60, innerY + 4, innerW - 120, 16);
          // 3 Radiator Fans
          this.drawFan(innerX + innerW * 0.28, innerY + 12, 14, theme);
          this.drawFan(innerX + innerW * 0.48, innerY + 12, 14, theme);
          this.drawFan(innerX + innerW * 0.68, innerY + 12, 14, theme);

        } else {
          // Dual Tower Air Cooler Heatsink Fin Stack
          const finW = 85;
          const finH = 75;
          const finX = cpuSocketX - 14;
          const finY = cpuSocketY - 10;

          // Metal fins
          ctx.fillStyle = '#475569';
          ctx.fillRect(finX, finY, finW, finH);
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 1;
          for (let f = finY + 4; f < finY + finH; f += 6) {
            ctx.beginPath();
            ctx.moveTo(finX, f);
            ctx.lineTo(finX + finW, f);
            ctx.stroke();
          }

          // Air Cooler Fan in between towers
          this.drawFan(finX + finW / 2, finY + finH / 2, 26, theme);
        }
      }

      // 8. Storage (M.2 NVMe SSD under heatsink)
      if (this.buildState.storage) {
        const m2X = moboX + 45;
        const m2Y = moboY + cpuSocketSize + 60;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(m2X, m2Y, 70, 16);
        ctx.fillStyle = '#64748b';
        ctx.font = '8px monospace';
        ctx.fillText('M.2 NVMe GEN4', m2X + 5, m2Y + 11);
      }

      // 9. Graphics Card (GPU) mounted in PCIe x16 slot
      const pcieY = moboY + cpuSocketSize + 85;
      // PCIe slot
      ctx.fillStyle = '#334155';
      ctx.fillRect(moboX + 30, pcieY, moboW - 60, 8);

      if (this.buildState.gpu) {
        const gpuObj = (COMPONENTS.gpu || []).find(p => p.id === this.buildState.gpu);
        const gpuW = Math.min(moboW + 20, (gpuObj ? gpuObj.lengthMm : 300) * 0.85);
        const gpuH = 55;
        const gpuX = moboX + 15;
        const gpuY = pcieY + 4;

        // GPU Backplate & Shroud
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(gpuX, gpuY, gpuW, gpuH, 6);
        ctx.fill();
        ctx.stroke();

        // GPU RGB Logo
        if (this.isPoweredOn) {
          ctx.fillStyle = theme.primary;
          ctx.shadowColor = theme.primary;
          ctx.shadowBlur = 12;
          ctx.font = 'bold 9px sans-serif';
          ctx.fillText(gpuObj ? gpuObj.brand : 'GEFORCE RTX', gpuX + 15, gpuY + 18);
          ctx.shadowBlur = 0;
        }

        // GPU Dual/Triple Cooling Fans
        const fanRadius = 18;
        this.drawFan(gpuX + gpuW * 0.35, gpuY + gpuH / 2 + 5, fanRadius, theme);
        this.drawFan(gpuX + gpuW * 0.70, gpuY + gpuH / 2 + 5, fanRadius, theme);

        // PCIe Power Cables (12VHPWR / 8-Pin) routing down into shroud
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(gpuX + gpuW - 30, gpuY + 10);
        ctx.bezierCurveTo(gpuX + gpuW - 10, psuShroudY - 10, innerX + innerW * 0.52, psuShroudY - 10, innerX + innerW * 0.48, psuShroudY + 8);
        ctx.stroke();
      }

    } else {
      // Empty Motherboard Tray
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(moboX, moboY, moboW, moboH);
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.font = '11px sans-serif';
      ctx.fillText('NO MOTHERBOARD MOUNTED', moboX + moboW / 2 - 85, moboY + moboH / 2);
    }

    // 10. Front Intake Fans (Right of chassis)
    const frontFanX = innerX + innerW - 18;
    this.drawFan(frontFanX, innerY + 70, 22, theme);
    this.drawFan(frontFanX, innerY + 140, 22, theme);
    this.drawFan(frontFanX, innerY + 210, 22, theme);

    // 11. Rear Exhaust Fan (Left of chassis)
    const rearFanX = innerX + 22;
    this.drawFan(rearFanX, innerY + 80, 20, theme);

    // 12. Tempered Glass Reflection (If closed)
    if (this.sidePanelClosed) {
      ctx.save();
      const grad = ctx.createLinearGradient(caseX, caseY, caseX + caseW, caseY + caseH);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.02)');
      grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.05)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.01)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(innerX, innerY, innerW, innerH, 8);
      ctx.fill();

      // Glass panel thumbscrews in 4 corners
      const screwPositions = [
        [innerX + 10, innerY + 10],
        [innerX + innerW - 10, innerY + 10],
        [innerX + 10, innerY + innerH - 10],
        [innerX + innerW - 10, innerY + innerH - 10]
      ];
      ctx.fillStyle = '#475569';
      for (const [sx, sy] of screwPositions) {
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.restore();
  }

  drawFan(x, y, radius, theme) {
    const ctx = this.ctx;
    ctx.save();

    // Fan Outer Frame
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // RGB Glow ring around fan
    if (this.isPoweredOn && theme.name !== 'Stealth Blackout') {
      ctx.beginPath();
      ctx.arc(x, y, radius - 2, 0, Math.PI * 2);
      ctx.strokeStyle = theme.primary;
      ctx.lineWidth = 2;
      ctx.shadowColor = theme.primary;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Rotating Blades
    ctx.translate(x, y);
    ctx.rotate(this.fanAngle);

    const bladeCount = 7;
    for (let i = 0; i < bladeCount; i++) {
      ctx.rotate((Math.PI * 2) / bladeCount);
      ctx.fillStyle = this.isPoweredOn ? 'rgba(255, 255, 255, 0.35)' : '#1e293b';
      ctx.beginPath();
      ctx.ellipse(radius * 0.45, 0, radius * 0.35, radius * 0.18, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Center Hub
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.30, 0, Math.PI * 2);
    ctx.fillStyle = '#334155';
    ctx.fill();

    ctx.restore();
  }
}
