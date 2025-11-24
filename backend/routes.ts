import { Router } from 'express';
import { generateText, generateVideo, generateSpeech } from './geminiController';

export const geminiRouter = Router();

// Text Generation (Strategy, Content)
geminiRouter.post('/gemini/generate', generateText);

// Video Generation (Veo 3.1)
geminiRouter.post('/videos/generate', generateVideo);

// Audio Generation (TTS)
geminiRouter.post('/audio/generate', generateSpeech);
