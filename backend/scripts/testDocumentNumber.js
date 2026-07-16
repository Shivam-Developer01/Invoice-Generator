import mongoose from "mongoose";
import dotenv from "dotenv";
import generateDocumentNumber from "../src/utils/generateDocumentNumber.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

process.exit();