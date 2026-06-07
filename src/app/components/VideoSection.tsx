import { useState } from "react";
import { Play, Clock, ChevronRight } from "lucide-react";

const videos = [
  {
    // id: "BL4DCEp7blY",
    title: "Cara Merakit PC Gaming dari Nol",
    src:"/videos/Final_multimedia.mp4",
    channel: "Rahil Banyu Biru",
    duration: "03:05",
    description: "Tutorial lengkap merakit PC gaming dengan penjelasan setiap komponen, urutan pemasangan yang benar, dan tips profesional.",
    category: "Full Build",
    level: "Pemula",
    levelColor: "#10b981",
  },
  {
    id: "PXeHrPx7GxA",
    title: "Cara Pasang CPU & Thermal Paste",
    channel: "PC Master ID",
    duration: "12:30",
    description: "Tutorial detail cara memasang prosesor Intel ke socket LGA1700 dan mengaplikasikan thermal paste dengan benar.",
    category: "CPU Install",
    level: "Pemula",
    levelColor: "#10b981",
  },
  {
    id: "WqSs7b8J9go",
    title: "Panduan Memasang RAM DDR5",
    channel: "Hardware Corner",
    duration: "8:45",
    description: "Cara memasang RAM DDR5 dual channel untuk performa maksimal, termasuk konfigurasi XMP di BIOS.",
    category: "RAM Guide",
    level: "Pemula",
    levelColor: "#10b981",
  },
  {
    id: "RR8F-SkeB4o",
    title: "Instalasi GPU & PCIe Slot",
    channel: "GPU Indonesia",
    duration: "15:20",
    description: "Tutorial memasang kartu grafis ke slot PCIe x16 beserta menghubungkan kabel daya dan driver instalasi.",
    category: "GPU Install",
    level: "Menengah",
    levelColor: "#f59e0b",
  },
  {
    id: "0A-3f0oRRSk",
    title: "Tips Manajemen Kabel PC",
    channel: "Modding Indonesia",
    duration: "22:10",
    description: "Teknik cable management profesional untuk tampilan bersih dan aliran udara optimal di dalam case.",
    category: "Cable Mgmt",
    level: "Menengah",
    levelColor: "#f59e0b",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "POST Test & BIOS Setup Awal",
    channel: "BIOS Master",
    duration: "18:55",
    description: "Cara melakukan POST test pertama kali dan konfigurasi BIOS/UEFI untuk performa optimal.",
    category: "BIOS Setup",
    level: "Lanjutan",
    levelColor: "#7c3aed",
  },
];

interface Props { isDark: boolean }

export function VideoSection({ isDark }: Props) {
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [playing, setPlaying] = useState(false);

  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const listBg = isDark ? "#1e293b" : "#f8fafc";
  const textPrimary = isDark ? "#f1f5f9" : "#1e293b";
  const textSecondary = isDark ? "#94a3b8" : "#64748b";
  const borderBase = isDark ? "#334155" : "#e2e8f0";

  return (
    <section id="video" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 style={{ color: textPrimary }}>Video Panduan Lengkap</h2>
        <p className="mt-3 max-w-2xl mx-auto" style={{ color: textSecondary, fontFamily: "Inter, sans-serif" }}>
          Tonton tutorial video dari para profesional tentang setiap aspek perakitan komputer.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main player */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${borderBase}` }}>
            {/* Video embed */}
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
            {playing ? (
                  <video
                    className="absolute inset-0 w-full h-full"
                    controls
                    autoPlay
                  >
                    <source src={activeVideo.src} type="video/mp4" />
                    Browser Anda tidak mendukung video.
                  </video>
                ) : (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
                  style={{
                    background: `linear-gradient(180deg, rgba(5,11,24,0.5) 0%, rgba(5,11,24,0.9) 100%), url(https://img.youtube.com/vi/${activeVideo.id}/maxresdefault.jpg) center/cover`,
                  }}
                  onClick={() => setPlaying(true)}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 mb-4"
                    style={{ background: "rgba(59,130,246,0.9)", backdropFilter: "blur(8px)" }}
                  >
                    <Play size={26} color="#ffffff" style={{ marginLeft: "3px" }} />
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm" style={{ background: "rgba(239,68,68,0.9)", color: "white", fontFamily: "JetBrains Mono, monospace" }}>
                    ▶ Putar Video
                  </div>
                </div>
              )}
            </div>

            {/* Video info */}
            <div className="p-5" style={{ background: cardBg }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-xs px-2 py-0.5 rounded mr-2" style={{ background: activeVideo.levelColor + "20", color: activeVideo.levelColor, fontFamily: "JetBrains Mono, monospace" }}>
                    {activeVideo.category}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: activeVideo.levelColor + "15", color: activeVideo.levelColor, fontFamily: "Inter, sans-serif" }}>
                    {activeVideo.level}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm" style={{ color: textSecondary, fontFamily: "JetBrains Mono, monospace" }}>
                  <Clock size={14} />
                  {activeVideo.duration}
                </div>
              </div>
              <h3 style={{ color: textPrimary, fontFamily: "Rajdhani, sans-serif", marginBottom: "0.5rem" }}>
                {activeVideo.title}
              </h3>
              <p style={{ color: textSecondary, fontSize: "0.88rem", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
                {activeVideo.description}
              </p>
              <div className="mt-3 flex items-center gap-1" style={{ color: textSecondary, fontSize: "0.82rem", fontFamily: "Inter, sans-serif" }}>
                <span>📺</span> {activeVideo.channel}
              </div>
            </div>
          </div>
        </div>

        {/* Video list */}
        <div
          className="rounded-2xl p-4 overflow-y-auto"
          style={{ background: listBg, border: `1px solid ${borderBase}`, maxHeight: "600px" }}
        >
          <h4 className="mb-4" style={{ color: textPrimary, fontFamily: "Rajdhani, sans-serif" }}>
            Daftar Video ({videos.length})
          </h4>
          <div className="space-y-2">
            {videos.map((video) => {
              const isActive = video.id === activeVideo.id;
              return (
                <button
                  key={video.id}
                  onClick={() => { setActiveVideo(video); setPlaying(false); }}
                  className="w-full flex gap-3 p-3 rounded-xl text-left transition-all"
                  style={{
                    background: isActive ? "rgba(59,130,246,0.1)" : "transparent",
                    border: isActive ? "1px solid #3b82f6" : "1px solid transparent",
                  }}
                >
                  <div className="relative shrink-0 w-24 h-16 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: borderBase }}>
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
                        <Play size={16} color="#3b82f6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-sm mb-1 line-clamp-2"
                      style={{ color: isActive ? "#3b82f6" : textPrimary, fontFamily: "Rajdhani, sans-serif", fontWeight: 600, lineHeight: 1.3 }}
                    >
                      {video.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: video.levelColor + "15", color: video.levelColor, fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem" }}>
                        {video.category}
                      </span>
                      <span style={{ color: textSecondary, fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace" }}>
                        {video.duration}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={14} color={textSecondary} className="shrink-0 mt-1" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
