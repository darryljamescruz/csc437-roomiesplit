"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_js_1 = __importDefault(require("./db.js"));
const cors_1 = __importDefault(require("cors"));
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const purchases_js_1 = __importDefault(require("./routes/purchases.js"));
const preferences_js_1 = __importDefault(require("./routes/preferences.js"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
const staticDir = process.env.STATIC_DIR || "public";
async function setUpServer() {
    try {
        // Connect to MongoDB Atlas
        await (0, db_js_1.default)();
        console.log("✅ MongoDB Atlas Connected Successfully!");
        // Set up Express
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        // Serve static files from the directory specified by STATIC_DIR
        const resolvedStaticDir = path_1.default.join(__dirname, staticDir);
        console.log("Serving static files from:", resolvedStaticDir);
        app.use(express_1.default.static(resolvedStaticDir));
        // Mount API routes
        app.use("/api/auth", auth_js_1.default);
        app.use("/api/purchases", purchases_js_1.default);
        app.use("/api/preferences", preferences_js_1.default);
        // (Any additional routes can be mounted here)
        // Catch-all route for SPA support: send index.html for unknown paths
        app.get("*", (req, res) => {
            res.sendFile(path_1.default.resolve(resolvedStaticDir, "index.html"));
        });
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Server initialization failed:", error);
    }
}
setUpServer();
