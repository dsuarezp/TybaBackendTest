import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Definir rutas
app.use('/api/auth', authRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
