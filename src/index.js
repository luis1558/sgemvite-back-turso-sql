import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import sgemviteRoutes from './routes/sgemvite.routes.js';

const app = express();

// Middleware de logging
app.use(morgan('dev'));

// Middleware para parsear JSON
app.use(express.json());


app.use(cors());

// Rutas
app.use(sgemviteRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
