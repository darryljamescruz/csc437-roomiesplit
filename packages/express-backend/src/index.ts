// backend.js 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";

// route definitions
import authRoutes from "./routes/auth"; 
import purchasesRoutes from './routes/purchases';
import path from "path";

dotenv.config(); // Load environment variables
const app = express();

const staticDir = path.join(__dirname, process.env.STATIC_DIR?.trim() || '');
console.log('Serving static files from:', staticDir);

//  Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Mount the auth routes at /api
app.use("/ap/auth", authRoutes);
app.use('/api/purchases', purchasesRoutes);
// UNIMPLEMETED: HOUSEHOLD ROUTES & SCHEMAS

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `🚀 Server running on port ${PORT}`
    );
});