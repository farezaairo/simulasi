import { useState, useEffect } from "react";
import { Menu, X, Cpu, BookOpen, Wrench, Video, Volume2, ClipboardList, ChevronRight, Sun, Moon } from "lucide-react";

const navItems = [
  { id: "beranda", label: "Beranda", icon: Cpu },
  { id: "materi", label: "Materi", icon: BookOpen },
  { id: "simulasi", label: "Simulasi", icon: Wrench },
  { id: "video", label: "Video Tutorial", icon: Video },
  { id: "audio", label: "Audio", icon: Volume2 },
  { id: "evaluasi", label: "Evaluasi", icon: ClipboardList },
];

interface NavigationProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navigation({ activeSection, onNavigate, isDark, onToggleTheme }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  const navBg = isDark
    ? scrolled ? "rgba(15,23,42,0.97)" : "rgba(15,23,42,0.85)"
    : scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)";
  const borderColor = isDark ? "#334155" : "#e2e8f0";
  const textColor = isDark ? "#94a3b8" : "#64748b";
  const activeColor = isDark ? "#60a5fa" : "#3b82f6";
  const activeBg = isDark ? "rgba(96,165,250,0.15)" : "#eff6ff";
  const activeBorder = isDark ? "rgba(96,165,250,0.4)" : "#bfdbfe";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: navBg,
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? `1px solid ${borderColor}` : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav("beranda")}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
            >
              <Cpu size={18} color="#ffffff" />
            </div>
            <span
              className="hidden sm:block"
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: activeColor,
                letterSpacing: "0.05em",
              }}
            >
              Piranti
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200"
                  style={{
                    color: isActive ? activeColor : textColor,
                    background: isActive ? activeBg : "transparent",
                    border: isActive ? `1px solid ${activeBorder}` : "1px solid transparent",
                    fontFamily: "Rajdhani, sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                  }}
                >
                  <Icon size={15} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg transition-all hover:scale-105"
              style={{
                color: isDark ? "#fbbf24" : "#64748b",
                background: isDark ? "rgba(251,191,36,0.1)" : "rgba(100,116,139,0.08)",
                border: `1px solid ${isDark ? "rgba(251,191,36,0.3)" : "rgba(100,116,139,0.2)"}`,
              }}
              title={isDark ? "Mode Terang" : "Mode Gelap"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: activeColor }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden"
          style={{
            background: isDark ? "rgba(15,23,42,0.98)" : "rgba(255,255,255,0.98)",
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                  style={{
                    color: isActive ? activeColor : textColor,
                    background: isActive ? activeBg : "transparent",
                    fontFamily: "Rajdhani, sans-serif",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  <ChevronRight size={14} className="ml-auto" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
