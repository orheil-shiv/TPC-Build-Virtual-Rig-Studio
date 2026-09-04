# TPC BUILD: Build and test your rig virtually

<div align="center">
  <h3>Professional Virtual PC Engineering, Benchmarking & Localization Lab</h3>
  <p>Select components with direct purchase links, enforce realistic hardware assembly rules, simulate game FPS & thermals in real time, analyze bottlenecks, and calculate global localized pricing with regional shipping fees.</p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Light & Dark Mode](https://img.shields.io/badge/Theme-Light%20%7C%20Dark-indigo)](css/styles.css)
</div>

---

## ⚡ Overview

**TPC BUILD** is a browser-based hardware engineering simulator and virtual PC builder designed for both beginners and hardware enthusiasts. It bridges the gap between part selection, realistic physical compatibility, real-time gaming FPS/productivity simulation, and global retail pricing.

Unlike simple part lists, **TPC BUILD** requires all **8 core physical components** (CPU, Cooler, Motherboard, RAM, GPU, Storage, PSU, Case) before a computer can power on or execute benchmarks. Incomplete attempts simulate realistic BIOS motherboard POST diagnostic halts with acoustic error alarms and detailed missing-part checklists.

---

## 🌟 Key Features

### 1. 🛠️ Realistic Assembly Rules & BIOS POST Validation
- Just like in real life, a computer cannot boot or run benchmarks without its essential foundation.
- Requires **all 8 core components**:
  - **Processor (CPU)** &bull; **CPU Cooler (AIO or Air)** &bull; **Motherboard** &bull; **RAM Memory**
  - **Storage (NVMe SSD / SATA)** &bull; **Graphics Card (GPU)** &bull; **Power Supply (PSU)** &bull; **Chassis / Case**
- Incomplete rigs trigger **Motherboard POST Failures**:
  - 3-beep BIOS acoustic alarm (synthesized via Web Audio API)
  - Red diagnostic POST LED on the chassis panel
  - Visual error overlay detailing the exact missing components and technical reasons why the system cannot boot.

### 2. 🏷️ Beginner-Friendly Hardware Badges & Tags
- Simplifies complex technical naming into intuitive, readable tags:
  - **Cooling**: `💧 Water Cooled / AIO`, `🌬️ Dual Tower Air`, `Silent Air`
  - **Storage**: `⚡ NVMe PCIe 4.0`, `⚡ NVMe PCIe 3.0`, `SSD SATA III`
  - **Memory**: Clockspeeds & generations (`DDR5 6000MHz CL30`, `DDR4 3600MHz CL16`)
  - **Processors & GPUs**: `🎯 1440p Sweet Spot`, `👑 4K Ultra Flagship`, `🔥 8-Core Gaming King`, `⚡ Budget Hero`
- Instant modal tag filter chips allow sorting parts with a single click.

### 3. 🎨 Crisp Trovex-Inspired Light Mode & Matte Obsidian Dark Mode
- **Clean Normal Light Mode**: High-contrast, airy modern SaaS aesthetic (pure white cards, subtle ambient pastel aura, `#0f172a` charcoal typography, and crisp readable pill tags).
- **Matte Obsidian Dark Mode**: Sleek zinc surfaces (`#111827`) and electric blue accents without tacky neon halos or blur glow spam.
- **Silent Theme Switcher**: Toggle themes with zero jarring sounds.

### 4. 🔊 Authentic Mechanical Wall Lightswitch Audio
- Power button click synthesized using the native **Web Audio API** (zero external MP3 assets, zero latency).
- Accurate dual-transient acoustics:
  1. A **3,200 Hz bandpass burst** (12ms decay) simulating the tactile plastic rocker breaking contact.
  2. A **520 Hz resonant decay** (35ms) simulating the switch latching firmly into the chassis housing.

### 5. 🌍 Real-Time Geolocation, Multi-Currency & Shipping Charges
- **Auto-Detection**: Uses HTML5 Geolocation (`navigator.geolocation`) with reverse-geocoding, IP fallback, and timezone detection to locate the user's country and city in real time.
- **Global Currency Engine**: Converts all hardware prices dynamically into:
  - `USD ($)`, `INR (₹)`, `GBP (£)`, `EUR (€)`, `CAD (C$)`, `AUD (A$)`, `JPY (¥)`, `SGD (S$)`, `AED (AED)`
- **Itemized Delivery & Freight Calculator**:
  - Modeled for fragile 12–15kg desktop hardware shipments.
  - Automatically calculates **Hardware Subtotal**, **Insured Courier Freight** (FedEx, BlueDart, DHL, Purolator, Australia Post), **Regional Taxes (GST / VAT)**, and **Total Delivered Cost**.

### 6. 🎮 Real-Time Game FPS Simulator (12+ Titles)
- Realistic FPS predictions across 12 modern games:
  - *Cyberpunk 2077, Black Myth: Wukong, Call of Duty: Warzone, Fortnite, Valorant, GTA V, Apex Legends, Red Dead Redemption 2, Elden Ring, Starfield, Helldivers 2, and CS2*.
- Granular controls for:
  - **Resolutions**: 1080p FHD, 1440p QHD, 4K UHD.
  - **Presets**: Low / Competitive, Medium, High, Ultra.
  - **Ray Tracing**: Real-time RT penalty simulation.
  - **Upscaling**: DLSS / FSR Quality, Performance, and DLSS 3 Frame Generation.
- Telemetry displays **Average FPS**, **1% Lows**, and **Frame Latency (ms)**.

### 7. 🌡️ Dual Thermal Simulation Engine
- **Idle / Background Chassis Thermals**: Displays ambient-adjusted base temperatures in the interactive chassis viewport.
- **Peak Gaming Load Thermals**: Real-time simulation of CPU & GPU temperatures under max load with TjMax throttling alerts and cooler type diagnostics (360mm AIO vs Air Tower).

### 8. 🔍 Post-Test Bottleneck Diagnostic Report
- Evaluates CPU vs. GPU throughput balance.
- Reports bottleneck severity ratio (%), component limits, and provides one-click upgrade recommendations with direct store links.

### 9. 💼 Productivity & Workstation Benchmarks
- **Blender 3D**: Cycles Classroom scene render time (seconds).
- **Adobe Premiere Pro**: 4K timeline video export multiplier.
- **Cinebench R23**: CPU Single-Core and Multi-Core scores.
- **Local AI Inference**: Llama-3 LLM tokens/sec and Stable Diffusion XL images/min.

### 10. 🎧 Customer Service Peripheral Advisor & Budget Slider
- Interactive consultation questionnaire: primary use case, mechanical vs. membrane switches, mouse grip, audio preference, and aesthetic vibe (Snow White, Stealth Black, RGB).
- Interactive budget cap slider ($150 – $1,500+) curating matching monitor, keyboard, mouse, and headset bundles within the specified budget.

### 11. ✨ Curated Pre-Built Rigs (6 Tiers with Showcase Photos)
- **$699 Budget 1080p Esports Ripper**
- **$999 Entry 1440p High-Value Rig**
- **$1,450 1440p High-Refresh Sweet Spot** (Most Popular)
- **$1,980 Competitive 240Hz 1440p Esports Beast**
- **$2,150 All-White Aesthetic Showpiece**
- **$3,450 4K Ray Tracing Enthusiast Rig**

---

## 📂 Project Architecture

```
tpc-build/
├── index.html                  # Main responsive UI & application layout
├── css/
│   └── styles.css              # Custom styling, Trovex-inspired light mode & dark theme tokens
├── js/
│   ├── app.js                  # Master application controller & reactive state manager
│   ├── data/
│   │   ├── components.js       # Curated hardware catalog with specs, prices, tags & buy links
│   │   ├── games.js            # 12 game benchmark profiles, resolution & RT weights
│   │   ├── peripherals.js      # Monitors, keyboards, mice, and audio equipment
│   │   └── templates.js        # 6 curated pre-built rig tiers with full showcase imagery
│   ├── engines/
│   │   ├── bottleneck-analyzer.js # CPU/GPU throughput balance & upgrade diagnostic engine
│   │   ├── currency-engine.js  # Geolocation, multi-currency & regional delivery calculator
│   │   ├── fps-engine.js       # Game FPS predictor (Avg, 1% Lows, frame time, DLSS/FSR)
│   │   ├── productivity-engine.js # 3D render, video export, Cinebench & AI benchmark simulator
│   │   ├── rig-visualizer.js   # Canvas chassis rendering (motherboard, fans, GPU, RGB sync)
│   │   ├── thermal-engine.js   # Real-time idle & peak gaming load thermal simulator
│   │   └── validator.js        # Strict assembly completeness & socket/wattage validation
│   ├── advisor/
│   │   └── peripheral-advisor.js # Customer questionnaire & budget bundle matcher
│   └── utils/
│       ├── exporter.js         # Base64 URL hash sharing & Reddit Markdown generator
│       └── sound.js            # Web Audio API synthesizer for mechanical lightswitch & POST beeps
└── README.md                   # Complete documentation
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ for gamers, builders, and hardware enthusiasts.</sub>
</div>
