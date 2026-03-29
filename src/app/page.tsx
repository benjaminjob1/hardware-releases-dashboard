"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useTheme } from "../components/Layout";
import { Clock, Cpu, Smartphone, Watch, Laptop, Monitor, Tablet, Headphones, Car, Tv, Glasses } from "lucide-react";

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
  { id: '1', name: 'iPhone 17 Pro Max', description: 'Latest iPhone with A19 Pro chip, titanium frame, enhanced camera system', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'smartphone' },
  { id: '2', name: 'iPhone 17 Air', description: 'Ultra-thin iPhone model, the thinnest ever at ~5.5mm', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'smartphone' },
  { id: '3', name: 'iPad Pro M4', description: 'iPad Pro with M4 chip, OLED display, thinner design', date: 'May 2024', dateObj: new Date('2024-05-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'tablet' },
  { id: '4', name: 'MacBook Pro M4', description: 'MacBook Pro with M4/M4 Pro/M4 Max chips, enhanced battery life', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'laptop' },
  { id: '5', name: 'Apple Watch Series 10', description: 'Thinner design,血压 monitoring, enhanced health features', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'wearable' },
  { id: '6', name: 'AirPods Pro 3', description: 'Next generation AirPods Pro with improved ANC and sound quality', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple', type: 'wearable' },
  { id: '7', name: 'Vision Pro 2', description: 'Second generation Vision Pro with lighter weight and lower price', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple', type: 'vr' },
  { id: '8', name: 'MacBook Air M4', description: 'MacBook Air with M4 chip, expected early 2025', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'laptop' },
  { id: '9', name: 'iPhone 18 Pro', description: 'Next iPhone with A20 chip, expected September 2026', date: 'Sep 2026', dateObj: new Date('2026-09-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple', type: 'smartphone' },
  { id: '10', name: 'iPad Air M3', description: 'iPad Air with M3 chip, expected March 2025', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'tablet' },
  { id: '10b', name: 'MacBook Neo', description: 'New laptop category between Air and Pro, mini-LED display', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'apple', type: 'laptop' },
  { id: '10c', name: 'MacBook Air M3', description: 'MacBook Air with M3 chip, fanless design', date: 'Mar 2024', dateObj: new Date('2024-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'laptop' },
  { id: '10d', name: 'iPhone 17', description: 'Standard iPhone 17 model with A19 chip', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'smartphone' },
  { id: '10e', name: 'iPhone Fold', description: 'Apple first foldable iPhone with ~8 inch display', date: 'TBD 2027', dateObj: new Date('2027-09-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'apple', type: 'smartphone' },
  { id: '10f', name: 'iPad mini 8', description: 'Next iPad mini with smaller bezels and M4 chip', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple', type: 'tablet' },
  { id: '10g', name: 'iPad Air M4', description: 'iPad Air with M4 chip, thinner design', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'tablet' },
  { id: '10h', name: 'Apple Watch Ultra 3', description: 'Third generation Apple Watch Ultra with better battery', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'wearable' },
  { id: '10i', name: 'AirPods 4', description: 'Standard AirPods 4th gen with USB-C, improved fit', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'wearable' },
  { id: '10j', name: 'HomePod 4', description: 'New HomePod with improved audio and AI', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'apple', type: 'audio' },
  { id: '10k', name: 'Apple Watch SE 3', description: 'Budget Apple Watch with essential features', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'wearable' },
  { id: '10l', name: 'MacBook Pro M5', description: 'MacBook Pro with M5/M5 Pro/M5 Max chips', date: 'Oct 2025', dateObj: new Date('2025-10-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'laptop' },
  { id: '10m', name: 'Mac Studio M4 Ultra', description: 'Mac Studio with M4 Ultra chip for pros', date: 'Jun 2025', dateObj: new Date('2025-06-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'laptop' },
  { id: '10n', name: 'Mac Pro M5', description: 'Mac Pro with M5 chip, ultimate performance', date: 'Jun 2025', dateObj: new Date('2025-06-01'), status: 'Released', confirmationLevel: 'official', category: 'apple', type: 'laptop' },

  // Samsung
  { id: '11', name: 'Samsung Galaxy S25 Ultra', description: 'Latest Samsung flagship with Snapdragon 8 Elite, 200MP camera', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung', type: 'smartphone' },
  { id: '12', name: 'Samsung Galaxy Z Fold 6', description: 'Latest foldable with improved hinge and durability', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung', type: 'smartphone' },
  { id: '13', name: 'Samsung Galaxy Z Flip 6', description: 'Compact foldable with larger cover screen', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung', type: 'smartphone' },
  { id: '14', name: 'Samsung Galaxy S26 Ultra', description: 'Expected with Snapdragon 8 Gen 5, improved AI features', date: 'Jan 2026', dateObj: new Date('2026-01-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung', type: 'smartphone' },
  { id: '15', name: 'Samsung Galaxy Ring 2', description: 'Next generation smart ring with health tracking improvements', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'samsung', type: 'wearable' },
  { id: '16', name: 'Samsung Galaxy Tab S10', description: 'Premium Android tablet with S Pen support', date: 'Aug 2024', dateObj: new Date('2024-08-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung', type: 'tablet' },

  // Google
  { id: '17', name: 'Google Pixel 9 Pro', description: 'Pixel 9 Pro with Tensor G4 chip, advanced AI features', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google', type: 'other' },
  { id: '18', name: 'Google Pixel 9 Pro Fold', description: 'Google first foldable Pixel with Tensor G4', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google', type: 'smartphone' },
  { id: '19', name: 'Google Pixel 10', description: 'Expected with Tensor G5 chip, advanced on-device AI', date: 'Oct 2025', dateObj: new Date('2025-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google', type: 'other' },
  { id: '20', name: 'Google Pixel 10 Pro', description: 'Pro variant with enhanced camera and AI capabilities', date: 'Oct 2025', dateObj: new Date('2025-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google', type: 'other' },
  { id: '21', name: 'Google Pixel 9a', description: 'Budget Pixel with solid camera and AI features', date: 'May 2024', dateObj: new Date('2024-05-01'), status: 'Released', confirmationLevel: 'official', category: 'google', type: 'other' },
  { id: '22', name: 'Google Pixel Tablet 2', description: 'Second generation Pixel Tablet with charging speaker dock', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'google', type: 'tablet' },

  // Tesla
  { id: '23', name: 'Tesla Cybertruck', description: 'All-electric pickup truck with stainless steel exoskeleton', date: 'Nov 2023', dateObj: new Date('2023-11-01'), status: 'Released', confirmationLevel: 'official', category: 'tesla', type: 'car' },
  { id: '24', name: 'Tesla Robotaxi (Cybercab)', description: 'Autonomous taxi with no steering wheel or pedals', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'tesla', type: 'robot' },
  { id: '25', name: 'Tesla Optimus Gen 3', description: 'Third generation humanoid robot with enhanced dexterity', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'tesla', type: 'robot' },
  { id: '26', name: 'Tesla Model Q', description: 'Affordable compact EV expected under $30,000', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'tesla', type: 'car' },
  { id: '27', name: 'Tesla Model Y Juniper', description: 'Refreshed Model Y with new design and features', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'tesla', type: 'car' },
  { id: '28', name: 'Tesla Roadster 2', description: 'Next generation sports car with SpaceX thrusters', date: 'TBD', dateObj: new Date('2027-01-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'tesla', type: 'other' },

  // NVIDIA
  { id: '29', name: 'NVIDIA RTX 5090', description: 'Flagship GPU with Blackwell architecture, massive performance gains', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia', type: 'gpu' },
  { id: '30', name: 'NVIDIA RTX 5080', description: 'High-end GPU for enthusiasts and creators', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia', type: 'gpu' },
  { id: '31', name: 'NVIDIA RTX 5070 Ti', description: 'Mid-high GPU with excellent price/performance', date: 'Feb 2025', dateObj: new Date('2025-02-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia', type: 'gpu' },
  { id: '32', name: 'NVIDIA RTX 5070', description: 'Mainstream GPU for gamers', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia', type: 'gpu' },
  { id: '33', name: 'NVIDIA GB200 NVL72', description: 'Datacenter rack with 72 Blackwell GPUs', date: '2024', dateObj: new Date('2024-12-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia', type: 'gpu' },
  { id: '34', name: 'NVIDIA RTX 5060', description: 'Budget GPU expected mid-2026', date: 'TBD 2026', dateObj: new Date('2026-05-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'nvidia', type: 'gpu' },

  // AMD
  { id: '35', name: 'AMD Ryzen 9000', description: 'Desktop CPUs with Zen 5 architecture', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'amd', type: 'cpu' },
  { id: '36', name: 'AMD Ryzen AI 300', description: 'Mobile APUs with integrated AI capabilities', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'amd', type: 'cpu' },
  { id: '37', name: 'AMD RX 9070 XT', description: 'RDNA 4 flagship GPU, competitive with NVIDIA RTX 5070', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'amd', type: 'gpu' },
  { id: '38', name: 'AMD RX 9070', description: 'RDNA 4 mainstream GPU with strong value', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'amd', type: 'gpu' },
  { id: '39', name: 'AMD Ryzen 9000X3D', description: 'Gaming CPUs with 3D V-Cache technology', date: 'Nov 2024', dateObj: new Date('2024-11-01'), status: 'Released', confirmationLevel: 'official', category: 'amd', type: 'cpu' },
  { id: '40', name: 'AMD EPYC Turin', description: 'Server CPUs with Zen 5 architecture', date: '2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'amd', type: 'cpu' },

  // Intel
  { id: '41', name: 'Intel Core Ultra 200', description: 'Arrow Lake desktop CPUs with AI acceleration', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'intel', type: 'cpu' },
  { id: '42', name: 'Intel Core Ultra 200V', description: 'Lunar Lake mobile CPUs with improved efficiency', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'intel', type: 'cpu' },
  { id: '43', name: 'Intel Core i9-14900K', description: 'Raptor Lake refresh flagship CPU', date: 'Oct 2023', dateObj: new Date('2023-10-01'), status: 'Released', confirmationLevel: 'official', category: 'intel', type: 'cpu' },
  { id: '44', name: 'Intel Gaudi 3', description: 'AI accelerator for data centers', date: '2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'intel', type: 'cpu' },
  { id: '45', name: 'Intel Panther Lake', description: 'Next generation mobile CPUs expected 2025-2026', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'intel', type: 'cpu' },

  // Sony
  { id: '46', name: 'Sony PlayStation 5 Pro', description: 'Enhanced PS5 with improved GPU and faster SSD', date: 'Nov 2024', dateObj: new Date('2024-11-01'), status: 'Released', confirmationLevel: 'official', category: 'sony', type: 'console' },
  { id: '47', name: 'Sony WH-1000XM6', description: 'Next generation noise cancelling headphones', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'sony', type: 'audio' },
  { id: '48', name: 'Sony A9 IV', description: 'Professional mirrorless camera with stacked sensor', date: 'Feb 2025', dateObj: new Date('2025-02-01'), status: 'Released', confirmationLevel: 'official', category: 'sony', type: 'camera' },
  { id: '49', name: 'Sony XR Headset', description: 'Spatial content headset for creators', date: '2024', dateObj: new Date('2024-06-01'), status: 'Released', confirmationLevel: 'official', category: 'sony', type: 'other' },
  { id: '50', name: 'Sony Walkman Signature', description: 'Premium audiophile music player', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'sony', type: 'audio' },

  // Meta
  { id: 'm1', name: 'Meta Quest 3', description: 'Mixed reality headset, Snapdragon XR2 Gen 2', date: 'Oct 2023', dateObj: new Date('2023-10-01'), status: 'Released', confirmationLevel: 'official', category: 'meta', type: 'vr' },
  { id: 'm2', name: 'Meta Quest 3S', description: 'Budget mixed reality, same chip as Quest 3', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'meta', type: 'vr' },
  { id: 'm3', name: 'Meta Quest Pro 2', description: 'High-end MR for professionals', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'meta', type: 'vr' },
  { id: 'm4', name: 'Meta Ray-Ban Smart Glasses (Gen 3)', description: 'Meta AI, camera, audio, improved design', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'meta', type: 'ar' },
  { id: 'm5', name: 'Meta Ray-Ban Smart Glasses (Gen 4)', description: 'Next gen with display, expected 2026', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'meta', type: 'ar' },
  { id: 'm6', name: 'Meta Orion AR Glasses', description: 'True AR glasses, holographic display', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'meta', type: 'ar' },

  // INMO
  { id: 'in1', name: 'INMO Go', description: 'Lightweight AR glasses, monocular display', date: 'Mar 2024', dateObj: new Date('2024-03-01'), status: 'Released', confirmationLevel: 'official', category: 'inmo', type: 'ar' },
  { id: 'in2', name: 'INMO Air 3', description: 'Binocular AR glasses, Android apps, camera', date: 'Jun 2024', dateObj: new Date('2024-06-01'), status: 'Released', confirmationLevel: 'official', category: 'inmo', type: 'ar' },
  { id: 'in3', name: 'INMO Air 4', description: 'Latest gen, improved display, longer battery', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'inmo', type: 'ar' },
  { id: 'in4', name: 'INMO X', description: 'Premium AR glasses with enhanced FOV', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'inmo', type: 'ar' },

  // AR/MR
  { id: 'ar1', name: 'Apple Vision Pro', description: 'Spatial computing headset, micro-OLED displays', date: 'Feb 2024', dateObj: new Date('2024-02-01'), status: 'Released', confirmationLevel: 'official', category: 'ar', type: 'vr' },
  { id: 'ar2', name: 'Microsoft HoloLens 3', description: 'Next gen AR headset for enterprise', date: 'TBD', dateObj: new Date('2027-01-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'ar', type: 'ar' },
  { id: 'ar3', name: 'Xreal Air 3 Pro', description: 'AR glasses with spatial display', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'ar', type: 'ar' },
  { id: 'ar4', name: 'Xreal One Pro', description: 'Latest AR glasses with improved FOV', date: 'Mar 2026', dateObj: new Date('2026-03-01'), status: 'Released', confirmationLevel: 'official', category: 'ar', type: 'ar' },
  { id: 'ar5', name: 'Rokid Max Pro 2', description: 'AR glasses with gesture control', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'ar', type: 'ar' },
  { id: 'ar6', name: 'Snap Spectacles 6', description: 'AR glasses with Snap OS, developer focused', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'ar', type: 'ar' },
  { id: 'ar7', name: 'Magic Leap 3', description: 'Enterprise AR headset, improved field of view', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'ar', type: 'other' },
];

export default function Home() {
  const { isDark } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('upcoming');
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [releases, setReleases] = useState<Release[]>([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    setReleases(staticReleases);
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

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

  return (
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
              className={`p-4 rounded-xl transition-all ${isDark ? "glass-card glass-card-dark" : "glass-card glass-card-light"}`}
            >
              <div className="flex items-start justify-between gap-4">
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
                  </div>
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
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Layout>
  );
}
