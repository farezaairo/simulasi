import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Cpu, MemoryStick, HardDrive, Zap, Monitor, Wind, Server, AlertTriangle, Play, X } from "lucide-react";

const modules = [
  {
    id: "cpu",
    icon: Cpu,
    color: "#00d4ff",
    title: "Prosesor (CPU)",
    src:"/videos/cpu.mp4",
    subtitle: "Central Processing Unit — Otak Komputer",
    videoId: "PXeHrPx7GxA",
    content: [
      "CPU (Central Processing Unit) adalah komponen inti komputer yang menjalankan instruksi program. CPU modern memiliki banyak core untuk pemrosesan paralel.",
      "**Socket CPU** harus cocok antara prosesor dan motherboard. Intel menggunakan LGA (Land Grid Array) sedangkan AMD menggunakan AM4/AM5.",
      "**Thermal Paste** harus dioleskan tipis merata di atas CPU sebelum memasang heatsink agar konduksi panas optimal.",
      "Spesifikasi penting: Clock speed (GHz), jumlah core/thread, cache (L1/L2/L3), TDP (watt).",
    ],
    steps: ["Siapkan motherboard di permukaan anti-statis", "Buka kunci socket CPU", "Masukkan CPU sesuai tanda segitiga", "Kunci kembali socket", "Oleskan thermal paste", "Pasang heatsink dan kencangkan baut diagonal"],
    tips: "Jangan pernah menyentuh pin socket CPU dengan tangan kosong. Gunakan gelang anti-statis.",
  },
  {
    id: "ram",
    icon: MemoryStick,
    color: "#10b981",
    title: "RAM (Memory)",
    src: "/videos/ram.mp4",
    subtitle: "Random Access Memory — Memori Kerja",
    videoId: "WqSs7b8J9go",
    content: [
      "RAM menyimpan data yang sedang diproses secara sementara. Kapasitas RAM yang lebih besar memungkinkan lebih banyak program berjalan bersamaan.",
      "Tipe RAM: DDR4 (kecepatan 2133-4800 MHz) dan DDR5 (4800-8000 MHz). Pastikan tipe RAM sesuai dengan slot motherboard.",
      "**Dual Channel** meningkatkan performa dengan memasang RAM berpasangan di slot yang ditandai (biasanya slot 2 & 4).",
    ],
    steps: ["Buka klip pengunci slot RAM", "Posisikan RAM sesuai takikan (notch)", "Tekan RAM kuat-kuat hingga klip terkunci bunyi 'klik'", "Pastikan kedua sisi terkunci sempurna"],
    tips: "Pasang RAM di slot yang mendukung dual channel untuk performa optimal.",
  },
  {
    id: "storage",
    icon: HardDrive,
    color: "#f59e0b",
    title: "Penyimpanan (Storage)",
    subtitle: "SSD NVMe / SATA — Media Penyimpanan Data",
    videoId: "BL4DCEp7blY",
    content: [
      "**SSD NVMe M.2** dipasang langsung ke slot M.2 di motherboard dengan kecepatan baca/tulis hingga 7000 MB/s.",
      "**SSD SATA** dihubungkan via kabel SATA ke port SATA motherboard, lebih lambat (500 MB/s) namun lebih murah.",
      "**HDD** menggunakan piringan magnetis, cocok untuk penyimpanan data berkapasitas besar dengan harga ekonomis.",
    ],
    steps: ["Masukkan SSD M.2 ke slot dengan sudut 30°", "Tekan ujung SSD ke bawah", "Kencangkan baut M.2 penahan", "Untuk HDD/SSD SATA: pasang di bay drive, hubungkan kabel SATA dan power"],
    tips: "Gunakan SSD NVMe sebagai drive sistem operasi untuk boot yang sangat cepat.",
  },
  {
    id: "gpu",
    icon: Monitor,
    color: "#7c3aed",
    title: "Kartu Grafis (GPU)",
    subtitle: "Graphics Processing Unit — Prosesor Visual",
    videoId: "RR8F-SkeB4o",
    content: [
      "GPU memproses data grafis untuk ditampilkan ke monitor. Penting untuk gaming, desain grafis, dan komputasi AI/ML.",
      "GPU modern menggunakan slot PCIe x16 di motherboard. Pastikan slot PCIe cukup panjang dan power supply cukup.",
      "Connector daya GPU: 6-pin, 8-pin, atau 12-pin tergantung TDP. GPU high-end bisa membutuhkan 2-3 konektor daya.",
    ],
    steps: ["Lepas cover slot PCIe di case", "Posisikan GPU di atas slot PCIe x16", "Tekan GPU hingga klik terkunci", "Kencangkan baut bracket GPU ke case", "Hubungkan kabel power PCIe"],
    tips: "Pastikan PSU memiliki watt yang cukup sebelum memasang GPU high-end.",
  },
  {
    id: "psu",
    icon: Zap,
    color: "#ef4444",
    title: "Power Supply Unit (PSU)",
    src: "/videos/psu.mp4",
    subtitle: "Sumber Daya — Jantung Listrik Komputer",
    videoId: "0A-3f0oRRSk",
    content: [
      "PSU mengkonversi listrik AC dari PLN menjadi DC dengan tegangan yang dibutuhkan komponen (12V, 5V, 3.3V).",
      "**Efisiensi 80 Plus**: Bronze (82%), Silver (85%), Gold (87%), Platinum (90%), Titanium (92%). Semakin tinggi lebih hemat energi.",
      "Hitung kebutuhan watt: jumlahkan TDP semua komponen lalu tambah 20-30% sebagai buffer.",
    ],
    steps: ["Pasang PSU ke case dengan baut (fan menghadap luar atau ke bawah)", "Hubungkan kabel 24-pin ATX ke motherboard", "Hubungkan kabel 8-pin EPS ke motherboard (CPU power)", "Hubungkan kabel daya ke GPU, storage, dan drive optis"],
    tips: "Gunakan PSU modular untuk manajemen kabel yang rapi dan sirkulasi udara lebih baik.",
  },
  {
    id: "cooling",
    icon: Wind,
    color: "#06b6d4",
    title: "Sistem Pendingin",
    subtitle: "CPU Cooler & Case Fan — Manajemen Termal",
    videoId: "BL4DCEp7blY",
    content: [
      "**Air Cooler**: Heatsink + fan, mudah dipasang, andal untuk CPU mainstream. Pilih berdasarkan TDP CPU.",
      "**AIO Liquid Cooler**: Menggunakan cairan pendingin, performa lebih baik untuk CPU high-end, cocok untuk overclocking.",
      "**Case Fan**: Pasang fan intake di bagian bawah/depan (udara masuk) dan exhaust di atas/belakang (udara keluar).",
    ],
    steps: ["Pasang backplate cooler di belakang motherboard", "Oleskan thermal paste di CPU", "Kunci heatsink di atas CPU", "Hubungkan kabel fan ke header CPU_FAN di motherboard", "Atur arah aliran udara case fan"],
    tips: "Aliran udara positif (lebih banyak intake dari exhaust) mengurangi debu masuk ke case.",
  },
  {
    id: "motherboard",
    icon: Server,
    color: "#8b5cf6",
    title: "Motherboard",
    src: "/videos/motherboard.mp4"
    subtitle: "Papan Induk — Penghubung Semua Komponen",
    videoId: "BL4DCEp7blY",
    content: [
      "Motherboard menghubungkan semua komponen. Form factor: ATX (standard), mATX (compact), ITX (mini).",
      "Pilih motherboard berdasarkan: chipset, socket CPU, jumlah slot RAM, slot M.2, port I/O, dan form factor case.",
      "Fitur penting: BIOS/UEFI, POST (Power On Self Test), USB headers, audio headers, dan fan headers.",
    ],
    steps: ["Pasang CPU sebelum motherboard dipasang ke case", "Pasang RAM di slot yang sesuai", "Pasang I/O shield ke case", "Pasang motherboard dan kencangkan baut standoff", "Hubungkan front panel connectors (power button, reset, LED)"],
    tips: "Baca manual motherboard untuk mengetahui urutan pemasangan komponen yang benar.",
  },
  {
    id: "safety",
    icon: AlertTriangle,
    color: "#f59e0b",
    title: "Keselamatan Kerja",
    subtitle: "ESD Protection & Prosedur Aman",
    videoId: "BL4DCEp7blY",
    content: [
      "**ESD (Electrostatic Discharge)** dapat merusak komponen sensitif. Selalu gunakan gelang anti-statis atau sentuh permukaan logam sebelum memegang komponen.",
      "Kerja di permukaan anti-statis. Jangan merakit di atas karpet atau pakaian wol.",
      "Pastikan PSU dalam keadaan mati dan kabel power dicabut sebelum memulai perakitan.",
    ],
    steps: ["Gunakan gelang anti-statis", "Kerjakan di meja anti-statis", "Cabut kabel power PSU", "Pegang komponen di tepi, bukan di konektor", "Simpan komponen di kantong anti-statis saat tidak digunakan"],
    tips: "Lebih baik terlalu hati-hati daripada merusak komponen mahal akibat ESD.",
  },
];

