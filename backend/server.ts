import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { geminiRouter } from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Adjust based on your Vite frontend port
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }) as any); // Increased limit for base64 images/audio

// Routes
app.use('/api', geminiRouter);

// Health Check
app.get('/health', (req: any, res: any) => {
    res.status(200).json({ status: 'OK', service: 'BrandStrategy AI Backend' });
});

// Global Error Handler
app.use((err: any, req: any, res: any, next: any) => {
    console.error('Server Error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error', 
        message: err.message || 'An unexpected error occurred' 
    });
});

app.listen(PORT, () => {
    console.log(`✅ Backend Server running on http://localhost:${PORT}`);
    console.log(`   - Gemini 2.5 Flash: Ready`);
    console.log(`   - Veo 3.1 Video: Ready`);
    console.log(`   - Google TTS: Ready`);
});