// TPC BUILD - Geolocation, Multi-Currency & Regional Delivery Charges Engine
// Provides real-time geolocation detection, accurate currency conversion, and regional shipping & tax estimation

export const SUPPORTED_REGIONS = {
  US: {
    countryCode: 'US',
    countryName: 'United States',
    currency: 'USD',
    symbol: '$',
    exchangeRate: 1.0, // Base
    shippingFeeUSD: 25,
    freeShippingThresholdUSD: 1500,
    estimatedTaxRate: 0.07, // Average sales tax
    deliveryDays: '2-4 Business Days',
    courier: 'FedEx Insured Fragile Ground'
  },
  IN: {
    countryCode: 'IN',
    countryName: 'India',
    currency: 'INR',
    symbol: '₹',
    exchangeRate: 83.5,
    shippingFeeUSD: 30, // ~₹2,500
    freeShippingThresholdUSD: 2000,
    estimatedTaxRate: 0.18, // GST
    deliveryDays: '3-5 Business Days',
    courier: 'BlueDart / Delhivery Insured Priority'
  },
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    currency: 'GBP',
    symbol: '£',
    exchangeRate: 0.79,
    shippingFeeUSD: 44, // ~£35
    freeShippingThresholdUSD: 1800,
    estimatedTaxRate: 0.20, // VAT
    deliveryDays: '2-4 Business Days',
    courier: 'DPD / DHL Express'
  },
  EU: {
    countryCode: 'EU',
    countryName: 'European Union (Germany)',
    currency: 'EUR',
    symbol: '€',
    exchangeRate: 0.92,
    shippingFeeUSD: 43, // ~€40
    freeShippingThresholdUSD: 1800,
    estimatedTaxRate: 0.19, // VAT
    deliveryDays: '2-5 Business Days',
    courier: 'DHL Paket Insured'
  },
  CA: {
    countryCode: 'CA',
    countryName: 'Canada',
    currency: 'CAD',
    symbol: 'C$',
    exchangeRate: 1.36,
    shippingFeeUSD: 33, // ~C$45
    freeShippingThresholdUSD: 1600,
    estimatedTaxRate: 0.13, // HST
    deliveryDays: '3-5 Business Days',
    courier: 'Purolator / Canada Post Express'
  },
  AU: {
    countryCode: 'AU',
    countryName: 'Australia',
    currency: 'AUD',
    symbol: 'A$',
    exchangeRate: 1.52,
    shippingFeeUSD: 42, // ~A$65
    freeShippingThresholdUSD: 2000,
    estimatedTaxRate: 0.10, // GST
    deliveryDays: '4-6 Business Days',
    courier: 'Australia Post Express Courier'
  },
  JP: {
    countryCode: 'JP',
    countryName: 'Japan',
    currency: 'JPY',
    symbol: '¥',
    exchangeRate: 155.0,
    shippingFeeUSD: 29, // ~¥4,500
    freeShippingThresholdUSD: 2000,
    estimatedTaxRate: 0.10,
    deliveryDays: '3-5 Business Days',
    courier: 'Yamato Transport / Sagawa'
  },
  SG: {
    countryCode: 'SG',
    countryName: 'Singapore',
    currency: 'SGD',
    symbol: 'S$',
    exchangeRate: 1.35,
    shippingFeeUSD: 33, // ~S$45
    freeShippingThresholdUSD: 1800,
    estimatedTaxRate: 0.09, // GST
    deliveryDays: '3-4 Business Days',
    courier: 'NinjaVan / SingPost Express'
  },
  AE: {
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    currency: 'AED',
    symbol: 'AED ',
    exchangeRate: 3.67,
    shippingFeeUSD: 32, // ~120 AED
    freeShippingThresholdUSD: 2000,
    estimatedTaxRate: 0.05, // VAT
    deliveryDays: '2-4 Business Days',
    courier: 'Aramex Priority Insured'
  }
};

class CurrencyEngine {
  constructor() {
    this.currentRegionCode = 'US';
    this.detectedCity = null;
    this.isDetecting = false;
    this.listeners = [];

    // Load cached region if available
    const saved = localStorage.getItem('tpc_region');
    if (saved && SUPPORTED_REGIONS[saved]) {
      this.currentRegionCode = saved;
    }
  }

  getRegion() {
    return SUPPORTED_REGIONS[this.currentRegionCode] || SUPPORTED_REGIONS.US;
  }

  setRegion(regionCode) {
    if (SUPPORTED_REGIONS[regionCode]) {
      this.currentRegionCode = regionCode;
      localStorage.setItem('tpc_region', regionCode);
      this.notifyListeners();
    }
  }

  onCurrencyChange(fn) {
    this.listeners.push(fn);
  }

  notifyListeners() {
    const region = this.getRegion();
    this.listeners.forEach(fn => fn(region));
  }

  // Convert USD value to current currency value
  convert(usdAmount) {
    const region = this.getRegion();
    return Math.round(usdAmount * region.exchangeRate);
  }

