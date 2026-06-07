import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, RotateCcw, Trophy, Camera, X, Cpu, MemoryStick, HardDrive, Zap, Monitor, Wind, Server } from "lucide-react";

interface Component {
  id: string;
  name: string;
  shortName: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  description: string;
  installTip: string;
  boardX: number;
  boardY: number;
  boardW: number;
  boardH: number;
}

const components: Component[] = [
  {
    id: "motherboard",
    name: "Motherboard",
    shortName: "MOBO",
    icon: Server,
    color: "#10b981",
    description: "ASUS ROG STRIX Z790-F",
    installTip: "Pasang motherboard terlebih dahulu sebagai fondasi semua komponen",
    boardX: 0, boardY: 0, boardW: 100, boardH: 100,
  },
  {
    id: "cpu",
    name: "Prosesor (CPU)",
    shortName: "CPU",
    icon: Cpu,
    color: "#3b82f6",
    description: "Intel Core i7-13700K",
    installTip: "Sesuaikan tanda segitiga CPU dengan socket LGA1700",
    boardX: 20, boardY: 12, boardW: 26, boardH: 26,
  },
  {
    id: "cooler",
    name: "CPU Cooler",
    shortName: "COOL",
    icon: Wind,
    color: "#06b6d4",
    description: "Noctua NH-D15 Air Cooler",
    installTip: "Oleskan thermal paste dulu sebelum pasang cooler",
    boardX: 20, boardY: 12, boardW: 26, boardH: 26,
  },
  {
    id: "ram",
    name: "RAM DDR5",
    shortName: "RAM",
    icon: MemoryStick,
    color: "#10b981",
    description: "32GB Corsair DDR5-6000",
    installTip: "Pasang di slot A2/B2 untuk dual-channel",
    boardX: 50, boardY: 10, boardW: 10, boardH: 55,
  },
  {
    id: "storage",
    name: "SSD NVMe M.2",
    shortName: "SSD",
    icon: HardDrive,
    color: "#f59e0b",
    description: "Samsung 980 Pro 1TB",
    installTip: "Masukkan dengan sudut 30°, lalu tekan dan kunci baut",
    boardX: 24, boardY: 52, boardW: 22, boardH: 10,
  },
  {
    id: "gpu",
    name: "Kartu Grafis (GPU)",
    shortName: "GPU",
    icon: Monitor,
    color: "#8b5cf6",
    description: "NVIDIA RTX 4070 Ti Super",
    installTip: "Pasang di slot PCIe x16 terpanjang, tekan hingga klik",
    boardX: 15, boardY: 66, boardW: 50, boardH: 18,
  },
  {
    id: "psu",
    name: "Power Supply (PSU)",
    shortName: "PSU",
    icon: Zap,
    color: "#ef4444",
    description: "Corsair RM750x 750W 80+ Gold",
    installTip: "Hubungkan semua konektor daya setelah semua komponen terpasang",
    boardX: 68, boardY: 66, boardW: 28, boardH: 18,
  },
];

const correctOrder = ["motherboard", "cpu", "cooler", "ram", "storage", "gpu", "psu"];

interface Props { isDark: boolean }

