import {
  ChatSession,
  Content,
  EnhancedGenerateContentResponse,
  GoogleGenerativeAI,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY!;

const config = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const geminiAI = new GoogleGenerativeAI(apiKey);
const model = geminiAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

let chatSession: ChatSession | null = null;

const history: Content[] = [];

async function _AddHistory(
  responseStream: AsyncGenerator<EnhancedGenerateContentResponse, void, unknown>
) {
  let accumulatedResponse = "";

  while (true) {
    const { value, done } = await responseStream.next();
    if (done) break;

    const textChunk = value?.candidates?.[0]?.content.parts
      .map(({ text }) => text)
      .join(" ");

    if (textChunk) {
      accumulatedResponse += textChunk;
      const lastHistory = history.at(-1);
      if (lastHistory?.role === "user") {
        history.push({
          role: "model",
          parts: [{ text: accumulatedResponse }],
        });
      } else if (lastHistory?.role === "model") {
        lastHistory.parts = [{ text: accumulatedResponse }];
      }
    }
  }
}

export async function _GenerateText(prompt: string) {
  try {
    history.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    if (!chatSession) {
      chatSession = await model.startChat({
        generationConfig: config,
        history,
      });
    }

    const responseStream = await chatSession.sendMessageStream(prompt);
    _AddHistory(responseStream.stream);
    return responseStream.stream;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred during text generation.");
  }
}
