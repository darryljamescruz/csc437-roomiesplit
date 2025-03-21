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
// route definitions
const auth_1 = __importDefault(require("./routes/auth"));
const purchases_1 = __importDefault(require("./routes/purchases"));
const preferences_1 = __importDefault(require("./routes/preferences"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const staticDir = path_1.default.join(__dirname, process.env.STATIC_DIR?.trim() || '');
console.log('Serving static files from:', staticDir);
//  Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB Atlas
(0, db_js_1.default)();
// Mount the auth routes at /api
app.use("/ap/auth", auth_1.default);
app.use('/api/purchases', purchases_1.default);
app.use('/api/preferences', preferences_1.default);
// UNIMPLEMETED: HOUSEHOLD ROUTES & SCHEMAS
// Serve static files from the React build folder DIST
app.use(express_1.default.static(staticDir));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(staticDir, "index.html"));
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
