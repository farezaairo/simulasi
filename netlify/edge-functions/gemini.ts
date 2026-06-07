import { GoogleGenAI } from "npm:@google/genai";

export default async (request: Request) => {
  // 1. Validasi Method
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    // 2. AMBIL DATA JSON SECARA BENAR (Sesuai dengan kiriman dari ChatbotSection.tsx)
    const data = await request.json();
    const userMessage = data.message; // Mengekstrak isi teks chat

    if (!userMessage) {
      return new Response(JSON.stringify({ error: "Pesan kosong" }), { status: 400 });
    }

    // 3. Ambil API Key dari Environment Variable Netlify
    const apiKey = Netlify.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API Key belum diatur di Netlify" }), { status: 500 });
    }

    // 4. Inisialisasi Gemini SDK
    const ai = new GoogleGenAI({ apiKey });
    
    // 5. Panggil Model Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: "Anda adalah VLAB AI Assistant, ahli perakitan komputer yang ramah. Jawab pertanyaan pengguna dengan singkat, jelas, terstruktur, dan gunakan emoji jika relevan.",
      }
    });

    // 6. Kembalikan respons dalam bentuk objek JSON (Supaya dibaca oleh data.reply di frontend)
    return new Response(JSON.stringify({ reply: response.text }), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // Menghindari isu CORS
      },
    });

  } catch (error: any) {
    console.error("Error Edge Function:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config = { path: "/api/chat" };