import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    questionType: {
        type: String,
        enum: ['Multiple Choice', 'True/False', 'Fill In The Blank'],
        required: true
    },
    questionTitle: { type: String},
    options: [
        {
            optionText: { type: String },
            isCorrect: { type: Boolean, default: false }
        }
    ],
    correctAnswer: { type: String },
    points: { type: Number, default: 1 }
});

const quizResultSchema = new mongoose.Schema({
    username: { type: String, required: true },
    answers: { type: [String], required: true },
    score: { type: Number},
    attempt: { type: Number, default: 1 }
});

const quizSchema = new mongoose.Schema({
    title: { type: String, default: "Untitled Quiz" },
    course: { type: String },
    description: { type: String, default: "" },
    quizType: {
        type: String,
        enum: ['Graded Quiz', 'Practice Quiz', 'Graded Survey', 'Ungraded Survey'],
    },
    assignmentGroup: {
        type: String,
        enum: ['Quizzes', 'Exams', 'Assignments', 'Project'],
    },
    allowMultipleAttempts: {type:Boolean, default:false },
    howManyAttempts: {type: Number, default: 1},
    shuffleAnswers: {type:Boolean, default:false },
    showCorrectAnswers: {type:Boolean, default:false },
    showCorrectAnswersDate: { type: Date, default: null },
    timeLimit: {type: Number, default: 20},
    accessCode: {type: String, default: null },
    oneQuestionAtaTime: {type:Boolean, default:false },
    webcamRequired: {type:Boolean, default:false },
    lockQuestionsAfterAnswering: {type:Boolean, default:false },
    availableFrom: { type: Date, default: null },
    availableUntil: { type: Date, default: null },
    dueDate: { type: Date, default: null },
    points: { type: Number, default: 100 },
    numberOfQuestions: { type: Number, default: 40 },
    score: { type: Number, default: null },
    questions: [questionSchema],
    results: [quizResultSchema],
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
