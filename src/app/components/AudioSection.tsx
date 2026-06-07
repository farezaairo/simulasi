import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Mic } from "lucide-react";

const audioTopics = [
  {
    id: "intro",
    title: "Pengantar Perakitan PC",
    duration: "2:30",
    icon: "🖥️",
    text: `Selamat datang di Laboratorium Virtual Perakitan Komputer. Dalam sesi ini, kita akan belajar cara merakit komputer dari awal.

Perakitan komputer adalah proses menggabungkan berbagai komponen hardware menjadi satu unit komputer yang berfungsi penuh. Proses ini membutuhkan ketelitian, kesabaran, dan pemahaman tentang setiap komponen yang akan dipasang.

Sebelum memulai, pastikan Anda sudah menyiapkan semua komponen yang diperlukan: prosesor, motherboard, RAM, storage, kartu grafis, power supply, dan case komputer.

Mari kita mulai perjalanan menarik ini bersama-sama!`,
  },
  {
    id: "cpu",
    title: "Cara Memasang Prosesor",
    duration: "3:15",
    icon: "⚡",
    text: `Prosesor atau CPU adalah komponen terpenting dalam sebuah komputer. CPU bertugas memproses semua instruksi yang diberikan ke komputer.

Langkah pertama adalah membuka socket CPU di motherboard dengan mengangkat tuas pengunci. Perhatikan tanda segitiga kecil di salah satu sudut CPU - ini adalah petunjuk orientasi pemasangan.

Letakkan CPU dengan hati-hati ke dalam socket sesuai tanda segitiga tersebut. Jangan pernah memaksa CPU masuk ke socket, karena pin-pin halus bisa bengkok dan merusak komponen.

Setelah CPU terpasang, kunci kembali tuas socket. Kemudian oleskan thermal paste sebesar butir beras di tengah-tengah permukaan CPU sebelum memasang pendingin.

Thermal paste berfungsi mengisi celah mikroskopis antara CPU dan heatsink untuk konduksi panas yang optimal.`,
  },
  {
    id: "ram",
    title: "Instalasi RAM",
    duration: "2:45",
    icon: "💾",
    text: `RAM atau Random Access Memory adalah memori sementara yang digunakan komputer untuk menyimpan data yang sedang aktif diproses.

Saat memasang RAM, perhatikan slot yang disediakan motherboard. Untuk konfigurasi dual channel yang memberikan performa optimal, pasang RAM di slot yang sama warnanya - biasanya slot 2 dan 4.

Perhatikan takikan kecil di bagian bawah modul RAM - ini memastikan RAM hanya bisa dipasang dalam satu arah yang benar.

Tekan modul RAM ke bawah dengan tekanan merata di kedua ujungnya hingga terdengar bunyi klik dan klip pengunci menutup sendiri.

Pastikan kedua sisi RAM terkunci sempurna sebelum melanjutkan ke komponen berikutnya.`,
  },
  {
    id: "gpu",
    title: "Memasang Kartu Grafis",
    duration: "3:00",
    icon: "🎮",
    text: `Kartu grafis atau GPU bertanggung jawab memproses dan menampilkan gambar ke monitor. Untuk gaming, desain grafis, dan pekerjaan kreatif, GPU berkualitas tinggi sangat penting.

Sebelum memasang GPU, lepas terlebih dahulu bracket slot PCIe yang sesuai di case komputer. Biasanya ada 2 slot bracket yang perlu dilepas untuk GPU ukuran standar.

Masukkan GPU ke slot PCIe x16 dengan menekan secara merata dan pastikan klip pengunci di ujung slot mengklik terkunci. Kencangkan baut bracket GPU ke case.

Langkah terakhir adalah menghubungkan kabel daya dari power supply ke konektor daya GPU. GPU modern biasanya memerlukan konektor 8-pin atau bahkan 16-pin.

Selalu periksa manual GPU untuk mengetahui kebutuhan daya yang tepat.`,
  },
  {
    id: "safety",
    title: "Keselamatan Kerja ESD",
    duration: "2:00",
    icon: "⚠️",
    text: `Electrostatic Discharge atau ESD adalah musuh utama komponen elektronik sensitif seperti CPU, RAM, dan motherboard.

Listrik statis yang tersimpan di tubuh kita bisa merusak komponen secara permanen bahkan tanpa terasa. Untuk mencegah ini, selalu gunakan gelang anti-statis yang terhubung ke permukaan logam yang diground.

Jika tidak memiliki gelang anti-statis, sentuh casing logam komputer atau benda logam lain yang diground secara berkala saat bekerja.

Hindari bekerja di atas karpet atau mengenakan pakaian yang mudah menghasilkan listrik statis seperti pakaian wol atau fleece.

Simpan komponen di kantong anti-statis saat tidak digunakan dan selalu pegang komponen di tepi, bukan di bagian sirkuit atau konektor.`,
  },
];

