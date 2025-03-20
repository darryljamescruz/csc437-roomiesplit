// backend.js 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";

// route definitions
import authRoutes from "./routes/auth"; 
import householdRoutes from './routes/household';

dotenv.config(); // Load environment variables

const app = express();

//  Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Mount the auth routes at /api
app.use("/api/auth", authRoutes);
app.use('/api/household', householdRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(
        `🚀 Server running on port ${PORT}`
    );
});