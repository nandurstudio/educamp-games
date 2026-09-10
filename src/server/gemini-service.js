/**
 * Integrasi Google AI Studio (Gemini API) untuk Auto-Generate Soal Kuis Educamp
 */

async function generateQuizQuestions({ apiKey, topic, count = 10, difficulty = 'medium' }) {
  const activeKey = apiKey || process.env.GEMINI_API_KEY;

  if (!activeKey) {
    throw new Error("GEMINI_API_KEY belum disetel. Masukkan API Key dari Google AI Studio.");
  }

  const prompt = `Anda adalah seorang Master Game dan Fasilitator Educamp & Team Building profesional.
Buatlah ${count} soal kuis pilihan ganda bertema "${topic}" dengan tingkat kesulitan "${difficulty}".
Bahasa: Bahasa Indonesia yang menarik, seru, dan mendidik.

Format output WAJIB HANYA berupa JSON valid ARRAY murni tanpa markdown, tanpa teks pembuka, dan tanpa format kode \`\`\`json:
[
  {
    "id": 1,
    "question": "Teks pertanyaan di sini?",
    "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
    "correctIndex": 0
  }
]
Catatan: "correctIndex" adalah integer 0 (untuk A), 1 (untuk B), 2 (untuk C), atau 3 (untuk D). Pastikan pilihan jawaban mengecoh dan realistis.`;

  // Menggunakan REST endpoint Gemini via fetch natif (didukung di Node 18+)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google AI Studio Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Gagal menerima respon teks dari Google AI Studio.");
  }

  try {
    const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const questions = JSON.parse(cleaned);
    return questions;
  } catch (err) {
    throw new Error(`Gagal mem-parsing JSON dari AI Studio: ${err.message}. Raw: ${rawText}`);
  }
}

module.exports = { generateQuizQuestions };
