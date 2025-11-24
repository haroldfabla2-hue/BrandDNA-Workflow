const BACKEND_URL = 'http://localhost:3001/api';

/**
 * Calls the backend to generate strategic insights using Gemini 2.5 Flash.
 */
export const generateStrategicInsight = async (topic: string, context: string): Promise<string> => {
  try {
    const response = await fetch(`${BACKEND_URL}/gemini/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Act as a Senior Brand Strategist for 'TechFlow Solutions'. 
                 Context: ${context}
                 Task: Provide a strategic insight or content idea regarding: ${topic}. 
                 Keep it brief, professional, and actionable (under 100 words).`,
        systemInstruction: "You are an expert brand strategist for B2B SaaS."
      })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to generate insight');
    }

    const data = await response.json();
    return data.text || "No insight generated.";
  } catch (error) {
    console.error("Strategy Gen Error:", error);
    return "Error generating insight. Ensure Backend is running on port 3001.";
  }
};

/**
 * Calls the backend to refine content text.
 */
export const refineAssetContent = async (currentContent: string, tone: string): Promise<string> => {
    try {
        const response = await fetch(`${BACKEND_URL}/gemini/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: `Rewrite the following content to match a ${tone} tone for a B2B audience:\n\n${currentContent}`
            })
        });

        if (!response.ok) throw new Error('Backend error');
        const data = await response.json();
        return data.text || currentContent;
    } catch (error) {
        console.error("Refine Content Error:", error);
        return currentContent; // Fallback to original
    }
};

/**
 * Calls the backend to generate a video using Veo 3.1.
 * Handles the polling logic server-side.
 */
export const generateVideoSegment = async (prompt: string, aspectRatio: '16:9' | '9:16'): Promise<string | null> => {
  try {
    const response = await fetch(`${BACKEND_URL}/videos/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            prompt,
            aspectRatio
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Video generation failed');
    }

    const data = await response.json();
    return data.videoUrl;
  } catch (error) {
    console.error("Veo API Error:", error);
    alert("Backend Error: Ensure server is running and API_KEY is valid.");
    return null;
  }
};

/**
 * Calls the backend to generate audio using Gemini TTS.
 */
export const generateVoiceover = async (text: string): Promise<string | null> => {
  try {
    const response = await fetch(`${BACKEND_URL}/audio/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text,
            voiceName: 'Kore' // Default voice
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'TTS generation failed');
    }

    const data = await response.json();
    return data.audioUrl;
  } catch (error) {
     console.error("TTS API Error:", error);
     alert("Backend Error: Ensure server is running and API_KEY is valid.");
     return null;
  }
}
