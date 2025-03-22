"use strict";
//express-backend/src/db.ts 
//this is sort of the connector code to the mongoDB atlas
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load .env file
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; // Ensure MONGO_URI is loaded
        if (!mongoURI)
            throw new Error("MONGO_URI is missing in .env file");
        await mongoose_1.default.connect(mongoURI, {});
        console.log("✅ MongoDB Atlas Connected Successfully!");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("❌ MongoDB Connection Error:", error.message);
        }
        else {
            console.error("❌ MongoDB Connection Error:", error);
        }
        process.exit(1); // Exit process on failure
    }
};
exports.default = connectDB; // Use `export default` for ES modules
