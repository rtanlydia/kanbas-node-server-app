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

export const submitQuizAnswers = async (quizId, username, answers) => {
    try {
        const quiz = await QuizModel.findById(quizId);
        if (!quiz) {
            console.error('Quiz not found');
            throw new Error('Quiz not found');
        }

        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                score += question.points;
            }
        });

        let userResult = quiz.results.find(result => result.username === username);

        if (userResult) {
            userResult.answers = answers;
            userResult.score = score;
            userResult.attempt += 1;
            userResult.submittedAt = new Date();
        } else {
            userResult = { username, answers, score, attempt: 1 };
            quiz.results.push(userResult);
        }

        await quiz.save();
        return userResult;
    } catch (error) {
        console.error('Error submitting quiz answers:', error);
        throw error;
    }
};