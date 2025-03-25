// index.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db.js";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import purchasesRoutes from "./routes/purchases.js";
import preferenceRoutes from "./routes/preferences.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";

async function setUpServer() {
  try {
    // Connect to MongoDB Atlas
    await connectDB();
    console.log("✅ MongoDB Atlas Connected Successfully!");

    // Set up Express
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Serve static files from the directory specified by STATIC_DIR
    const resolvedStaticDir = path.join(__dirname, staticDir);
    console.log("Serving static files from:", resolvedStaticDir);
    app.use(express.static(resolvedStaticDir));

    // Mount API routes
    app.use("/api/auth", authRoutes);
    app.use("/api/purchases", purchasesRoutes);
    app.use("/api/preferences", preferenceRoutes);
    // (Any additional routes can be mounted here)

    // Catch-all route for SPA support: send index.html for unknown paths
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(resolvedStaticDir, "index.html"));
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server initialization failed:", error);
  }
}

setUpServer();