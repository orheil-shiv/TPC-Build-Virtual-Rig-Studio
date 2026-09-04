// TPC BUILD - Master Application Controller (Professional Rig Studio)
import { HARDWARE_CATEGORIES, COMPONENTS } from './data/components.js';
import { BUILD_TEMPLATES } from './data/templates.js';
import { validateBuildCompleteness, validateCompatibility, calculateBuildCosts } from './engines/validator.js';
import { calculateAllGamesFps } from './engines/fps-engine.js';
import { calculateProductivityBenchmarks } from './engines/productivity-engine.js';
import { analyzeRigBottlenecks } from './engines/bottleneck-analyzer.js';
import { calculateTemperatures } from './engines/thermal-engine.js';
import { RigVisualizer } from './engines/rig-visualizer.js';
import { sound } from './utils/sound.js';
import { ADVISOR_QUESTIONS, curatePeripherals } from './advisor/peripheral-advisor.js';
import { encodeBuildToHash, decodeBuildFromHash, generateRedditMarkdown } from './utils/exporter.js';
import { currencyEngine, SUPPORTED_REGIONS } from './engines/currency-engine.js';

class TPCBuildApp {
  constructor() {
    this.build = {
      cpu: null, cooler: null, motherboard: null, ram: null,
      gpu: null, storage: null, psu: null, case: null
    };
    this.isPoweredOn = false;
    this.activeCategoryModal = null;
    this.activeTagFilter = 'all';
    this.isDarkMode = true;
    this.visualizer = null;

    this.fpsOptions = {
      resolution: '1440p',
      preset: 'ultra',
      rayTracing: false,
      dlssMode: 'off'
    };

    this.advisorAnswers = {
      primaryUse: 'gaming',
      aestheticStyle: 'rgb-cyber',
      keyboardPreference: 'mechanical',
      mousePreference: 'ultralight',
      audioPreference: 'spatial-headset'
    };
    this.peripheralBudget = 400;
    this.selectedPeripherals = [];

    this.init();
  }

