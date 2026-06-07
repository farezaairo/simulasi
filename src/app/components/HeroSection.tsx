import { motion } from "motion/react";
import { ArrowRight, Cpu, Monitor, HardDrive, Zap } from "lucide-react";

const stats = [
  { value: "8", label: "Komponen Utama", icon: Cpu },
  { value: "6", label: "Modul Materi", icon: Monitor },
  { value: "10", label: "Soal Evaluasi", icon: HardDrive },
  { value: "AI", label: "Asisten Pintar", icon: Zap },
];

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#e2e8f0 1px, transparent 1px),
            linear-gradient(90deg, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(59,130,246,0.08)" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(139,92,246,0.1)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
              style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.3)",
                color: "#3b82f6",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Piranti v2.0 — Active
            </div>

            <h1
              style={{
                fontFamily: "Rajdhani, sans-serif",
                color: "#1e293b",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              Laboratorium Virtual{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Perakitan Komputer
              </span>
            </h1>

            <p
              className="text-lg mb-8 max-w-xl"
              style={{ color: "#64748b", lineHeight: 1.8, fontFamily: "Inter, sans-serif" }}
            >
              Pelajari cara merakit komputer secara interaktif — dari teori komponen,
              simulasi drag &amp; drop, hingga evaluasi mandiri. Rasakan pengalaman
              praktik nyata di lingkungan digital yang aman.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("simulasi")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  color: "#ffffff",
                  fontFamily: "Rajdhani, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  letterSpacing: "0.05em",
                }}
              >
                Mulai Simulasi <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate("materi")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 hover:border-blue-500/60"
                style={{
                  background: "transparent",
                  color: "#3b82f6",
                  border: "1px solid #3b82f6",
                  fontFamily: "Rajdhani, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  letterSpacing: "0.05em",
                }}
              >
                Pelajari Materi
              </button>
            </div>
          </motion.div>

          {/* Right — animated PC diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div
              className="relative w-full max-w-md aspect-square rounded-2xl flex items-center justify-center"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              {/* Motherboard visual */}
              <div
                className="relative w-72 h-72 rounded-xl"
                style={{
                  background: "#e0e7ff",
                  border: "2px solid #3b82f6",
                  boxShadow: "0 0 40px rgba(59,130,246,0.1) inset",
                }}
              >
                {/* CPU slot */}
                <motion.div
                  className="absolute rounded-lg flex items-center justify-center text-xs"
                  style={{
                    top: "30%", left: "30%",
                    width: "40%", height: "40%",
                    background: "linear-gradient(135deg, #bfdbfe, #93c5fd)",
                    border: "1px solid #3b82f6",
                    color: "#1e40af",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.65rem",
                  }}
                  animate={{ boxShadow: ["0 0 8px rgba(59,130,246,0.3)", "0 0 20px rgba(59,130,246,0.6)", "0 0 8px rgba(59,130,246,0.3)"] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div className="text-center">
                    <Cpu size={24} color="#3b82f6" />
                    <div>CPU</div>
                  </div>
                </motion.div>

                {/* RAM slots */}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute rounded"
                    style={{
                      top: `${12 + i * 18}%`,
                      right: "8%",
                      width: "10%",
                      height: "14%",
                      background: i < 2 ? "rgba(59,130,246,0.2)" : "rgba(203,213,225,0.3)",
                      border: `1px solid ${i < 2 ? "#3b82f6" : "#cbd5e1"}`,
                    }}
                  />
                ))}

                {/* PCIe slot */}
                <div
                  className="absolute rounded"
                  style={{
                    bottom: "12%", left: "8%",
                    width: "60%", height: "10%",
                    background: "rgba(139,92,246,0.2)",
                    border: "1px solid #8b5cf6",
                  }}
                />

                {/* Storage */}
                <div
                  className="absolute rounded"
                  style={{
                    top: "8%", left: "8%",
                    width: "20%", height: "18%",
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.4)",
                  }}
                />

                {/* Circuit lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
                  <line x1="50%" y1="50%" x2="88%" y2="20%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 2" />
                  <line x1="50%" y1="50%" x2="88%" y2="38%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 2" />
                  <line x1="50%" y1="70%" x2="25%" y2="88%" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 2" />
                  <line x1="30%" y1="50%" x2="8%" y2="18%" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2" />
                </svg>

                {/* Corner connectors */}
                {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute w-4 h-4 rounded-full ${pos}`}
                    style={{ background: "rgba(59,130,246,0.3)", border: "1px solid #3b82f6" }}
                  />
                ))}
              </div>

              {/* Floating labels */}
              <motion.div
                className="absolute top-4 left-4 text-xs px-2 py-1 rounded-lg"
                style={{
                  background: "rgba(59,130,246,0.15)",
                  border: "1px solid #3b82f6",
                  color: "#1e40af",
                  fontFamily: "JetBrains Mono, monospace",
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                Motherboard ATX
              </motion.div>
              <motion.div
                className="absolute bottom-4 right-4 text-xs px-2 py-1 rounded-lg"
                style={{
                  background: "rgba(139,92,246,0.15)",
                  border: "1px solid #8b5cf6",
                  color: "#7c3aed",
                  fontFamily: "JetBrains Mono, monospace",
                }}
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
              >
                PCIe × GPU
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(59,130,246,0.1)" }}
                >
                  <Icon size={20} color="#3b82f6" />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: "#3b82f6",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.78rem", fontFamily: "Inter, sans-serif" }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
