// import mongoose from "mongoose";
//
// const assignmentSchema = new mongoose.Schema({
//         title: { type: String, required: true },
//         course: { type: String, required: true },
//         description: String,
//         dueDate: Date,
//         maxScore: Number,
//         submissions: [
//             {
//                 studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//                 score: Number,
//                 submittedDate: Date,
//                 fileUrl: String,
//             },
//         ],
//     },
//     { collection: "assignments" });
//
// export default assignmentSchema;

import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: { type: String, default: "Untitled Assignment" },
    course: { type: String},
    description: { type: String, default: "" },
    availableFrom: { type: Date, default: null },
    availableUntil: { type: Date, default: null },
    dueDate: { type: Date, default: null },
    points: { type: Number, default: 100 }
}, { collection: "assignments" });

export default assignmentSchema;

