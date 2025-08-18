import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoute from './routes/api.route';
import connectDB from './config/db';

dotenv.config();
console.log("Loaded JWT_SECRET =", process.env.JWT_SECRET);
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/', apiRoute);

export default app;