function MotherboardBoard({ installed, nextExpected, dragOver, onDrop, onDragOver, onClick, isDark }: {
  installed: string[];
  nextExpected: string;
  dragOver: string | null;
  onDrop: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onClick: (id: string) => void;
  isDark: boolean;
}) {
  const boardBg = isDark ? "#0d2818" : "#0f3a1a";
  const traceColor = isDark ? "rgba(16,185,129,0.15)" : "rgba(16,185,129,0.2)";

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden"
      style={{
        background: boardBg,
        border: "2px solid rgba(16,185,129,0.4)",
        aspectRatio: "4/3",
        boxShadow: "0 8px 32px rgba(16,185,129,0.2), inset 0 0 60px rgba(0,0,0,0.4)",
      }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke={traceColor} strokeWidth="1" strokeDasharray="4,8" />
        <line x1="0" y1="60%" x2="100%" y2="60%" stroke={traceColor} strokeWidth="1" strokeDasharray="4,8" />
        <line x1="30%" y1="0" x2="30%" y2="100%" stroke={traceColor} strokeWidth="1" strokeDasharray="4,8" />
        <line x1="65%" y1="0" x2="65%" y2="100%" stroke={traceColor} strokeWidth="1" strokeDasharray="4,8" />
        {[[4,4],[96,4],[4,96],[96,96]].map(([cx,cy],i) => (
          <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r="6" fill="none" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
        ))}
      </svg>

      <div className="absolute top-2 left-3 text-xs" style={{ color: "rgba(16,185,129,0.6)", fontFamily: "JetBrains Mono, monospace" }}>
        ASUS ROG STRIX Z790-F ATX
      </div>

      {components.slice(1).map((comp) => {
        const isInstalled = installed.includes(comp.id);
        const isNext = comp.id === nextExpected;
        const isDrag = dragOver === comp.id;
        const show = comp.id === "cpu" || comp.id === "cooler"
          ? installed.includes("motherboard")
          : comp.id === "ram"
          ? installed.includes("cpu")
          : comp.id === "storage"
          ? installed.includes("ram")
          : comp.id === "gpu"
          ? installed.includes("storage")
          : comp.id === "psu"
          ? installed.includes("gpu")
          : false;

        return (
          <div
            key={comp.id}
            className="absolute rounded-md transition-all duration-300 flex flex-col items-center justify-center"
            style={{
              left: `${comp.boardX}%`,
              top: `${comp.boardY}%`,
              width: `${comp.boardW}%`,
              height: `${comp.boardH}%`,
              background: isInstalled
                ? comp.color + "30"
                : isDrag
                ? comp.color + "20"
                : show
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.02)",
              border: isInstalled
                ? `1.5px solid ${comp.color}80`
                : isNext
                ? `1.5px dashed ${comp.color}`
                : `1px dashed rgba(255,255,255,0.12)`,
              cursor: (!isInstalled && isNext) ? "pointer" : "default",
              pointerEvents: show ? "auto" : "none",
              opacity: show ? 1 : 0,
              boxShadow: isInstalled ? `0 0 12px ${comp.color}40` : "none",
            }}
            onDragOver={(e) => isNext && onDragOver(e, comp.id)}
            onDrop={(e) => onDrop(e, comp.id)}
            onClick={() => !isInstalled && isNext && onClick(comp.id)}
          >
            {isInstalled ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center justify-center"
              >
                <CheckCircle size={comp.boardW < 20 ? 12 : 18} color={comp.color} />
                <span style={{ color: comp.color, fontSize: "0.55rem", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, marginTop: "2px" }}>
                  {comp.shortName}
                </span>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center px-1">
                <div style={{ color: isNext ? comp.color : "rgba(255,255,255,0.2)", fontSize: "0.5rem", fontFamily: "JetBrains Mono, monospace" }}>
                  {isNext ? "◉ " + comp.shortName : comp.shortName}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {!installed.includes("motherboard") && (
        <div
          className="absolute inset-3 rounded-lg flex items-center justify-center cursor-pointer transition-all"
          style={{
            border: `2px dashed ${nextExpected === "motherboard" ? "#10b981" : "rgba(16,185,129,0.3)"}`,
            background: nextExpected === "motherboard" ? "rgba(16,185,129,0.08)" : "transparent",
          }}
          onClick={() => onClick("motherboard")}
          onDragOver={(e) => onDragOver(e, "motherboard")}
          onDrop={(e) => onDrop(e, "motherboard")}
        >
          <div className="text-center">
            <Server size={32} color={nextExpected === "motherboard" ? "#10b981" : "rgba(16,185,129,0.3)"} />
            <div style={{ color: nextExpected === "motherboard" ? "#10b981" : "rgba(16,185,129,0.3)", fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", marginTop: "6px" }}>
              {nextExpected === "motherboard" ? "KLIK UNTUK PASANG MOTHERBOARD" : "SLOT MOTHERBOARD"}
            </div>
          </div>
        </div>
      )}

      {installed.includes("motherboard") && (
        <div className="absolute right-1 top-8 flex flex-col gap-1">
          {["USB","ETH","HDMI","DP","USB3"].map(p => (
            <div key={p} className="text-center px-1 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)", fontSize: "0.4rem", fontFamily: "JetBrains Mono, monospace" }}>
              {p}
            </div>
          ))}
        </div>
      )}

      {installed.includes("motherboard") && (
        <div
          className="absolute right-2 bottom-14 rounded text-center px-1 py-0.5"
          style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "rgba(239,68,68,0.7)", fontSize: "0.45rem", fontFamily: "JetBrains Mono, monospace" }}
        >
          24-PIN ATX
        </div>
      )}
    </div>
  );
}

function CameraModal({ isDark, onClose, onComponentDetected, currentExpectedId }: { 
  isDark: boolean; 
  onClose: () => void;
  onComponentDetected: (id: string) => void;
  currentExpectedId: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [step, setStep] = useState(0);
  const [detecting, setDetecting] = useState(false);
  const [geminiResult, setGeminiResult] = useState("");

  const steps = [
    { id: "motherboard", label: "Pasang Motherboard", detail: "Letakkan motherboard di atas meja kerja atau case komputer Anda.", icon: "🖥️" },
    { id: "cpu", label: "Pasang CPU", detail: "Siapkan prosesor (CPU) Intel Core i7. Perlihatkan ke kamera sebelum dipasang.", icon: "⚡" },
    { id: "cooler", label: "Pasang CPU Cooler", detail: "Siapkan heatsink/fan cooler. Pastikan thermal paste sudah siap.", icon: "💨" },
    { id: "ram", label: "Pasang RAM", detail: "Siapkan kepingan RAM DDR5 Corsair Anda untuk divalidasi.", icon: "💾" },
    { id: "storage", label: "Pasang SSD M.2", detail: "Pegang SSD NVMe M.2 Anda, pastikan label mereknya terlihat jelas.", icon: "💿" },
    { id: "gpu", label: "Pasang GPU", detail: "Siapkan kartu grafis (GPU) NVIDIA RTX Anda menghadap ke kamera.", icon: "🎮" },
    { id: "psu", label: "Hubungkan PSU", detail: "Perlihatkan unit Power Supply (PSU) beserta bundel kabel dayanya.", icon: "🔌" },
  ];

  useEffect(() => {
    const matchedIndex = steps.findIndex(s => s.id === currentExpectedId);
    if (matchedIndex !== -1) {
      setStep(matchedIndex);
    }
  }, [currentExpectedId]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play().catch(e => console.log("Video play interrupted:", e));
        }
        setHasCamera(true);
      })
      .catch(() => {
        setCameraError("Kamera tidak dapat diakses. Pastikan izin kamera diaktifkan di browser Anda.");
      });
    return () => { stream?.getTracks().forEach(t => t.stop()); };
  }, []);

  const handleDetect = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setDetecting(true);
    setGeminiResult("");

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      const imageDataUrl = canvas.toDataURL("image/jpeg");
      const base64Image = imageDataUrl.split(",")[1];

      const response = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64Image,
          mimeType: "image/jpeg",
          currentStep: steps[step].label
        })
      });

      const data = await response.json();

      if (data.reply) {
        setGeminiResult(data.reply);
        if (data.reply.toUpperCase().includes("COCOK")) {
          onComponentDetected(steps[step].id);
        }
      } else {
        setGeminiResult("⚠️ Gagal menganalisis gambar.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setGeminiResult("⚠️ Terjadi gangguan jaringan pada sistem AI.");
    } finally {
      setDetecting(false);
    }
  };

  const bg = isDark ? "#0f172a" : "#ffffff";
  const text = isDark ? "#f1f5f9" : "#1e293b";
  const textSec = isDark ? "#94a3b8" : "#64748b";
  const border = isDark ? "#334155" : "#e2e8f0";
  const cardBg = isDark ? "#1e293b" : "#f8fafc";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{ background: bg, border: `1px solid ${border}` }}
      >
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${border}` }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
              <Camera size={16} color="#ffffff" />
            </div>
            <div>
              <div style={{ text, fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
                Simulasi Verifikasi Perangkat Keras (Gemini AI)
              </div>
              <div style={{ color: textSec, fontSize: "0.78rem", fontFamily: "Inter, sans-serif" }}>
                Arahkan kamera fisik Anda pada perangkat untuk pencocokan otomatis
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg" style={{ color: textSec, background: cardBg }}>
            <X size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative" style={{ background: "#000000", minHeight: "340px" }}>
            {hasCamera ? (
              <>
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                <canvas ref={canvasRef} className="hidden" />
                
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-8 rounded-lg" style={{ border: "2px dashed rgba(59,130,246,0.4)" }} />
                  <div className="absolute top-2 left-2 px-2 py-1 rounded text-xs" style={{ background: "rgba(59,130,246,0.8)", color: "#ffffff", fontFamily: "JetBrains Mono, monospace" }}>
                    {detecting ? "🔍 MENGECEK DENGAN GEMINI..." : "📷 CAMERA ACTIVE"}
                  </div>

                  {geminiResult && (
                    <div className="absolute top-12 inset-x-4 p-3 rounded-xl text-xs text-white bg-black/85 border border-zinc-800 backdrop-blur-md pointer-events-auto">
                      {geminiResult}
                    </div>
                  )}

                  {detecting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                    </div>
                  )}
                  {[["top-3 left-3","border-t-2 border-l-2"],["top-3 right-3","border-t-2 border-r-2"],["bottom-3 left-3","border-b-2 border-l-2"],["bottom-3 right-3","border-b-2 border-r-2"]].map(([pos, cls], i) => (
                    <div key={i} className={`absolute w-5 h-5 ${pos} ${cls}`} style={{ borderColor: "rgba(59,130,246,0.8)" }} />
                  ))}
                </div>
                
                <div className="absolute bottom-3 inset-x-3">
                  <button
                    onClick={handleDetect}
                    disabled={detecting}
                    className="w-full py-2.5 rounded-xl text-sm transition-all"
                    style={{ background: detecting ? "rgba(59,130,246,0.4)" : "linear-gradient(135deg, #3b82f6, #8b5cf6)", color: "#ffffff", fontFamily: "Rajdhani, sans-serif", fontWeight: 700 }}
                  >
                    {detecting ? "Memproses Analisis AI..." : "📸 Ambil Foto & Verifikasi Komponen"}
                  </button>
                </div>
              </>
            ) : cameraError ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center gap-3">
                <Camera size={48} color="#64748b" />
                <p style={{ color: "#ef4444", fontSize: "0.88rem", fontFamily: "Inter, sans-serif" }}>{cameraError}</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 rounded-full border-3 border-blue-400 border-t-transparent animate-spin" />
              </div>
            )}
          </div>

          <div className="p-5 overflow-y-auto" style={{ maxHeight: "400px" }}>
            <h4 className="mb-4" style={{ color: text, fontFamily: "Rajdhani, sans-serif", fontWeight: 700 }}>
              Kebutuhan Komponen Saat Ini ({step + 1}/{steps.length})
            </h4>
            <div className="space-y-2">
              {steps.map((s, i) => {
                const isActive = i === step;
                const isDone = i < step;
                return (
                  <div
                    key={i}
                    className="flex gap-3 p-3 rounded-xl transition-all"
                    style={{
                      background: isActive ? "rgba(59,130,246,0.1)" : isDone ? "rgba(16,185,129,0.08)" : "transparent",
                      border: isActive ? "1px solid rgba(59,130,246,0.4)" : isDone ? "1px solid rgba(16,185,129,0.3)" : `1px solid ${border}`,
                    }}
                  >
                    <span className="text-lg shrink-0">{isDone ? "✅" : s.icon}</span>
                    <div>
                      <div style={{
                        color: isActive ? "#3b82f6" : isDone ? "#10b981" : textSec,
                        fontFamily: "Rajdhani, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}>
                        {i + 1}. {s.label}
                      </div>
                      {isActive && (
                        <div style={{ color: textSec, fontSize: "0.8rem", fontFamily: "Inter, sans-serif", marginTop: "2px" }}>
                          {s.detail}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function SimulationSection({ isDark }: Props) {
  const [installed, setInstalled] = useState<string[]>([]);
  const [wrongAttempt, setWrongAttempt] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [completed, setCompleted] = useState(false);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedComp, setSelectedComp] = useState<string | null>(null);

  const cardBg = isDark ? "#1e293b" : "#f8fafc";
  const textPrimary = isDark ? "#f1f5f9" : "#1e293b";
  const textSecondary = isDark ? "#94a3b8" : "#64748b";
  const borderBase = isDark ? "#334155" : "#e2e8f0";

  const nextExpected = correctOrder[installed.length];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("componentId", id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (targetId === nextExpected) setDragOver(targetId);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOver(null);
    const id = e.dataTransfer.getData("componentId");
    if (id === targetId) installComponent(id);
  };

  const installComponent = (id: string) => {
    if (installed.includes(id)) return;
    if (id === nextExpected) {
      const newInstalled = [...installed, id];
      setInstalled(newInstalled);
      setWrongAttempt(null);
      const comp = components.find((c) => c.id === id);
      setFeedback(`✅ ${comp?.name} berhasil dipasang! ${comp?.installTip}`);
      setSelectedComp(id);
      if (newInstalled.length === correctOrder.length) {
        setTimeout(() => setCompleted(true), 600);
      }
    } else {
      setWrongAttempt(id);
      const expected = components.find((c) => c.id === nextExpected);
      setFeedback(`❌ Urutan salah! Pasang ${expected?.name} terlebih dahulu.`);
      setTimeout(() => setWrongAttempt(null), 1200);
    }
  };

  const reset = () => {
    setInstalled([]);
    setWrongAttempt(null);
    setFeedback("");
    setCompleted(false);
    setSelectedComp(null);
  };

  const progressPercent = (installed.length / correctOrder.length) * 100;

  return (
    <section id="simulasi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h2 style={{ color: textPrimary }}>Simulasi Perakitan Komputer</h2>
        <p className="mt-3 max-w-2xl mx-auto" style={{ color: textSecondary, fontFamily: "Inter, sans-serif" }}>
          Drag &amp; drop atau klik komponen sesuai urutan yang benar. Tampilan motherboard realistic 3D.
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setShowCamera(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "#ffffff",
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: 700,
              boxShadow: "0 4px 16px rgba(59,130,246,0.3)",
            }}
          >
            <Camera size={18} />
            Simulasi Langsung (Kamera)
          </button>
        </div>
      </div>

      <AnimatePresence>
        {completed ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center py-16 text-center"
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{ background: "rgba(59,130,246,0.15)", border: "2px solid #3b82f6" }}
            >
              <Trophy size={48} color="#3b82f6" />
            </div>
            <h3 style={{ color: "#3b82f6", fontFamily: "Rajdhani, sans-serif", fontSize: "2rem" }}>
              Perakitan Selesai! 🎉
            </h3>
            <p className="mt-3 mb-8 max-w-md" style={{ color: textSecondary, fontFamily: "Inter, sans-serif" }}>
              Selamat! Kamu berhasil merakit komputer dengan urutan yang benar. Semua komponen terpasang dengan sempurna.
            </p>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                color: "#ffffff",
                fontFamily: "Rajdhani, sans-serif",
                fontWeight: 700,
              }}
            >
              <RotateCcw size={18} /> Ulangi Simulasi
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl p-4" style={{ background: cardBg, border: `1px solid ${borderBase}` }}>
                <div className="flex items-center justify-between mb-3">
                  <h4 style={{ color: textPrimary, fontFamily: "Rajdhani, sans-serif" }}>Komponen Tersedia</h4>
                  <button
                    onClick={reset}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs"
                    style={{ background: isDark ? "rgba(239,68,68,0.15)" : "#fee2e2", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444", fontFamily: "Rajdhani, sans-serif" }}
                  >
                    <RotateCcw size={12} /> Reset
                  </button>
                </div>
                <div className="space-y-1.5">
                  {components.map((comp) => {
                    const Icon = comp.icon;
                    const isInstalled = installed.includes(comp.id);
                    const isWrong = wrongAttempt === comp.id;
                    const isNext = comp.id === nextExpected;

                    return (
                      <motion.div
                        key={comp.id}
                        draggable={!isInstalled}
                        onDragStart={(e) => !isInstalled && handleDragStart(e, comp.id)}
                        onClick={() => { !isInstalled && installComponent(comp.id); }}
                        animate={isWrong ? { x: [-6, 6, -6, 6, 0] } : {}}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3 p-3 rounded-xl transition-all"
                        style={{
                          background: isInstalled
                            ? (isDark ? "rgba(16,185,129,0.15)" : "#dcfce7")
                            : isNext
                            ? `${comp.color}15`
                            : (isDark ? "rgba(255,255,255,0.04)" : "#ffffff"),
                          border: isInstalled
                            ? `1px solid ${isDark ? "rgba(16,185,129,0.4)" : "#86efac"}`
                            : isNext
                            ? `1px solid ${comp.color}60`
                            : `1px solid ${borderBase}`,
                          cursor: isInstalled ? "default" : "grab",
                          opacity: isInstalled ? 0.7 : 1,
                        }}
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: isInstalled ? (isDark ? "rgba(16,185,129,0.2)" : "#bbf7d0") : comp.color + "20" }}>
                          {isInstalled ? <CheckCircle size={18} color="#10b981" /> : <Icon size={18} color={comp.color} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div style={{ color: textPrimary, fontSize: "0.85rem", fontFamily: "Rajdhani, sans-serif", fontWeight: 600 }}>
                            {comp.name}
                          </div>
                          <div style={{ color: textSecondary, fontSize: "0.72rem", fontFamily: "Inter, sans-serif" }}>
                            {comp.description}
                          </div>
                        </div>
                        {isNext && !isInstalled && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full shrink-0" style={{ background: comp.color + "20", color: comp.color, fontFamily: "JetBrains Mono, monospace" }}>
                            NEXT
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-xl" style={{ background: cardBg, border: `1px solid ${borderBase}` }}>
                <div className="flex justify-between items-center mb-2">
                  <span style={{ color: textSecondary, fontSize: "0.82rem", fontFamily: "Inter, sans-serif" }}>Progres Perakitan</span>
                  <span style={{ color: "#3b82f6", fontFamily: "JetBrains Mono, monospace", fontSize: "0.82rem" }}>
                    {installed.length}/{correctOrder.length}
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: isDark ? "#334155" : "#e0f2fe" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {feedback && (
                <div className="p-3 text-xs rounded-xl border" style={{ 
                  backgroundColor: feedback.startsWith("✅") ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                  borderColor: feedback.startsWith("✅") ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)",
                  color: feedback.startsWith("✅") ? "#10b981" : "#ef4444"
                }}>
                  {feedback}
                </div>
              )}
            </div>

            <div className="lg:col-span-3 space-y-3">
              <div className="p-5 rounded-2xl" style={{ background: cardBg, border: `1px solid ${borderBase}` }}>
                <div className="flex items-center justify-between mb-4">
                  <h4 style={{ color: textPrimary, fontFamily: "Rajdhani, sans-serif" }}>
                    Case Mid-Tower ATX — Tampilan Motherboard
                  </h4>
                  <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6", fontFamily: "JetBrains Mono, monospace" }}>
                    3D VIEW
                  </div>
                </div>

                <div style={{ perspective: "800px", perspectiveOrigin: "50% 40%" }}>
                  <div style={{ transform: "rotateX(8deg) rotateY(-3deg)", transformStyle: "preserve-3d", transition: "transform 0.3s" }}>
                    <MotherboardBoard
                      installed={installed}
                      nextExpected={nextExpected}
                      dragOver={dragOver}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={installComponent}
                      isDark={isDark}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Render CameraModal di sini jika state showCamera bernilai true */}
      {showCamera && (
        <CameraModal 
          isDark={isDark} 
          onClose={() => setShowCamera(false)} 
          onComponentDetected={(id) => {
            installComponent(id);
            // Tutup modal jika komponen terakhir telah terdeteksi/terpasang
            if(id === correctOrder[correctOrder.length - 1]) {
              setShowCamera(false);
            }
          }}
          currentExpectedId={nextExpected}
        />
      )}
    </section>
  );
}