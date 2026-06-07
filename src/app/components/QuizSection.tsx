import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, XCircle, RotateCcw, Trophy, ChevronRight, Star, Lock, BookOpen, Zap, Award } from "lucide-react";

// ─── Level 1: Dasar ───────────────────────────────
const level1Questions = [
  {
    id: 1,
    question: "Apa fungsi utama CPU dalam komputer?",
    options: ["Menyimpan data secara permanen", "Memproses instruksi dan data dari program", "Menampilkan gambar ke monitor", "Mengkonversi listrik AC ke DC"],
    correct: 1,
    explanation: "CPU (Central Processing Unit) adalah komponen utama yang memproses semua instruksi dari program yang berjalan di komputer.",
  },
  {
    id: 2,
    question: "Apa kepanjangan dari RAM?",
    options: ["Read Access Memory", "Random Access Memory", "Rapid Application Module", "Real-time Active Memory"],
    correct: 1,
    explanation: "RAM (Random Access Memory) adalah memori sementara yang digunakan komputer untuk menyimpan data yang sedang aktif diproses.",
  },
  {
    id: 3,
    question: "Apa yang dimaksud dengan ESD dalam keselamatan kerja komputer?",
    options: ["Electronic System Drive", "Extended Storage Device", "Electrostatic Discharge", "External Standard Device"],
    correct: 2,
    explanation: "ESD (Electrostatic Discharge) adalah pelepasan listrik statis yang bisa merusak komponen elektronik sensitif. Gunakan gelang anti-statis untuk mencegahnya.",
  },
  {
    id: 4,
    question: "Di slot manakah GPU dipasang pada motherboard?",
    options: ["Slot M.2", "Slot SATA", "Slot PCIe x16", "Slot DDR"],
    correct: 2,
    explanation: "GPU dipasang di slot PCIe x16 yang menyediakan bandwidth tinggi untuk transfer data grafis.",
  },
  {
    id: 5,
    question: "Berapa ukuran thermal paste yang ideal untuk diterapkan pada CPU?",
    options: ["Satu sendok teh penuh", "Sebesar butir beras atau kacang polong kecil", "Tutup seluruh permukaan CPU", "Tidak perlu thermal paste"],
    correct: 1,
    explanation: "Thermal paste yang ideal adalah sebesar butir beras di tengah CPU. Terlalu banyak justru mengurangi efisiensi konduksi panas.",
  },
];

// ─── Level 2: Menengah ─────────────────────────────
const level2Questions = [
  {
    id: 1,
    question: "Apa keunggulan utama SSD NVMe M.2 dibanding SSD SATA?",
    options: ["Harganya lebih murah", "Kecepatan baca/tulis jauh lebih tinggi (hingga 7000 MB/s)", "Ukurannya lebih besar", "Lebih kompatibel dengan motherboard lama"],
    correct: 1,
    explanation: "SSD NVMe menggunakan interface PCIe langsung ke CPU, menghasilkan kecepatan hingga 7000 MB/s, jauh melampaui SSD SATA (~550 MB/s).",
  },
  {
    id: 2,
    question: "Apa yang dimaksud dengan konfigurasi RAM dual channel?",
    options: ["RAM dengan dua jenis kecepatan berbeda", "Dua keping RAM yang bekerja paralel melalui dua channel untuk bandwidth 2x lebih tinggi", "RAM yang bisa dipasang di dua motherboard berbeda", "RAM dengan dua lapisan chip memori"],
    correct: 1,
    explanation: "Dual channel adalah konfigurasi dua keping RAM bekerja paralel, meningkatkan bandwidth memori hingga 2x lipat dibanding single channel.",
  },
  {
    id: 3,
    question: "Apa arti rating '80 Plus Gold' pada PSU?",
    options: ["PSU berwarna emas premium", "PSU dapat memberikan 80W daya ekstra", "Efisiensi konversi daya mencapai sekitar 87-90%", "PSU memiliki 80 konektor modular"],
    correct: 2,
    explanation: "Rating 80 Plus Gold berarti efisiensi konversi PSU ~87-90%, artinya lebih sedikit energi terbuang sebagai panas dan lebih hemat listrik.",
  },
  {
    id: 4,
    question: "Pada sudut berapa SSD M.2 dimasukkan ke slot saat pemasangan?",
    options: ["45 derajat", "90 derajat (tegak lurus)", "30 derajat", "15 derajat"],
    correct: 2,
    explanation: "SSD M.2 dimasukkan dengan sudut 30° ke dalam slot, kemudian ujungnya ditekan ke bawah dan dikunci dengan baut penahan.",
  },
  {
    id: 5,
    question: "Mengapa CPU tidak boleh dipaksakan masuk ke socket motherboard?",
    options: ["Agar garansi tidak hangus", "Karena CPU bisa terlalu panas saat boot pertama", "Karena bisa membengkokkan atau mematahkan pin socket yang sangat halus", "Karena CPU akan berjalan lebih lambat"],
    correct: 2,
    explanation: "Socket CPU memiliki ratusan pin sangat halus. Memaksa CPU dengan posisi salah dapat mematahkan pin, merusak motherboard secara permanen.",
  },
];

