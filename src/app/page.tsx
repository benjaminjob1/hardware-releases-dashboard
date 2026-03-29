"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useTheme } from "../components/Layout";
import { Clock, Cpu, Smartphone, Watch, Laptop, Monitor, Tablet, Headphones, Car, Tv } from "lucide-react";

interface Release {
  id: string;
  name: string;
  description: string;
  date: string;
  dateObj: Date;
  status: 'Upcoming' | 'Released' | 'Announced';
  confirmationLevel: 'official' | 'likely' | 'rumored' | 'speculative';
  category: string;
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
  { id: '1', name: 'iPhone 17 Pro Max', description: 'Latest iPhone with A19 Pro chip, titanium frame, enhanced camera system', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: '2', name: 'iPhone 17 Air', description: 'Ultra-thin iPhone model, the thinnest ever at ~5.5mm', date: 'Sep 2025', dateObj: new Date('2025-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: '3', name: 'iPad Pro M4', description: 'iPad Pro with M4 chip, OLED display, thinner design', date: 'May 2024', dateObj: new Date('2024-05-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: '4', name: 'MacBook Pro M4', description: 'MacBook Pro with M4/M4 Pro/M4 Max chips, enhanced battery life', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: '5', name: 'Apple Watch Series 10', description: 'Thinner design,血压 monitoring, enhanced health features', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: '6', name: 'AirPods Pro 3', description: 'Next generation AirPods Pro with improved ANC and sound quality', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple' },
  { id: '7', name: 'Vision Pro 2', description: 'Second generation Vision Pro with lighter weight and lower price', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple' },
  { id: '8', name: 'MacBook Air M4', description: 'MacBook Air with M4 chip, expected early 2025', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },
  { id: '9', name: 'iPhone 18 Pro', description: 'Next iPhone with A20 chip, expected September 2026', date: 'Sep 2026', dateObj: new Date('2026-09-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'apple' },
  { id: '10', name: 'iPad Air M3', description: 'iPad Air with M3 chip, expected March 2025', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'apple' },

  // Samsung
  { id: '11', name: 'Samsung Galaxy S25 Ultra', description: 'Latest Samsung flagship with Snapdragon 8 Elite, 200MP camera', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung' },
  { id: '12', name: 'Samsung Galaxy Z Fold 6', description: 'Latest foldable with improved hinge and durability', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung' },
  { id: '13', name: 'Samsung Galaxy Z Flip 6', description: 'Compact foldable with larger cover screen', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung' },
  { id: '14', name: 'Samsung Galaxy S26 Ultra', description: 'Expected with Snapdragon 8 Gen 5, improved AI features', date: 'Jan 2026', dateObj: new Date('2026-01-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung' },
  { id: '15', name: 'Samsung Galaxy Ring 2', description: 'Next generation smart ring with health tracking improvements', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'samsung' },
  { id: '16', name: 'Samsung Galaxy Tab S10', description: 'Premium Android tablet with S Pen support', date: 'Aug 2024', dateObj: new Date('2024-08-01'), status: 'Released', confirmationLevel: 'official', category: 'samsung' },

  // Google
  { id: '17', name: 'Google Pixel 9 Pro', description: 'Pixel 9 Pro with Tensor G4 chip, advanced AI features', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google' },
  { id: '18', name: 'Google Pixel 9 Pro Fold', description: 'Google first foldable Pixel with Tensor G4', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google' },
  { id: '19', name: 'Google Pixel 10', description: 'Expected with Tensor G5 chip, advanced on-device AI', date: 'Oct 2025', dateObj: new Date('2025-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google' },
  { id: '20', name: 'Google Pixel 10 Pro', description: 'Pro variant with enhanced camera and AI capabilities', date: 'Oct 2025', dateObj: new Date('2025-10-01'), status: 'Released', confirmationLevel: 'official', category: 'google' },
  { id: '21', name: 'Google Pixel 9a', description: 'Budget Pixel with solid camera and AI features', date: 'May 2024', dateObj: new Date('2024-05-01'), status: 'Released', confirmationLevel: 'official', category: 'google' },
  { id: '22', name: 'Google Pixel Tablet 2', description: 'Second generation Pixel Tablet with charging speaker dock', date: 'TBD 2025', dateObj: new Date('2025-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'google' },

  // Tesla
  { id: '23', name: 'Tesla Cybertruck', description: 'All-electric pickup truck with stainless steel exoskeleton', date: 'Nov 2023', dateObj: new Date('2023-11-01'), status: 'Released', confirmationLevel: 'official', category: 'tesla' },
  { id: '24', name: 'Tesla Robotaxi (Cybercab)', description: 'Autonomous taxi with no steering wheel or pedals', date: 'TBD 2026', dateObj: new Date('2026-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'tesla' },
  { id: '25', name: 'Tesla Optimus Gen 3', description: 'Third generation humanoid robot with enhanced dexterity', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'tesla' },
  { id: '26', name: 'Tesla Model Q', description: 'Affordable compact EV expected under $30,000', date: 'TBD 2026', dateObj: new Date('2026-06-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'tesla' },
  { id: '27', name: 'Tesla Model Y Juniper', description: 'Refreshed Model Y with new design and features', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'tesla' },
  { id: '28', name: 'Tesla Roadster 2', description: 'Next generation sports car with SpaceX thrusters', date: 'TBD', dateObj: new Date('2027-01-01'), status: 'Upcoming', confirmationLevel: 'speculative', category: 'tesla' },

  // NVIDIA
  { id: '29', name: 'NVIDIA RTX 5090', description: 'Flagship GPU with Blackwell architecture, massive performance gains', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia' },
  { id: '30', name: 'NVIDIA RTX 5080', description: 'High-end GPU for enthusiasts and creators', date: 'Jan 2025', dateObj: new Date('2025-01-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia' },
  { id: '31', name: 'NVIDIA RTX 5070 Ti', description: 'Mid-high GPU with excellent price/performance', date: 'Feb 2025', dateObj: new Date('2025-02-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia' },
  { id: '32', name: 'NVIDIA RTX 5070', description: 'Mainstream GPU for gamers', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia' },
  { id: '33', name: 'NVIDIA GB200 NVL72', description: 'Datacenter rack with 72 Blackwell GPUs', date: '2024', dateObj: new Date('2024-12-01'), status: 'Released', confirmationLevel: 'official', category: 'nvidia' },
  { id: '34', name: 'NVIDIA RTX 5060', description: 'Budget GPU expected mid-2025', date: 'TBD 2025', dateObj: new Date('2025-06-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'nvidia' },

  // AMD
  { id: '35', name: 'AMD Ryzen 9000', description: 'Desktop CPUs with Zen 5 architecture', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },
  { id: '36', name: 'AMD Ryzen AI 300', description: 'Mobile APUs with integrated AI capabilities', date: 'Jul 2024', dateObj: new Date('2024-07-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },
  { id: '37', name: 'AMD RX 9070 XT', description: 'RDNA 4 flagship GPU, competitive with NVIDIA RTX 5070', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },
  { id: '38', name: 'AMD RX 9070', description: 'RDNA 4 mainstream GPU with strong value', date: 'Mar 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },
  { id: '39', name: 'AMD Ryzen 9000X3D', description: 'Gaming CPUs with 3D V-Cache technology', date: 'Nov 2024', dateObj: new Date('2024-11-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },
  { id: '40', name: 'AMD EPYC Turin', description: 'Server CPUs with Zen 5 architecture', date: '2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'amd' },

  // Intel
  { id: '41', name: 'Intel Core Ultra 200', description: 'Arrow Lake desktop CPUs with AI acceleration', date: 'Oct 2024', dateObj: new Date('2024-10-01'), status: 'Released', confirmationLevel: 'official', category: 'intel' },
  { id: '42', name: 'Intel Core Ultra 200V', description: 'Lunar Lake mobile CPUs with improved efficiency', date: 'Sep 2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'intel' },
  { id: '43', name: 'Intel Core i9-14900K', description: 'Raptor Lake refresh flagship CPU', date: 'Oct 2023', dateObj: new Date('2023-10-01'), status: 'Released', confirmationLevel: 'official', category: 'intel' },
  { id: '44', name: 'Intel Gaudi 3', description: 'AI accelerator for data centers', date: '2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'intel' },
  { id: '45', name: 'Intel Panther Lake', description: 'Next generation mobile CPUs expected 2025-2026', date: 'TBD 2025', dateObj: new Date('2025-12-01'), status: 'Upcoming', confirmationLevel: 'likely', category: 'intel' },

  // Sony
  { id: '46', name: 'Sony PlayStation 5 Pro', description: 'Enhanced PS5 with improved GPU and faster SSD', date: 'Nov 2024', dateObj: new Date('2024-11-01'), status: 'Released', confirmationLevel: 'official', category: 'sony' },
  { id: '47', name: 'Sony WH-1000XM6', description: 'Next generation noise cancelling headphones', date: 'TBD 2025', dateObj: new Date('2025-06-01'), status: 'Upcoming', confirmationLevel: 'rumored', category: 'sony' },
  { id: '48', name: 'Sony A9 IV', description: 'Professional mirrorless camera with stacked sensor', date: 'TBD 2025', dateObj: new Date('2025-03-01'), status: 'Released', confirmationLevel: 'official', category: 'sony' },
  { id: '49', name: 'Sony XR Headset', description: 'Spatial content headset for creators', date: '2024', dateObj: new Date('2024-06-01'), status: 'Released', confirmationLevel: 'official', category: 'sony' },
  { id: '50', name: 'Sony Walkman Signature', description: 'Premium audiophile music player', date: '2024', dateObj: new Date('2024-09-01'), status: 'Released', confirmationLevel: 'official', category: 'sony' },
];

export default function Home() {
  const { isDark } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
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

  const toggleCategory = (cat: string) => {
    if (cat === 'all') {
      setSelectedCategories(selectedCategories.length === categoryIds.length ? [] : [...categoryIds]);
    } else {
      setSelectedCategories(prev =>
        prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
      );
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
