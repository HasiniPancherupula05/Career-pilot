import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';

import jobRoutes from './server/routes/jobRoutes';
import applicationRoutes from './server/routes/applicationRoutes';
import subscriptionRoutes from './server/routes/subscriptionRoutes';
import { errorHandler } from './server/middleware/errorHandler';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.use('/api/jobs', jobRoutes);
  app.use('/api/applications', applicationRoutes);
  app.use('/api/subscriptions', subscriptionRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'CareerPilot REST API' });
  });

  // Global Error Handler
  app.use(errorHandler);

  // Vite Middleware in Development vs Static Serving in Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 CareerPilot Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
