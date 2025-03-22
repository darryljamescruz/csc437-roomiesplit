"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend.js 
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./db.js"));
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const purchases_js_1 = __importDefault(require("./routes/purchases.js"));
const preferences_js_1 = __importDefault(require("./routes/preferences.js"));
const path_1 = __importDefault(require("path"));
try {
    dotenv_1.default.config(); // Load environment variables
    const app = (0, express_1.default)();
    const staticDir = path_1.default.join(__dirname, process.env.STATIC_DIR?.trim() || '');
    console.log('Serving static files from:', staticDir);
    // Middleware
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Connect to MongoDB Atlas
    (0, db_js_1.default)();
    // Mount API routes at /api
    app.use("/api/auth", auth_js_1.default);
    app.use('/api/purchases', purchases_js_1.default);
    app.use('/api/preferences', preferences_js_1.default);
    // UNIMPLEMENTED: HOUSEHOLD ROUTES & SCHEMAS
    // Serve static files from the React build folder (DIST)
    app.use(express_1.default.static(staticDir));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(staticDir, "index.html"));
    });
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}
catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
}
