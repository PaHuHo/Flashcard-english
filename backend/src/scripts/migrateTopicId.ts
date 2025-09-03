import mongoose, { Types } from "mongoose";
import Flashcard from "../models/flashcard.model"; 
import dotenv from 'dotenv';

dotenv.config();
async function migrate() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    // Lấy tất cả flashcards
    const flashcards = await Flashcard.find();
    console.log(flashcards);

    for (const fc of flashcards) {
      if (typeof fc.topic_id === "string") {
        // Chuyển string → ObjectId
        fc.topic_id = new Types.ObjectId(fc.topic_id);
        await fc.save();
        console.log(`Migrated flashcard ${fc._id} (topic_id -> ObjectId)`);
      }
    }

    console.log("🎉 Migration completed successfully!");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Migration failed:", err);
    await mongoose.disconnect();
  }
}

migrate();
