"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useTheme } from "../components/Layout";
import { Clock, Cpu, Smartphone, Watch, Laptop, Monitor, Tablet, Headphones, Car, Tv, Glasses, X, ExternalLink, Info, Share2, GitCompare, Copy, Check, Twitter } from "lucide-react";

interface Source {
  label: string;
  url: string;
  type: 'official' | 'review' | 'rumor' | 'specs';
}

interface Release {
  id: string;
  name: string;
  description: string;
  date: string;
  dateObj: Date;
  status: 'Upcoming' | 'Released' | 'Announced';
  confirmationLevel: 'official' | 'likely' | 'rumored' | 'speculative';
  category: string;
  type: string;
  url?: string;
  price?: string;
  priceRange?: string;
  sources?: Source[];
  specs?: Record<string, string>;
}

const allCategories = [
  { id: 'all', label: 'All' },
  { id: 'apple', label: 'Apple' },
  { id: 'samsung', label: 'Samsung' },
  { id: 'google', label: 'Google' },
  { id: 'tesla', label: 'Tesla' },
  { id: 'nvidia', label: 'NVIDIA' },
  { id: 'amd', label: 'AMD' },
  { id: 'intel', label: 'Intel' },
  { id: 'sony', label: 'Sony' },
  { id: 'meta', label: 'Meta' },
  { id: 'nintendo', label: 'Nintendo' },
  { id: 'microsoft', label: 'Microsoft' },
  { id: 'valve', label: 'Valve' },
  { id: 'inmo', label: 'INMO' },
  { id: 'xreal', label: 'Xreal' },
  { id: 'rokid', label: 'Rokid' },
  { id: 'snap', label: 'Snap' },
  { id: 'magic-leap', label: 'Magic Leap' },
];

const allTypes = [
  { id: 'all', label: 'All Types' },
  { id: 'smartphone', label: 'Smartphones' },
  { id: 'laptop', label: 'Laptops' },
  { id: 'tablet', label: 'Tablets' },
  { id: 'wearable', label: 'Wearables' },
  { id: 'gpu', label: 'GPUs' },
  { id: 'cpu', label: 'CPUs' },
  { id: 'vr', label: 'VR' },
  { id: 'ar', label: 'AR Glasses' },
  { id: 'robot', label: 'Robots' },
  { id: 'car', label: 'Cars' },
  { id: 'camera', label: 'Cameras' },
  { id: 'audio', label: 'Audio' },
  { id: 'console', label: 'Consoles' },
  { id: 'handheld', label: 'Handhelds' },
  { id: 'controller', label: 'Controllers' },
];

const categoryIcons: Record<string, React.ReactNode> = {
  apple: <Smartphone size={14} />,
  samsung: <Smartphone size={14} />,
  google: <Smartphone size={14} />,
  tesla: <Car size={14} />,
  nvidia: <Cpu size={14} />,
  amd: <Cpu size={14} />,
  intel: <Cpu size={14} />,
  sony: <Tv size={14} />,
  nintendo: <Tv size={14} />,
  microsoft: <Tv size={14} />,
  meta: <Glasses size={14} />,
  inmo: <Glasses size={14} />,
  xreal: <Glasses size={14} />,
  rokid: <Glasses size={14} />,
  snap: <Glasses size={14} />,
  'magic-leap': <Glasses size={14} />,
};

const typeIcons: Record<string, React.ReactNode> = {
  smartphone: <Smartphone size={14} />,
  laptop: <Laptop size={14} />,
  tablet: <Tablet size={14} />,
  wearable: <Watch size={14} />,
  gpu: <Cpu size={14} />,
  cpu: <Cpu size={14} />,
  vr: <Glasses size={14} />,
  ar: <Glasses size={14} />,
  robot: <Cpu size={14} />,
  car: <Car size={14} />,
  camera: <Smartphone size={14} />,
  audio: <Headphones size={14} />,
  console: <Tv size={14} />,
};

