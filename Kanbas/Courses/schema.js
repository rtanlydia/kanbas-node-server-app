import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
        courseNumber: { type: String, required: true, unique: true },
        courseName: { type: String, required: true },
        description: String,
        credits: { type: Number, required: true },
        endDate:Date,
        startDate: Date,
        department: String,
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        assignments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Assignment"
            }
        ]
    },
    { collection: "courses" }
);

export default courseSchema;
