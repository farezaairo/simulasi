import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Cpu, Loader2, Sparkles } from "lucide-react";

interface Message {
  id: number;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

const knowledgeBase: Record<string, string> = {
  cpu: "**CPU (Central Processing Unit)** adalah otak komputer yang memproses semua instruksi. Cara pasang CPU:\n1. Buka kunci socket\n2. Sejajarkan tanda segitiga CPU dengan socket\n3. Letakkan CPU (jangan dipaksa!)\n4. Kunci kembali socket\n5. Oleskan thermal paste sebesar butir beras di tengah CPU\n\n💡 Tip: Gunakan gelang anti-statis saat memegang CPU!",
  ram: "**RAM (Random Access Memory)** menyimpan data yang sedang aktif digunakan. Panduan pemasangan:\n1. Buka klip pengunci slot RAM\n2. Perhatikan takikan (notch) pada RAM — hanya bisa masuk satu arah\n3. Tekan RAM merata di kedua ujung hingga klik\n4. Untuk dual channel: pasang di slot 2 & 4\n\n💡 DDR5 lebih cepat dari DDR4, pastikan tipe RAM sesuai motherboard!",
  gpu: "**GPU (Graphics Card)** memproses grafis dan tampilan visual. Cara pasang GPU:\n1. Lepas bracket PCIe di case\n2. Masukkan GPU ke slot PCIe x16\n3. Tekan hingga klip mengunci (klik)\n4. Kencangkan baut bracket\n5. Hubungkan kabel daya 8-pin/16-pin dari PSU\n\n💡 Cek daya PSU sebelum beli GPU — GPU high-end butuh 300-450W sendiri!",
  ssd: "**SSD NVMe M.2** jauh lebih cepat dari HDD. Cara pasang:\n1. Masukkan SSD M.2 ke slot dengan sudut ~30°\n2. Tekan ujung SSD ke bawah\n3. Kencangkan baut M.2 kecil\n\nPerbandingan kecepatan:\n- HDD: ~150 MB/s\n- SSD SATA: ~550 MB/s\n- SSD NVMe: 3000-7000 MB/s\n\n💡 Gunakan SSD NVMe untuk sistem operasi, HDD untuk storage data!",
  psu: "**PSU (Power Supply Unit)** mengubah listrik AC menjadi DC untuk komponen. Cara hitung kebutuhan watt:\n- CPU: 65-253W\n- GPU: 120-450W\n- RAM: 5-15W\n- SSD: 5-10W\n- Tambah 20-30% buffer\n\nRekomendasi: Gunakan PSU 80 Plus Gold/Platinum untuk efisiensi lebih baik.\n\n💡 Jangan beli PSU murahan! PSU berkualitas buruk bisa merusak semua komponen!",
  thermal: "**Thermal Paste** mengisi celah mikroskopis antara CPU dan heatsink untuk konduksi panas optimal. Cara aplikasi:\n1. Bersihkan permukaan CPU dengan IPA\n2. Oleskan thermal paste sebesar butir beras/kacang polong DI TENGAH CPU\n3. Pasang heatsink — biarkan pasta menyebar sendiri dari tekanan\n\nJangan terlalu banyak! Kelebihan pasta tidak meningkatkan performa dan bisa meluber ke socket.\n\n💡 Merk populer: Noctua NT-H1, Arctic MX-6, Thermal Grizzly Kryonaut",
  esd: "**ESD (Electrostatic Discharge)** adalah musuh utama komponen elektronik. Cara pencegahan:\n\n✅ Yang harus dilakukan:\n- Gunakan gelang anti-statis\n- Kerja di meja anti-statis\n- Sentuh casing logam sebelum pegang komponen\n- Simpan komponen di kantong anti-statis\n\n❌ Yang harus dihindari:\n- Bekerja di atas karpet\n- Memakai pakaian wol/fleece\n- Menyentuh pin/chip langsung dengan tangan",
  motherboard: "**Motherboard** menghubungkan semua komponen. Komponen penting di motherboard:\n\n🔵 Socket CPU — tempat prosesor\n🟢 Slot DDR — tempat RAM\n🟣 Slot PCIe — tempat GPU\n🟡 Slot M.2 — tempat SSD NVMe\n🔴 Konektor 24-pin ATX — daya utama\n⚡ Konektor 8-pin EPS — daya CPU\n\nUrutannya: Pasang CPU → RAM → Storage → Masukkan ke case → Pasang GPU → Hubungkan kabel",
  urutan: "**Urutan Perakitan PC yang Benar:**\n\n1️⃣ Siapkan motherboard & pasang CPU\n2️⃣ Pasang CPU Cooler/Heatsink\n3️⃣ Pasang RAM\n4️⃣ Pasang SSD M.2\n5️⃣ Pasang Motherboard ke Case\n6️⃣ Pasang PSU\n7️⃣ Pasang GPU\n8️⃣ Hubungkan semua kabel\n9️⃣ First boot & BIOS setup\n🔟 Install sistem operasi\n\n💡 Pasang CPU sebelum motherboard masuk case — lebih mudah!",
  bios: "**BIOS/UEFI** adalah firmware yang mengontrol hardware sebelum OS berjalan. Setup awal BIOS:\n\n1. Cek apakah semua komponen terdeteksi\n2. Atur waktu & tanggal\n3. Enable XMP/EXPO untuk RAM (aktifkan kecepatan RAM yang dibeli)\n4. Atur boot order (USB/DVD dulu untuk install OS)\n5. Save & Exit\n\n💡 Jika PC tidak menyala pertama kali, cek:\n- Kabel 24-pin ATX sudah terpasang?\n- Kabel 8-pin EPS CPU sudah terpasang?\n- RAM terkunci di slot yang benar?",
  default: "Halo! Saya adalah **VLAB AI Assistant** 🤖 — asisten cerdas untuk membantu Anda belajar merakit komputer.\n\nAnda bisa tanyakan tentang:\n• 💻 Cara pasang **CPU, RAM, GPU, SSD**\n• ⚡ Pilihan **PSU** yang tepat\n• 🌡️ Aplikasi **thermal paste**\n• ⚠️ Keselamatan kerja **ESD**\n• 🔧 **Urutan** perakitan yang benar\n• 📺 Setup **BIOS** pertama kali\n\nKetik pertanyaan Anda atau pilih topik di bawah ini!",
};

const quickTopics = [
  { label: "Cara pasang CPU", key: "cpu" },
  { label: "Install RAM dual channel", key: "ram" },
  { label: "Pasang GPU PCIe", key: "gpu" },
  { label: "Urutan perakitan", key: "urutan" },
  { label: "Thermal paste", key: "thermal" },
  { label: "Keselamatan ESD", key: "esd" },
];

async function getAIResponse(input: string): Promise<string> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    if (!response.ok) {
      throw new Error("Gagal mendapatkan respons dari server");
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error Chatbot:", error);
    return "Maaf, sistem AI sedang mengalami gangguan koneksi. Silakan coba sesaat lagi! 🙏";
  }
}
function formatMessage(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} style={{ color: "#00d4ff" }}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: knowledgeBase.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const response = await getAIResponse(text);
    const aiMsg: Message = { id: Date.now() + 1, role: "assistant", content: response, timestamp: new Date() };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section id="chatbot" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.3)",
            color: "#a78bfa",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          MODULE_06 / AI ASISTEN
        </div>
        <h2 style={{ color: "#e2e8f0" }}>AI Assistant Perakitan PC</h2>
        <p className="mt-3 max-w-2xl mx-auto" style={{ color: "#64748b", fontFamily: "Inter, sans-serif" }}>
          Tanya apa saja tentang perakitan komputer. Asisten AI kami siap membantu 24/7.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(124,58,237,0.25)" }}
        >
          {/* Chat header */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{
              background: "rgba(13,22,38,0.95)",
              borderBottom: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed, #00d4ff)" }}
            >
              <Sparkles size={20} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, color: "#e2e8f0" }}>
                VLAB AI Assistant
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span style={{ color: "#64748b", fontSize: "0.78rem", fontFamily: "Inter, sans-serif" }}>
                  Online — Siap membantu
                </span>
              </div>
            </div>
            <div className="ml-auto">
              <Cpu size={16} color="#475569" />
            </div>
          </div>

          {/* Messages */}
          <div
            className="px-4 py-4 overflow-y-auto space-y-4"
            style={{ height: "420px", background: "#060d1a" }}
          >
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: msg.role === "assistant"
                        ? "linear-gradient(135deg, #7c3aed, #00d4ff)"
                        : "rgba(0,212,255,0.15)",
                      border: msg.role === "user" ? "1px solid rgba(0,212,255,0.3)" : "none",
                    }}
                  >
                    {msg.role === "assistant" ? (
                      <Bot size={16} color="white" />
                    ) : (
                      <User size={16} color="#00d4ff" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className="max-w-xs sm:max-w-md rounded-2xl px-4 py-3"
                    style={{
                      background: msg.role === "assistant"
                        ? "rgba(13,22,38,0.9)"
                        : "rgba(0,212,255,0.12)",
                      border: msg.role === "assistant"
                        ? "1px solid rgba(124,58,237,0.2)"
                        : "1px solid rgba(0,212,255,0.25)",
                      borderRadius: msg.role === "assistant" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                    }}
                  >
                    <div
                      style={{
                        color: "#e2e8f0",
                        fontSize: "0.88rem",
                        lineHeight: 1.7,
                        fontFamily: "Inter, sans-serif",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {formatMessage(msg.content)}
                    </div>
                    <div
                      style={{
                        color: "#475569",
                        fontSize: "0.7rem",
                        marginTop: "0.5rem",
                        fontFamily: "JetBrains Mono, monospace",
                        textAlign: msg.role === "user" ? "left" : "right",
                      }}
                    >
                      {msg.timestamp.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #00d4ff)" }}
                  >
                    <Bot size={16} color="white" />
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl flex items-center gap-2"
                    style={{
                      background: "rgba(13,22,38,0.9)",
                      border: "1px solid rgba(124,58,237,0.2)",
                      borderRadius: "4px 16px 16px 16px",
                    }}
                  >
                    <Loader2 size={14} color="#7c3aed" className="animate-spin" />
                    <span style={{ color: "#64748b", fontSize: "0.82rem", fontFamily: "Inter, sans-serif" }}>
                      AI sedang memproses...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Quick topics */}
          <div
            className="px-4 py-3 flex gap-2 flex-wrap"
            style={{
              background: "rgba(6,13,26,0.95)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {quickTopics.map((topic) => (
              <button
                key={topic.key}
                onClick={() => sendMessage(topic.label)}
                disabled={loading}
                className="px-3 py-1.5 rounded-full text-xs transition-all hover:scale-105 disabled:opacity-50"
                style={{
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  color: "#a78bfa",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-3 p-4"
            style={{
              background: "rgba(6,13,26,0.98)",
              borderTop: "1px solid rgba(124,58,237,0.15)",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya tentang perakitan PC..."
              className="flex-1 px-4 py-2.5 rounded-xl outline-none transition-all"
              style={{
                background: "rgba(15,32,64,0.8)",
                border: "1px solid rgba(124,58,237,0.25)",
                color: "#e2e8f0",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
              }}
              onFocus={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.6)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.25)"; }}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #7c3aed, #00d4ff)" }}
            >
              {loading ? (
                <Loader2 size={18} color="white" className="animate-spin" />
              ) : (
                <Send size={18} color="white" />
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
