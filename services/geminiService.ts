import { GoogleGenAI, Modality } from "@google/genai";

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

export const generateVideoSegment = async (prompt: string, aspectRatio: '16:9' | '9:16'): Promise<string | null> => {
  if (!ai) return null;
  
  // Note: Real Veo generation requires user-selected API key via window.aistudio
  try {
    // Simulating the Veo request structure
    /* 
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: aspectRatio
      }
    });
    // Polling logic would go here
    */
    
    // For this demo environment, we simulate a delay and return a placeholder
    // In production, uncomment above and implement polling loop
    await new Promise(resolve => setTimeout(resolve, 3000)); 
    return "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"; // Placeholder video
  } catch (error) {
    console.error("Veo API Error:", error);
    return null;
  }
};

export const generateVoiceover = async (text: string): Promise<string | null> => {
  if (!ai) return null;

  try {
    // Simulating TTS request
    /*
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
            },
        },
    });
    // Decode base64 logic would go here
    */
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "mock_audio_blob_url"; 
  } catch (error) {
     console.error("TTS API Error:", error);
     return null;
  }
}