// ─── Level 3: Lanjutan ─────────────────────────────
const level3Questions = [
  {
    id: 1,
    question: "Form factor motherboard manakah yang paling besar dan cocok untuk workstation high-end?",
    options: ["Mini-ITX (170×170mm)", "Micro-ATX (244×244mm)", "ATX (305×244mm)", "E-ATX (305×330mm)"],
    correct: 3,
    explanation: "E-ATX (Extended ATX) adalah form factor terbesar (305×330mm), digunakan di workstation dan PC high-end dengan lebih banyak slot ekspansi.",
  },
  {
    id: 2,
    question: "Perbedaan antara socket Intel LGA dan AMD AM5 adalah...",
    options: ["LGA memiliki pin di CPU, AM5 memiliki pin di socket", "LGA memiliki pin di socket motherboard, AM5/LGA memiliki pin di CPU", "Tidak ada perbedaan, keduanya kompatibel", "LGA lebih cepat karena memiliki lebih banyak pin"],
    correct: 1,
    explanation: "Intel LGA (Land Grid Array) menempatkan pin di socket motherboard, sedangkan AMD menggunakan PGA/LGA di mana kontak ada di CPU atau socket.",
  },
  {
    id: 3,
    question: "Langkah pertama yang WAJIB dilakukan sebelum mulai merakit komputer adalah...",
    options: ["Langsung pasang CPU ke motherboard", "Cabut semua kabel listrik dari PSU dan gunakan gelang anti-statis ESD", "Nyalakan PSU untuk mengecek tegangan", "Pasang semua fan terlebih dahulu"],
    correct: 1,
    explanation: "Selalu cabut kabel listrik PSU dan gunakan gelang anti-statis sebelum memulai untuk mencegah ESD dan sengatan listrik.",
  },
  {
    id: 4,
    question: "Saat menghitung kebutuhan watt PSU, berapa persen buffer yang disarankan ditambahkan di atas total TDP komponen?",
    options: ["5-10%", "20-30%", "50-60%", "100% (dua kali lipat)"],
    correct: 1,
    explanation: "Tambahkan 20-30% buffer di atas total TDP semua komponen untuk memastikan PSU tidak bekerja di kapasitas penuh dan memiliki headroom.",
  },
  {
    id: 5,
    question: "Urutan pemasangan komponen yang BENAR saat merakit PC adalah...",
    options: [
      "GPU → RAM → CPU → Motherboard → PSU → Storage → Cooler",
      "PSU → Motherboard → CPU → Cooler → RAM → Storage → GPU",
      "Motherboard → CPU → Cooler → RAM → Storage → GPU → PSU",
      "CPU → Motherboard → RAM → GPU → Storage → Cooler → PSU",
    ],
    correct: 2,
    explanation: "Urutan standar: Motherboard sebagai fondasi → CPU → Cooler (dengan thermal paste) → RAM → Storage (M.2) → GPU → PSU terakhir untuk distribusi daya.",
  },
];

const levels = [
  { id: 1, title: "Level Dasar", description: "5 soal dasar tentang komponen PC", icon: BookOpen, color: "#10b981", questions: level1Questions },
  { id: 2, title: "Level Menengah", description: "5 soal teknis tentang spesifikasi dan instalasi", icon: Zap, color: "#f59e0b", questions: level2Questions },
  { id: 3, title: "Level Lanjutan", description: "5 soal mendalam tentang konsep advanced", icon: Award, color: "#8b5cf6", questions: level3Questions },
];

interface Props { isDark: boolean }

type Phase = "intro" | "quiz" | "result";

