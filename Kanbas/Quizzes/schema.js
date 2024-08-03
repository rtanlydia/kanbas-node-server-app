// import mongoose from "mongoose";
//
// const quizSchema = new mongoose.Schema({
//     title: { type: String, default: "Untitled Quiz" },
//     course: { type: String},
//     description: { type: String, default: "" },
//     availableFrom: { type: Date, default: null },
//     availableUntil: { type: Date, default: null },
//     dueDate: { type: Date, default: null },
//     points: { type: Number, default: 100 },
//     numberOfQuestion : {type: Number, default: 40}
// }, { collection: "quizzes" });
//
// export default quizSchema;

// import mongoose from "mongoose";
//
// const quizSchema = new mongoose.Schema({
//     title: { type: String, default: "Untitled Quiz" },
//     course: { type: String },
//     description: { type: String, default: "" },
//     availableFrom: { type: Date, default: null },
//     availableUntil: { type: Date, default: null },
//     dueDate: { type: Date, default: null },
//     points: { type: Number, default: 100 },
//     numberOfQuestions: { type: Number, default: 40 },
//     status: {
//         type: String,
//         enum: ["Closed", "Available", "Not available until <AVAILABLE DATE>"],
//         default: function() {
//             const currentDate = new Date();
//             if (this.availableFrom && currentDate < this.availableFrom) {
//                 return `Not available until ${this.availableFrom.toLocaleDateString()}`;
//             } else if (this.availableUntil && currentDate > this.availableUntil) {
//                 return "Closed";
//             } else {
//                 return "Available";
//             }
//         }
//     },
//     score: { type: Number, default: null }
// }, { collection: "quizzes" });
//
// export default quizSchema;


import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: { type: String, default: "Untitled Quiz" },
    course: { type: String },
    description: { type: String, default: "" },
    availableFrom: { type: Date, default: null },
    availableUntil: { type: Date, default: null },
    dueDate: { type: Date, default: null },
    points: { type: Number, default: 100 },
    numberOfQuestions: { type: Number, default: 40 },
    score: { type: Number, default: null }
}, { collection: "quizzes" });

quizSchema.virtual('status').get(function() {
    const currentDate = new Date();
    if (this.availableFrom && currentDate < this.availableFrom) {
        return `Not available until ${this.availableFrom.toLocaleDateString()}`;
    } else if (this.availableUntil && currentDate > this.availableUntil) {
        return "Closed";
    } else {
        return "Available";
    }
});

quizSchema.set('toJSON', { virtuals: true });
quizSchema.set('toObject', { virtuals: true });

export default quizSchema;
