import express from 'express';
import cors from 'cors';
import { config } from './config';
import wishRoutes from './routes/wishRoutes';

const app = express();

// Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// Health Check
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'Kishore Wedding API', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/wishes', wishRoutes);

// Start server
app.listen(config.port, () => {
  console.log(`[Kishore Wedding API] Server running on port ${config.port} (${config.nodeEnv})`);
});

export default app;
