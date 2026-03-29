"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useTheme } from "../components/Layout";
import { Clock, Cpu, Smartphone, Car, Tv, Glasses } from "lucide-react";

interface Release {
  id: string;
  name: string;
  description: string;
  date: string;
  dateObj: Date;
  status: 'Upcoming' | 'Released' | 'Announced';
  confirmationLevel: 'official' | 'likely' | 'rumored' | 'speculative';
  category: string;
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
  { id: 'ar', label: 'AR/MR' },
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
  ar: <Glasses size={14} />,
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
  // ========== APPLE ==========
  { id: 'a1', name: 'iPhone 17 Pro Max', description: 'A19 Pro chip, titanium frame, enhanced 48MP camera system', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: 'a2', name: 'iPhone 17 Air', description: 'Ultra-thin ~5.5mm, thinnest iPhone ever, A19 chip', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: 'a3', name: 'iPhone 18 Pro', description: 'A20 chip, expected at WWDC 2026', date: 'Sep 2026', dateObj: new Date('2026-09-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple' },
  { id: 'a4', name: 'iPad Pro M5', description: 'M5 chip, OLED display, expected March 2026', date: 'Mar 2026', dateObj: new Date('2026-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: 'a5', name: 'iPad Air M4', description: 'M4 chip, 11" and 13" sizes', date: 'May 2024', dateObj: new Date('2024-05-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: 'a6', name: 'MacBook Pro M5', description: 'M5/M5 Pro/M5 Max chips, expected late 2025', date: 'Oct 2025', dateObj: new Date('2025-10-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: 'a7', name: 'MacBook Pro M4', description: 'M4/M4 Pro/M4 Max chips, enhanced battery life', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: 'a8', name: 'MacBook Air M5', description: 'M5 chip, expected early 2026', date: 'Mar 2026', dateObj: new Date('2026-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: 'a9', name: 'MacBook Air M4', description: 'M4 chip, thinner design', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: 'a10', name: 'Apple Watch Series 11', description: 'S11 chip, blood pressure monitoring, thinner design', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: 'a11', name: 'Apple Watch Ultra 3', description: 'Enhanced health features, same design', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: 'a12', name: 'AirPods Pro 3', description: 'Improved ANC, better sound, new design', date: 'TBD 2026', dateObj: new Date('2026-09-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple' },
  { id: 'a13', name: 'Vision Pro 2', description: 'Lighter weight, lower price, improved display', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple' },
  { id: 'a14', name: 'iPhone 18', description: 'Standard iPhone 18, A20 chip', date: 'Sep 2026', dateObj: new Date('2026-09-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple' },

  // ========== SAMSUNG ==========
  { id: 's1', name: 'Samsung Galaxy S25 Ultra', description: 'Snapdragon 8 Elite, 200MP camera, AI features', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung' },
  { id: 's2', name: 'Samsung Galaxy S26 Ultra', description: 'Snapdragon 8 Gen 5, improved AI, 222MP camera', date: 'Jan 2026', dateObj: new Date('2026-01-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung' },
  { id: 's3', name: 'Samsung Galaxy Z Fold 7', description: 'Improved hinge, thinner design, S Pen support', date: 'Jul 2025', dateObj: new Date('2025-07-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung' },
  { id: 's4', name: 'Samsung Galaxy Z Fold 6', description: 'Foldable with improved durability', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung' },
  { id: 's5', name: 'Samsung Galaxy Z Flip 7', description: 'Larger cover screen, improved cameras', date: 'Jul 2025', dateObj: new Date('2025-07-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung' },
  { id: 's6', name: 'Samsung Galaxy Z Flip 6', description: 'Compact foldable, 50MP main camera', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung' },
  { id: 's7', name: 'Samsung Galaxy Ring 2', description: 'Improved health tracking, longer battery', date: 'TBD 2026', dateObj: new Date('2026-07-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'samsung' },
  { id: 's8', name: 'Samsung Galaxy Tab S11', description: 'Premium Android tablet with S Pen', date: 'TBD 2026', dateObj: new Date('2026-08-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'samsung' },
  { id: 's9', name: 'Samsung Galaxy S27', description: 'Expected January 2027', date: 'Jan 2027', dateObj: new Date('2027-01-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'samsung' },

  // ========== GOOGLE ==========
  { id: 'g1', name: 'Google Pixel 10 Pro', description: 'Tensor G5 chip, advanced on-device AI', date: 'Oct 2025', dateObj: new Date('2025-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google' },
  { id: 'g2', name: 'Google Pixel 10', description: 'Tensor G5 chip, solid camera performance', date: 'Oct 2025', dateObj: new Date('2025-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google' },
  { id: 'g3', name: 'Google Pixel 9a', description: 'Budget Pixel with Tensor G4, solid camera', date: 'May 2024', dateObj: new Date('2024-05-01'), status: 'Released', confirmationLevel: 'official', category: 'google' },
  { id: 'g4', name: 'Google Pixel 9 Pro Fold', description: 'Second gen foldable, Tensor G4', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'google' },
  { id: 'g5', name: 'Google Pixel 11', description: 'Expected with Tensor G6 chip', date: 'Oct 2026', dateObj: new Date('2026-10-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'google' },
  { id: 'g6', name: 'Google Pixel Tablet 2', description: 'Second gen Pixel Tablet with dock', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'google' },

  // ========== TESLA ==========
  { id: 't1', name: 'Tesla Model Y Juniper', description: 'Refreshed Model Y with new design and features', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'tesla' },
  { id: 't2', name: 'Tesla Cybertruck', description: 'All-electric pickup, stainless steel exoskeleton', date: 'Nov 2023', dateObj: new Date('2023-11-30'), status: 'Released', confirmationLevel: 'official', category: 'tesla' },
  { id: 't3', name: 'Tesla Model Q', description: 'Affordable compact EV under $30,000', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'tesla' },
  { id: 't4', name: 'Tesla Robotaxi (Cybercab)', description: 'Autonomous taxi, no steering wheel or pedals', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'tesla' },
  { id: 't5', name: 'Tesla Optimus Gen 3', description: 'Third gen humanoid robot, enhanced dexterity', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'tesla' },
  { id: 't6', name: 'Tesla Roadster 2', description: 'Sports car with SpaceX thrusters package', date: 'TBD', dateObj: new Date('2028-01-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'tesla' },

  // ========== NVIDIA ==========
  { id: 'n1', name: 'NVIDIA RTX 5090', description: 'Blackwell flagship, 32GB GDDR7, massive performance', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia' },
  { id: 'n2', name: 'NVIDIA RTX 5080', description: 'High-end GPU, 16GB GDDR7, strong for 4K gaming', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia' },
  { id: 'n3', name: 'NVIDIA RTX 5070 Ti', description: 'Mid-high GPU, 16GB GDDR7, excellent value', date: 'Feb 2025', dateObj: new Date('2025-02-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia' },
  { id: 'n4', name: 'NVIDIA RTX 5070', description: 'Mainstream GPU, 12GB GDDR7, great for 1440p', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia' },
  { id: 'n5', name: 'NVIDIA RTX 5060 Ti', description: 'Budget-mid GPU, expected mid-2026', date: 'TBD 2026', dateObj: new Date('2026-04-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'nvidia' },
  { id: 'n6', name: 'NVIDIA RTX 5060', description: 'Entry-level GPU, expected mid-2026', date: 'TBD 2026', dateObj: new Date('2026-05-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'nvidia' },
  { id: 'n7', name: 'NVIDIA RTX 5080 Ti', description: 'Ti variant of RTX 5080, if released', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'nvidia' },
  { id: 'n8', name: 'NVIDIA RTX 5070 Super', description: 'Super variant of RTX 5070, if released', date: 'TBD 2026', dateObj: new Date('2026-07-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'nvidia' },
  { id: 'n9', name: 'NVIDIA GB200 NVL72', description: 'Datacenter rack, 72 Blackwell GPUs', date: '2024', dateObj: new Date('2024-12-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia' },
  { id: 'n10', name: 'NVIDIA RTX 5090 Ti', description: 'Ti variant of RTX 5090, rumored', date: 'TBD 2026', dateObj: new Date('2026-08-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'nvidia' },

  // ========== AMD ==========
  { id: 'amd1', name: 'AMD Ryzen 9000', description: 'Zen 5 desktop CPUs, AM5 socket', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },
  { id: 'amd2', name: 'AMD Ryzen AI 300', description: 'Strix Point APUs with Zen 5, integrated AI', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },
  { id: 'amd3', name: 'AMD RX 9070 XT', description: 'RDNA 4 flagship, competitive with RTX 5070', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },
  { id: 'amd4', name: 'AMD RX 9070', description: 'RDNA 4 mainstream, strong price/perf', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },
  { id: 'amd5', name: 'AMD Ryzen 9000X3D', description: 'Gaming CPUs with 3D V-Cache, Ryzen 7 9800X3D', date: 'Nov 2024', dateObj: new Date('2024-11-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },
  { id: 'amd6', name: 'AMD EPYC Turin', description: 'Zen 5 server CPUs, 128 cores', date: '2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },
  { id: 'amd7', name: 'AMD Ryzen AI Max 300', description: 'High-end AI APUs for laptops', date: 'Mar 2026', dateObj: new Date('2026-03-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },
  { id: 'amd8', name: 'AMD RX 9060 XT', description: 'RDNA 4 mainstream GPU, expected 2026', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'amd' },
  { id: 'amd9', name: 'AMD RX 9060', description: 'RDNA 4 budget GPU, expected 2026', date: 'TBD 2026', dateObj: new Date('2026-07-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'amd' },
  { id: 'amd10', name: 'AMD Ryzen 9000XT', description: 'Higher TDP variants of Ryzen 9000', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'amd' },

  // ========== INTEL ==========
  { id: 'i1', name: 'Intel Core Ultra 200 (Arrow Lake)', description: 'Desktop CPUs, Intel 20A process, AI acceleration', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'intel' },
  { id: 'i2', name: 'Intel Core Ultra 200V (Lunar Lake)', description: 'Mobile CPUs, improved efficiency, Battlemage GPU', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'intel' },
  { id: 'i3', name: 'Intel Core i9-24900K', description: 'Raptor Lake refresh flagship', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'intel' },
  { id: 'i4', name: 'Intel Gaudi 3', description: 'AI accelerator for data centers', date: '2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'intel' },
  { id: 'i5', name: 'Intel Panther Lake', description: 'Next gen mobile CPUs, Intel 18A process', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'intel' },
  { id: 'i6', name: 'Intel Nova Lake', description: 'Future desktop platform, expected 2026+', date: 'TBD 2027', dateObj: new Date('2027-06-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'intel' },
  { id: 'i7', name: 'Intel Battlemage (Arc B-series)', description: 'Second gen discrete GPUs', date: 'Dec 2024', dateObj: new Date('2024-12-01'), status: 'Released', confirmationLevel: 'official', category: 'intel' },

  // ========== SONY ==========
  { id: 'sy1', name: 'Sony PlayStation 5 Pro', description: 'Enhanced GPU, improved SSD, VRR for all games', date: 'Nov 2024', dateObj: new Date('2024-11-01'), status: 'Released', confirmationLevel: 'official', category: 'sony' },
  { id: 'sy2', name: 'Sony WH-1000XM6', description: '6th gen noise cancelling headphones', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'sony' },
  { id: 'sy3', name: 'Sony A9 IV', description: 'Pro mirrorless, 50MP stacked sensor, 8K video', date: 'Feb 2025', dateObj: new Date('2025-02-01'), status: 'Released', confirmationLevel: 'official', category: 'sony' },
  { id: 'sy4', name: 'Sony A1 III', description: 'Flagship mirrorless, 50MP, 8K30p', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'sony' },
  { id: 'sy5', name: 'Sony XR Headset', description: 'Spatial content headset for creators', date: '2024', dateObj: new Date('2024-06-01'), status: 'Released', confirmationLevel: 'official', category: 'sony' },
  { id: 'sy6', name: 'Sony PlayStation 6', description: 'Next gen console, not expected before 2028', date: 'TBD 2028', dateObj: new Date('2028-01-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'sony' },
  { id: 'sy7', name: 'Sony Walkman Signature 2', description: 'Premium audiophile DAP', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'sony' },

  // ========== META ==========
  { id: 'm1', name: 'Meta Quest 3', description: 'Mixed reality headset, Snapdragon XR2 Gen 2', date: 'Oct 2023', dateObj: new Date('2023-10-01'), status: 'Released', confirmationLevel: 'official', category: 'meta' },
  { id: 'm2', name: 'Meta Quest 3S', description: 'Budget mixed reality, same chip as Quest 3', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'meta' },
  { id: 'm3', name: 'Meta Quest Pro 2', description: 'High-end MR for professionals', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'meta' },
  { id: 'm4', name: 'Meta Ray-Ban Smart Glasses (Gen 3)', description: 'Meta AI, camera, audio, improved design', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'meta' },
  { id: 'm5', name: 'Meta Ray-Ban Smart Glasses (Gen 4)', description: 'Next gen with display, expected 2026', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'meta' },
  { id: 'm6', name: 'Meta Orion AR Glasses', description: 'True AR glasses, holographic display', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'meta' },

  // ========== INMO ==========
  { id: 'in1', name: 'INMO Go', description: 'Lightweight AR glasses, monocular display, Meta OS', date: 'Mar 2024', dateObj: new Date('2024-03-01'), status: 'Released', confirmationLevel: 'official', category: 'inmo' },
  { id: 'in2', name: 'INMO Air 3', description: 'Binocular AR glasses, Android apps, camera', date: 'Jun 2024', dateObj: new Date('2024-06-01'), status: 'Released', confirmationLevel: 'official', category: 'inmo' },
  { id: 'in3', name: 'INMO Air 4', description: 'Latest gen, improved display, longer battery', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'inmo' },
  { id: 'in4', name: 'INMO X', description: 'Premium AR glasses with enhanced FOV', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'inmo' },

  // ========== AR/MR ==========
  { id: 'ar1', name: 'Apple Vision Pro', description: 'Spatial computing headset, micro-OLED displays', date: 'Feb 2024', dateObj: new Date('2024-02-01'), status: 'Released', confirmationLevel: 'official', category: 'ar' },
  { id: 'ar2', name: 'Microsoft HoloLens 3', description: 'Next gen AR headset for enterprise', date: 'TBD', dateObj: new Date('2027-01-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'ar' },
  { id: 'ar3', name: 'Xreal Air 3 Pro', description: 'AR glasses with spatial display', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'ar' },
  { id: 'ar4', name: 'Xreal One Pro', description: 'Latest AR glasses with improved FOV', date: 'Mar 2026', dateObj: new Date('2026-03-01'), status: 'Released', confirmationLevel: 'official', category: 'ar' },
  { id: 'ar5', name: 'Rokid Max Pro 2', description: 'AR glasses with gesture control', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'ar' },
  { id: 'ar6', name: 'Snap Spectacles 6', description: 'AR glasses with Snap OS, developer focused', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'ar' },
  { id: 'ar7', name: 'Magic Leap 3', description: 'Enterprise AR headset, improved field of view', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'ar' },
];

export default function Home() {
  const { isDark } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
      if (months > 0) return months + ' month' + (months > 1 ? 's' : '');
      if (weeks > 0) return weeks + ' week' + (weeks > 1 ? 's' : '');
      if (days > 0) return days + ' day' + (days > 1 ? 's' : '');
      return 'Soon';
    } catch { return ''; }
  };

  const getTimeSince = (dateObj: Date): string => {
    const diff = now - dateObj.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    if (years > 0) return years + 'yr ago';
    if (months > 0) return months + 'mo ago';
    if (weeks > 0) return weeks + 'w ago';
    if (days > 0) return days + 'd ago';
    return 'Just now';
  };

  const categoryIds = allCategories.map(c => c.id).filter(c => c !== 'all');
  const toggleCategory = (cat: string) => {
    if (cat === 'all') {
      setSelectedCategories(selectedCategories.length === categoryIds.length ? [] : [...categoryIds]);
    } else {
      setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
    }
  };

  const isRecentlyReleased = (dateObj: Date): boolean => {
    const daysSince = (now - dateObj.getTime()) / (1000 * 60 * 60 * 24);
    return daysSince >= 0 && daysSince <= 90;
  };

  const filtered = releases
    .filter(r => selectedCategories.length === 0 || selectedCategories.includes(r.category))
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

  return (
    <Layout title="Hardware Releases" subtitle={releases.length + ' releases • ' + recentCount + ' recent (last 90d)'}>
      <div className={'mb-4 p-4 rounded-xl ' + (isDark ? "glass-card glass-card-dark" : "glass-card glass-card-light")}>
        <div className="flex items-center justify-between mb-2">
          <span className={'text-sm ' + (isDark ? "text-gray-300" : "text-gray-500")}>Company:</span>
          <button onClick={() => setSelectedCategories(allSelected ? [] : categoryIds)}
            className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
            {allSelected ? 'None' : 'All'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {allCategories.filter(c => c.id !== 'all').map(cat => (
            <button key={cat.id} onClick={() => toggleCategory(cat.id)}
              className={'px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ' +
                (selectedCategories.includes(cat.id) ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700')}>
              {categoryIcons[cat.id]} {cat.label} {selectedCategories.includes(cat.id) ? '✓' : ''}
            </button>
          ))}
        </div>
      </div>

      <div className={'mb-4 p-4 rounded-xl ' + (isDark ? "glass-card glass-card-dark" : "glass-card glass-card-light")}>
        <span className={'text-sm ' + (isDark ? "text-gray-300" : "text-gray-500") + ' mb-2 block'}>Status:</span>
        <div className="flex flex-wrap gap-2">
          {[{ id: 'all', label: 'All' }, { id: 'released', label: 'Released' }, { id: 'upcoming', label: 'Upcoming' }].map(sf => (
            <button key={sf.id} onClick={() => setStatusFilter(sf.id
