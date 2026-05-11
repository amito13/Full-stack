import express from 'express';
import { authRouter } from '../auth/routes.js';
import { authMiddleware } from '../auth/auth-middleware.js';
import cors from 'cors';
export function createApp() {
    const app = express();
    app.use(cors({
         origin: "https://regi-delta.vercel.app/",
    }));
    app.get('/health', (req, res) => {
        res.json({ status: 'OK' });
    });
    app.use(express.json());

 //   app.use(authMiddleware());
    app.use('/auth', authRouter);
    
    return app;
}