function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported("speechSynthesis" in window);
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  const speak = (text: string, onEnd: () => void) => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "id-ID";
    utter.rate = 0.9;
    utter.pitch = 1;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => { setSpeaking(false); onEnd(); };
    utter.onerror = () => { setSpeaking(false); onEnd(); };
    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
    // Some browsers don't fire onstart immediately
    setSpeaking(true);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return { speak, stop, speaking, supported };
}

interface Props { isDark: boolean }

export function AudioSection({ isDark }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const { speak, stop, speaking, supported } = useTextToSpeech();
  const active = audioTopics[activeIdx];

  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const listBg = isDark ? "#1e293b" : "#f8fafc";
  const textPrimary = isDark ? "#f1f5f9" : "#1e293b";
  const textSecondary = isDark ? "#94a3b8" : "#64748b";
  const textBody = isDark ? "#cbd5e1" : "#334155";
  const borderBase = isDark ? "#334155" : "#e2e8f0";

  const handlePlay = () => {
    if (isPlaying || speaking) {
      stop();
      setIsPlaying(false);
    } else {
      if (!muted) {
        speak(active.text, () => setIsPlaying(false));
      }
      setIsPlaying(true);
    }
  };

  const handleSelect = (idx: number) => {
    stop();
    setIsPlaying(false);
    setActiveIdx(idx);
  };

  const handlePrev = () => {
    stop();
    setIsPlaying(false);
    setActiveIdx((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    stop();
    setIsPlaying(false);
    setActiveIdx((i) => Math.min(audioTopics.length - 1, i + 1));
  };

  // When topic changes while playing, stop
  useEffect(() => {
    stop();
    setIsPlaying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  const showPaused = isPlaying || speaking;

  return (
    <section id="audio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 style={{ color: textPrimary }}>Narasi Audio Interaktif</h2>
        <p className="mt-3 max-w-2xl mx-auto" style={{ color: textSecondary, fontFamily: "Inter, sans-serif" }}>
          Dengarkan penjelasan audio tentang setiap aspek perakitan komputer. Menggunakan teknologi Text-to-Speech.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Topic list */}
        <div className="rounded-2xl p-5" style={{ background: listBg, border: `1px solid ${borderBase}` }}>
          <h4 className="mb-4" style={{ color: textPrimary, fontFamily: "Rajdhani, sans-serif" }}>
            Topik Audio ({audioTopics.length})
          </h4>
          <div className="space-y-2">
            {audioTopics.map((topic, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleSelect(idx)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                  style={{
                    background: isActive ? "rgba(16,185,129,0.1)" : "transparent",
                    border: isActive ? "1px solid rgba(16,185,129,0.3)" : "1px solid transparent",
                  }}
                >
                  <span className="text-xl shrink-0">{topic.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div style={{ color: isActive ? "#34d399" : textPrimary, fontFamily: "Rajdhani, sans-serif", fontWeight: 600, fontSize: "0.9rem" }}>
                      {topic.title}
                    </div>
                    <div style={{ color: textSecondary, fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace" }}>
                      ~{topic.duration}
                    </div>
                  </div>
                  {isActive && showPaused && (
                    <div className="flex gap-0.5 items-end">
                      {[1, 2, 3].map((b) => (
                        <div
                          key={b}
                          className="w-1 rounded-full"
                          style={{
                            background: "#34d399",
                            height: `${8 + b * 4}px`,
                            animation: `audioPulse ${0.5 + b * 0.15}s ease-in-out infinite alternate`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Player */}
        <div className="lg:col-span-2 space-y-5">
          {/* Player card */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: isDark
                ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            {/* Icon + title */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}
              >
                {active.icon}
              </div>
              <div>
                <h3 style={{ color: textPrimary, fontFamily: "Rajdhani, sans-serif", marginBottom: "0.25rem" }}>
                  {active.title}
                </h3>
                <div style={{ color: textSecondary, fontSize: "0.82rem", fontFamily: "JetBrains Mono, monospace" }}>
                  Durasi ~{active.duration} • {activeIdx + 1}/{audioTopics.length}
                </div>
              </div>
            </div>

            {/* Waveform visual */}
            <div className="flex items-center gap-0.5 h-12 mb-6 overflow-hidden">
              {Array.from({ length: 48 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full"
                  style={{
                    background: showPaused ? "#34d399" : "rgba(16,185,129,0.3)",
                    height: `${20 + Math.sin(i * 0.5) * 14}%`,
                    minHeight: "4px",
                    transition: showPaused ? "height 0.2s" : "height 0.5s",
                    animation: showPaused ? `waveBar${i % 6} ${0.4 + (i % 4) * 0.1}s ease-in-out infinite alternate` : "none",
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrev}
                disabled={activeIdx === 0}
                className="p-2 rounded-lg transition-all disabled:opacity-30"
                style={{ color: textSecondary }}
              >
                <SkipBack size={22} />
              </button>

              {/* Play/Pause button — shows correct icon based on actual state */}
              <button
                onClick={handlePlay}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105"
                style={{
                  background: showPaused
                    ? "rgba(239,68,68,0.15)"
                    : "linear-gradient(135deg, #10b981, #059669)",
                  border: showPaused ? "2px solid rgba(239,68,68,0.5)" : "none",
                  color: showPaused ? "#ef4444" : "#ffffff",
                  boxShadow: showPaused ? "none" : "0 4px 16px rgba(16,185,129,0.3)",
                }}
              >
                {showPaused
                  ? <Pause size={24} />
                  : <Play size={24} style={{ marginLeft: "2px" }} />
                }
              </button>

              <button
                onClick={handleNext}
                disabled={activeIdx === audioTopics.length - 1}
                className="p-2 rounded-lg transition-all disabled:opacity-30"
                style={{ color: textSecondary }}
              >
                <SkipForward size={22} />
              </button>

              <button
                onClick={() => { setMuted(!muted); if (!muted && showPaused) { stop(); setIsPlaying(false); } }}
                className="p-2 rounded-lg transition-all ml-2"
                style={{ color: muted ? "#ef4444" : textSecondary }}
              >
                {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>
            </div>

            {!supported && (
              <p className="mt-4 text-center text-sm" style={{ color: "#f59e0b", fontFamily: "Inter, sans-serif" }}>
                ⚠️ Browser Anda tidak mendukung Text-to-Speech. Silakan baca teks narasi di bawah.
              </p>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-sm" style={{ color: textSecondary }}>
              <Mic size={14} />
              <span style={{ fontFamily: "Inter, sans-serif" }}>
                {speaking ? "🔊 Sedang membaca narasi..." : muted ? "🔇 Audio dimatikan" : "Klik tombol play untuk memulai"}
              </span>
            </div>
          </div>

          {/* Transcript */}
          <div className="rounded-2xl p-5" style={{ background: listBg, border: `1px solid ${borderBase}` }}>
            <h4 className="mb-3" style={{ color: textPrimary, fontFamily: "Rajdhani, sans-serif" }}>
              Teks Narasi
            </h4>
            <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
              {active.text.split("\n\n").map((para, i) => (
                <p key={i} className="mb-3" style={{ color: textBody, fontSize: "0.9rem", lineHeight: 1.8, fontFamily: "Inter, sans-serif" }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes audioPulse { from { opacity: 0.6; } to { opacity: 1; } }
        @keyframes waveBar0 { from { height: 20%; } to { height: 80%; } }
        @keyframes waveBar1 { from { height: 30%; } to { height: 70%; } }
        @keyframes waveBar2 { from { height: 40%; } to { height: 90%; } }
        @keyframes waveBar3 { from { height: 25%; } to { height: 75%; } }
        @keyframes waveBar4 { from { height: 35%; } to { height: 65%; } }
        @keyframes waveBar5 { from { height: 15%; } to { height: 85%; } }
      `}</style>
    </section>
  );
}
