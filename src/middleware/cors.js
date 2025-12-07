import cors from 'cors'
const corsOptions = {
  origin: ['http://localhost:5173',
    'https://insightflow-frontend-39727.web.app',
    'https://insightflow-frontend-39727.firebaseapp.com',
    'https://user-services-13hx.onrender.com'
  ], // agrega más orígenes si es necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
export const corsMiddleware = cors(corsOptions);
