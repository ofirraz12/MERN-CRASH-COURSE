import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { client, connectDB, closeDB } from './config/db.js';
import productRoutes from "./routes/product_routes.js"

const app = express();
app.use(cors());
const PORT = 5000;
const ServerUrl = `http://localhost:${PORT}`

dotenv.config();

app.use(express.json());

app.use("/api/products", productRoutes)
  
app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on: ${ServerUrl}`)
});

process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await closeDB();
    process.exit(0);
  });