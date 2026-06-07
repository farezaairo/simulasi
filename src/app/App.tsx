import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { TheorySection } from "./components/TheorySection";
import { SimulationSection } from "./components/SimulationSection";
import { VideoSection } from "./components/VideoSection";
import { AudioSection } from "./components/AudioSection";
import { QuizSection } from "./components/QuizSection";
import { FloatingChatbot } from "./components/FloatingChatbot";
import { BookOpen, Cpu } from "lucide-react";

export default function App() {
  /* MARKER-MAKE-KIT-INVOKED */
  const [activeSection, setActiveSection] = useState("beranda");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("piranti-theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("piranti-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("piranti-theme", "light");
    }
  };

  useEffect(() => {
    const handler = () => {
      const sections = ["evaluasi", "audio", "video", "simulasi", "materi", "beranda"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
    }
  };

  const bg = isDark ? "#0f172a" : "#ffffff";
  const dividerBg = isDark ? "#1e293b" : "#f8fafc";
  const dividerBorder = isDark ? "#334155" : "#e2e8f0";
  const dividerText = isDark ? "#64748b" : "#64748b";
  const footerBg = isDark ? "#1e293b" : "#f8fafc";
  const footerBorder = isDark ? "#334155" : "#e2e8f0";
  const footerText = isDark ? "#94a3b8" : "#64748b";
  const logoColor = isDark ? "#60a5fa" : "#3b82f6";

  return (
    <div style={{ background: bg, minHeight: "100vh", position: "relative", transition: "background 0.3s" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(96,165,250,0.05) 0%, transparent 60%)"
            : "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.03) 0%, transparent 60%)",
        }}
      />

      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main>
        <HeroSection onNavigate={handleNavigate} />

        <div className="flex items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-1 h-px" style={{ background: dividerBorder }} />
          <span className="px-4 py-1 rounded-full text-xs" style={{ color: dividerText, fontFamily: "JetBrains Mono, monospace", background: dividerBg, border: `1px solid ${dividerBorder}` }}>
            MATERI TEORI
          </span>
          <div className="flex-1 h-px" style={{ background: dividerBorder }} />
        </div>
        <TheorySection isDark={isDark} />

        <div className="flex items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-1 h-px" style={{ background: dividerBorder }} />
          <span className="px-4 py-1 rounded-full text-xs" style={{ color: dividerText, fontFamily: "JetBrains Mono, monospace", background: dividerBg, border: `1px solid ${dividerBorder}` }}>
            SIMULASI INTERAKTIF
          </span>
          <div className="flex-1 h-px" style={{ background: dividerBorder }} />
        </div>
        <SimulationSection isDark={isDark} />

        <div className="flex items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-1 h-px" style={{ background: dividerBorder }} />
          <span className="px-4 py-1 rounded-full text-xs" style={{ color: dividerText, fontFamily: "JetBrains Mono, monospace", background: dividerBg, border: `1px solid ${dividerBorder}` }}>
            VIDEO TUTORIAL
          </span>
          <div className="flex-1 h-px" style={{ background: dividerBorder }} />
        </div>
        <VideoSection isDark={isDark} />

        <div className="flex items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-1 h-px" style={{ background: dividerBorder }} />
          <span className="px-4 py-1 rounded-full text-xs" style={{ color: dividerText, fontFamily: "JetBrains Mono, monospace", background: dividerBg, border: `1px solid ${dividerBorder}` }}>
            AUDIO PENJELASAN
          </span>
          <div className="flex-1 h-px" style={{ background: dividerBorder }} />
        </div>
        <AudioSection isDark={isDark} />

        <div className="flex items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-1 h-px" style={{ background: dividerBorder }} />
          <span className="px-4 py-1 rounded-full text-xs" style={{ color: dividerText, fontFamily: "JetBrains Mono, monospace", background: dividerBg, border: `1px solid ${dividerBorder}` }}>
            EVALUASI QUIZ
          </span>
          <div className="flex-1 h-px" style={{ background: dividerBorder }} />
        </div>
        <QuizSection isDark={isDark} />
      </main>

      <footer
        className="mt-8 py-10 px-4"
        style={{ borderTop: `1px solid ${footerBorder}`, background: footerBg, transition: "all 0.3s" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
            >
              <Cpu size={16} color="#ffffff" />
            </div>
            <span style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, color: logoColor }}>
              Piranti
            </span>
            <span style={{ color: footerText, fontSize: "0.82rem", fontFamily: "Inter, sans-serif", marginLeft: "0.5rem" }}>
              Virtual Laboratory Perakitan Komputer
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2" style={{ color: footerText, fontSize: "0.82rem", fontFamily: "Inter, sans-serif" }}>
              <BookOpen size={14} />
              Media Pembelajaran Interaktif
            </div>
            <div style={{ color: footerText, fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace" }}>
              © 2026 Piranti
            </div>
          </div>
        </div>
      </footer>

      <FloatingChatbot isDark={isDark} />
    </div>
  );
}
