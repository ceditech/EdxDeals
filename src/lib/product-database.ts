import type { DetailedProduct } from '@/types/product-detail';

// Deterministic PRNG utilities to ensure SSR/CSR parity for fallback products
function hashStringToSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return (h >>> 0);
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Comprehensive product database with detailed information
export const PRODUCT_DATABASE: { [key: string]: DetailedProduct } = {
  // Electronics & Technology Products
  'elec-001': {
    id: 'elec-001',
    name: 'Wireless Bluetooth Headphones Pro',
    images: [
      '/images/electronics/headphones-pro-1.jpg',
      '/images/electronics/headphones-pro-2.jpg',
      '/images/electronics/headphones-pro-3.jpg',
      '/images/electronics/headphones-pro-4.jpg',
    ],
    price: 129.99,
    oldPrice: 179.99,
    rating: 4.5,
    reviews: 234,
    brand: 'AudioTech',
    category: 'Electronics & Technology',
    shortDesc: 'Premium wireless headphones with active noise cancellation and 30-hour battery life',
    fullDesc: 'Experience superior sound quality with these premium wireless headphones featuring advanced active noise cancellation technology. The 40mm drivers deliver crisp highs and deep bass, while the comfortable over-ear design ensures hours of listening comfort. With up to 30 hours of battery life and quick charge capability, these headphones are perfect for travel, work, or leisure.',
    features: [
      'Active Noise Cancellation (ANC)',
      '30-hour battery life',
      'Quick charge: 5 min = 2 hours playback',
      'Premium 40mm drivers',
      'Comfortable over-ear design',
      'Bluetooth 5.0 connectivity',
      'Built-in microphone for calls',
      'Foldable design for portability'
    ],
    specs: {
      'Brand': 'AudioTech',
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Battery Life': '30 hours (ANC off), 20 hours (ANC on)',
      'Charging Time': '2 hours',
      'Bluetooth Version': '5.0',
      'Weight': '250g',
      'Impedance': '32 ohms'
    },
    warranty: '2-year limited warranty with 30-day money-back guarantee',
    inStock: true,
    stockCount: 25,
    sku: 'AT-WH-001',
    weight: '250g',
    dimensions: '7.5" x 6.7" x 3.2"',
    color: 'Matte Black',
    material: 'Premium Plastic/Metal',
    tags: ['wireless', 'bluetooth', 'noise-cancelling', 'headphones', 'premium']
  },
  
  'elec-002': {
    id: 'elec-002',
    name: 'Smart Fitness Tracker Watch',
    images: [
      '/images/electronics/fitness-tracker-1.jpg',
      '/images/electronics/fitness-tracker-2.jpg',
      '/images/electronics/fitness-tracker-3.jpg',
      '/images/electronics/fitness-tracker-4.jpg',
    ],
    price: 89.99,
    oldPrice: 119.99,
    rating: 4.3,
    reviews: 189,
    brand: 'FitTech',
    category: 'Electronics & Technology',
    shortDesc: 'Advanced fitness tracker with heart rate monitoring and GPS tracking',
    fullDesc: 'Track your fitness goals with this advanced smartwatch featuring 24/7 heart rate monitoring, built-in GPS, and comprehensive health tracking. Monitor your sleep, steps, calories, and workouts with precision. The water-resistant design and 7-day battery life make it perfect for active lifestyles.',
    features: [
      '24/7 heart rate monitoring',
      'Built-in GPS tracking',
      '7-day battery life',
      'Water resistant (5ATM)',
      'Sleep tracking',
      '20+ workout modes',
      'Smart notifications',
      'Customizable watch faces'
    ],
    specs: {
      'Brand': 'FitTech',
      'Display': '1.4" AMOLED',
      'Battery Life': '7 days',
      'Water Resistance': '5ATM',
      'Sensors': 'Heart rate, GPS, Accelerometer, Gyroscope',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '45g',
      'Strap Material': 'Silicone'
    },
    warranty: '1-year limited warranty',
    inStock: true,
    stockCount: 18,
    sku: 'FT-SW-002',
    weight: '45g',
    dimensions: '1.7" x 1.5" x 0.4"',
    color: 'Space Gray',
    material: 'Aluminum/Silicone',
    tags: ['fitness', 'smartwatch', 'health', 'gps', 'waterproof']
  },

  // Fashion & Apparel Products
  'fashion-001': {
    id: 'fashion-001',
    name: 'Premium Cotton T-Shirt',
    images: [
      '/images/fashion/cotton-tshirt-1.jpg',
      '/images/fashion/cotton-tshirt-2.jpg',
      '/images/fashion/cotton-tshirt-3.jpg',
      '/images/fashion/cotton-tshirt-4.jpg',
    ],
    price: 24.99,
    oldPrice: 34.99,
    rating: 4.2,
    reviews: 145,
    brand: 'ComfortWear',
    category: 'Fashion & Apparel',
    shortDesc: 'Soft, breathable premium cotton t-shirt in classic fit',
    fullDesc: 'Made from 100% premium cotton, this classic t-shirt offers exceptional comfort and durability. The pre-shrunk fabric maintains its shape wash after wash, while the classic fit provides a timeless silhouette that works for any occasion. Available in multiple colors and sizes.',
    features: [
      '100% premium cotton',
      'Pre-shrunk fabric',
      'Classic comfortable fit',
      'Reinforced seams',
      'Tagless design',
      'Machine washable',
      'Fade-resistant colors',
      'Available in multiple sizes'
    ],
    specs: {
      'Brand': 'ComfortWear',
      'Material': '100% Cotton',
      'Fit': 'Classic',
      'Care': 'Machine wash cold',
      'Origin': 'Made in USA',
      'Weight': '180 GSM',
      'Neckline': 'Crew neck',
      'Sleeve': 'Short sleeve'
    },
    warranty: '30-day satisfaction guarantee',
    inStock: true,
    stockCount: 50,
    sku: 'CW-TS-001',
    weight: '200g',
    dimensions: 'Various sizes available',
    color: 'Navy Blue',
    material: '100% Cotton',
    tags: ['cotton', 'casual', 'comfortable', 'classic', 'everyday']
  },

  // Home & Garden Products
  'home-001': {
    id: 'home-001',
    name: 'Smart LED Light Bulbs Set',
    images: [
      '/images/home/led-bulbs-1.jpg',
      '/images/home/led-bulbs-2.jpg',
      '/images/home/led-bulbs-3.jpg',
      '/images/home/led-bulbs-4.jpg',
    ],
    price: 39.99,
    oldPrice: 59.99,
    rating: 4.3,
    reviews: 167,
    brand: 'SmartHome',
    category: 'Home & Garden',
    shortDesc: 'WiFi-enabled smart LED bulbs with color changing and dimming capabilities',
    fullDesc: 'Transform your home lighting with these smart LED bulbs that connect to your WiFi network. Control brightness, color, and scheduling from your smartphone. Energy-efficient design saves up to 80% on electricity bills while providing 25,000 hours of illumination.',
    features: [
      'WiFi connectivity (no hub required)',
      '16 million colors',
      'Dimmable (1-100%)',
      'Voice control compatible',
      'Energy efficient (9W = 60W)',
      '25,000 hour lifespan',
      'Schedule and timer functions',
      'Easy smartphone control'
    ],
    specs: {
      'Brand': 'SmartHome',
      'Wattage': '9W (60W equivalent)',
      'Lumens': '800',
      'Color Temperature': '2700K-6500K',
      'Connectivity': 'WiFi 2.4GHz',
      'Lifespan': '25,000 hours',
      'Base': 'E26',
      'Dimming': 'Yes'
    },
    warranty: '2-year manufacturer warranty',
    inStock: true,
    stockCount: 32,
    sku: 'SH-LED-001',
    weight: '150g (4-pack)',
    dimensions: '2.4" x 4.3"',
    color: 'White (Multi-color capable)',
    material: 'Plastic/LED',
    tags: ['smart-home', 'led', 'wifi', 'energy-efficient', 'color-changing']
  },

  // New Arrivals Products (1-8)
  '1': {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    images: [
      '/images/store/headphones-1.jpg',
      '/images/store/headphones-2.jpg',
      '/images/store/headphones-3.jpg',
      '/images/store/headphones-4.jpg',
    ],
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.4,
    reviews: 128,
    brand: 'AudioMax',
    category: 'Electronics & Technology',
    shortDesc: 'High-quality wireless headphones with superior sound and comfort',
    fullDesc: 'Enjoy crystal-clear audio with these premium wireless headphones. Featuring advanced Bluetooth technology, comfortable padding, and long-lasting battery life for all-day listening.',
    features: [
      'Bluetooth 5.0 connectivity',
      '20-hour battery life',
      'Comfortable over-ear design',
      'Built-in microphone',
      'Foldable for travel',
      'Quick charge capability',
      'Premium sound drivers',
      'Noise isolation'
    ],
    specs: {
      'Brand': 'AudioMax',
      'Driver Size': '40mm',
      'Battery Life': '20 hours',
      'Charging Time': '2 hours',
      'Bluetooth': '5.0',
      'Weight': '230g',
      'Frequency': '20Hz-20kHz',
      'Impedance': '32Ω'
    },
    warranty: '1-year limited warranty',
    inStock: true,
    stockCount: 15,
    sku: 'AM-BH-001',
    weight: '230g',
    dimensions: '7" x 6" x 3"',
    color: 'Black',
    material: 'Plastic/Foam',
    tags: ['wireless', 'bluetooth', 'headphones', 'audio', 'portable']
  },

  '2': {
    id: '2',
    name: 'Smart Watch Series 5',
    images: [
      '/images/store/smartwatch-1.jpg',
      '/images/store/smartwatch-2.jpg',
      '/images/store/smartwatch-3.jpg',
      '/images/store/smartwatch-4.jpg',
    ],
    price: 299.99,
    oldPrice: 399.99,
    rating: 4.8,
    reviews: 89,
    brand: 'TechWatch',
    category: 'Electronics & Technology',
    shortDesc: 'Advanced smartwatch with health monitoring and fitness tracking',
    fullDesc: 'Stay connected and healthy with this advanced smartwatch featuring comprehensive health monitoring, fitness tracking, and smart notifications. The always-on display and premium build quality make it perfect for both casual and professional use.',
    features: [
      'Always-on Retina display',
      'ECG and blood oxygen monitoring',
      'GPS + Cellular connectivity',
      'Water resistant to 50 meters',
      'All-day battery life',
      'Comprehensive fitness tracking',
      'Smart notifications',
      'Premium materials'
    ],
    specs: {
      'Brand': 'TechWatch',
      'Display': '1.78" Always-On Retina',
      'Battery Life': '18 hours',
      'Water Resistance': '50 meters',
      'Connectivity': 'GPS + Cellular',
      'Sensors': 'ECG, Blood Oxygen, Heart Rate',
      'Storage': '32GB',
      'Processor': 'S5 SiP'
    },
    warranty: '1-year limited warranty',
    inStock: true,
    stockCount: 8,
    sku: 'TW-SW5-001',
    weight: '40g',
    dimensions: '1.7" x 1.5" x 0.4"',
    color: 'Space Gray',
    material: 'Aluminum/Sport Band',
    tags: ['smartwatch', 'health', 'fitness', 'gps', 'cellular']
  },

  '3': {
    id: '3',
    name: 'USB-C Fast Charging Cable',
    images: [
      '/images/store/cable-1.jpg',
      '/images/store/cable-2.jpg',
      '/images/store/cable-3.jpg',
      '/images/store/cable-4.jpg',
    ],
    price: 19.99,
    oldPrice: 29.99,
    rating: 4.2,
    reviews: 256,
    brand: 'ChargeFast',
    category: 'Electronics & Technology',
    shortDesc: 'Durable USB-C cable with fast charging and data transfer capabilities',
    fullDesc: 'High-quality USB-C cable designed for fast charging and rapid data transfer. Built with premium materials and reinforced connectors for long-lasting durability. Compatible with all USB-C devices.',
    features: [
      'Fast charging up to 60W',
      'High-speed data transfer',
      'Reinforced connectors',
      'Tangle-free design',
      '6-foot length',
      'Universal compatibility',
      'Durable braided cable',
      'Lifetime warranty'
    ],
    specs: {
      'Brand': 'ChargeFast',
      'Length': '6 feet (1.8m)',
      'Power': 'Up to 60W',
      'Data Transfer': 'USB 3.1 (10Gbps)',
      'Connector': 'USB-C to USB-C',
      'Material': 'Braided nylon',
      'Compatibility': 'Universal USB-C',
      'Certification': 'USB-IF Certified'
    },
    warranty: 'Lifetime warranty',
    inStock: true,
    stockCount: 100,
    sku: 'CF-UC-001',
    weight: '85g',
    dimensions: '6 feet long',
    color: 'Space Gray',
    material: 'Braided Nylon/Metal',
    tags: ['usb-c', 'charging', 'cable', 'fast-charge', 'durable']
  },

  '4': {
    id: '4',
    name: 'Wireless Gaming Mouse',
    images: [
      '/images/store/mouse-1.jpg',
      '/images/store/mouse-2.jpg',
      '/images/store/mouse-3.jpg',
      '/images/store/mouse-4.jpg',
    ],
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.6,
    reviews: 94,
    brand: 'GameTech',
    category: 'Electronics & Technology',
    shortDesc: 'High-precision wireless gaming mouse with RGB lighting',
    fullDesc: 'Dominate your games with this high-precision wireless gaming mouse featuring customizable RGB lighting, programmable buttons, and ultra-responsive tracking. The ergonomic design ensures comfort during extended gaming sessions.',
    features: [
      'High-precision optical sensor',
      'Customizable RGB lighting',
      'Programmable buttons',
      'Wireless connectivity',
      'Ergonomic design',
      'Long battery life',
      'Gaming-grade performance',
      'Customizable DPI settings'
    ],
    specs: {
      'Brand': 'GameTech',
      'Sensor': 'Optical',
      'DPI': 'Up to 12,000',
      'Buttons': '6 programmable',
      'Battery Life': '70 hours',
      'Connectivity': '2.4GHz wireless',
      'Weight': '95g',
      'Dimensions': '5" x 3" x 1.5"'
    },
    warranty: '2-year gaming warranty',
    inStock: true,
    stockCount: 22,
    sku: 'GT-GM-004',
    weight: '95g',
    dimensions: '5" x 3" x 1.5"',
    color: 'Black with RGB',
    material: 'Plastic/Rubber',
    tags: ['gaming', 'wireless', 'mouse', 'rgb', 'precision']
  },

  '5': {
    id: '5',
    name: 'Portable Bluetooth Speaker',
    images: [
      '/images/store/speaker-1.jpg',
      '/images/store/speaker-2.jpg',
      '/images/store/speaker-3.jpg',
      '/images/store/speaker-4.jpg',
    ],
    price: 89.99,
    rating: 4.4,
    reviews: 167,
    brand: 'SoundMax',
    category: 'Electronics & Technology',
    shortDesc: 'Powerful portable speaker with 360-degree sound and waterproof design',
    fullDesc: 'Take your music anywhere with this powerful portable Bluetooth speaker. Featuring 360-degree sound, deep bass, and waterproof design, it\'s perfect for outdoor adventures, parties, or home listening.',
    features: [
      '360-degree surround sound',
      'Deep bass technology',
      'Waterproof (IPX7)',
      '12-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Compact portable design',
      'Quick charge capability'
    ],
    specs: {
      'Brand': 'SoundMax',
      'Output Power': '20W',
      'Battery Life': '12 hours',
      'Water Rating': 'IPX7',
      'Bluetooth': '5.0',
      'Range': '30 feet',
      'Weight': '450g',
      'Dimensions': '7" x 3" x 3"'
    },
    warranty: '1-year limited warranty',
    inStock: true,
    stockCount: 35,
    sku: 'SM-BS-005',
    weight: '450g',
    dimensions: '7" x 3" x 3"',
    color: 'Ocean Blue',
    material: 'Waterproof Fabric/Plastic',
    tags: ['bluetooth', 'speaker', 'portable', 'waterproof', 'bass']
  },

  '6': {
    id: '6',
    name: 'Laptop Stand Adjustable',
    images: [
      '/images/store/laptop-stand-1.jpg',
      '/images/store/laptop-stand-2.jpg',
      '/images/store/laptop-stand-3.jpg',
      '/images/store/laptop-stand-4.jpg',
    ],
    price: 39.99,
    oldPrice: 59.99,
    rating: 4.3,
    reviews: 203,
    brand: 'ErgoTech',
    category: 'Electronics & Technology',
    shortDesc: 'Ergonomic adjustable laptop stand for better posture and cooling',
    fullDesc: 'Improve your workspace ergonomics with this adjustable laptop stand. Features multiple height and angle adjustments, excellent ventilation for cooling, and a sturdy aluminum construction that supports laptops up to 17 inches.',
    features: [
      'Adjustable height and angle',
      'Supports laptops up to 17"',
      'Aluminum construction',
      'Excellent ventilation',
      'Foldable for portability',
      'Non-slip silicone pads',
      'Cable management',
      'Ergonomic design'
    ],
    specs: {
      'Brand': 'ErgoTech',
      'Material': 'Aluminum alloy',
      'Compatibility': 'Laptops 10"-17"',
      'Weight Capacity': '10kg',
      'Adjustability': 'Height and angle',
      'Weight': '1.2kg',
      'Folded Size': '10" x 2" x 1"',
      'Color': 'Silver'
    },
    warranty: '3-year structural warranty',
    inStock: true,
    stockCount: 28,
    sku: 'ET-LS-006',
    weight: '1.2kg',
    dimensions: '10" x 9" x 6" (adjustable)',
    color: 'Silver',
    material: 'Aluminum Alloy',
    tags: ['laptop', 'stand', 'ergonomic', 'adjustable', 'aluminum']
  },

  '7': {
    id: '7',
    name: 'Wireless Phone Charger',
    images: [
      '/images/store/wireless-charger-1.jpg',
      '/images/store/wireless-charger-2.jpg',
      '/images/store/wireless-charger-3.jpg',
      '/images/store/wireless-charger-4.jpg',
    ],
    price: 24.99,
    oldPrice: 34.99,
    rating: 4.1,
    reviews: 145,
    brand: 'ChargeTech',
    category: 'Electronics & Technology',
    shortDesc: 'Fast wireless charging pad with LED indicator and safety features',
    fullDesc: 'Charge your phone wirelessly with this sleek charging pad. Features fast charging technology, LED status indicator, and built-in safety features to protect your device. Compatible with all Qi-enabled smartphones.',
    features: [
      'Fast wireless charging',
      'Qi-certified compatibility',
      'LED status indicator',
      'Overcharge protection',
      'Temperature control',
      'Non-slip surface',
      'Compact design',
      'Case-friendly charging'
    ],
    specs: {
      'Brand': 'ChargeTech',
      'Output': '10W fast charge',
      'Input': 'USB-C',
      'Compatibility': 'Qi-enabled devices',
      'Efficiency': '85%',
      'Safety': 'Overcharge protection',
      'Weight': '150g',
      'Dimensions': '4" x 4" x 0.5"'
    },
    warranty: '18-month warranty',
    inStock: true,
    stockCount: 45,
    sku: 'CT-WC-007',
    weight: '150g',
    dimensions: '4" x 4" x 0.5"',
    color: 'Matte Black',
    material: 'Aluminum/Plastic',
    tags: ['wireless', 'charging', 'qi', 'fast-charge', 'phone']
  },

  '8': {
    id: '8',
    name: 'Mechanical Keyboard RGB',
    images: [
      '/images/store/keyboard-1.jpg',
      '/images/store/keyboard-2.jpg',
      '/images/store/keyboard-3.jpg',
      '/images/store/keyboard-4.jpg',
    ],
    price: 129.99,
    oldPrice: 179.99,
    rating: 4.7,
    reviews: 76,
    brand: 'KeyMaster',
    category: 'Electronics & Technology',
    shortDesc: 'Premium mechanical keyboard with RGB backlighting and tactile switches',
    fullDesc: 'Experience superior typing with this premium mechanical keyboard featuring tactile switches, customizable RGB backlighting, and durable construction. Perfect for gaming, programming, or professional work.',
    features: [
      'Mechanical tactile switches',
      'Customizable RGB backlighting',
      'Anti-ghosting technology',
      'Programmable keys',
      'Durable construction',
      'Detachable USB-C cable',
      'Multiple lighting effects',
      'Gaming and work optimized'
    ],
    specs: {
      'Brand': 'KeyMaster',
      'Switch Type': 'Mechanical Tactile',
      'Backlighting': 'RGB',
      'Layout': 'Full-size (104 keys)',
      'Connection': 'USB-C',
      'Key Life': '50 million keystrokes',
      'Weight': '1.1kg',
      'Dimensions': '17" x 5" x 1.5"'
    },
    warranty: '2-year mechanical warranty',
    inStock: true,
    stockCount: 12,
    sku: 'KM-MK-008',
    weight: '1.1kg',
    dimensions: '17" x 5" x 1.5"',
    color: 'Black with RGB',
    material: 'Aluminum/Plastic',
    tags: ['mechanical', 'keyboard', 'rgb', 'gaming', 'tactile']
  },

  // Featured Products from mock-data.ts
  'fp1': {
    id: 'fp1',
    name: 'Premium Laptop Pro X',
    images: [
      '/images/electronics/laptop-pro-1.jpg',
      '/images/electronics/laptop-pro-2.jpg',
      '/images/electronics/laptop-pro-3.jpg',
      '/images/electronics/laptop-pro-4.jpg',
    ],
    price: 1299.99,
    oldPrice: 1599.99,
    rating: 4.8,
    reviews: 120,
    brand: 'TechPro',
    category: 'Electronics',
    shortDesc: 'High-performance laptop with cutting-edge processor and stunning display',
    fullDesc: 'Experience ultimate performance with this premium laptop featuring the latest processor, high-resolution display, and professional-grade components. Perfect for creative professionals, developers, and power users who demand the best.',
    features: [
      'Latest generation processor',
      '16GB RAM, 512GB SSD',
      '15.6" 4K Retina display',
      'All-day battery life',
      'Thunderbolt 4 ports',
      'Backlit keyboard',
      'Premium aluminum build',
      'Advanced cooling system'
    ],
    specs: {
      'Brand': 'TechPro',
      'Processor': 'Intel Core i7',
      'RAM': '16GB DDR4',
      'Storage': '512GB SSD',
      'Display': '15.6" 4K (3840x2160)',
      'Graphics': 'Integrated Intel Iris',
      'Battery': 'Up to 12 hours',
      'Weight': '1.8kg'
    },
    warranty: '3-year premium warranty',
    inStock: true,
    stockCount: 8,
    sku: 'TP-LPX-001',
    weight: '1.8kg',
    dimensions: '14" x 9.8" x 0.7"',
    color: 'Space Gray',
    material: 'Aluminum',
    tags: ['laptop', 'premium', 'professional', '4k', 'performance']
  },

  'fp2': {
    id: 'fp2',
    name: 'Smart Home Hub Central',
    images: [
      '/images/home/smart-hub-1.jpg',
      '/images/home/smart-hub-2.jpg',
      '/images/home/smart-hub-3.jpg',
      '/images/home/smart-hub-4.jpg',
    ],
    price: 149.50,
    oldPrice: 199.99,
    rating: 4.5,
    reviews: 95,
    brand: 'SmartLife',
    category: 'Home',
    shortDesc: 'Central control hub for all your smart home devices',
    fullDesc: 'Transform your home into a smart home with this central control hub. Compatible with hundreds of smart devices, featuring voice control, mobile app integration, and advanced automation capabilities.',
    features: [
      'Controls 100+ smart devices',
      'Voice control integration',
      'Mobile app control',
      'Advanced automation',
      'Energy monitoring',
      'Security integration',
      'Easy setup and configuration',
      'Regular software updates'
    ],
    specs: {
      'Brand': 'SmartLife',
      'Connectivity': 'WiFi, Zigbee, Z-Wave',
      'Voice Control': 'Alexa, Google Assistant',
      'App': 'iOS and Android',
      'Range': 'Up to 100 feet',
      'Power': 'AC adapter included',
      'Dimensions': '5" x 5" x 2"',
      'Weight': '300g'
    },
    warranty: '2-year smart home warranty',
    inStock: true,
    stockCount: 15,
    sku: 'SL-SHC-002',
    weight: '300g',
    dimensions: '5" x 5" x 2"',
    color: 'White',
    material: 'Plastic/Metal',
    tags: ['smart-home', 'hub', 'automation', 'voice-control', 'wifi']
  },

  'fp3': {
    id: 'fp3',
    name: 'Wireless Noise-Cancelling Headphones',
    images: [
      '/images/electronics/noise-cancel-1.jpg',
      '/images/electronics/noise-cancel-2.jpg',
      '/images/electronics/noise-cancel-3.jpg',
      '/images/electronics/noise-cancel-4.jpg',
    ],
    price: 249.00,
    oldPrice: 329.99,
    rating: 4.7,
    reviews: 250,
    brand: 'AudioElite',
    category: 'Electronics',
    shortDesc: 'Professional noise-cancelling headphones with studio-quality sound',
    fullDesc: 'Immerse yourself in pure audio with these professional-grade noise-cancelling headphones. Featuring advanced ANC technology, premium drivers, and all-day comfort for the ultimate listening experience.',
    features: [
      'Advanced noise cancellation',
      'Studio-quality sound',
      '40-hour battery life',
      'Premium comfort padding',
      'Quick charge technology',
      'Multi-device connectivity',
      'Touch controls',
      'Carrying case included'
    ],
    specs: {
      'Brand': 'AudioElite',
      'Driver': '40mm premium drivers',
      'Frequency': '20Hz - 40kHz',
      'Battery': '40 hours (ANC on)',
      'Charging': 'USB-C fast charge',
      'Bluetooth': '5.2',
      'Weight': '280g',
      'Impedance': '32 ohms'
    },
    warranty: '2-year professional warranty',
    inStock: true,
    stockCount: 20,
    sku: 'AE-NC-003',
    weight: '280g',
    dimensions: '8" x 7" x 3.5"',
    color: 'Midnight Black',
    material: 'Premium Plastic/Metal',
    tags: ['headphones', 'noise-cancelling', 'wireless', 'premium', 'studio']
  },

  'fp4': {
    id: 'fp4',
    name: 'Organic Cotton Throw Blanket',
    images: [
      '/images/home/throw-blanket-1.jpg',
      '/images/home/throw-blanket-2.jpg',
      '/images/home/throw-blanket-3.jpg',
      '/images/home/throw-blanket-4.jpg',
    ],
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.9,
    reviews: 75,
    brand: 'CozyHome',
    category: 'Home',
    shortDesc: 'Luxuriously soft organic cotton throw blanket for ultimate comfort',
    fullDesc: 'Wrap yourself in luxury with this premium organic cotton throw blanket. Made from 100% certified organic cotton, this blanket offers exceptional softness, breathability, and durability. Perfect for cozy evenings or as a stylish home accent.',
    features: [
      '100% certified organic cotton',
      'Hypoallergenic and breathable',
      'Machine washable',
      'Fade-resistant colors',
      'Luxuriously soft texture',
      'Eco-friendly production',
      'Multiple size options',
      'Gift-ready packaging'
    ],
    specs: {
      'Brand': 'CozyHome',
      'Material': '100% Organic Cotton',
      'Size': '50" x 60"',
      'Weight': '1.2kg',
      'Care': 'Machine wash cold',
      'Certification': 'GOTS Certified',
      'Thread Count': '200',
      'Origin': 'Sustainably sourced'
    },
    warranty: '1-year satisfaction guarantee',
    inStock: true,
    stockCount: 30,
    sku: 'CH-OTB-004',
    weight: '1.2kg',
    dimensions: '50" x 60"',
    color: 'Natural Beige',
    material: '100% Organic Cotton',
    tags: ['organic', 'cotton', 'blanket', 'eco-friendly', 'soft']
  },

  'fp5': {
    id: 'fp5',
    name: 'High-Performance Blender',
    images: [
      '/images/appliances/blender-1.jpg',
      '/images/appliances/blender-2.jpg',
      '/images/appliances/blender-3.jpg',
      '/images/appliances/blender-4.jpg',
    ],
    price: 199.00,
    oldPrice: 249.99,
    rating: 4.6,
    reviews: 150,
    brand: 'KitchenPro',
    category: 'Home Appliances',
    shortDesc: 'Professional-grade blender with powerful motor and versatile functions',
    fullDesc: 'Create smoothies, soups, and more with this high-performance blender featuring a powerful motor, precision blades, and multiple speed settings. The durable construction and easy-clean design make it perfect for daily use.',
    features: [
      'Powerful 1200W motor',
      'Precision stainless steel blades',
      'Variable speed control',
      'Pulse function',
      'BPA-free pitcher',
      'Easy-clean design',
      'Quiet operation',
      'Recipe book included'
    ],
    specs: {
      'Brand': 'KitchenPro',
      'Motor': '1200W',
      'Capacity': '64 oz (1.9L)',
      'Speeds': 'Variable + Pulse',
      'Blades': 'Stainless steel',
      'Material': 'BPA-free plastic',
      'Dimensions': '8" x 8" x 16"',
      'Weight': '3.2kg'
    },
    warranty: '5-year motor warranty',
    inStock: true,
    stockCount: 12,
    sku: 'KP-HPB-005',
    weight: '3.2kg',
    dimensions: '8" x 8" x 16"',
    color: 'Stainless Steel',
    material: 'BPA-free Plastic/Steel',
    tags: ['blender', 'kitchen', 'appliance', 'smoothie', 'powerful']
  },

  // Flash Deals from mock-data.ts
  'fd1': {
    id: 'fd1',
    name: 'Limited Edition Smart Watch',
    images: [
      '/images/electronics/smartwatch-limited-1.jpg',
      '/images/electronics/smartwatch-limited-2.jpg',
      '/images/electronics/smartwatch-limited-3.jpg',
      '/images/electronics/smartwatch-limited-4.jpg',
    ],
    price: 199.99,
    oldPrice: 299.99,
    rating: 4.6,
    reviews: 89,
    brand: 'WatchTech',
    category: 'Electronics',
    shortDesc: 'Limited edition smartwatch with exclusive features and premium design',
    fullDesc: 'This limited edition smartwatch combines cutting-edge technology with exclusive design elements. Features comprehensive health tracking, premium materials, and unique watch faces available only in this special edition.',
    features: [
      'Limited edition design',
      'Comprehensive health tracking',
      'Premium titanium case',
      'Exclusive watch faces',
      'Advanced fitness metrics',
      'Water resistant to 100m',
      'Wireless charging',
      'Collector\'s packaging'
    ],
    specs: {
      'Brand': 'WatchTech',
      'Case Material': 'Titanium',
      'Display': '1.9" Always-On',
      'Battery': '2-day battery life',
      'Water Resistance': '100 meters',
      'Connectivity': 'Bluetooth 5.3',
      'Sensors': 'Heart rate, GPS, SpO2',
      'Storage': '64GB'
    },
    warranty: '2-year limited edition warranty',
    inStock: true,
    stockCount: 5,
    sku: 'WT-LE-001',
    weight: '42g',
    dimensions: '1.8" x 1.6" x 0.4"',
    color: 'Titanium',
    material: 'Titanium/Sapphire',
    tags: ['smartwatch', 'limited-edition', 'premium', 'titanium', 'health']
  },

  'fd2': {
    id: 'fd2',
    name: 'Ultra HD Action Camera',
    images: [
      '/images/electronics/action-camera-1.jpg',
      '/images/electronics/action-camera-2.jpg',
      '/images/electronics/action-camera-3.jpg',
      '/images/electronics/action-camera-4.jpg',
    ],
    price: 99.50,
    oldPrice: 159.50,
    rating: 4.4,
    reviews: 156,
    brand: 'ActionPro',
    category: 'Electronics',
    shortDesc: 'Ultra HD action camera with image stabilization and waterproof design',
    fullDesc: 'Capture your adventures in stunning 4K Ultra HD with this compact action camera. Features advanced image stabilization, waterproof design, and multiple mounting options for any activity.',
    features: [
      '4K Ultra HD recording',
      'Advanced image stabilization',
      'Waterproof to 30 meters',
      'Wide-angle lens',
      'Touch screen display',
      'WiFi connectivity',
      'Multiple mounting accessories',
      'Long battery life'
    ],
    specs: {
      'Brand': 'ActionPro',
      'Video': '4K at 60fps',
      'Photo': '20MP',
      'Stabilization': 'Electronic + Optical',
      'Waterproof': '30 meters',
      'Display': '2" touchscreen',
      'Battery': '2 hours recording',
      'Storage': 'MicroSD up to 256GB'
    },
    warranty: '1-year adventure warranty',
    inStock: true,
    stockCount: 25,
    sku: 'AP-AC-002',
    weight: '120g',
    dimensions: '2.3" x 1.6" x 1.2"',
    color: 'Black',
    material: 'Waterproof Plastic/Metal',
    tags: ['action-camera', '4k', 'waterproof', 'stabilization', 'adventure']
  },

  'fd3': {
    id: 'fd3',
    name: 'Ergonomic Gaming Chair',
    images: [
      '/images/furniture/gaming-chair-1.jpg',
      '/images/furniture/gaming-chair-2.jpg',
      '/images/furniture/gaming-chair-3.jpg',
      '/images/furniture/gaming-chair-4.jpg',
    ],
    price: 249.00,
    oldPrice: 399.00,
    rating: 4.7,
    reviews: 203,
    brand: 'GameComfort',
    category: 'Home',
    shortDesc: 'Professional gaming chair with lumbar support and premium materials',
    fullDesc: 'Game in comfort with this professional gaming chair featuring ergonomic design, adjustable lumbar support, and premium materials. Built for long gaming sessions with maximum comfort and support.',
    features: [
      'Ergonomic design',
      'Adjustable lumbar support',
      'Premium PU leather',
      '4D adjustable armrests',
      'Reclining backrest',
      'Smooth-rolling casters',
      'Heavy-duty base',
      'Easy assembly'
    ],
    specs: {
      'Brand': 'GameComfort',
      'Material': 'Premium PU Leather',
      'Weight Capacity': '150kg',
      'Seat Height': 'Adjustable 18"-22"',
      'Backrest': 'Reclining 90°-135°',
      'Armrests': '4D adjustable',
      'Base': '5-star aluminum',
      'Casters': 'Smooth-rolling'
    },
    warranty: '3-year structural warranty',
    inStock: true,
    stockCount: 18,
    sku: 'GC-EGC-003',
    weight: '25kg',
    dimensions: '26" x 26" x 48"',
    color: 'Black/Red',
    material: 'PU Leather/Aluminum',
    tags: ['gaming', 'chair', 'ergonomic', 'comfort', 'adjustable']
  },
};

