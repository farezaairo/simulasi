import { GoogleGenAI } from "https://esm.sh/@google/genai@0.1.1";

export default async (request: Request) => {
  // Hanya ijinkan method POST
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    // Ambil data gambar base64, tipe mime (image/jpeg), dan langkah saat ini dari frontend
    const { image, mimeType, currentStep } = await request.json();
    
    if (!image) {
      return new Response(JSON.stringify({ error: "Gambar tidak ditemukan" }), { status: 400 });
    }

    // MENGGUNAKAN SINTAKS DENO YANG BENAR UNTUK EDGE FUNCTIONS
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API Key belum diatur di Netlify Baru." }), { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Panggil model Gemini 1.5 Flash (Versi Multimodal yang stabil untuk Teks + Gambar)
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        {
          // Bagian ini memberi tahu Gemini kalau ada data gambar masuk berbentuk Base64
          inlineData: {
            data: image,
            mimeType: mimeType || "image/jpeg"
          }
        },
        // Prompt instruksi khusus untuk menganalisis kecocokan hardware
        `Anda adalah VLAB AI Assistant, instruktur perakitan PC profesional. 
        User saat ini sedang berada di langkah simulasi rakit: "${currentStep}".
        
        Tugas Anda: Periksa foto komponen komputer yang dikirim user ini.
        Aturan Jawaban:
        1. Jika komponen di foto SUDAH BENAR dan sesuai dengan langkah "${currentStep}", berikan jawaban diawali kata "COCOK: [jelaskan singkat kenapa benar]".
        2. Jika komponen di foto SALAH atau belum sesuai langkah tersebut, berikan petunjuk diawali kata "BELUM COCOK: [sebutkan komponen apa yang terdeteksi di foto dan beri arahan singkat]".
        
        Gunakan bahasa Indonesia yang ramah, singkat, padat, dan langsung pada intinya (maksimal 2 kalimat).`
      ]
    });

    return new Response(JSON.stringify({ reply: response.text }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

// path dibedakan menjadi /api/detect agar tidak tabrakan dengan fitur chat kamu
export const config = { path: "/api/detect" };