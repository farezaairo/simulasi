import { GoogleGenAI } from "npm:@google/genai";

export default async (request: Request) => {
  // Hanya ijinkan method POST
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { message } = await request.json();
    
    // Mengambil API Key dari Environment Variable Netlify yang aman
    const apiKey = Netlify.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API Key belum diatur di Netlify" }), { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Memanggil model Gemini 2.5 Flash yang cepat dan hemat biaya
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      // Memberikan instruksi kepribadian agar Gemini tetap fokus pada topik PC Virtual Lab kamu
      config: {
        systemInstruction: "Anda adalah VLAB AI Assistant, ahli perakitan komputer yang ramah. Jawab pertanyaan pengguna dengan singkat, jelas, terstruktur, dan gunakan emoji jika relevan.",
      }
    });

    return new Response(JSON.stringify({ reply: response.text }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const config = { path: "/api/chat" };