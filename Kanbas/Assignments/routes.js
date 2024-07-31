// import db from "../Database/index.js";
// import * as dao from "./dao.js";
//
// export default function AssignmentRoutes(app) {
//     app.get("/api/courses/:cid/assignments", (req, res) => {
//         const { cid } = req.params;
//         const assignments = db.assignments.filter((a) => a.course === cid);
//         res.json(assignments);
//     });
//
//     app.post("/api/courses/:cid/assignments", (req, res) => {
//         const { cid } = req.params;
//         const newAssignment = {
//             ...req.body,
//             title: req.body.title || 'Untitled Assignment',
//             course: cid,
//             _id: new Date().getTime().toString(),
//         };
//         db.assignments.push(newAssignment);
//         res.send(newAssignment);
//     });
//
//     app.put("/api/assignments/:aid", (req, res) => {
//         const { aid } = req.params;
//         const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
//         if (assignmentIndex !== -1) {
//             db.assignments[assignmentIndex] = {
//                 ...db.assignments[assignmentIndex],
//                 ...req.body,
//             };
//             res.sendStatus(204);
//         } else {
//             res.sendStatus(404);
//         }
//     });
//
//     app.delete("/api/assignments/:aid", (req, res) => {
//         const { aid } = req.params;
//         db.assignments = db.assignments.filter((a) => a._id !== aid);
//         res.sendStatus(200);
//     });
// }

import express from "express";
import * as dao from "./dao.js";
export default function AssignmentRoutes(app) {
const router = express.Router();

const createAssignment = async (req, res) => {
    const newAssignment = req.body;
    const createdAssignment = await dao.createAssignment(newAssignment);
    res.json(createdAssignment);
};

const findAllAssignments = async (req, res) => {
    const assignments = await dao.getAllAssignments();
    res.json(assignments);
};
//
const findAssignmentById = async (req, res) => {
    const { assignmentId } = req.params;
    const assignment = await dao.getAssignmentById(assignmentId);
    res.json(assignment);
};

const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const updatedAssignment = req.body;
    const status = await dao.updateAssignment(assignmentId, updatedAssignment);
    res.json(status);
};

const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.deleteAssignment(assignmentId);
    res.json(status);
};

// Define routes
router.post("/api/assignments", createAssignment);
router.get("/api/assignments", findAllAssignments);
router.get("/api/assignments/:assignmentId", findAssignmentById);
router.put("/api/assignments/:assignmentId", updateAssignment);
router.delete("/api/assignments/:assignmentId", deleteAssignment);

app.use(router);


};
