import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    duration: Number
});

const moduleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: String, required: true },
    lessons: [lessonSchema]
}, { collection: "modules" });

export default moduleSchema;
