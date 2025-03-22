"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const purchases_1 = __importDefault(require("./routes/purchases"));
const preferences_1 = __importDefault(require("./routes/preferences"));
dotenv_1.default.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 8000;
(0, db_1.default)();
const app = (0, express_1.default)();
const staticDir = path_1.default.join(__dirname, process.env.STATIC_DIR?.trim() || '');
app.use((0, cors_1.default)());
app.use(express_1.default.static(staticDir));
app.use(express_1.default.json());
app.get("/hello", (req, res) => {
    res.send("Hello, World");
});
// Mount API routes at /api
app.use("/api/auth", auth_1.default);
app.use('/api/purchases', purchases_1.default);
app.use('/api/preferences', preferences_1.default);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(staticDir, "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
