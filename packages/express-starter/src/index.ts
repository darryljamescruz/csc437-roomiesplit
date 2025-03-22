import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db";
import cors from "cors";
import authRoutes from "./routes/auth"; 
import purchasesRoutes from './routes/purchases';
import preferenceRoutes from './routes/preferences';

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 8000;
connectDB();

const app = express();
const staticDir = path.join(__dirname, process.env.STATIC_DIR?.trim() || '');

app.use(cors());
app.use(express.static(staticDir));
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

// Mount API routes at /api
app.use("/api/auth", authRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/preferences', preferenceRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(staticDir, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


