import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: String,
    content: String,
    duration: Number
});

const moduleSchema = new mongoose.Schema({
    name: { type: String},
    description: { type: String},
    course: { type: String},
    lessons: [lessonSchema]
}, { collection: "modules" });

export default moduleSchema;
