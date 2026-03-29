"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { Moon, Sun, Home } from "lucide-react";

interface ThemeContextType {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ isDark: true, toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function Layout({ children, title, subtitle }: LayoutProps) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved) setIsDark(saved === "dark");
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <div className={`min-h-screen ${isDark ? "bg-gray-950" : "bg-gray-100"} transition-colors duration-500`}>
        {/* Animated background */}
        <div className={`fixed inset-0 -z-10 ${isDark ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black" : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-white"}`} />

        {/* Glass header */}
        <header className={`sticky top-0 z-50 ${isDark ? "bg-gray-900/70 border-gray-800" : "bg-white/70 border-gray-200"} backdrop-blur-xl border-b`}>
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h1>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://hub.benjob.me"
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800/60 hover:bg-gray-700/80 text-blue-400 border border-gray-700/50"
                    : "bg-white/60 hover:bg-white/90 text-blue-600 border border-gray-200/50"
                } backdrop-blur-md shadow-lg`}
                aria-label="Go to Hub"
                title="Go to Hub"
              >
                <Home size={18} />
              </a>
              <button
                onClick={toggle}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800/60 hover:bg-gray-700/80 text-yellow-400 border border-gray-700/50"
                    : "bg-white/60 hover:bg-white/90 text-indigo-600 border border-gray-200/50"
                } backdrop-blur-md shadow-lg`}
                aria-label="Toggle theme"
              >
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>
        </header>

        {/* Content with glass cards */}
        <main className="max-w-5xl mx-auto px-6 py-8">
          <div className={isDark ? "space-y-6" : "space-y-6"}>
            {children}
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
