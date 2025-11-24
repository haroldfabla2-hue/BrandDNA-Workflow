import { Request, Response } from 'express';
import { GoogleGenAI, Modality } from "@google/genai";

// Initialize Gemini Client
// Ensure process.env.API_KEY is set in your .env file
const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API_KEY not configured in backend environment");
    return new GoogleGenAI({ apiKey });
};

export const generateText = async (req: any, res: any) => {
    try {
        const { prompt, systemInstruction } = req.body;
        const ai = getClient();
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            }
        });

        res.json({ text: response.text });
    } catch (error: any) {
        console.error("Text Gen Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const generateVideo = async (req: any, res: any) => {
    try {
        const { prompt, aspectRatio = '16:9' } = req.body;
        const ai = getClient();
        const apiKey = process.env.API_KEY;

        console.log(`Starting Veo generation for: "${prompt}"...`);

        // 1. Initiate Video Generation
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
                resolution: '1080p',
                aspectRatio: aspectRatio // '16:9' or '9:16'
            }
        });

        // 2. Poll for completion
        // Note: In a real production queue system (Redis/Bull), we wouldn't hold the HTTP request.
        // For this implementation, we use a polling loop with a timeout.
        const maxRetries = 60; // 60 * 2s = 2 minutes timeout
        let retries = 0;

        while (!operation.done && retries < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
            retries++;
            console.log(`Polling Veo... Attempt ${retries}/${maxRetries}`);
        }

        if (!operation.done) {
            throw new Error("Video generation timed out.");
        }

        // 3. Extract URI
        const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!videoUri) {
            throw new Error("No video URI returned from Veo.");
        }

        // The URI requires the API key to be appended to be accessible
        // We will proxy this or return the authenticated URL to the frontend
        const authenticatedUrl = `${videoUri}&key=${apiKey}`;

        res.json({ 
            videoUrl: authenticatedUrl,
            status: 'completed'
        });

    } catch (error: any) {
        console.error("Veo Gen Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const generateSpeech = async (req: any, res: any) => {
    try {
        const { text, voiceName = 'Kore' } = req.body;
        const ai = getClient();

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: voiceName },
                    },
                },
            },
        });

        // Extract Base64 Audio
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

        if (!base64Audio) {
            throw new Error("No audio data generated.");
        }

        // Return as a data URI or raw base64
        res.json({ 
            audioUrl: `data:audio/mp3;base64,${base64Audio}`, 
            status: 'completed' 
        });

    } catch (error: any) {
        console.error("TTS Gen Error:", error);
        res.status(500).json({ error: error.message });
    }
};