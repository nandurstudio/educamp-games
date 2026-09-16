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
    "correctIndex": 2
  }
]
Catatan Penting: "correctIndex" adalah integer 0 (A), 1 (B), 2 (C), atau 3 (D). WAJIB acak posisi jawaban benar secara merata di antara index 0, 1, 2, dan 3 (JANGAN SEMUANYA DI INDEX 0 / PILIHAN A). Pastikan pilihan jawaban mengecoh dan realistis.`;

  const candidateModels = [
    'gemini-2.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-pro'
  ];

  let lastError = null;
  let rawText = null;

  for (const modelName of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${activeKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        lastError = new Error(`Model ${modelName} (${response.status}): ${errText}`);
        continue;
      }

      const data = await response.json();
      rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) break;
    } catch (e) {
      lastError = e;
    }
  }

  if (!rawText) {
    throw lastError || new Error("Gagal menerima respon teks dari Google AI Studio.");
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