interface Props { isDark: boolean }

export function TheorySection({ isDark }: Props) {
  const [openId, setOpenId] = useState<string | null>("cpu");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const bg = isDark ? "#0f172a" : "#ffffff";
  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const cardBgAlt = isDark ? "#0f172a" : "#f8fafc";
  const textPrimary = isDark ? "#f1f5f9" : "#1e293b";
  const textSecondary = isDark ? "#94a3b8" : "#64748b";
  const textBody = isDark ? "#cbd5e1" : "#334155";
  const borderBase = isDark ? "#334155" : "#e2e8f0";

  const handleAccordionToggle = (id: string) => {
    if (openId === id) {
      setOpenId(null);
      setPlayingVideo(null);
    } else {
      setOpenId(id);
      setPlayingVideo(null);
    }
  };

  return (
    <section id="materi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 style={{ color: textPrimary }}>Komponen &amp; Teori Perakitan</h2>
        <p className="mt-3 max-w-2xl mx-auto" style={{ color: textSecondary, fontFamily: "Inter, sans-serif" }}>
          Klik pada setiap komponen untuk membaca materi dan menonton video penjelasan lengkap.
        </p>
      </div>

      {/* Accordion modules */}
      <div className="space-y-3">
        {modules.map((mod) => {
          const Icon = mod.icon;
          const isOpen = openId === mod.id;
          return (
            <div
              key={mod.id}
              className="rounded-xl overflow-hidden transition-all"
              style={{
                border: `1px solid ${isOpen ? mod.color + "44" : borderBase}`,
                background: isOpen ? cardBg : cardBgAlt,
              }}
            >
              <button
                className="w-full flex items-center gap-4 p-5 text-left transition-colors"
                onClick={() => handleAccordionToggle(mod.id)}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: mod.color + "18", border: `1px solid ${mod.color}44` }}
                >
                  <Icon size={20} color={mod.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: textPrimary }}>
                    {mod.title}
                  </div>
                  <div style={{ color: textSecondary, fontSize: "0.82rem", fontFamily: "Inter, sans-serif" }}>
                    {mod.subtitle}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                    style={{ background: mod.color + "15", color: mod.color, fontFamily: "JetBrains Mono, monospace" }}
                  >
                    <Play size={10} /> Video
                  </span>
                  <ChevronDown
                    size={18}
                    color={textSecondary}
                    className="transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ borderTop: `1px solid ${mod.color}22` }}>
                      {/* Video embed */}
                      <div className="px-5 pt-5">
                        {playingVideo === mod.id ? (
                          <div className="relative rounded-xl overflow-hidden mb-5" style={{ paddingBottom: "40%" }}>
                          <video
                            className="absolute inset-0 w-full h-full object-cover"
                            controls
                            autoPlay
                          >
                            <source src={mod.src} type="video/mp4" />
                            Browser Anda tidak mendukung video.
                          </video>
                            <button
                              onClick={() => setPlayingVideo(null)}
                              className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center z-10"
                              style={{ background: "rgba(0,0,0,0.6)", color: "#ffffff" }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setPlayingVideo(mod.id)}
                            className="w-full relative rounded-xl overflow-hidden mb-5 flex items-center justify-center group"
                            style={{
                              height: "160px",
                              background: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%), url(https://img.youtube.com/vi/${mod.videoId}/mqdefault.jpg) center/cover`,
                              border: `1px solid ${mod.color}30`,
                            }}
                          >
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                              style={{ background: mod.color + "cc", backdropFilter: "blur(4px)" }}
                            >
                              <Play size={22} color="#ffffff" style={{ marginLeft: "2px" }} />
                            </div>
                            <div className="absolute bottom-3 left-4 right-4 text-left">
                              <div style={{ color: "#ffffff", fontSize: "0.8rem", fontFamily: "Rajdhani, sans-serif", fontWeight: 600 }}>
                                ▶ Tonton Video Penjelasan: {mod.title}
                              </div>
                            </div>
                          </button>
                        )}
                      </div>

                      <div className="px-5 pb-6 grid md:grid-cols-2 gap-6">
                        {/* Theory content */}
                        <div>
                          <h4 style={{ color: mod.color, marginBottom: "0.75rem", fontFamily: "Rajdhani, sans-serif" }}>
                            Penjelasan
                          </h4>
                          <div className="space-y-2">
                            {mod.content.map((para, i) => (
                              <p key={i} style={{ color: textBody, fontSize: "0.9rem", lineHeight: 1.7, fontFamily: "Inter, sans-serif" }}>
                                {para.replace(/\*\*(.*?)\*\*/g, "$1")}
                              </p>
                            ))}
                          </div>

                          <div
                            className="mt-4 p-3 rounded-lg flex gap-2"
                            style={{ background: mod.color + "12", border: `1px solid ${mod.color}30` }}
                          >
                            <span style={{ color: mod.color, fontSize: "0.9rem" }}>💡</span>
                            <p style={{ color: textBody, fontSize: "0.85rem", fontFamily: "Inter, sans-serif" }}>
                              <strong style={{ color: mod.color }}>Tip: </strong>{mod.tips}
                            </p>
                          </div>
                        </div>

                        {/* Installation steps */}
                        <div>
                          <h4 style={{ color: mod.color, marginBottom: "0.75rem", fontFamily: "Rajdhani, sans-serif" }}>
                            Langkah Pemasangan
                          </h4>
                          <ol className="space-y-2">
                            {mod.steps.map((step, i) => (
                              <li key={i} className="flex gap-3">
                                <span
                                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                                  style={{
                                    background: mod.color + "20",
                                    border: `1px solid ${mod.color}50`,
                                    color: mod.color,
                                    fontFamily: "JetBrains Mono, monospace",
                                    fontWeight: 700,
                                  }}
                                >
                                  {i + 1}
                                </span>
                                <span style={{ color: textBody, fontSize: "0.87rem", lineHeight: 1.6, fontFamily: "Inter, sans-serif" }}>
                                  {step}
                                </span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