  // Format price string with local symbol and appropriate grouping
  formatPrice(usdAmount, includeSymbol = true) {
    if (usdAmount === null || usdAmount === undefined || isNaN(usdAmount)) {
      return '$0';
    }
    const region = this.getRegion();
    const converted = this.convert(usdAmount);

    let formattedNumber = converted.toLocaleString(undefined, {
      maximumFractionDigits: 0
    });

    if (!includeSymbol) return formattedNumber;

    if (region.currency === 'AED') {
      return `${formattedNumber} AED`;
    }
    return `${region.symbol}${formattedNumber}`;
  }

  // Comprehensive order calculation including shipping, delivery, and tax
  calculateOrderCost(usdPartsSubtotal) {
    const region = this.getRegion();
    const partsSubtotal = this.convert(usdPartsSubtotal);

    let shippingUSD = region.shippingFeeUSD;
    if (usdPartsSubtotal >= region.freeShippingThresholdUSD) {
      shippingUSD = 0;
    }
    const shippingFee = this.convert(shippingUSD);

    // Calculate estimated local taxes
    const estimatedTax = Math.round(partsSubtotal * region.estimatedTaxRate);
    const totalDelivered = partsSubtotal + shippingFee + estimatedTax;

    return {
      regionCode: region.countryCode,
      countryName: region.countryName,
      city: this.detectedCity,
      currency: region.currency,
      symbol: region.symbol,
      isFreeShipping: shippingUSD === 0,
      partsSubtotal,
      partsSubtotalFormatted: this.formatPrice(usdPartsSubtotal),
      shippingFee,
      shippingFeeFormatted: shippingUSD === 0 ? 'FREE' : this.formatPrice(shippingUSD),
      estimatedTax,
      estimatedTaxFormatted: `${region.symbol}${estimatedTax.toLocaleString()}`,
      taxLabel: region.estimatedTaxRate > 0 ? `Est. Tax (${Math.round(region.estimatedTaxRate * 100)}%)` : 'Tax Included',
      totalDelivered,
      totalDeliveredFormatted: `${region.symbol}${totalDelivered.toLocaleString()}`,
      deliveryDays: region.deliveryDays,
      courier: region.courier
    };
  }

  // Detect location via GPS browser geolocation + reverse geocoding
  async detectUserLocation() {
    this.isDetecting = true;
    try {
      // Step 1: Attempt HTML5 Geolocation
      if ('geolocation' in navigator) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 7000,
            enableHighAccuracy: false
          });
        });

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Step 2: Reverse Geocode via BigDataCloud client API (free, open, no-key)
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        if (res.ok) {
          const data = await res.json();
          const countryCode = (data.countryCode || '').toUpperCase();
          this.detectedCity = data.city || data.locality || data.principalSubdivision;

          return this.applyDetectedCountry(countryCode);
        }
      }
    } catch (geoError) {
      console.warn('Geolocation prompt dismissed or timed out, trying IP/timezone fallback:', geoError);
    }

    // Step 3: Fast IP / Timezone fallback
    try {
      const ipRes = await fetch('https://ipapi.co/json/');
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        const countryCode = (ipData.country_code || '').toUpperCase();
        this.detectedCity = ipData.city;
        return this.applyDetectedCountry(countryCode);
      }
    } catch (ipError) {
      console.warn('IP lookup failed, using timezone heuristic:', ipError);
    }

    // Step 4: Timezone heuristic fallback
    const tz = (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone || '' : '';
    if (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('Asia/Colombo')) {
      return this.applyDetectedCountry('IN');
    } else if (tz.includes('London')) {
      return this.applyDetectedCountry('GB');
    } else if (tz.includes('Berlin') || tz.includes('Paris') || tz.includes('Rome') || tz.includes('Madrid') || tz.includes('Amsterdam')) {
      return this.applyDetectedCountry('EU');
    } else if (tz.includes('Tokyo')) {
      return this.applyDetectedCountry('JP');
    } else if (tz.includes('Sydney') || tz.includes('Melbourne')) {
      return this.applyDetectedCountry('AU');
    } else if (tz.includes('Toronto') || tz.includes('Vancouver')) {
      return this.applyDetectedCountry('CA');
    } else if (tz.includes('Dubai')) {
      return this.applyDetectedCountry('AE');
    } else if (tz.includes('Singapore')) {
      return this.applyDetectedCountry('SG');
    }

    // Default to US
    return this.applyDetectedCountry('US');
  }

  applyDetectedCountry(code) {
    this.isDetecting = false;
    let mappedCode = code;

    // Check if directly supported
    if (SUPPORTED_REGIONS[mappedCode]) {
      this.setRegion(mappedCode);
      return this.getRegion();
    }

    // Map common EU countries to EU
    const euCountries = ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PL', 'SE', 'DK', 'FI', 'IE', 'PT'];
    if (euCountries.includes(code)) {
      mappedCode = 'EU';
      this.setRegion(mappedCode);
      return this.getRegion();
    }

    // Default fallback to US
    this.setRegion('US');
    return this.getRegion();
  }
}

export const currencyEngine = new CurrencyEngine();
