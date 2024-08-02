import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: { type: String, default: "Untitled Quiz" },
    course: { type: String},
    description: { type: String, default: "" },
    availableFrom: { type: Date, default: null },
    availableUntil: { type: Date, default: null },
    dueDate: { type: Date, default: null },
    points: { type: Number, default: 100 }
}, { collection: "quizzes" });

export default quizSchema;
