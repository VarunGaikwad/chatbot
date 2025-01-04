import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.VITE_GEMINI_API_KEY!,
  config = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  },
  geminiAI = new GoogleGenerativeAI(apiKey),
  model = geminiAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });

export async function _GenerateText(prompt: string) {
  try {
    const chatSession = await model.startChat({
        generationConfig: config,
        history: [],
      }),
      result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred during text generation.");
  }
}
