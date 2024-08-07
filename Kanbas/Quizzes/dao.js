import QuizModel from "./model.js";

export const createQuiz = (quiz) => {
    delete quiz._id;
    return QuizModel.create(quiz);
};

export const findAllQuizzes = () => QuizModel.find();
export const findQuizzesByCourse = (courseId) => QuizModel.find({ course: courseId });
export const findQuizById = (quizId) => QuizModel.findById(quizId);
export const updateQuiz = (quizId, quiz) => QuizModel.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => QuizModel.deleteOne({ _id: quizId });

export const addQuestionToQuiz = async (quizId, newQuestion) => {
    try {
        const quiz = await QuizModel.findById(quizId);
        quiz.questions.push(newQuestion);
        await quiz.save();
        return quiz;
    } catch (error) {
        console.error('Error adding question to quiz:', error);
        throw error;
    }
};