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
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String},
    course: { type: String}
}, { collection: "assignments" });

export default assignmentSchema;