export function QuizSection({ isDark }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [activeLevel, setActiveLevel] = useState(1);
  const [levelScores, setLevelScores] = useState<Record<number, number | null>>({ 1: null, 2: null, 3: null });

  // Quiz state
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const [showResult, setShowResult] = useState(false);

  const bg = isDark ? "#0f172a" : "#ffffff";
  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const listBg = isDark ? "#1e293b" : "#f8fafc";
  const textPrimary = isDark ? "#f1f5f9" : "#1e293b";
  const textSecondary = isDark ? "#94a3b8" : "#64748b";
  const borderBase = isDark ? "#334155" : "#e2e8f0";

  const currentLevelData = levels.find(l => l.id === activeLevel)!;
  const questions = currentLevelData.questions;
  const q = questions[current];
  const score = results.filter(r => r === true).length;
  const percentage = Math.round((score / questions.length) * 100);

  const isLevelUnlocked = (id: number) => {
    if (id === 1) return true;
    return (levelScores[id - 1] ?? 0) >= 85;
  };

  const startQuizForLevel = (levelId: number) => {
    const lvl = levels.find(l => l.id === levelId)!;
    setActiveLevel(levelId);
    setCurrent(0);
    setSelected(null);
    setAnswered(new Array(lvl.questions.length).fill(false));
    setResults(new Array(lvl.questions.length).fill(null));
    setShowResult(false);
    setPhase("quiz");
  };

  const handleSelect = (idx: number) => {
    if (answered[current]) return;
    setSelected(idx);
    const isCorrect = idx === q.correct;
    const newResults = [...results];
    newResults[current] = isCorrect;
    setResults(newResults);
    const newAnswered = [...answered];
    newAnswered[current] = true;
    setAnswered(newAnswered);
    setShowResult(true);
  };

  const handleNext = () => {
    if (current === questions.length - 1) {
      // End of quiz
      const finalScore = results.filter(r => r === true).length;
      const pct = Math.round((finalScore / questions.length) * 100);
      setLevelScores(prev => ({ ...prev, [activeLevel]: pct }));
      setPhase("result");
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const getGrade = (pct: number) => {
    if (pct >= 90) return { grade: "A", label: "Sangat Baik", color: "#10b981" };
    if (pct >= 85) return { grade: "B+", label: "Baik Sekali", color: "#34d399" };
    if (pct >= 80) return { grade: "B", label: "Baik", color: "#60a5fa" };
    if (pct >= 70) return { grade: "C", label: "Cukup", color: "#f59e0b" };
    return { grade: "D", label: "Perlu Belajar Lagi", color: "#ef4444" };
  };

  // ── INTRO SCREEN ──────────────────────────────────
  if (phase === "intro") {
    return (
      <section id="evaluasi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h2 style={{ color: textPrimary }}>Evaluasi Pemahaman</h2>
          <p className="mt-3 max-w-2xl mx-auto" style={{ color: textSecondary, fontFamily: "Inter, sans-serif" }}>
            Quiz bertingkat 3 level. Raih nilai minimal <strong style={{ color: "#f59e0b" }}>85</strong> untuk membuka level berikutnya.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {levels.map((lvl) => {
            const Icon = lvl.icon;
            const unlocked = isLevelUnlocked(lvl.id);
            const prevScore = levelScores[lvl.id];
            const passed = prevScore !== null && prevScore >= 85;

            return (
              <motion.div
                key={lvl.id}
                whileHover={unlocked ? { y: -4 } : {}}
                className="rounded-2xl p-6 text-center flex flex-col items-center gap-4 transition-all"
                style={{
                  background: unlocked ? cardBg : (isDark ? "#0f172a" : "#f8fafc"),
                  border: passed
                    ? `2px solid ${lvl.color}60`
                    : unlocked
                    ? `1px solid ${borderBase}`
                    : `1px solid ${borderBase}`,
                  opacity: unlocked ? 1 : 0.6,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {passed && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: lvl.color + "20" }}>
                    <CheckCircle size={14} color={lvl.color} />
                  </div>
                )}

                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: unlocked ? lvl.color + "18" : "#94a3b820", border: `1px solid ${unlocked ? lvl.color + "44" : "#94a3b840"}` }}
                >
                  {unlocked ? <Icon size={28} color={lvl.color} /> : <Lock size={28} color="#94a3b8" />}
                </div>

                <div>
                  <h3 style={{ color: unlocked ? textPrimary : textSecondary, fontFamily: "Rajdhani, sans-serif", fontSize: "1.2rem" }}>
                    {lvl.title}
                  </h3>
                  <p className="mt-1" style={{ color: textSecondary, fontSize: "0.82rem", fontFamily: "Inter, sans-serif" }}>
                    {lvl.description}
                  </p>
                </div>

                {prevScore !== null && (
                  <div
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      background: passed ? lvl.color + "20" : "rgba(239,68,68,0.1)",
                      color: passed ? lvl.color : "#ef4444",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    Skor: {prevScore}% {passed ? "✓" : "— coba lagi"}
                  </div>
                )}

                {!unlocked && lvl.id > 1 && (
                  <div className="text-xs" style={{ color: textSecondary, fontFamily: "Inter, sans-serif" }}>
                    🔒 Selesaikan Level {lvl.id - 1} dengan skor ≥ 85%
                  </div>
                )}

                {unlocked && (
                  <button
                    onClick={() => startQuizForLevel(lvl.id)}
                    className="w-full py-2.5 rounded-xl transition-all hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${lvl.color}, ${lvl.color}cc)`,
                      color: "#ffffff",
                      fontFamily: "Rajdhani, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {prevScore !== null ? "Ulangi Quiz" : "Mulai Quiz"}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Star achievement indicator */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-1.5">
              <Star
                size={20}
                color={(levelScores[i] ?? 0) >= 85 ? "#f59e0b" : borderBase}
                fill={(levelScores[i] ?? 0) >= 85 ? "#f59e0b" : "transparent"}
              />
              <span style={{ color: textSecondary, fontSize: "0.8rem", fontFamily: "JetBrains Mono, monospace" }}>
                Lv.{i}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── QUIZ SCREEN ───────────────────────────────────
  if (phase === "quiz") {
    return (
      <section id="evaluasi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        {/* Level badge */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setPhase("intro")}
            className="text-sm flex items-center gap-1 px-3 py-1.5 rounded-lg"
            style={{ color: textSecondary, background: listBg, border: `1px solid ${borderBase}`, fontFamily: "Inter, sans-serif" }}
          >
            ← Kembali
          </button>
          <div
            className="px-3 py-1 rounded-full text-sm"
            style={{
              background: currentLevelData.color + "15",
              color: currentLevelData.color,
              border: `1px solid ${currentLevelData.color}40`,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {currentLevelData.title}
          </div>
        </div>

        {/* Question counter dots */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === current ? "24px" : "8px",
                  background: results[i] === true
                    ? "#10b981"
                    : results[i] === false
                    ? "#ef4444"
                    : i === current
                    ? currentLevelData.color
                    : borderBase,
                }}
              />
            ))}
          </div>
          <span style={{ color: textSecondary, fontFamily: "JetBrains Mono, monospace", fontSize: "0.82rem" }}>
            {current + 1} / {questions.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
          >
            {/* Question card */}
            <div className="rounded-2xl p-6 mb-4" style={{ background: cardBg, border: `1px solid ${borderBase}` }}>
              <div className="text-xs mb-3" style={{ color: currentLevelData.color, fontFamily: "JetBrains Mono, monospace" }}>
                SOAL #{current + 1}
              </div>
              <h3 style={{ color: textPrimary, fontFamily: "Rajdhani, sans-serif", marginBottom: "1.5rem", lineHeight: 1.4 }}>
                {q.question}
              </h3>

              <div className="space-y-2.5">
                {q.options.map((opt, idx) => {
                  const isSelected = selected === idx;
                  const isCorrect = idx === q.correct;
                  const hasAnswered = answered[current];

                  let bg2 = isDark ? "#0f172a" : "#f8fafc";
                  let border2 = borderBase;
                  let color2 = textPrimary;

                  if (hasAnswered) {
                    if (isCorrect) { bg2 = "rgba(16,185,129,0.12)"; border2 = "rgba(16,185,129,0.5)"; color2 = "#10b981"; }
                    else if (isSelected) { bg2 = "rgba(239,68,68,0.1)"; border2 = "rgba(239,68,68,0.4)"; color2 = "#f87171"; }
                  } else if (isSelected) {
                    bg2 = isDark ? `rgba(96,165,250,0.15)` : "rgba(59,130,246,0.1)";
                    border2 = currentLevelData.color;
                    color2 = currentLevelData.color;
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={hasAnswered}
                      className="w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all"
                      style={{ background: bg2, border: `1px solid ${border2}`, color: color2, cursor: hasAnswered ? "default" : "pointer" }}
                    >
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm"
                        style={{
                          background: hasAnswered && isCorrect ? "rgba(16,185,129,0.2)" : (isDark ? "#334155" : "#e2e8f0"),
                          fontFamily: "JetBrains Mono, monospace",
                          fontWeight: 700,
                          color: color2,
                        }}
                      >
                        {hasAnswered && isCorrect ? "✓" : hasAnswered && isSelected ? "✗" : String.fromCharCode(65 + idx)}
                      </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.92rem", lineHeight: 1.5 }}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showResult && answered[current] && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl p-4 mb-4"
                  style={{
                    background: results[current] ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
                    border: `1px solid ${results[current] ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {results[current] ? <CheckCircle size={16} color="#10b981" /> : <XCircle size={16} color="#ef4444" />}
                    <span style={{ color: results[current] ? "#10b981" : "#ef4444", fontFamily: "Rajdhani, sans-serif", fontWeight: 700 }}>
                      {results[current] ? "Jawaban Benar!" : "Jawaban Salah"}
                    </span>
                  </div>
                  <p style={{ color: textSecondary, fontSize: "0.88rem", lineHeight: 1.7, fontFamily: "Inter, sans-serif" }}>
                    {q.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {answered[current] && (
              <button
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all hover:scale-105"
                style={{
                  background: current === questions.length - 1
                    ? `linear-gradient(135deg, ${currentLevelData.color}, ${currentLevelData.color}aa)`
                    : "linear-gradient(135deg, #3b82f6, #2563eb)",
                  color: "#ffffff",
                  fontFamily: "Rajdhani, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                }}
              >
                {current === questions.length - 1
                  ? <><Trophy size={18} /> Lihat Hasil</>
                  : <>Soal Berikutnya <ChevronRight size={18} /></>
                }
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    );
  }

  // ── RESULT SCREEN ─────────────────────────────────
  const grade = getGrade(percentage);
  const passed = percentage >= 85;
  const nextLevel = levels.find(l => l.id === activeLevel + 1);

  return (
    <section id="evaluasi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <motion.div
        key="result"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Score card */}
        <div
          className="rounded-2xl p-8 text-center mb-6"
          style={{ background: cardBg, border: `2px solid ${grade.color}40` }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: grade.color + "20", border: `2px solid ${grade.color}` }}
          >
            <span style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "2rem", fontWeight: 700, color: grade.color }}>
              {grade.grade}
            </span>
          </div>
          <h3 style={{ color: textPrimary, fontFamily: "Rajdhani, sans-serif", fontSize: "1.8rem" }}>
            {grade.label}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-2 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={20}
                color={i < Math.ceil((score / questions.length) * 5) ? "#f59e0b" : (isDark ? "#334155" : "#d1d5db")}
                fill={i < Math.ceil((score / questions.length) * 5) ? "#f59e0b" : "transparent"}
              />
            ))}
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", color: grade.color, fontSize: "2rem", fontWeight: 700 }}>
            {score}/{questions.length}
          </div>
          <div style={{ color: textSecondary, fontFamily: "Inter, sans-serif", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Nilai: {percentage}/100 — {currentLevelData.title}
          </div>

          {passed ? (
            <div className="mt-4 px-4 py-2 rounded-lg inline-block" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>
              <span style={{ color: "#10b981", fontFamily: "Rajdhani, sans-serif", fontWeight: 700 }}>
                ✅ Level Berhasil! {nextLevel ? `Level ${nextLevel.id} terbuka.` : "Semua level selesai! 🏆"}
              </span>
            </div>
          ) : (
            <div className="mt-4 px-4 py-2 rounded-lg inline-block" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <span style={{ color: "#ef4444", fontFamily: "Rajdhani, sans-serif", fontWeight: 700 }}>
                Skor minimal 85 diperlukan untuk lanjut. Coba lagi!
              </span>
            </div>
          )}
        </div>

        {/* Answer recap */}
        <div className="rounded-2xl p-5 mb-5" style={{ background: listBg, border: `1px solid ${borderBase}` }}>
          <h4 className="mb-3" style={{ color: textPrimary, fontFamily: "Rajdhani, sans-serif" }}>Rekap Jawaban</h4>
          <div className="grid grid-cols-5 gap-2">
            {results.map((r, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg flex items-center justify-center text-sm"
                style={{
                  background: r === true ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                  border: `1px solid ${r === true ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
                  color: r === true ? "#10b981" : "#ef4444",
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => startQuizForLevel(activeLevel)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all hover:scale-105"
            style={{
              background: isDark ? "#334155" : "#f1f5f9",
              color: textSecondary,
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: 700,
              border: `1px solid ${borderBase}`,
            }}
          >
            <RotateCcw size={16} /> Ulangi
          </button>
          {passed && nextLevel && (
            <button
              onClick={() => startQuizForLevel(nextLevel.id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${nextLevel.color}, ${nextLevel.color}cc)`,
                color: "#ffffff",
                fontFamily: "Rajdhani, sans-serif",
                fontWeight: 700,
              }}
            >
              {nextLevel.title} <ChevronRight size={16} />
            </button>
          )}
          <button
            onClick={() => setPhase("intro")}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: "#ffffff",
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: 700,
            }}
          >
            Menu Level
          </button>
        </div>
      </motion.div>
    </section>
  );
}