// Generate fallback product for missing IDs
const generateFallbackProduct = (productId: string): DetailedProduct => {
  const productTemplates = [
    { name: 'Premium Wireless Headphones', price: 129.99, oldPrice: 179.99, category: 'Electronics & Technology', brand: 'AudioTech' },
    { name: 'Smart Fitness Tracker', price: 89.99, oldPrice: 119.99, category: 'Electronics & Technology', brand: 'FitTech' },
    { name: 'Bluetooth Speaker Pro', price: 79.99, oldPrice: 99.99, category: 'Electronics & Technology', brand: 'SoundMax' },
    { name: 'Wireless Gaming Mouse', price: 59.99, oldPrice: 79.99, category: 'Electronics & Technology', brand: 'GameTech' },
    { name: 'USB-C Fast Charger', price: 29.99, oldPrice: 39.99, category: 'Electronics & Technology', brand: 'ChargeFast' },
    { name: 'Portable Power Bank', price: 39.99, oldPrice: 59.99, category: 'Electronics & Technology', brand: 'PowerMax' },
    { name: 'Smart Watch Band', price: 24.99, oldPrice: 34.99, category: 'Electronics & Technology', brand: 'WatchTech' },
    { name: 'Wireless Charging Pad', price: 34.99, category: 'Electronics & Technology', brand: 'ChargeTech' },
  ];

  // Use product ID to select template (for consistency)
  const templateIndex = parseInt(productId) || productId.length;
  const template = productTemplates[templateIndex % productTemplates.length];

  // Seeded RNG for deterministic fallback values (SSR/CSR parity)
  const seed = hashStringToSeed(productId);
  const rng = mulberry32(seed);

  return {
    id: productId,
    name: template.name,
    images: [
      `/images/products/${productId}-1.jpg`,
      `/images/products/${productId}-2.jpg`,
      `/images/products/${productId}-3.jpg`,
      `/images/products/${productId}-4.jpg`,
    ],
    price: template.price,
    oldPrice: template.oldPrice,
    // Deterministic pseudo-random based on productId for hydration safety
    rating: 4.0 + (rng() * 1), // 4.0 - 5.0
    reviews: Math.floor(rng() * 500) + 50, // 50 - 550
    brand: template.brand,
    category: template.category,
    shortDesc: `High-quality ${template.name.toLowerCase()} with premium features and excellent performance`,
    fullDesc: `Experience the best in ${template.category.toLowerCase()} with this premium ${template.name.toLowerCase()}. Designed with cutting-edge technology and built to last, this product offers exceptional value and performance for both casual and professional use.`,
    features: [
      'Premium build quality',
      'Advanced technology',
      'User-friendly design',
      'Excellent performance',
      'Durable construction',
      'Great value for money',
      'Reliable operation',
      'Modern aesthetics'
    ],
    specs: {
      'Brand': template.brand,
      'Category': template.category,
      'Model': `${template.brand}-${productId}`,
      'Weight': '200g',
      'Dimensions': '6" x 4" x 2"',
      'Color': 'Black',
      'Material': 'Premium Plastic',
      'Warranty': '1 Year'
    },
    warranty: '1-year limited warranty with 30-day money-back guarantee',
    inStock: true,
    stockCount: Math.floor(rng() * 50) + 10, // 10 - 60 (deterministic)
    sku: `${template.brand.toUpperCase()}-${productId}`,
    weight: '200g',
    dimensions: '6" x 4" x 2"',
    color: 'Black',
    material: 'Premium Plastic',
    tags: ['premium', 'quality', 'reliable', 'modern']
  };
};

// Function to get product by ID with fallback generation
export const getProductById = (productId: string): DetailedProduct | null => {
  // First check if product exists in database
  if (PRODUCT_DATABASE[productId]) {
    return PRODUCT_DATABASE[productId];
  }

  // Generate fallback product for missing IDs
  return generateFallbackProduct(productId);
};

// Function to get related products by category
export const getRelatedProducts = (productId: string, category: string): DetailedProduct[] => {
  return Object.values(PRODUCT_DATABASE)
    .filter(product => product.category === category && product.id !== productId)
    .slice(0, 4);
};

// Function to get comparison products
export const getComparisonProducts = (productId: string, category: string): DetailedProduct[] => {
  return Object.values(PRODUCT_DATABASE)
    .filter(product => product.category === category && product.id !== productId)
    .slice(0, 3);
};

// Function to search products
export const searchProducts = (query: string): DetailedProduct[] => {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(PRODUCT_DATABASE)
    .filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.brand?.toLowerCase().includes(lowercaseQuery) ||
      product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
};
