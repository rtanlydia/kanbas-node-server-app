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
//
//


import * as dao from "./dao.js";

const AssignmentRoutes = (app) => {
    app.get("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params;
        const assignments = await dao.findAssignmentsByCourse(cid);
        res.json(assignments);
    });

    app.post("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            title: req.body.title || "Untitled Assignment",
            course: cid,
        };
        const createdAssignment = await dao.createAssignment(newAssignment);
        res.json(createdAssignment);
    });

    app.put("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        const updatedAssignment = await dao.updateAssignment(aid, req.body);
        res.json(updatedAssignment)
    });

    app.delete("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        const deleteStatus = await dao.deleteAssignment(aid);
        if (deleteStatus.deletedCount > 0) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    app.get("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        try {
            const assignment = await dao.findAssignmentById(aid);
            if (assignment) {
                res.json(assignment);
            } else {
                res.status(404).json({ error: 'Assignment not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });


};

export default AssignmentRoutes;
