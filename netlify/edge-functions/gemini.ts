import { GoogleGenAI } from "https://esm.sh/@google/genai@0.1.1";

export default async (request: Request) => {
  try {
    // 1. Ambil pesan dari frontend
    const { message } = await request.json();

    // 2. Ambil API Key dari Environment Variables Netlify
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API Key belum dikonfigurasi di Netlify Baru." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Inisialisasi Google Gen AI SDK
    const ai = new GoogleGenAI({ apiKey });

    // 4. Panggil model Gemini dengan instruksi karakter agar tidak kaku seperti bot biasa
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: message,
      config: {
        // TATA BAHASA & KARAKTER AI DIATUR DI SINI AGAR HIDUP DAN INTERAKTIF
        systemInstruction: `
          Anda adalah VLAB AI Assistant (Asisten Pintar Laboratorium Virtual Perakitan PC).
          Gaya bicara Anda harus ramah, interaktif, edukatif, dan menggunakan bahasa Indonesia yang santai tapi sopan (hindari gaya bahasa yang terlalu kaku seperti kamus).
          
          Aturan menjawab:
          1. Gunakan emoji yang relevan agar chat terasa hidup dan menarik.
          2. Jika user bertanya cara pasang komponen, berikan langkah-langkah yang jelas, mudah dipahami, dan beri tips rahasia/peringatan keamanannya.
          3. Gunakan format cetak tebal dengan tanda bintang dua (**teks**) pada kata-kata penting/nama komponen agar frontend bisa menyorot teks tersebut dengan warna khusus secara otomatis.
          4. Jangan menjawab terlalu singkat, berikan penjelasan tambahan atau tawarkan bantuan berikutnya di akhir kalimat agar terjadi percakapan yang interaktif.
        `,
        temperature: 0.7, // Membuat variasi jawaban lebih kreatif dan natural
      },
    });

    // 5. Ambil teks hasil generate
    const replyText = response.text || "Wah, maaf ya, saya agak bingung dengan pertanyaannya. Bisa dijelaskan kembali? 😊";

    // 6. Kirim kembali respons ke frontend
    return new Response(
      JSON.stringify({ reply: replyText }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error pada Edge Function Gemini:", error);
    return new Response(
      JSON.stringify({ error: "Aduh, sistem AI sedang mengalami kendala koneksi nih. Coba lagi ya!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config = { path: "/api/chat" };