const statusColors = {
  Upcoming: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Released: 'bg-green-500/20 text-green-400 border-green-500/30',
  Announced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const confirmationColors = {
  official: 'text-green-400',
  likely: 'text-blue-400',
  rumored: 'text-yellow-400',
  speculative: 'text-gray-300',
};

const staticReleases: Release[] = [
  // Apple
  { id: '1', name: 'iPhone 17 Pro Max', description: 'Latest iPhone with A19 Pro chip, titanium frame, enhanced camera system', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'smartphone', price: '$1,199',
    sources: [
      { label: 'Apple Newsroom', url: 'https://www.apple.com/newsroom/', type: 'official' },
      { label: 'MacRumors', url: 'https://www.macrumors.com/', type: 'review' },
    ],
    specs: { 'Chip': 'A19 Pro', 'Display': '6.9 inch OLED', 'Storage': '256GB-1TB', 'Camera': '48MP main' }
  },
  { id: '2', name: 'iPhone 17 Air', description: 'Ultra-thin iPhone model, the thinnest ever at ~5.5mm', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'smartphone', price: '$899',
    sources: [
      { label: 'Apple Newsroom', url: 'https://www.apple.com/newsroom/', type: 'official' },
    ],
    specs: { 'Thickness': '~5.5mm', 'Chip': 'A19', 'Display': '6.6 inch OLED' }
  },
  { id: '2b', name: 'iPhone 17e', description: 'Budget iPhone 17, A18 chip, 256GB start storage', date: 'Mar 2026', dateObj: new Date('2026-03-11'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'smartphone', price: '$599',
    sources: [
      { label: 'Apple Newsroom', url: 'https://www.apple.com/newsroom/2026/03/apple-introduces-iphone-17e/', type: 'official' },
    ],
    specs: { 'Chip': 'A18', 'Storage': '256GB-512GB', 'Display': '6.1 inch OLED' }
  },
  { id: '3', name: 'iPad Pro M4', description: 'iPad Pro with M4 chip, OLED display, thinner design', date: 'May 2024', dateObj: new Date('2024-05-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'tablet', price: '$999',
  },
  { id: '4', name: 'MacBook Pro M4', description: 'MacBook Pro with M4/M4 Pro/M4 Max chips, enhanced battery life', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'laptop', price: '$1,999',
  },
  { id: '5', name: 'Apple Watch Series 10', description: 'Thinner design,血压 monitoring, enhanced health features', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'wearable', price: '$399',
  },
  { id: '6', name: 'AirPods Pro 3', description: 'Next generation AirPods Pro with improved ANC and sound quality', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple', type: 'wearable', priceRange: '$249',
  },
  { id: '7', name: 'Vision Pro 2', description: 'Second generation Vision Pro with lighter weight and lower price', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple', type: 'vr', priceRange: '$2,000-$2,500',
  },
  { id: '8', name: 'MacBook Air M4', description: 'MacBook Air with M4 chip, expected early 2025', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'laptop', price: '$999',
  },
  { id: '9', name: 'iPhone 18 Pro', description: 'Next iPhone with A20 chip, expected September 2026', date: 'Sep 2026', dateObj: new Date('2026-09-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple', type: 'smartphone', priceRange: '$1,199',
  },
  { id: '10', name: 'iPad Air M3', description: 'iPad Air with M3 chip, expected March 2025', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'tablet', price: '$599',
  },
  { id: '10b', name: 'MacBook Neo', description: 'Budget MacBook, A18 chip, 13.6 inch display', date: 'Mar 2026', dateObj: new Date('2026-03-11'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'laptop', price: '$599',
    sources: [
      { label: 'Apple Newsroom', url: 'https://www.apple.com/newsroom/2026/03/say-hello-to-macbook-neo/', type: 'official' },
      { label: 'CNN Business', url: 'https://www.cnn.com/2026/03/04/tech/apple-event-macbook-neo-release', type: 'review' },
    ],
    specs: { 'Chip': 'A18 Pro', 'CPU': '6-core', 'GPU': '5-core', 'Memory': '8GB', 'Storage': '256GB-512GB' }
  },
  { id: '10c', name: 'MacBook Air M3', description: 'MacBook Air with M3 chip, fanless design', date: 'Mar 2024', dateObj: new Date('2024-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'laptop', price: '$1,099',
  },
  { id: '10d', name: 'iPhone 17', description: 'Standard iPhone 17 model with A19 chip', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'smartphone', price: '$799',
  },
  { id: '10e', name: 'iPhone Fold', description: 'Apple first foldable iPhone with ~8 inch display', date: 'Late 2026', dateObj: new Date('2026-09-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple', type: 'smartphone', priceRange: '$1,800-$2,200',
  },
  { id: '10f', name: 'iPad mini 8', description: 'Next iPad mini with OLED display and M4 chip', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'apple', type: 'tablet', priceRange: '$499',
  },
  { id: '10g', name: 'iPad Air M4', description: 'iPad Air with M4 chip, thinner design', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'tablet', price: '$599',
  },
  { id: '10h', name: 'Apple Watch Ultra 3', description: 'Third gen Ultra, satellite comms, titanium case', date: 'Sep 2025', dateObj: new Date('2025-09-19'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'wearable', price: '$799',
  },
  { id: '10i', name: 'AirPods 4', description: 'Standard AirPods 4th gen with USB-C, improved fit', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'wearable', price: '$179',
  },
  { id: '10j', name: 'HomePod 4', description: 'New HomePod with improved audio and AI', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'apple', type: 'audio', priceRange: '$299',
  },
  { id: '10k', name: 'Apple Watch SE 3', description: 'Budget Apple Watch, A15 chip, essential health features', date: 'Sep 2025', dateObj: new Date('2025-09-19'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'wearable', price: '$249',
  },
  { id: '10l', name: 'MacBook Pro M5', description: 'Base M5 chip, 14/16 inch, released October 2025', date: 'Oct 2025', dateObj: new Date('2025-10-15'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'laptop', price: '$1,999',
  },
  { id: '10m', name: 'Mac Studio M5 Max', description: 'Mac Studio with M5 Max chip, expected at WWDC 2026', date: 'Jun 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple', type: 'laptop', priceRange: '$2,000-$4,000',
  },
  { id: '10n', name: 'Mac Pro M5', description: 'Mac Pro with M5 chip, ultimate performance', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'apple', type: 'laptop', priceRange: '$6,999-$14,999',
  },

  // Samsung
  { id: '11', name: 'Samsung Galaxy S25 Ultra', description: 'Latest Samsung flagship with Snapdragon 8 Elite, 200MP camera', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung', type: 'smartphone', price: '$1,299',
    sources: [
      { label: 'Samsung Galaxy S25 Ultra', url: 'https://www.samsung.com/smartphones/galaxy-s25-ultra/', type: 'official' },
      { label: 'Tom\'s Hardware Review', url: 'https://www.tomshardware.com/samsung-galaxy-s25-ultra', type: 'review' },
    ],
    specs: { 'Chip': 'Snapdragon 8 Elite', 'Display': '6.9 inch AMOLED', 'Camera': '200MP main', 'RAM': '16GB', 'Storage': '256GB-1TB' }
  },
  { id: '12', name: 'Samsung Galaxy Z Fold 6', description: 'Latest foldable with improved hinge and durability', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung', type: 'smartphone', price: '$1,899',
  },
  { id: '13', name: 'Samsung Galaxy Z Flip 6', description: 'Compact foldable with larger cover screen', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung', type: 'smartphone', price: '$999',
  },
  { id: '14', name: 'Samsung Galaxy S26 Ultra', description: 'Expected with Snapdragon 8 Gen 5, improved AI features', date: 'Jan 2026', dateObj: new Date('2026-01-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung', type: 'smartphone', priceRange: '$1,299-$1,419',
  },
  { id: '15', name: 'Samsung Galaxy Ring 2', description: 'Next generation smart ring with health tracking improvements', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'samsung', type: 'wearable', priceRange: '$299',
  },
  { id: '16', name: 'Samsung Galaxy Tab S10', description: 'Premium Android tablet with S Pen support', date: 'Aug 2024', dateObj: new Date('2024-08-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung', type: 'tablet', price: '$799' },

  // Google
  { id: '17', name: 'Google Pixel 9 Pro', description: 'Pixel 9 Pro with Tensor G4 chip, advanced AI features', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google', type: 'other', price: '$999', sources: [{ label: 'Google Store', url: 'https://store.google.com/pixel-9-pro', type: 'official' }], specs: { 'Chip': 'Tensor G4', 'Display': '6.3 inch OLED', 'RAM': '16GB', 'Camera': '50MP main' } },
  { id: '18', name: 'Google Pixel 9 Pro Fold', description: 'Google first foldable Pixel with Tensor G4', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google', type: 'smartphone', price: '$1,799', sources: [{ label: 'Google Store', url: 'https://store.google.com/pixel-9-pro-fold', type: 'official' }], specs: { 'Chip': 'Tensor G4', 'Display': '6.3 inch (outer), 8 inch (inner)', 'RAM': '16GB' } },
  { id: '19', name: 'Google Pixel 10', description: 'Expected with Tensor G5 chip, advanced on-device AI', date: 'Oct 2025', dateObj: new Date('2025-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google', type: 'other', priceRange: '$799-$999' },
  { id: '20', name: 'Google Pixel 10 Pro', description: 'Pro variant with enhanced camera and AI capabilities', date: 'Oct 2025', dateObj: new Date('2025-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google', type: 'other', priceRange: '$999-$1,099',
  },
  { id: '21', name: 'Google Pixel 9a', description: 'Budget Pixel with solid camera and AI features', date: 'May 2024', dateObj: new Date('2024-05-01'), status: 'Released', confirmationLevel: 'official', category: 'google', type: 'other', price: '$499', sources: [{ label: 'Google Store', url: 'https://store.google.com/pixel-9a', type: 'official' }], specs: { 'Chip': 'Tensor G4', 'Display': '6.24 inch OLED', 'RAM': '8GB', 'Camera': '48MP main' } },
  { id: '22', name: 'Google Pixel Tablet 2', description: 'Second generation Pixel Tablet with charging speaker dock', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'google', type: 'tablet', priceRange: '$399-$499',
  },

  // Tesla
  { id: '23', name: 'Tesla Cybertruck', description: 'All-electric pickup truck with stainless steel exoskeleton', date: 'Nov 2023', dateObj: new Date('2023-11-01'), status: 'Released', confirmationLevel: 'official', category: 'tesla', type: 'car', price: '$79,990',
    sources: [
      { label: 'Tesla Cybertruck', url: 'https://www.tesla.com/cybertruck', type: 'official' },
      { label: 'Tesla Review', url: 'https://www.motortrend.com/tesla-cybertruck-review', type: 'review' },
    ],
    specs: { 'Range': '340-470 miles', '0-60': '2.6s (Tri Motor)', 'Payload': '2,500 lbs', 'Towing': '11,000 lbs' }
  },
  { id: '24', name: 'Tesla Robotaxi (Cybercab)', description: 'Autonomous taxi with no steering wheel or pedals', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'tesla', type: 'robot', priceRange: '~$30,000',
  },
  { id: '25', name: 'Tesla Optimus Gen 3', description: 'Third generation humanoid robot with enhanced dexterity', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'tesla', type: 'robot', priceRange: '$25,000-$50,000',
  },
  { id: '26', name: 'Tesla Model Q', description: 'Affordable compact EV expected under $30,000', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'tesla', type: 'car', priceRange: '$25,000-$30,000',
  },
  { id: '27', name: 'Tesla Model Y Juniper', description: 'Refreshed Model Y with new design and features', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'tesla', type: 'car', price: '$44,990',
  },
  { id: '28', name: 'Tesla Roadster 2', description: 'Next generation sports car with SpaceX thrusters', date: 'TBD', dateObj: new Date('2027-01-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'tesla', type: 'other', priceRange: '$200,000+',
  },

  // NVIDIA
  { id: '29', name: 'NVIDIA RTX 5090', description: 'Flagship GPU with Blackwell architecture, massive performance gains', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia', type: 'gpu', price: '$1,999',
    sources: [
      { label: 'NVIDIA RTX 5090', url: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/', type: 'official' },
      { label: 'Tom\'s Hardware Review', url: 'https://www.tomshardware.com/nvidia-geforce-rtx-5090', type: 'review' },
    ],
    specs: { 'Architecture': 'Blackwell', 'VRAM': '32GB GDDR7', 'CUDA Cores': '21760', 'Boost Clock': '2.4 GHz' }
  },
  { id: '30', name: 'NVIDIA RTX 5080', description: 'High-end GPU for enthusiasts and creators', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia', type: 'gpu', price: '$999',
  },
  { id: '31', name: 'NVIDIA RTX 5070 Ti', description: 'Mid-high GPU with excellent price/performance', date: 'Feb 2025', dateObj: new Date('2025-02-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia', type: 'gpu', price: '$749',
  },
  { id: '32', name: 'NVIDIA RTX 5070', description: 'Mainstream GPU for gamers', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia', type: 'gpu', price: '$549',
  },
  { id: '33', name: 'NVIDIA GB200 NVL72', description: 'Datacenter rack with 72 Blackwell GPUs', date: '2024', dateObj: new Date('2024-12-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia', type: 'gpu', price: '$1.8M+',
  },
  { id: '34', name: 'NVIDIA RTX 5060', description: 'Budget GPU expected mid-2026', date: 'TBD 2026', dateObj: new Date('2026-05-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'nvidia', type: 'gpu', priceRange: '$299-$399',
  },

  // AMD
  { id: '35', name: 'AMD Ryzen 9000', description: 'Desktop CPUs with Zen 5 architecture', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'amd', type: 'cpu', price: '$279-$549',
  },
  { id: '36', name: 'AMD Ryzen AI 300', description: 'Mobile APUs with integrated AI capabilities', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'amd', type: 'cpu', price: '$999+',
  },
  { id: '37', name: 'AMD RX 9070 XT', description: 'RDNA 4 flagship GPU, competitive with NVIDIA RTX 5070', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'amd', type: 'gpu', price: '$549', sources: [{ label: 'AMD', url: 'https://www.amd.com/en/products/graphics-cards/radeon-rx-9070-xt.html', type: 'official' }], specs: { 'Architecture': 'RDNA 4', 'VRAM': '16GB GDDR6', 'Stream Processors': '4096' } },
  { id: '38', name: 'AMD RX 9070', description: 'RDNA 4 mainstream GPU with strong value', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'amd', type: 'gpu', price: '$449', sources: [{ label: 'AMD', url: 'https://www.amd.com/en/products/graphics-cards/radeon-rx-9070.html', type: 'official' }], specs: { 'Architecture': 'RDNA 4', 'VRAM': '16GB GDDR6', 'Stream Processors': '3584' } },
  { id: '39', name: 'AMD Ryzen 9000X3D', description: 'Gaming CPUs with 3D V-Cache technology', date: 'Nov 2024', dateObj: new Date('2024-11-01'), status: 'Released', confirmationLevel: 'official', category: 'amd', type: 'cpu', price: '$449-$599',
  },
  { id: '40', name: 'AMD EPYC Turin', description: 'Server CPUs with Zen 5 architecture', date: '2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'amd', type: 'cpu', priceRange: '$2,000-$10,000',
  },

  // Intel
  { id: '41', name: 'Intel Core Ultra 200', description: 'Arrow Lake desktop CPUs with AI acceleration', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'intel', type: 'cpu', price: '$394-$589', sources: [{ label: 'Intel', url: 'https://www.intel.com/coreultra', type: 'official' }], specs: { 'Architecture': 'Arrow Lake', 'Process': 'Intel 20A', 'Cores': 'Up to 24 cores' } },
  { id: '42', name: 'Intel Core Ultra 200V', description: 'Lunar Lake mobile CPUs with improved efficiency', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'intel', type: 'cpu', price: '$999+', sources: [{ label: 'Intel', url: 'https://www.intel.com/coreultra', type: 'official' }], specs: { 'Architecture': 'Lunar Lake', 'Process': 'Intel 18A', 'Efficiency': 'Low power design' } },
  { id: '43', name: 'Intel Core i9-14900K', description: 'Raptor Lake refresh flagship CPU', date: 'Oct 2023', dateObj: new Date('2023-10-01'), status: 'Released', confirmationLevel: 'official', category: 'intel', type: 'cpu', price: '$549',
  },
  { id: '44', name: 'Intel Gaudi 3', description: 'AI accelerator for data centers', date: '2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'intel', type: 'cpu', priceRange: '$25,000-$30,000',
  },
  { id: '45', name: 'Intel Panther Lake', description: 'Next generation mobile CPUs expected 2025-2026', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'intel', type: 'cpu', priceRange: '$400-$600',
  },

  // Sony
  { id: 's1', name: 'PlayStation 5 Pro', description: 'Enhanced PS5 with improved GPU and faster SSD', date: 'Nov 2024', dateObj: new Date('2024-11-01'), status: 'Released', confirmationLevel: 'official', category: 'sony', type: 'console', price: '$699', sources: [{ label: 'PlayStation', url: 'https://www.playstation.com/ps5/ps5-pro/', type: 'official' }], specs: { 'GPU': '16.7 TFLOPS RDNA 3', 'Storage': '2TB SSD', 'RAM': '16GB GDDR6' } },
  { id: 's2', name: 'PlayStation 5 Slim', description: 'Slimmer PS5 with detachable disc drive', date: 'Nov 2023', dateObj: new Date('2023-11-01'), status: 'Released', confirmationLevel: 'official', category: 'sony', type: 'console', price: '$449', sources: [{ label: 'PlayStation', url: 'https://www.playstation.com/ps5/', type: 'official' }], specs: { 'GPU': '10.3 TFLOPS RDNA 2', 'Storage': '1TB SSD', 'Disc': 'Detachable' } },
  { id: 's3', name: 'PlayStation 6', description: 'Next generation PlayStation, expected 2028', date: 'TBD 2028', dateObj: new Date('2028-12-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'sony', type: 'console', priceRange: '$499-$599',
  },
  { id: 's4', name: 'PlayStation VR3', description: 'Third generation PS VR headset', date: 'TBD 2027', dateObj: new Date('2027-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'sony', type: 'vr', priceRange: '$499',
  },
  { id: '47', name: 'Sony WH-1000XM6', description: 'Next generation noise cancelling headphones', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'sony', type: 'audio', priceRange: '$399',
  },
  { id: '48', name: 'Sony A9 IV', description: 'Professional mirrorless camera with stacked sensor', date: 'Feb 2025', dateObj: new Date('2025-02-01'), status: 'Released', confirmationLevel: 'official', category: 'sony', type: 'camera', price: '$4,498',
  },
  { id: '49', name: 'Sony XR Headset', description: 'Spatial content headset for creators', date: '2024', dateObj: new Date('2024-06-01'), status: 'Released', confirmationLevel: 'official', category: 'sony', type: 'other', price: '$3,499',
  },
  { id: '50', name: 'Sony Walkman Signature', description: 'Premium audiophile music player', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'sony', type: 'audio', price: '$3,199',
  },

  // Meta
  { id: 'm1', name: 'Meta Quest 3', description: 'Mixed reality headset, Snapdragon XR2 Gen 2', date: 'Oct 2023', dateObj: new Date('2023-10-01'), status: 'Released', confirmationLevel: 'official', category: 'meta', type: 'vr', price: '$499',
    sources: [
      { label: 'Meta Quest 3', url: 'https://www.meta.com/quest/quest-3/', type: 'official' },
      { label: 'Tom\'s Hardware Review', url: 'https://www.tomshardware.com/meta-quest-3', type: 'review' },
    ],
    specs: { 'Chip': 'Snapdragon XR2 Gen 2', 'Resolution': '2064x2208 per eye', 'FOV': '110°', 'Storage': '128GB-512GB' }
  },
  { id: 'm2', name: 'Meta Quest 3S', description: 'Budget mixed reality, same chip as Quest 3', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'meta', type: 'vr', price: '$299',
  },
  { id: 'm3', name: 'Meta Quest Pro 2', description: 'High-end MR for professionals', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'meta', type: 'vr', priceRange: '$999-$1,499',
  },
  { id: 'm4', name: 'Meta Ray-Ban Smart Glasses (Gen 3)', description: 'Meta AI, camera, audio, improved design', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'meta', type: 'ar', price: '$299',
  },
  { id: 'm5', name: 'Meta Ray-Ban Smart Glasses (Gen 4)', description: 'Next gen with display, expected 2026', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'meta', type: 'ar', priceRange: '$399-$499',
  },
  { id: 'm6', name: 'Meta Orion AR Glasses', description: 'True AR glasses, holographic display', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'meta', type: 'ar', priceRange: '$1,000+',
  },
  { id: 'm7', name: 'Meta Quest 4', description: 'Next generation Quest with improved passthrough', date: 'TBD 2027', dateObj: new Date('2027-09-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'meta', type: 'vr', priceRange: '$499-$699',
  },

  // Nintendo
  { id: 'n1', name: 'Nintendo Switch 2', description: 'Next Nintendo console, 8-inch LCD, DLSS support', date: 'Jun 2025', dateObj: new Date('2025-06-01'), status: 'Released', confirmationLevel: 'official', category: 'nintendo', type: 'console', price: '$349',
    sources: [
      { label: 'Nintendo Switch 2', url: 'https://www.nintendo.com/switch-2/', type: 'official' },
      { label: 'IGN Review', url: 'https://www.ign.com/articles/nintendo-switch-2-review', type: 'review' },
    ],
    specs: { 'Display': '8 inch LCD', 'Processor': 'Tegra T239', 'Storage': '256GB', 'Output': '4K TV, 1080p handheld' }
  },
  { id: 'n2', name: 'Nintendo Switch 2 Pro', description: 'Enhanced Switch 2 with OLED display', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'nintendo', type: 'console', priceRange: '$399',
  },

  // Microsoft
  { id: 'x1', name: 'Xbox Series X', description: 'Current Xbox flagship, 12 teraflops', date: 'Nov 2020', dateObj: new Date('2020-11-01'), status: 'Released', confirmationLevel: 'official', category: 'microsoft', type: 'console', price: '$499', sources: [{ label: 'Microsoft Xbox', url: 'https://www.xbox.com/consoles/series-x', type: 'official' }], specs: { 'GPU': '12 TFLOPS RDNA 2', 'Storage': '1TB SSD', 'RAM': '16GB GDDR6' } },
  { id: 'x2', name: 'Xbox Series S', description: 'Digital-only console, 4 teraflops', date: 'Nov 2020', dateObj: new Date('2020-11-01'), status: 'Released', confirmationLevel: 'official', category: 'microsoft', type: 'console', price: '$299', sources: [{ label: 'Microsoft Xbox', url: 'https://www.xbox.com/consoles/series-s', type: 'official' }], specs: { 'GPU': '4 TFLOPS RDNA 2', 'Storage': '512GB SSD', 'RAM': '10GB GDDR6' } },
  { id: 'x3', name: 'Xbox Series X Refresh', description: 'Mid-gen refresh with more storage', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'microsoft', type: 'console', priceRange: '$499',
  },
  { id: 'x4', name: 'Next Xbox (Project Scarlett)', description: 'Next generation Xbox, expected 2028', date: 'TBD 2028', dateObj: new Date('2028-12-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'microsoft', type: 'console', priceRange: '$499-$599',
  },

  // INMO
  { id: 'in1', name: 'INMO Go', description: 'Original lightweight AR glasses, monocular display', date: 'Mar 2024', dateObj: new Date('2024-03-01'), status: 'Released', confirmationLevel: 'official', category: 'inmo', type: 'ar', price: '$399',
  },
  { id: 'in2', name: 'INMO Air 3', description: 'Binocular AR glasses, Android apps, camera - Kickstarter', date: 'Jun 2024', dateObj: new Date('2024-06-01'), status: 'Released', confirmationLevel: 'official', category: 'inmo', type: 'ar' },
  { id: 'in3', name: 'INMO Go 3', description: 'New gen with camera privacy cover, Kickstarter mid-April 2026', date: 'Apr 2026', dateObj: new Date('2026-04-15'), status: 'Upcoming', confirmationLevel: 'official', category: 'inmo', type: 'ar', priceRange: '$399-$499',
    sources: [
      { label: 'INMO Kickstarter', url: 'https://www.inmoxr.com/pages/go3-crowdfunding', type: 'official' },
      { label: 'PetaPixel Review', url: 'https://petapixel.com/2026/03/24/these-smart-glasses-come-with-a-cover-for-the-camera-inmo-go-3/', type: 'review' },
    ],
    specs: { 'Display': 'Waveguide', 'Camera': 'With privacy cover', 'Platform': 'AI-enabled' }
  },
  { id: 'in4', name: 'INMO Air 4', description: 'Latest gen, improved display, longer battery', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'inmo', type: 'ar', priceRange: '$699-$999',
  },
  { id: 'in5', name: 'INMO X', description: 'Premium AR glasses with enhanced FOV', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'inmo', type: 'ar', priceRange: '$999-$1,499',
  },

  // AR/MR
  { id: 'ar1', name: 'Apple Vision Pro', description: 'Spatial computing headset, micro-OLED displays', date: 'Feb 2024', dateObj: new Date('2024-02-01'), status: 'Released', confirmationLevel: 'official', category: 'ar', type: 'vr', price: '$3,499',
    sources: [
      { label: 'Apple Vision Pro', url: 'https://www.apple.com/apple-vision-pro/', type: 'official' },
    ],
    specs: { 'Display': 'Micro-OLED', 'Resolution': '23MP per eye', 'Chip': 'M2 + R2', 'Storage': '256GB-1TB', 'Weight': '453g' }
  },
  { id: 'ar2', name: 'Microsoft HoloLens 3', description: 'Next gen AR headset for enterprise', date: 'TBD', dateObj: new Date('2027-01-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'ar', type: 'ar', priceRange: '$3,000+',
  },
  { id: 'ar3', name: 'Xreal Air 3 Pro', description: 'AR glasses with spatial display', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'ar', type: 'ar', price: '$449',
  },
  { id: 'ar4', name: 'Xreal One Pro', description: 'Latest AR glasses with improved FOV', date: 'Mar 2026', dateObj: new Date('2026-03-01'), status: 'Released', confirmationLevel: 'official', category: 'ar', type: 'ar', price: '$599',
  },
  { id: 'ar5', name: 'Rokid Max Pro 2', description: 'AR glasses with gesture control', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'ar', type: 'ar', priceRange: '$499',
  },
  { id: 'ar6', name: 'Snap Spectacles 6', description: 'AR glasses with Snap OS, developer focused', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'ar', type: 'ar', priceRange: '$380',
  },
  { id: 'ar7', name: 'Magic Leap 3', description: 'Enterprise AR headset, improved field of view', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'ar', type: 'other', price: '$1,999',
  },
  { id: 'v1', name: 'Steam Deck', description: 'Valve handheld gaming PC, AMD APU', date: 'Feb 2022', dateObj: new Date('2022-02-01'), status: 'Released', confirmationLevel: 'official', category: 'valve', type: 'handheld', price: '$399',
    sources: [
      { label: 'Valve Steam Deck', url: 'https://www.steamdeck.com/', type: 'official' },
    ],
    specs: { 'Display': '7 inch 1280x800 LCD', 'CPU': 'AMD Zen 2 4-core', 'RAM': '16GB LPDDR5', 'Storage': '64GB-512GB' }
  },
  { id: 'v2', name: 'Steam Deck OLED', description: 'Steam Deck with OLED display, better battery', date: 'Nov 2023', dateObj: new Date('2023-11-01'), status: 'Released', confirmationLevel: 'official', category: 'valve', type: 'handheld', price: '$549',
    sources: [
      { label: 'Valve Steam Deck OLED', url: 'https://www.steamdeck.com/oled', type: 'official' },
    ],
    specs: { 'Display': '7 inch 1280x800 OLED HDR', 'CPU': 'AMD Zen 2 6-core', 'RAM': '16GB LPDDR5', 'Battery': '50Wh (larger)' }
  },
  { id: 'v3', name: 'Steam Deck Pro', description: 'High-end refresh with better performance', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'valve', type: 'handheld', priceRange: '$699',
  },
  { id: 'v4', name: 'Steam Frame', description: 'Valve next-gen handheld, potentially OLED 90Hz', date: 'H1 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'valve', type: 'handheld', priceRange: '$599-$699',
    sources: [
      { label: 'Valve Steam Deck', url: 'https://www.steamdeck.com/', type: 'official' },
      { label: 'The Verge', url: 'https://www.theverge.com/valve-steam-deck-2', type: 'rumor' },
    ],
    specs: { 'Display': 'OLED 90Hz (rumored)', 'Chip': 'AMD Phoenix 2 (rumored)', 'Release': 'First half 2026' }
  },
  { id: 'v5', name: 'Steam Machine', description: 'Valve living room console PC', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'valve', type: 'console', priceRange: '$500-$1,000',
  },
  { id: 'v6', name: 'Steam Controller 2', description: 'Next-gen Steam Controller with haptic feedback', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'valve', type: 'controller', priceRange: '$79',
  },
];

export default function Home() {
  const { isDark } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('upcoming');
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [releases, setReleases] = useState<Release[]>([]);
  const [now, setNow] = useState(Date.now());
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
    useEffect(() => {
    setReleases(staticReleases);
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle compare URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const compareIds = params.get('compare');
      if (compareIds) {
        const ids = compareIds.split(',').filter(id => id.trim());
        setCompareList(ids);
        setShowCompare(true);
      }
      const itemId = params.get('item');
      if (itemId && releases.length > 0) {
        const release = releases.find(r => r.id === itemId);
        if (release) {
          setSelectedRelease(release);
        }
      }
    }
  }, [releases]);

  const getCountdown = (dateStr: string, dateObj: Date): string => {
    if (dateStr === 'TBD' || dateStr.startsWith('TBD') || !dateStr) return '';
    try {
      const eventTime = dateObj.getTime();
      const diff = eventTime - now;

      if (diff < 0) return 'Available';

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);

      if (months > 0) return `${months} month${months > 1 ? 's' : ''}`;
      if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''}`;
      if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
      return 'Soon';
    } catch {
      return '';
    }
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const shareProduct = async (release: Release) => {
    const text = `${release.name} - ${release.description} (${release.status}, ${release.date})`;
    const url = `https://hardware.benjob.me?item=${encodeURIComponent(release.id)}`;
    if (navigator.share) {
      await navigator.share({ title: release.name, text, url });
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopiedId(release.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getCompareItems = () => releases.filter(r => compareList.includes(r.id));

  const getTimeSince = (dateObj: Date): string => {
    const diff = now - dateObj.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years}yr ago`;
    if (months > 0) return `${months}mo ago`;
    if (weeks > 0) return `${weeks}w ago`;
    if (days > 0) return `${days}d ago`;
    return 'Just now';
  };

  const categoryIds = allCategories.map(c => c.id).filter(c => c !== 'all');
  const typeIds = allTypes.map(t => t.id).filter(t => t !== 'all');

  const toggleCategory = (cat: string) => {
    if (cat === 'all') {
      setSelectedCategories(selectedCategories.length === categoryIds.length ? [] : [...categoryIds]);
    } else {
      setSelectedCategories(prev =>
        prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
      );
    }
  };

  const toggleType = (type: string) => {
    if (type === 'all') {
      setSelectedTypes(selectedTypes.length === typeIds.length ? [] : [...typeIds]);
    } else {
      setSelectedTypes(prev =>
        prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
      );
    }
  };

  const isRecentlyReleased = (dateObj: Date): boolean => {
    const daysSince = (now - dateObj.getTime()) / (1000 * 60 * 60 * 24);
    return daysSince >= 0 && daysSince <= 90;
  };

  const filtered = releases
    .filter(r => selectedCategories.length === 0 || selectedCategories.includes(r.category))
    .filter(r => selectedTypes.length === 0 || selectedTypes.includes(r.type))
    .filter(r => {
      if (statusFilter === 'all') return true;
      if (statusFilter === 'released') return r.status === 'Released';
      if (statusFilter === 'upcoming') return r.status === 'Upcoming' || r.status === 'Announced';
      return true;
    })
    .filter(r => {
      if (timeFilter === 'all') return true;
      if (timeFilter === 'recent') return isRecentlyReleased(r.dateObj);

      const daysSince = (now - r.dateObj.getTime()) / (1000 * 60 * 60 * 24);
      if (timeFilter === 'week') return daysSince <= 7;
      if (timeFilter === 'month') return daysSince <= 30;
      if (timeFilter === 'quarter') return daysSince <= 90;
      if (timeFilter === 'year') return daysSince <= 365;
      return true;
    })
    .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

  const releasedCount = releases.filter(r => r.status === 'Released').length;
  const upcomingCount = releases.filter(r => r.status === 'Upcoming').length;
  const recentCount = releases.filter(r => isRecentlyReleased(r.dateObj)).length;

  const allSelected = selectedCategories.length === categoryIds.length;
  const allTypesSelected = selectedTypes.length === typeIds.length;

  const sourceTypeColors = {
    official: 'bg-green-500/20 text-green-400 border-green-500/30',
    review: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    rumor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    specs: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  };

  return (
    <>
      {selectedRelease && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedRelease(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
            className={`max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl p-6 ${isDark ? "bg-gray-900" : "bg-white"} shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{selectedRelease.name}</h2>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[selectedRelease.status]}`}>{selectedRelease.status}</span>
                  <span className={`text-sm ${confirmationColors[selectedRelease.confirmationLevel]}`}>{selectedRelease.confirmationLevel}</span>
                  <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>• {selectedRelease.date}</span>
                </div>
              </div>
              <button onClick={() => setSelectedRelease(null)} className={`p-2 rounded-lg hover:bg-gray-700 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <X size={24} />
              </button>
            </div>

            <p className={`text-lg mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{selectedRelease.description}</p>

            {(selectedRelease.price || selectedRelease.priceRange) && (
              <div className={`mb-6 p-4 rounded-xl ${isDark ? "bg-green-900/30 border border-green-700" : "bg-green-50 border border-green-200"}`}>
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-xl ${isDark ? "text-green-400" : "text-green-700"}`}>
                    {selectedRelease.price || selectedRelease.priceRange}
                  </span>
                  {selectedRelease.priceRange && (
                    <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>estimated</span>
                  )}
                </div>
              </div>
            )}

            {selectedRelease.specs && Object.keys(selectedRelease.specs).length > 0 && (
              <div className={`mb-6 p-4 rounded-xl ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
                <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  <Cpu size={18} /> Specifications
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedRelease.specs).map(([key, value]) => (
                    <div key={key} className={`flex justify-between ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <span className={isDark ? "text-gray-400" : "text-gray-500"}>{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedRelease.sources && selectedRelease.sources.length > 0 && (
              <div className="mb-4">
                <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  <ExternalLink size={18} /> Sources & References
                </h3>
                <div className="space-y-2">
                  {selectedRelease.sources.map((source, idx) => (
                    <a key={idx} href={source.url} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all hover:scale-[1.02] ${sourceTypeColors[source.type]} border-current`}>
                      <span className="font-medium">{source.label}</span>
                      <ExternalLink size={16} />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`mt-4 pt-4 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <span className="font-medium">Category:</span> {selectedRelease.category} • <span className="font-medium">Type:</span> {selectedRelease.type}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showCompare && compareList.length > 0 && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCompare(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${isDark ? "bg-gray-900" : "bg-white"} shadow-2xl`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Compare ({compareList.length})</h2>
              <button onClick={() => setShowCompare(false)} className={`p-2 rounded-lg hover:bg-gray-700 ${isDark ? "text-gray-400" : "text-gray-500"}`}><X size={24} /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}><th className={`text-left p-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Product</th><th className={`text-left p-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Status</th><th className={`text-left p-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Date</th><th className={`text-left p-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Specs</th></tr></thead>
                <tbody>
                  {getCompareItems().map(item => (
                    <tr key={item.id} className={`border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                      <td className="p-3"><div className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{item.name}</div><div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{item.description}</div></td>
                      <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[item.status]}`}>{item.status}</span></td>
                      <td className={`p-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>{item.date}</td>
                      <td className="p-3">{item.specs && Object.entries(item.specs).slice(0,3).map(([k,v]) => <div key={k} className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}><span className="font-medium">{k}:</span> {v}</div>)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => { const items = getCompareItems(); const compareUrl = `https://hardware.benjob.me?compare=${items.map(i => i.id).join(',')}`; let shareText = items.length <= 3 ? items.map(i => i.name).join(' vs ') : `${items.length} hardware products`; navigator.clipboard.writeText(`${shareText}\n${compareUrl}`); }} className={`px-4 py-2 rounded-lg ${isDark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}><Share2 size={16} className="inline mr-2" />Share</button>
            </div>
          </motion.div>
        </div>
      )}

      <Layout title="Hardware Releases" subtitle={`${releases.length} releases • ${recentCount} recent (last 90d)`}>
      <div className={`mb-4 p-4 rounded-xl ${isDark ? "glass-card glass-card-dark" : "glass-card glass-card-light"}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>Company:</span>
          <button onClick={() => setSelectedCategories(allSelected ? [] : categoryIds)}
            className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
            {allSelected ? 'None' : 'All'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {allCategories.filter(c => c.id !== 'all').map(cat => (
            <button key={cat.id} onClick={() => toggleCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                selectedCategories.includes(cat.id) ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700'
              }`}>
              {categoryIcons[cat.id]} {cat.label} {selectedCategories.includes(cat.id) ? '✓' : ''}
            </button>
          ))}
        </div>
      </div>

      <div className={`mb-4 p-4 rounded-xl ${isDark ? "glass-card glass-card-dark" : "glass-card glass-card-light"}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>Category:</span>
          <button onClick={() => setSelectedTypes(allTypesSelected ? [] : typeIds)}
            className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
            {allTypesSelected ? 'None' : 'All'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {allTypes.filter(t => t.id !== 'all').map(type => (
            <button key={type.id} onClick={() => toggleType(type.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                selectedTypes.includes(type.id) ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700'
              }`}>
              {typeIcons[type.id]} {type.label} {selectedTypes.includes(type.id) ? '✓' : ''}
            </button>
          ))}
        </div>
      </div>

      <div className={`mb-4 p-4 rounded-xl ${isDark ? "glass-card glass-card-dark" : "glass-card glass-card-light"}`}>
        <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"} mb-2 block`}>Status:</span>
        <div className="flex flex-wrap gap-2">
          {[{ id: 'all', label: 'All' }, { id: 'released', label: 'Released' }, { id: 'upcoming', label: 'Upcoming' }].map(sf => (
            <button key={sf.id} onClick={() => setStatusFilter(sf.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                statusFilter === sf.id ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700'
              }`}>
              {sf.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`mb-4 p-4 rounded-xl ${isDark ? "glass-card glass-card-dark" : "glass-card glass-card-light"}`}>
        <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"} mb-2 block`}>Time:</span>
        <div className="flex flex-wrap gap-2">
          {[{ id: 'all', label: 'All' }, { id: 'recent', label: 'Recent (90d)' }, { id: 'year', label: 'This Year' }, { id: 'quarter', label: 'This Quarter' }].map(tf => (
            <button key={tf.id} onClick={() => setTimeFilter(tf.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                timeFilter === tf.id ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700'
              }`}>
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {compareList.length > 0 && (
        <div className={`mb-4 p-4 rounded-xl flex items-center justify-between ${isDark ? "bg-purple-900/30 border border-purple-500/30" : "bg-purple-100 border border-purple-300"}`}>
          <div className={`flex items-center gap-2 ${isDark ? "text-purple-300" : "text-purple-700"}`}>
            <GitCompare size={20} />
            <span className="font-medium">{compareList.length} selected for comparison</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setCompareList([])} className={`px-3 py-1.5 rounded-lg text-sm ${isDark ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}>Clear</button>
            <button onClick={() => setShowCompare(true)} className="px-3 py-1.5 rounded-lg text-sm bg-purple-600 hover:bg-purple-500 text-white">Compare</button>
          </div>
        </div>
      )}

      <div className={`mb-4 p-3 rounded-xl text-sm ${isDark ? "glass-card glass-card-dark" : "glass-card glass-card-light"}`}>
        <span className={isDark ? "text-gray-300" : "text-gray-600"}>
          Showing {filtered.length} releases • {releasedCount} released • {upcomingCount} upcoming
        </span>
      </div>

      <div className="space-y-3">
        {filtered.map((release) => {
          const countdown = release.status === 'Upcoming' ? getCountdown(release.date, release.dateObj) : '';
          const timeSince = release.status === 'Released' ? getTimeSince(release.dateObj) : '';
          const isRecent = isRecentlyReleased(release.dateObj);

          return (
            <motion.div key={release.id}
              className={`p-4 rounded-xl transition-all cursor-pointer hover:scale-[1.01] ${isDark ? "glass-card glass-card-dark" : "glass-card glass-card-light"}`}
              onClick={() => setSelectedRelease(release)}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={compareList.includes(release.id)} onChange={() => toggleCompare(release.id)} className="w-5 h-5 rounded accent-purple-500 cursor-pointer" onClick={(e) => e.stopPropagation()} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{release.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[release.status]}`}>
                      {release.status}
                    </span>
                    {isRecent && release.status === 'Released' && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">Recent</span>
                    )}
                    {countdown && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                        <Clock size={12} /> {countdown}
                      </span>
                    )}
                    {(release.sources?.length || release.specs) && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isDark ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600"} flex items-center gap-1`}>
                        <Info size={12} /> Details
                      </span>
                    )}
                  </div>
                  {(release.price || release.priceRange) && (
                    <p className={`text-sm font-semibold mb-1 ${isDark ? "text-green-400" : "text-green-600"}`}>
                      {release.price || release.priceRange}{release.priceRange ? ' est.' : ''}
                    </p>
                  )}
                  <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{release.description}</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                    <Clock size={14} />
                    {release.date}
                  </div>
                  {timeSince && <span className="text-xs text-green-400">{timeSince}</span>}
                  <span className={`text-xs block ${confirmationColors[release.confirmationLevel]}`}>
                    {release.confirmationLevel}
                  </span>
                  <button onClick={(e) => { e.stopPropagation(); shareProduct(release); }} className={`p-1.5 rounded-lg mt-1 ${isDark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-200 text-gray-500"}`} title="Share">
                    {copiedId === release.id ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Layout>
    </>
  );
}
