import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateStrategicInsight = async (topic: string, context: string): Promise<string> => {
  if (!ai) return "AI Service Unavailable: Missing API Key. Please provide an API Key to enable generation.";
  
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Act as a Senior Brand Strategist for 'TechFlow Solutions', a B2B SaaS company specializing in DevOps automation.
      Context: ${context}
      
      Task: Provide a strategic insight or content idea regarding: ${topic}.
      Keep it brief, professional, and actionable (under 100 words).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "No insight generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating insight. Please check your API key and connection.";
  }
};

export const refineAssetContent = async (currentContent: string, tone: string): Promise<string> => {
    if (!ai) return "AI Service Unavailable.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Rewrite the following content to match a ${tone} tone for a B2B audience:\n\n${currentContent}`
        });
        return response.text || currentContent;
    } catch (error) {
        return "Error refining content.";
    }
}
