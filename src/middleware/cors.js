import cors from 'cors'
const corsOptions = {
  origin: ['http://localhost:5173',
    'insightflow-frontend-39727.web.app',
    'insightflow-frontend-39727.firebaseapp.com'
  ], // agrega más orígenes si es necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
export const corsMiddleware = cors(corsOptions);
