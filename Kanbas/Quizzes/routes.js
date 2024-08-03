// // // import db from "../Database/index.js";
// // // export default function QuizRoutes(app) {
// // //     app.get("/api/courses/:cid/quizzes", (req, res) => {
// // //         const { cid } = req.params;
// // //         const  quizzes= db.quizzes.filter((a) => a.course === cid);
// // //         res.json(quizzes);
// // //     });
// // //
// // //     app.post("/api/courses/:cid/quizzes", (req, res) => {
// // //         const { cid } = req.params;
// // //         const newAssignment = {
// // //             ...req.body,
// // //             title: req.body.title || 'Untitled Assignment',
// // //             course: cid,
// // //             _id: new Date().getTime().toString(),
// // //         };
// // //         db.assignments.push(newAssignment);
// // //         res.send(newAssignment);
// // //     });
// // //
// // //     app.put("/api/quizzes/:aid", (req, res) => {
// // //         const { aid } = req.params;
// // //         const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
// // //         if (assignmentIndex !== -1) {
// // //             db.assignments[assignmentIndex] = {
// // //                 ...db.assignments[assignmentIndex],
// // //                 ...req.body,
// // //             };
// // //             res.sendStatus(204);
// // //         } else {
// // //             res.sendStatus(404);
// // //         }
// // //     });
// // //
// // //     app.delete("/api/quizzes/:aid", (req, res) => {
// // //         const { aid } = req.params;
// // //         db.assignments = db.assignments.filter((a) => a._id !== aid);
// // //         res.sendStatus(200);
// // //     });
// // // }
// //
// //
// // import * as dao from "../Assignments/dao.js";
// //
// // const QuizRoutes = (app) => {
// //     app.get("/api/courses/:cid/assignments", async (req, res) => {
// //         const { cid } = req.params;
// //         const assignments = await dao.findAssignmentsByCourse(cid);
// //         res.json(assignments);
// //     });
// //
// //     app.post("/api/courses/:cid/assignments", async (req, res) => {
// //         const { cid } = req.params;
// //         const newAssignment = {
// //             ...req.body,
// //             title: req.body.title || "Untitled Assignment",
// //             course: cid,
// //         };
// //         const createdAssignment = await dao.createAssignment(newAssignment);
// //         res.json(createdAssignment);
// //     });
// //
// //     app.put("/api/assignments/:aid", async (req, res) => {
// //         const { aid } = req.params;
// //         const updatedAssignment = await dao.updateAssignment(aid, req.body);
// //         res.json(updatedAssignment)
// //     });
// //
// //     app.delete("/api/assignments/:aid", async (req, res) => {
// //         const { aid } = req.params;
// //         const deleteStatus = await dao.deleteAssignment(aid);
// //         if (deleteStatus.deletedCount > 0) {
// //             res.sendStatus(200);
// //         } else {
// //             res.sendStatus(404);
// //         }
// //     });
// //
// //     app.get("/api/assignments/:aid", async (req, res) => {
// //         const { aid } = req.params;
// //         try {
// //             const assignment = await dao.findAssignmentById(aid);
// //             if (assignment) {
// //                 res.json(assignment);
// //             } else {
// //                 res.status(404).json({ error: 'Assignment not found' });
// //             }
// //         } catch (error) {
// //             res.status(500).json({ error: 'Internal server error' });
// //         }
// //     });
// //
// //
// // };
// //
// // export default QuizRoutes;
//
//
// import * as dao from "./dao.js";
//
// const QuizRoutes = (app) => {
//     app.get("/api/courses/:cid/quizzes", async (req, res) => {
//         const { cid } = req.params;
//         const quizzes = await dao.findQuizzesByCourse(cid);
//         res.json(quizzes);
//     });
//
//     app.post("/api/courses/:cid/quizzes", async (req, res) => {
//         const { cid } = req.params;
//         const newQuiz = {
//             ...req.body,
//             title: req.body.title || "Untitled Quiz",
//             course: cid,
//         };
//         const createdQuiz = await dao.createQuiz(newQuiz);
//         res.json(createdQuiz);
//     });
//
//     app.put("/api/quizzes/:qid", async (req, res) => {
//         const { qid } = req.params;
//         const updatedQuiz = await dao.updateQuiz(qid, req.body);
//         res.json(updatedQuiz);
//     });
//
//     app.delete("/api/quizzes/:qid", async (req, res) => {
//         const { qid } = req.params;
//         const deleteStatus = await dao.deleteQuiz(qid);
//         if (deleteStatus.deletedCount > 0) {
//             res.sendStatus(200);
//         } else {
//             res.sendStatus(404);
//         }
//     });
//
//     app.get("/api/quizzes/:qid", async (req, res) => {
//         const { qid } = req.params;
//         try {
//             const quiz = await dao.findQuizById(qid);
//             if (quiz) {
//                 res.json(quiz);
//             } else {
//                 res.status(404).json({ error: 'Quiz not found' });
//             }
//         } catch (error) {
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     });
// };
//
// export default QuizRoutes;


import * as dao from "./dao.js";

const QuizRoutes = (app) => {
    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesByCourse(cid);
        res.json(quizzes);
    });

    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const newQuiz = {
            ...req.body,
            title: req.body.title || "Untitled Quiz",
            course: cid,
        };
        const createdQuiz = await dao.createQuiz(newQuiz);
        res.json(createdQuiz);
    });

    app.put("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        const updatedQuiz = await dao.updateQuiz(qid, req.body);
        res.json(updatedQuiz);
    });

    app.delete("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        const deleteStatus = await dao.deleteQuiz(qid);
        if (deleteStatus.deletedCount > 0) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    app.get("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        try {
            const quiz = await dao.findQuizById(qid);
            if (quiz) {
                res.json(quiz);
            } else {
                res.status(404).json({ error: 'Quiz not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
};

export default QuizRoutes;