  async init() {
    // Restore theme from localStorage
    const savedTheme = localStorage.getItem('tpc_theme') || 'dark';
    this.setThemeMode(savedTheme === 'dark');

    // Check if build is encoded in URL hash
    const hashBuild = decodeBuildFromHash(window.location.hash);
    if (hashBuild && Object.keys(hashBuild).length > 0) {
      this.build = { ...this.build, ...hashBuild };
    } else {
      const defaultTemplate = BUILD_TEMPLATES[2] || BUILD_TEMPLATES[0];
      if (defaultTemplate) {
        this.build = { ...defaultTemplate.parts };
      }
    }

    this.visualizer = new RigVisualizer('rigCanvas');
    this.visualizer.setBuild(this.build);

    // Bind UI events
    this.bindEvents();

    // Subscribe to currency engine updates
    currencyEngine.onCurrencyChange(() => {
      this.updateLocationUI();
      this.renderAll();
    });

    // Update location UI immediately
    this.updateLocationUI();
    this.renderAll();

    // Auto-detect user location in background on initial load
    if (!localStorage.getItem('tpc_region')) {
      currencyEngine.detectUserLocation().then(() => {
        this.updateLocationUI();
        this.renderAll();
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  setThemeMode(isDark) {
    this.isDarkMode = isDark;
    localStorage.setItem('tpc_theme', isDark ? 'dark' : 'light');

    const doc = document.documentElement;
    const icon = document.getElementById('themeIcon');

    if (isDark) {
      doc.classList.remove('light');
      doc.classList.add('dark');
      if (icon) {
        icon.setAttribute('data-lucide', 'sun');
        icon.className = 'w-4 h-4 text-amber-400';
      }
    } else {
      doc.classList.remove('dark');
      doc.classList.add('light');
      if (icon) {
        icon.setAttribute('data-lucide', 'moon');
        icon.className = 'w-4 h-4 text-blue-600';
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  toggleTheme() {
    // Intentionally NO sound on theme switch as per user feedback
    this.setThemeMode(!this.isDarkMode);
  }

  updateLocationUI() {
    const region = currencyEngine.getRegion();
    const flags = {
      US: '🇺🇸', IN: '🇮🇳', GB: '🇬🇧', EU: '🇪🇺',
      CA: '🇨🇦', AU: '🇦🇺', JP: '🇯🇵', SG: '🇸🇬', AE: '🇦🇪'
    };

    const flagSpan = document.getElementById('detectedCountryFlag');
    if (flagSpan) flagSpan.textContent = flags[region.countryCode] || '🌐';

    const locText = document.getElementById('detectedLocationText');
    if (locText) {
      const cityPart = currencyEngine.detectedCity ? `${currencyEngine.detectedCity}, ` : '';
      locText.textContent = `${cityPart}${region.countryName} • ${region.currency} (${region.symbol})`;
    }

    const select = document.getElementById('countryCurrencySelect');
    if (select && select.value !== region.countryCode) {
      select.value = region.countryCode;
    }

    const summaryCountry = document.getElementById('summaryCountryName');
    if (summaryCountry) summaryCountry.textContent = region.countryName;

    const summaryCourier = document.getElementById('summaryCourierText');
    if (summaryCourier) summaryCourier.textContent = region.courier;

    const summaryDays = document.getElementById('summaryDeliveryDays');
    if (summaryDays) summaryDays.textContent = `Est. Delivery: ${region.deliveryDays}`;
  }

  bindEvents() {
    // Theme Switcher (NO SOUND)
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Geolocation Detection Button
    const detectLocationBtn = document.getElementById('detectLocationBtn');
    if (detectLocationBtn) {
      detectLocationBtn.addEventListener('click', async () => {
        detectLocationBtn.innerHTML = '<i data-lucide="loader" class="w-3 h-3 animate-spin"></i> Detecting...';
        await currencyEngine.detectUserLocation();
        this.updateLocationUI();
        this.renderAll();
        detectLocationBtn.innerHTML = '<i data-lucide="crosshair" class="w-3 h-3"></i> Auto-Detect';
        if (window.lucide) window.lucide.createIcons();
      });
    }

    // Country / Currency Dropdown
    const countrySelect = document.getElementById('countryCurrencySelect');
    if (countrySelect) {
      countrySelect.addEventListener('change', (e) => {
        currencyEngine.setRegion(e.target.value);
        this.updateLocationUI();
        this.renderAll();
      });
    }

    // Navigation Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
    });

    document.querySelectorAll('[data-switch-tab]').forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn.dataset.switchTab));
    });

    // Physical Chassis Power Switch (Authentic Lightswitch Sound)
    const physicalPowerBtn = document.getElementById('physicalPowerBtn');
    if (physicalPowerBtn) {
      physicalPowerBtn.addEventListener('click', () => this.handlePowerSwitch());
    }

    const quickTestRigBtn = document.getElementById('quickTestRigBtn');
    if (quickTestRigBtn) {
      quickTestRigBtn.addEventListener('click', () => {
        const validation = validateBuildCompleteness(this.build);
        if (!validation.isComplete) {
          this.showPostErrorModal(validation.missingParts);
        } else {
          if (!this.isPoweredOn) this.handlePowerSwitch();
          this.switchTab('benchmark');
        }
      });
    }

    const goToBenchmarksBtn = document.getElementById('goToBenchmarksBtn');
    if (goToBenchmarksBtn) {
      goToBenchmarksBtn.addEventListener('click', () => {
        const validation = validateBuildCompleteness(this.build);
        if (!validation.isComplete) {
          this.showPostErrorModal(validation.missingParts);
        } else {
          if (!this.isPoweredOn) this.handlePowerSwitch();
          this.switchTab('benchmark');
        }
      });
    }

    // Reset Rig
    const resetBuildBtn = document.getElementById('resetBuildBtn');
    if (resetBuildBtn) {
      resetBuildBtn.addEventListener('click', () => {
        if (confirm('Clear all parts from your virtual PC?')) {
          this.build = {
            cpu: null, cooler: null, motherboard: null, ram: null,
            gpu: null, storage: null, psu: null, case: null
          };
          this.isPoweredOn = false;
          this.visualizer.setBuild(this.build);
          this.visualizer.setPower(false);
          this.renderAll();
          sound.playPowerClick();
        }
      });
    }

    // Sound Toggle
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        const isMuted = sound.toggleMute();
        const icon = document.getElementById('soundIcon');
        if (icon) {
          icon.setAttribute('data-lucide', isMuted ? 'volume-x' : 'volume-2');
          if (window.lucide) window.lucide.createIcons();
        }
      });
    }

    // Glass Panel Toggle
    const toggleSidePanelBtn = document.getElementById('toggleSidePanelBtn');
    if (toggleSidePanelBtn) {
      toggleSidePanelBtn.addEventListener('click', () => {
        const isClosed = this.visualizer.toggleSidePanel();
        const label = document.getElementById('glassPanelLabel');
        if (label) label.textContent = isClosed ? 'Open Glass Panel' : 'Close Glass Panel';
        sound.playPowerClick();
      });
    }

    // RGB Preset Buttons
    const rgbThemeButtons = document.getElementById('rgbThemeButtons');
    if (rgbThemeButtons) {
      rgbThemeButtons.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          this.visualizer.setTheme(btn.dataset.theme);
          sound.playPowerClick();
        });
      });
    }

    // FPS Controls: Resolution Buttons
    document.querySelectorAll('.fps-res-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.fps-res-btn').forEach(b => {
          b.classList.remove('active', 'bg-blue-600', 'text-white', 'font-bold');
          b.classList.add('text-slate-400');
        });
        btn.classList.add('active', 'bg-blue-600', 'text-white', 'font-bold');
        btn.classList.remove('text-slate-400');
        this.fpsOptions.resolution = btn.dataset.res;
        this.renderBenchmarks();
      });
    });

    const fpsPresetSelect = document.getElementById('fpsPresetSelect');
    if (fpsPresetSelect) {
      fpsPresetSelect.addEventListener('change', (e) => {
        this.fpsOptions.preset = e.target.value;
        this.renderBenchmarks();
      });
    }

    const fpsRtToggleBtn = document.getElementById('fpsRtToggleBtn');
    if (fpsRtToggleBtn) {
      fpsRtToggleBtn.addEventListener('click', () => {
        this.fpsOptions.rayTracing = !this.fpsOptions.rayTracing;
        const label = document.getElementById('rtToggleLabel');
        if (this.fpsOptions.rayTracing) {
          fpsRtToggleBtn.classList.add('bg-blue-600/20', 'border-blue-500', 'text-blue-400');
          if (label) label.textContent = 'RT: ON';
        } else {
          fpsRtToggleBtn.classList.remove('bg-blue-600/20', 'border-blue-500', 'text-blue-400');
          if (label) label.textContent = 'RT: OFF';
        }
        this.renderBenchmarks();
      });
    }

    const fpsDlssSelect = document.getElementById('fpsDlssSelect');
    if (fpsDlssSelect) {
      fpsDlssSelect.addEventListener('change', (e) => {
        this.fpsOptions.dlssMode = e.target.value;
        this.renderBenchmarks();
      });
    }

    // Budget Slider
    const budgetSlider = document.getElementById('peripheralBudgetSlider');
    if (budgetSlider) {
      budgetSlider.addEventListener('input', (e) => {
        this.peripheralBudget = Number(e.target.value);
        const display = document.getElementById('budgetDisplayValue');
        if (display) display.textContent = currencyEngine.formatPrice(this.peripheralBudget);
        this.renderPeripherals();
      });
    }

    // Modal Close
    const closePartModalBtn = document.getElementById('closePartModalBtn');
    if (closePartModalBtn) closePartModalBtn.addEventListener('click', () => this.closePartModal());

    const closePostModalBtn = document.getElementById('closePostModalBtn');
    if (closePostModalBtn) {
      closePostModalBtn.addEventListener('click', () => {
        document.getElementById('postErrorModal').classList.add('hidden');
        this.switchTab('builder');
      });
    }

    const openShareModalBtn = document.getElementById('openShareModalBtn');
    if (openShareModalBtn) openShareModalBtn.addEventListener('click', () => this.openShareModal());

    const closeShareModalBtn = document.getElementById('closeShareModalBtn');
    if (closeShareModalBtn) {
      closeShareModalBtn.addEventListener('click', () => {
        document.getElementById('shareModal').classList.add('hidden');
      });
    }

    const copyShareUrlBtn = document.getElementById('copyShareUrlBtn');
    if (copyShareUrlBtn) {
      copyShareUrlBtn.addEventListener('click', () => {
        const input = document.getElementById('shareUrlInput');
        if (input) {
          input.select();
          navigator.clipboard.writeText(input.value);
          copyShareUrlBtn.textContent = 'Copied!';
          setTimeout(() => copyShareUrlBtn.textContent = 'Copy', 2000);
        }
      });
    }

    const copyMarkdownBtn = document.getElementById('copyMarkdownBtn');
    if (copyMarkdownBtn) {
      copyMarkdownBtn.addEventListener('click', () => {
        const ta = document.getElementById('markdownOutput');
        if (ta) {
          navigator.clipboard.writeText(ta.value);
          copyMarkdownBtn.textContent = 'Copied!';
          setTimeout(() => copyMarkdownBtn.textContent = 'Copy Markdown', 2000);
        }
      });
    }

    const partSearchInput = document.getElementById('partSearchInput');
    if (partSearchInput) {
      partSearchInput.addEventListener('input', (e) => {
        this.filterModalParts(e.target.value);
      });
    }
  }

  switchTab(tabId) {
    document.querySelectorAll('section[id^="tab-"]').forEach(s => s.classList.add('hidden'));
    const targetSection = document.getElementById(`tab-${tabId}`);
    if (targetSection) targetSection.classList.remove('hidden');

    document.querySelectorAll('.tab-btn').forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('active');
        btn.classList.add('text-slate-400');
      }
    });

    if (tabId === 'chassis' && this.visualizer) {
      this.visualizer.resize();
    }
    if (tabId === 'benchmark') {
      this.renderBenchmarks();
    }
    if (window.lucide) window.lucide.createIcons();
  }

  handlePowerSwitch() {
    // Play authentic mechanical lightswitch snap
    sound.playPowerClick();
    const validation = validateBuildCompleteness(this.build);

    if (!validation.isComplete) {
      sound.playPostErrorAlarm();
      this.isPoweredOn = false;
      this.visualizer.setPower(false);
      this.showPostErrorModal(validation.missingParts);
      this.updateChassisStatusUI(false, validation);
    } else {
      this.isPoweredOn = !this.isPoweredOn;
      this.visualizer.setPower(this.isPoweredOn);
      if (this.isPoweredOn) {
        sound.playPostSuccessBeep();
        sound.playFanSpinUp();
      }
      this.updateChassisStatusUI(this.isPoweredOn, validation);
      this.renderBenchmarks();
    }
  }

  showPostErrorModal(missingParts) {
    const modal = document.getElementById('postErrorModal');
    const list = document.getElementById('postErrorChecklist');
    if (!modal || !list) return;

    list.innerHTML = missingParts.map(part => `
      <div class="p-2.5 rounded-lg bg-red-900/30 border border-red-800/40 text-left">
        <div class="font-bold text-red-300 flex items-center gap-1.5">
          <i data-lucide="x-circle" class="w-3.5 h-3.5 text-red-400"></i> Missing: ${part.name}
        </div>
        <div class="text-[11px] text-slate-300 mt-0.5">${part.reason}</div>
      </div>
    `).join('');

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  updateChassisStatusUI(poweredOn, validation) {
    const postLed = document.getElementById('postLedText');
    const powerBtn = document.getElementById('physicalPowerBtn');
    const powerBtnIcon = document.getElementById('powerBtnIcon');
    const powerBtnText = document.getElementById('powerBtnText');
    const liveWattage = document.getElementById('liveWattageText');
    const canvasPowerIndicator = document.getElementById('canvasPowerIndicator');
    const postErrorOverlay = document.getElementById('postErrorOverlay');
    const chassisStatusDot = document.getElementById('chassisStatusDot');
    const chassisCpuTemp = document.getElementById('chassisCpuTemp');
    const chassisGpuTemp = document.getElementById('chassisGpuTemp');

    const compat = validateCompatibility(this.build);
    const thermals = calculateTemperatures(this.build, 'idle');

    if (poweredOn) {
      if (powerBtn) {
        powerBtn.classList.add('border-emerald-500', 'bg-emerald-950/30');
        powerBtn.classList.remove('border-slate-700');
      }
      if (powerBtnIcon) {
        powerBtnIcon.classList.add('text-emerald-400');
        powerBtnIcon.classList.remove('text-slate-400');
      }
      if (powerBtnText) {
        powerBtnText.textContent = 'ON';
        powerBtnText.classList.add('text-emerald-400');
      }
      if (postLed) {
        postLed.textContent = 'NORMAL (GREEN)';
        postLed.className = 'font-mono font-bold text-emerald-400';
      }
      if (liveWattage) {
        liveWattage.textContent = `~${compat.totalTdp}W (Active)`;
        liveWattage.className = 'font-mono text-blue-400 font-bold';
      }
      if (canvasPowerIndicator) {
        canvasPowerIndicator.textContent = 'ONLINE (ACTIVE)';
        canvasPowerIndicator.className = 'text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      }
      if (postErrorOverlay) postErrorOverlay.classList.add('hidden');
      if (chassisStatusDot) chassisStatusDot.className = 'w-2 h-2 rounded-full bg-emerald-400';

      if (chassisCpuTemp) {
        chassisCpuTemp.textContent = `${thermals.idleCpu}°C (Normal)`;
        chassisCpuTemp.className = 'font-mono font-bold text-emerald-400';
      }
      if (chassisGpuTemp) {
        chassisGpuTemp.textContent = `${thermals.idleGpu}°C (0dB Fan)`;
        chassisGpuTemp.className = 'font-mono font-bold text-blue-400';
      }

    } else {
      if (powerBtn) {
        powerBtn.classList.remove('border-emerald-500', 'bg-emerald-950/30');
        powerBtn.classList.add('border-slate-700');
      }
      if (powerBtnIcon) {
        powerBtnIcon.classList.remove('text-emerald-400');
        powerBtnIcon.classList.add('text-slate-400');
      }
      if (powerBtnText) {
        powerBtnText.textContent = 'OFF';
        powerBtnText.classList.remove('text-emerald-400');
      }
      if (liveWattage) liveWattage.textContent = '0W';
      if (canvasPowerIndicator) {
        canvasPowerIndicator.textContent = 'POWER OFF';
        canvasPowerIndicator.className = 'text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700';
      }
      if (chassisCpuTemp) chassisCpuTemp.textContent = '-- °C';
      if (chassisGpuTemp) chassisGpuTemp.textContent = '-- °C';

      if (validation && !validation.isComplete) {
        if (postLed) {
          postLed.textContent = 'POST HALTED (RED)';
          postLed.className = 'font-mono font-bold text-red-400';
        }
        if (chassisStatusDot) chassisStatusDot.className = 'w-2 h-2 rounded-full bg-red-400';
      } else {
        if (postLed) {
          postLed.textContent = 'STANDBY (OFF)';
          postLed.className = 'font-mono font-bold text-slate-500';
        }
        if (chassisStatusDot) chassisStatusDot.className = 'w-2 h-2 rounded-full bg-slate-600';
      }
    }
  }

  renderAll() {
    this.renderHeaderAndSummary();
    this.renderCategoryCards();
    this.renderChassisQuickList();
    this.renderBenchmarks();
    this.renderPeripherals();
    this.renderTemplates();
    this.visualizer.setBuild(this.build);

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderHeaderAndSummary() {
    const costs = calculateBuildCosts(this.build);
    const compat = validateCompatibility(this.build);
    const validation = validateBuildCompleteness(this.build);

    // Order calculation with local currency, shipping fee & estimated tax
    const order = currencyEngine.calculateOrderCost(costs.partsTotal);

    // Header updates
    const headerTotalPrice = document.getElementById('headerTotalPrice');
    if (headerTotalPrice) headerTotalPrice.textContent = order.totalDeliveredFormatted;

    const headerWattage = document.getElementById('headerWattage');
    if (headerWattage) headerWattage.textContent = `~${compat.totalTdp}W`;

    const assemblyBadge = document.getElementById('assemblyBadge');
    if (assemblyBadge) assemblyBadge.textContent = `${validation.completedCount}/8`;

    // Cost Breakdown Card updates
    const subtotalPriceEl = document.getElementById('builderSubtotalPrice');
    if (subtotalPriceEl) subtotalPriceEl.textContent = order.partsSubtotalFormatted;

    const shippingPriceEl = document.getElementById('builderShippingPrice');
    if (shippingPriceEl) shippingPriceEl.textContent = order.shippingFeeFormatted;

    const taxLabelEl = document.getElementById('builderTaxLabel');
    if (taxLabelEl) taxLabelEl.textContent = order.taxLabel;

    const taxPriceEl = document.getElementById('builderTaxPrice');
    if (taxPriceEl) taxPriceEl.textContent = order.estimatedTaxFormatted;

    const builderTotalPrice = document.getElementById('builderTotalPrice');
    if (builderTotalPrice) builderTotalPrice.textContent = order.totalDeliveredFormatted;

    // Banner updates
    const banner = document.getElementById('assemblyBanner');
    const bannerTitle = document.getElementById('assemblyBannerTitle');
    const bannerSub = document.getElementById('assemblyBannerSubtitle');
    const bannerIcon = document.getElementById('assemblyBannerIcon');
    const progressText = document.getElementById('assemblyProgressText');
    const progressBar = document.getElementById('assemblyProgressBar');

    if (progressText) progressText.textContent = `${validation.completedCount} of 8 Parts`;
    if (progressBar) progressBar.style.width = `${validation.progressPercent}%`;

    if (validation.isComplete) {
      if (banner) {
        banner.className = 'mb-6 p-4 rounded-xl border transition-all duration-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-emerald-950/20 border-emerald-500/30';
      }
      if (bannerTitle) bannerTitle.textContent = 'Assembly Complete: Rig is Ready to Power On!';
      if (bannerSub) bannerSub.textContent = 'All 8 essential components are equipped. Click "Power & Test Rig" to test frame rates and thermals.';
      if (bannerIcon) {
        bannerIcon.className = 'w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/30';
        bannerIcon.innerHTML = '<i data-lucide="check-circle-2" class="w-5 h-5"></i>';
      }
    } else {
      if (banner) {
        banner.className = 'mb-6 p-4 rounded-xl border transition-all duration-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-slate-900/60 border-slate-800';
      }
      if (bannerTitle) bannerTitle.textContent = 'Realistic Build Rules: Missing Core Hardware';
      const missingNames = validation.missingParts.map(p => p.name.split(' ')[0]).join(', ');
      if (bannerSub) bannerSub.textContent = `Missing parts: ${missingNames}. System power and testing remain locked until fully assembled.`;
      if (bannerIcon) {
        bannerIcon.className = 'w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/20';
        bannerIcon.innerHTML = '<i data-lucide="alert-triangle" class="w-5 h-5"></i>';
      }
    }
  }

  renderCategoryCards() {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;

    container.innerHTML = HARDWARE_CATEGORIES.map(cat => {
      const partId = this.build[cat.id];
      const part = partId ? (COMPONENTS[cat.id] || []).find(p => p.id === partId) : null;

      return `
        <div class="glass-card rounded-xl p-4 border ${part ? 'border-slate-700 bg-slate-900/70' : 'border-dashed border-slate-800 bg-slate-950/30'} flex flex-col justify-between transition-all">
          <div class="flex items-start justify-between gap-3">
            
            <div class="flex items-start space-x-3">
              <!-- Part Picture / Category Icon -->
              <div class="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border ${part ? 'border-slate-700' : 'border-slate-800 bg-slate-800'} flex items-center justify-center bg-slate-900">
                ${part ? `
                  <img src="${part.image}" alt="${part.name}" class="w-full h-full object-cover">
                ` : `
                  <i data-lucide="${cat.icon}" class="w-6 h-6 text-slate-500"></i>
                `}
              </div>

              <div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">${cat.name}</span>
                  <span class="text-[10px] font-semibold px-1.5 py-0.2 rounded ${part ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}">
                    ${part ? 'Equipped' : 'Required'}
                  </span>
                </div>

                ${part ? `
                  <h4 class="text-sm font-bold text-white mt-1 leading-snug">${part.name}</h4>
                  <div class="flex items-center space-x-2 mt-0.5">
                    <span class="text-xs font-semibold text-blue-400 font-mono">${currencyEngine.formatPrice(part.price)}</span>
                    ${part.tierLabel ? `<span class="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">${part.tierLabel}</span>` : ''}
                  </div>
                ` : `
                  <h4 class="text-xs text-slate-500 italic mt-1">${cat.description}</h4>
                `}
              </div>
            </div>

            <button data-select-category="${cat.id}" class="px-3.5 py-2 min-h-[36px] flex items-center justify-center rounded-lg ${part ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-blue-600 hover:bg-blue-500 text-white font-semibold'} text-xs transition-colors whitespace-nowrap shadow-sm flex-shrink-0">
              ${part ? 'Change' : 'Choose +'}
            </button>
          </div>

          ${part ? `
            <div class="mt-3 pt-3 border-t border-slate-800/80 space-y-2">
              
              <!-- Beginner-friendly Badges & Tags -->
              <div class="flex flex-wrap gap-1.5">
                ${(part.tags || []).map(tag => `
                  <span class="part-pill-tag">
                    ${tag}
                  </span>
                `).join('')}
              </div>

              <!-- Direct Retail Links -->
              <div class="flex flex-wrap items-center justify-between pt-1 gap-1.5 text-xs">
                <div class="text-slate-400 text-[11px]">Direct Store Links:</div>
                <div class="flex items-center space-x-2">
                  <a href="${part.links.amazon}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 min-h-[30px] inline-flex items-center rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 font-bold border border-amber-500/20 transition-colors">
                    Amazon ↗
                  </a>
                  <a href="${part.links.newegg}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 min-h-[30px] inline-flex items-center rounded bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 font-bold border border-orange-500/20 transition-colors">
                    Newegg ↗
                  </a>
                  <button data-remove-part="${cat.id}" class="text-slate-500 hover:text-red-400 p-1.5 min-w-[30px] min-h-[30px] inline-flex items-center justify-center transition-colors" title="Remove part">
                    <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </div>

            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    container.querySelectorAll('[data-select-category]').forEach(btn => {
      btn.addEventListener('click', () => this.openPartModal(btn.dataset.selectCategory));
    });

    container.querySelectorAll('[data-remove-part]').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.dataset.removePart;
        this.build[catId] = null;
        this.isPoweredOn = false;
        this.renderAll();
        sound.playPowerClick();
      });
    });
  }

  renderChassisQuickList() {
    const list = document.getElementById('chassisPartsList');
    if (!list) return;

    list.innerHTML = HARDWARE_CATEGORIES.map(cat => {
      const partId = this.build[cat.id];
      const part = partId ? (COMPONENTS[cat.id] || []).find(p => p.id === partId) : null;

      return `
        <div class="flex items-center justify-between p-2 rounded-lg ${part ? 'bg-slate-900/60' : 'bg-red-950/20 border border-red-900/30'}">
          <div class="flex items-center space-x-2 truncate">
            <i data-lucide="${part ? 'check-circle' : 'alert-circle'}" class="w-3.5 h-3.5 ${part ? 'text-emerald-400' : 'text-red-400'} flex-shrink-0"></i>
            <span class="text-slate-300 truncate">${part ? part.name : cat.name}</span>
          </div>
          <span class="text-xs font-mono ${part ? 'text-blue-400' : 'text-red-400'} flex-shrink-0 ml-2">
            ${part ? currencyEngine.formatPrice(part.price) : 'MISSING'}
          </span>
        </div>
      `;
    }).join('');
  }

  renderBenchmarks() {
    const validation = validateBuildCompleteness(this.build);
    const lockBanner = document.getElementById('benchmarkLockBanner');
    const content = document.getElementById('benchmarkContent');

    if (!validation.isComplete) {
      if (lockBanner) lockBanner.classList.remove('hidden');
      if (content) content.classList.add('hidden');
      return;
    } else {
      if (lockBanner) lockBanner.classList.add('hidden');
      if (content) content.classList.remove('hidden');
    }

    // Peak Gaming Load Thermals
    const thermals = calculateTemperatures(this.build, 'gaming-peak');
    const thermalCard = document.getElementById('thermalTelemetryCard');
    if (thermalCard) {
      thermalCard.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <div class="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${thermals.cpuBadge} mb-1">
              <i data-lucide="thermometer" class="w-3.5 h-3.5"></i>
              <span>${thermals.thermalMessage}</span>
            </div>
            <h3 class="text-base font-bold text-white">Peak Gaming Thermal Telemetry</h3>
            <p class="text-xs text-slate-400">Cooling solution: <strong class="text-slate-200">${thermals.coolerType}</strong></p>
          </div>

          <!-- Gauges: Peak CPU & GPU -->
          <div class="flex items-center space-x-6">
            <div class="text-right">
              <span class="text-[11px] text-slate-400">Peak CPU Temp:</span>
              <div class="text-2xl font-black font-mono ${thermals.peakCpu > 85 ? 'text-red-400' : 'text-blue-400'}">${thermals.peakCpu}°C</div>
              <span class="text-[10px] text-slate-500">${100 - thermals.peakCpu}°C to TjMax limit</span>
            </div>

            <div class="text-right border-l border-slate-800 pl-6">
              <span class="text-[11px] text-slate-400">Peak GPU Temp:</span>
              <div class="text-2xl font-black font-mono text-indigo-400">${thermals.peakGpu}°C</div>
              <span class="text-[10px] text-slate-500">Dual/Triple Fan Curve</span>
            </div>
          </div>
        </div>
      `;
    }

    // Bottleneck Report
    const bottleneckReport = analyzeRigBottlenecks(this.build, this.fpsOptions.resolution);
    const bottleneckCard = document.getElementById('bottleneckReportCard');
    if (bottleneckCard) {
      bottleneckCard.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold ${bottleneckReport.badgeColor} mb-2">
              <i data-lucide="activity" class="w-3.5 h-3.5"></i>
              <span>${bottleneckReport.badgeText}</span>
            </div>
            <h3 class="text-base font-bold text-white">Post-Test Bottleneck Diagnostic Report</h3>
            <p class="text-xs text-slate-400 mt-0.5">${bottleneckReport.verdictSummary}</p>
          </div>

          <div class="flex items-center space-x-4 bg-slate-900 p-3 rounded-xl border border-slate-800">
            <div class="text-right">
              <span class="text-[11px] text-slate-400">Bottleneck Ratio</span>
              <div class="text-2xl font-black font-mono text-blue-400">${bottleneckReport.bottleneckPercentage}%</div>
            </div>
            <div class="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center font-bold text-xs" style="border-top-color: ${bottleneckReport.bottleneckPercentage > 20 ? '#ef4444' : '#10b981'}">
              ${100 - bottleneckReport.bottleneckPercentage}%
            </div>
          </div>
        </div>

        ${bottleneckReport.bottlenecks.length > 0 ? `
          <div class="mt-4 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300">Diagnostic Findings:</h4>
            ${bottleneckReport.bottlenecks.map(b => `
              <div class="p-3 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
                <div class="text-xs font-bold text-white flex items-center space-x-1.5">
                  <i data-lucide="${b.severity === 'critical' ? 'alert-triangle' : 'info'}" class="w-4 h-4 ${b.severity === 'critical' ? 'text-red-400' : 'text-amber-400'}"></i>
                  <span>${b.title}</span>
                </div>
                <p class="text-xs text-slate-400 pl-5">${b.explanation}</p>
                <p class="text-xs text-blue-400 pl-5 font-medium">Recommendation: ${b.solution}</p>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="mt-4 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 flex items-center space-x-2">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
            <span>Zero harmful bottlenecks detected! CPU, GPU, and RAM operate with balanced throughput.</span>
          </div>
        `}

        ${bottleneckReport.upgradeRecommendation ? `
          <div class="mt-4 p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Suggested Upgrade to Resolve Bottleneck:</span>
              <h5 class="text-sm font-bold text-white mt-0.5">${bottleneckReport.upgradeRecommendation.recommendedItem.name} (${currencyEngine.formatPrice(bottleneckReport.upgradeRecommendation.recommendedItem.price)})</h5>
              <p class="text-xs text-slate-300">${bottleneckReport.upgradeRecommendation.reason}</p>
            </div>
            <a href="${bottleneckReport.upgradeRecommendation.recommendedItem.links.amazon}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs whitespace-nowrap shadow-sm">
              View on Amazon ↗
            </a>
          </div>
        ` : ''}
      `;
    }

    // Games FPS Grid
    const gamesFps = calculateAllGamesFps(this.build, this.fpsOptions);
    const gamesContainer = document.getElementById('gamesFpsContainer');
    if (gamesContainer) {
      gamesContainer.innerHTML = gamesFps.map(game => `
        <div class="glass-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between glass-card-hover">
          <div>
            <div class="flex items-start justify-between gap-2">
              <h4 class="text-sm font-bold text-white">${game.gameTitle}</h4>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${game.tierBg} ${game.tierColor}">
                ${game.tierLabel}
              </span>
            </div>
            <div class="flex items-baseline space-x-2 mt-3">
              <span class="text-3xl font-black font-mono text-blue-400">${game.avgFps}</span>
              <span class="text-xs font-semibold text-slate-400 uppercase">FPS Avg</span>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div>
              <span class="text-slate-500">1% Low:</span>
              <span class="font-bold text-slate-300">${game.onePercentLow} FPS</span>
            </div>
            <div>
              <span class="text-slate-500">Latency:</span>
              <span class="font-bold text-slate-300">${game.frameTimeMs} ms</span>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Productivity Benchmarks
    const productivity = calculateProductivityBenchmarks(this.build);
    const prodContainer = document.getElementById('productivityContainer');
    if (prodContainer && productivity) {
      prodContainer.innerHTML = `
        <div class="glass-card rounded-xl p-4 border border-slate-800 space-y-2">
          <div class="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <i data-lucide="box" class="w-3.5 h-3.5 text-orange-400"></i> ${productivity.blender.name}
          </div>
          <div class="text-2xl font-black text-white font-mono">${productivity.blender.renderTimeSeconds}s</div>
          <div class="text-xs text-slate-400">Classroom Scene Render Time</div>
          <div class="text-[11px] font-bold text-emerald-400 mt-2">${productivity.blender.rating}</div>
        </div>

        <div class="glass-card rounded-xl p-4 border border-slate-800 space-y-2">
          <div class="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <i data-lucide="video" class="w-3.5 h-3.5 text-purple-400"></i> ${productivity.premiere.name}
          </div>
          <div class="text-2xl font-black text-white font-mono">${productivity.premiere.exportMultiplier}</div>
          <div class="text-xs text-slate-400">10-min 4K Timeline: ${productivity.premiere.tenMinExportFormatted}</div>
          <div class="text-[11px] font-bold text-purple-400 mt-2">${productivity.premiere.rating}</div>
        </div>

        <div class="glass-card rounded-xl p-4 border border-slate-800 space-y-2">
          <div class="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <i data-lucide="cpu" class="w-3.5 h-3.5 text-blue-400"></i> ${productivity.cinebench.name}
          </div>
          <div class="text-2xl font-black text-white font-mono">${productivity.cinebench.multiCoreScore}</div>
          <div class="text-xs text-slate-400">Multi-Core (Single: ${productivity.cinebench.singleCoreScore})</div>
          <div class="text-[11px] font-bold text-blue-400 mt-2">${productivity.cinebench.rating}</div>
        </div>

        <div class="glass-card rounded-xl p-4 border border-slate-800 space-y-2">
          <div class="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-pink-400"></i> ${productivity.aiInference.name}
          </div>
          <div class="text-2xl font-black text-white font-mono">${productivity.aiInference.tokensPerSec}</div>
          <div class="text-xs text-slate-400">Stable Diffusion: ${productivity.aiInference.sdxlImagesPerMin}</div>
          <div class="text-[11px] font-bold text-pink-400 mt-2">${productivity.aiInference.rating}</div>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  renderPeripherals() {
    const qContainer = document.getElementById('advisorQuestionsContainer');
    if (qContainer) {
      qContainer.innerHTML = ADVISOR_QUESTIONS.map(q => `
        <div class="glass-card rounded-xl p-4 border border-slate-800 space-y-3">
          <h4 class="text-sm font-bold text-white">${q.title}</h4>
          <p class="text-xs text-slate-400">${q.description}</p>
          <div class="space-y-2">
            ${q.options.map(opt => `
              <label class="flex items-start space-x-3 p-2.5 rounded-lg border border-slate-800/80 hover:border-blue-500/40 bg-slate-900/40 cursor-pointer transition-colors ${this.advisorAnswers[q.id] === opt.value ? 'border-blue-500 bg-blue-950/20' : ''}">
                <input type="radio" name="${q.id}" value="${opt.value}" ${this.advisorAnswers[q.id] === opt.value ? 'checked' : ''} class="mt-1 accent-blue-500">
                <div>
                  <div class="text-xs font-bold text-white">${opt.label}</div>
                  <div class="text-[11px] text-slate-400">${opt.sub}</div>
                </div>
              </label>
            `).join('')}
          </div>
        </div>
      `).join('');

      qContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          this.advisorAnswers[e.target.name] = e.target.value;

          // If customer chooses aesthetic vibe, sync rig visualizer preset
          if (e.target.name === 'aestheticStyle') {
            if (e.target.value === 'all-white') this.visualizer.setTheme('arctic');
            else if (e.target.value === 'stealth-black') this.visualizer.setTheme('stealth');
            else if (e.target.value === 'rgb-cyber') this.visualizer.setTheme('cyberpunk');
          }

          this.renderPeripherals();
        });
      });
    }

    const results = curatePeripherals(this.advisorAnswers, this.peripheralBudget, this.build);
    const bundleContainer = document.getElementById('curatedBundleContainer');
    if (bundleContainer) {
      bundleContainer.innerHTML = `
        <div class="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/80">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div class="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-1">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>Within Your Specified Budget</span>
              </div>
              <h3 class="text-base font-bold text-white">Curated Setup for Your Rig</h3>
              <p class="text-xs text-slate-400">${results.advisorSummary}</p>
            </div>
            <div class="text-right">
              <span class="text-xs text-slate-400">Bundle Total:</span>
              <div class="text-2xl font-black text-blue-400 font-mono">${currencyEngine.formatPrice(results.totalBundlePrice)}</div>
              <span class="text-[11px] text-emerald-400 font-medium">${currencyEngine.formatPrice(results.savings)} under budget cap</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            ${results.bundle.map(b => `
              <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <div class="w-full h-28 rounded-lg overflow-hidden mb-2 border border-slate-800 bg-slate-900">
                    <img src="${b.item.image}" alt="${b.item.name}" class="w-full h-full object-cover">
                  </div>
                  <span class="text-[10px] font-bold text-blue-400 uppercase tracking-wider">${b.category}</span>
                  <h4 class="text-xs font-bold text-white mt-1 line-clamp-2">${b.item.name}</h4>
                  <div class="text-sm font-black text-blue-400 font-mono mt-1">${currencyEngine.formatPrice(b.item.price)}</div>
                  
                  <div class="mt-2 space-y-1">
                    ${(b.item.features || []).slice(0, 2).map(f => `
                      <div class="text-[11px] text-slate-400 flex items-center gap-1">
                        <i data-lucide="check-circle-2" class="w-3 h-3 text-blue-400 flex-shrink-0"></i>
                        <span class="truncate">${f}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <a href="${b.item.links.amazon}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 font-bold transition-colors">
                    Amazon ↗
                  </a>
                  <a href="${b.item.links.newegg}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border border-orange-500/20 font-bold transition-colors">
                    Newegg ↗
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  renderTemplates() {
    const container = document.getElementById('templatesContainer');
    if (!container) return;

    container.innerHTML = BUILD_TEMPLATES.map(tmpl => `
      <div class="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4 glass-card-hover overflow-hidden">
        <div>
          <!-- Hero Rig Showcase Photo -->
          <div class="w-full h-44 rounded-xl overflow-hidden mb-3 border border-slate-800 relative group">
            <img src="${tmpl.image}" alt="${tmpl.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-2 left-2">
              <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/75 text-slate-200 border border-slate-700 backdrop-blur-sm">
                ${tmpl.badge}
              </span>
            </div>
            <div class="absolute bottom-2 right-2">
              <span class="text-sm font-black font-mono px-2.5 py-1 rounded-md bg-blue-600 text-white shadow-sm">
                ${currencyEngine.formatPrice(tmpl.estimatedPrice)}
              </span>
            </div>
          </div>

          <h3 class="text-base font-bold text-white mt-1">${tmpl.name}</h3>
          <p class="text-xs text-slate-400 mt-1">${tmpl.tagline}</p>
          <div class="text-xs font-semibold text-slate-300 mt-2 flex items-center gap-1">
            <i data-lucide="target" class="w-3.5 h-3.5 text-blue-400"></i> ${tmpl.targetResolution}
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 mt-3">
            ${(tmpl.tags || []).map(t => `
              <span class="part-pill-tag">
                ${t}
              </span>
            `).join('')}
          </div>
        </div>

        <button data-equip-template="${tmpl.id}" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center space-x-2">
          <i data-lucide="download" class="w-4 h-4"></i>
          <span>Equip This Complete Rig</span>
        </button>
      </div>
    `).join('');

    container.querySelectorAll('[data-equip-template]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tmplId = btn.dataset.equipTemplate;
        const tmpl = BUILD_TEMPLATES.find(t => t.id === tmplId);
        if (tmpl) {
          this.build = { ...tmpl.parts };
          this.isPoweredOn = true;

          // Sync lighting preset
          if (tmpl.aesthetic === 'all-white') this.visualizer.setTheme('arctic');
          else if (tmpl.aesthetic === 'stealth-black') this.visualizer.setTheme('stealth');
          else this.visualizer.setTheme('cyberpunk');

          this.renderAll();
          sound.playPowerClick();
          sound.playPostSuccessBeep();
          this.switchTab('chassis');
        }
      });
    });
  }

  openPartModal(categoryId) {
    this.activeCategoryModal = categoryId;
    this.activeTagFilter = 'all';

    const modal = document.getElementById('partModal');
    const title = document.getElementById('modalCategoryTitle');
    const desc = document.getElementById('modalCategoryDesc');
    const search = document.getElementById('partSearchInput');

    const cat = HARDWARE_CATEGORIES.find(c => c.id === categoryId);
    if (cat && title) title.textContent = `Choose ${cat.name}`;
    if (cat && desc) desc.textContent = cat.description;
    if (search) search.value = '';

    this.renderModalTagChips();
    this.filterModalParts('');

    if (modal) modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  closePartModal() {
    const modal = document.getElementById('partModal');
    if (modal) modal.classList.add('hidden');
    this.activeCategoryModal = null;
    this.activeTagFilter = 'all';
  }

  renderModalTagChips() {
    const container = document.getElementById('modalTagChipsContainer');
    if (!container || !this.activeCategoryModal) return;

    // Collect all unique tags for this category
    const parts = COMPONENTS[this.activeCategoryModal] || [];
    const tagSet = new Set();
    parts.forEach(p => {
      (p.tags || []).forEach(t => tagSet.add(t));
    });

    const tags = ['all', ...Array.from(tagSet).slice(0, 6)];

    container.innerHTML = tags.map(tag => `
      <button data-chip-tag="${tag}" class="tag-chip ${this.activeTagFilter === tag ? 'active' : ''}">
        ${tag === 'all' ? 'All Options' : tag}
      </button>
    `).join('');

    container.querySelectorAll('[data-chip-tag]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTagFilter = btn.dataset.chipTag;
        this.renderModalTagChips();
        const searchVal = document.getElementById('partSearchInput') ? document.getElementById('partSearchInput').value : '';
        this.filterModalParts(searchVal);
      });
    });
  }

  filterModalParts(query) {
    if (!this.activeCategoryModal) return;
    const list = document.getElementById('modalPartsList');
    if (!list) return;

    const parts = COMPONENTS[this.activeCategoryModal] || [];
    const q = (query || '').toLowerCase();
    const filtered = parts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)));
      
      const matchesTag = this.activeTagFilter === 'all' || 
        (p.tags && p.tags.includes(this.activeTagFilter));

      return matchesSearch && matchesTag;
    });

    if (filtered.length === 0) {
      list.innerHTML = `<div class="p-6 text-center text-xs text-slate-500">No components match your search and tag filters.</div>`;
      return;
    }

    list.innerHTML = filtered.map(part => {
      const isSelected = this.build[this.activeCategoryModal] === part.id;
      return `
        <div class="p-3.5 rounded-xl border ${isSelected ? 'border-blue-500 bg-blue-950/20' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'} flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
          <div class="flex items-start space-x-3">
            <!-- Hardware Picture -->
            <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-slate-800 bg-slate-950">
              <img src="${part.image}" alt="${part.name}" class="w-full h-full object-cover">
            </div>

            <div>
              <div class="flex items-center space-x-2">
                <span class="text-xs font-bold text-white">${part.name}</span>
                ${isSelected ? '<span class="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white">Equipped</span>' : ''}
              </div>

              <div class="flex items-center space-x-2 mt-0.5">
                <span class="text-xs font-mono font-bold text-blue-400">${currencyEngine.formatPrice(part.price)}</span>
                ${part.tierLabel ? `<span class="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">${part.tierLabel}</span>` : ''}
              </div>
              
              <!-- Tags list -->
              <div class="flex flex-wrap gap-1.5 mt-1.5">
                ${(part.tags || []).map(t => `
                  <span class="part-pill-tag text-[10px]">
                    ${t}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2 w-full sm:w-auto justify-end pt-1 sm:pt-0">
            <a href="${part.links.amazon}" target="_blank" rel="noopener noreferrer" class="px-3 py-2 min-h-[36px] inline-flex items-center justify-center rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 font-bold text-xs border border-amber-500/20 transition-colors">
              Amazon ↗
            </a>
            <button data-select-part-id="${part.id}" class="flex-1 sm:flex-initial px-4 py-2 min-h-[36px] flex items-center justify-center rounded-lg ${isSelected ? 'bg-slate-700 text-slate-300' : 'bg-blue-600 hover:bg-blue-500 text-white font-bold'} text-xs transition-colors shadow-sm">
              ${isSelected ? 'Selected' : 'Equip Part'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('[data-select-part-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const partId = btn.dataset.selectPartId;
        this.build[this.activeCategoryModal] = partId;
        sound.playPowerClick();
        this.closePartModal();
        this.renderAll();
      });
    });
  }

  openShareModal() {
    const modal = document.getElementById('shareModal');
    const input = document.getElementById('shareUrlInput');
    const markdown = document.getElementById('markdownOutput');

    const costs = calculateBuildCosts(this.build);
    const compat = validateCompatibility(this.build);

    const shareUrl = window.location.origin + window.location.pathname + encodeBuildToHash(this.build);
    if (input) input.value = shareUrl;

    if (markdown) {
      markdown.value = generateRedditMarkdown(this.build, costs.partsTotal, compat.totalTdp);
    }

    if (modal) modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }
}

function bootApp() {
  if (!window.tpcApp) {
    try {
      window.tpcApp = new TPCBuildApp();
      console.log('TPC BUILD Studio initialized successfully!');
    } catch (err) {
      console.error('Failed to initialize TPC BUILD Studio:', err);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
