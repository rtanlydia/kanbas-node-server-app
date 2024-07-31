import * as dao from "./dao.js";
import mongoose from 'mongoose';

export default function ModuleRoutes(app) {
    const createModule = async (req, res) => {
        const { cid } = req.params;
        try {
            const newModule = { ...req.body, course: cid };
            const module = await dao.createModule(newModule);
            res.status(201).json(module);
        } catch (error) {
            console.error('Error creating module:', error);
            res.status(500).send(error.message);
        }
    };

    const findModulesByCourse = async (req, res) => {
        const { number  } = req.params;
        try {
            const modules = await dao.findModulesByCourse(number);
            res.json(modules);
        } catch (error) {
            console.error('Error finding modules by course:', error);
            res.status(500).send(error.message);
        }
    };

    const updateModule = async (req, res) => {
        const { name } = req.params;
        const updatedModule = req.body;
        const status = await dao.updateModule(name, updatedModule);
        res.json(status);
    };


    const deleteModule = async (req, res) => {
        const { mid } = req.params;
        const status = await dao.deleteModule(mid);
        res.json(status);
    };


    app.post("/api/courses/:cid/modules", createModule);
    app.get("/api/courses/:number/modules", findModulesByCourse);
    app.put("/api/modules/:name", updateModule);
    app.delete("/api/modules/:mid", deleteModule);
}




// import db from "../Database/index.js";
// export default function ModuleRoutes(app) {
//     app.put("/api/modules/:mid", (req, res) => {
//         const { mid } = req.params;
//         const moduleIndex = db.modules.findIndex(
//             (m) => m._id === mid);
//         db.modules[moduleIndex] = {
//             ...db.modules[moduleIndex],
//             ...req.body
//         };
//         res.sendStatus(204);
//     });
//     app.delete("/api/modules/:mid", (req, res) => {
//         const { mid } = req.params;
//         db.modules = db.modules.filter((m) => m._id !== mid);
//         res.sendStatus(200);
//     });
//     app.post("/api/courses/:cid/modules", (req, res) => {
//         const { cid } = req.params;
//         const newModule = {
//             ...req.body,
//             course: cid,
//             _id: new Date().getTime().toString(),
//         };
//         db.modules.push(newModule);
//         res.send(newModule);
//     });
//
//     app.get("/api/courses/:cid/modules", (req, res) => {
//         const { cid } = req.params;
//         const modules = db.modules.filter((m) => m.course === cid);
//         res.json(modules);
//     });
// }



// import * as dao from "./dao.js";
//
// export default function ModuleRoutes(app) {
//
//     const createModule = async (req, res) => {
//         const module = await dao.createModule(req.body);
//         res.json(module);
//     };
//
//     const deleteModule = async (req, res) => {
//         const status = await dao.deleteModule(req.params.moduleId);
//         res.json(status);
//     };
//
//     const findAllModules = async (req, res) => {
//         const { course } = req.query;
//         if (course) {
//             const modules = await dao.findModulesByCourse(course);
//             res.json(modules);
//             return;
//         }
//         const modules = await dao.findAllModules();
//         res.json(modules);
//     };
//
//     const findModuleById = async (req, res) => {
//         const module = await dao.findModuleById(req.params.moduleId);
//         res.json(module);
//     };
//
//     const updateModule = async (req, res) => {
//         const { moduleId } = req.params;
//         const status = await dao.updateModule(moduleId, req.body);
//         res.json(status);
//     };
//
//     const addLessonToModule = async (req, res) => {
//         const { moduleId } = req.params;
//         const lesson = req.body;
//         const status = await dao.addLessonToModule(moduleId, lesson);
//         res.json(status);
//     };
//
//     const updateLessonInModule = async (req, res) => {
//         const { moduleId, lessonId } = req.params;
//         const lesson = req.body;
//         const status = await dao.updateLessonInModule(moduleId, lessonId, lesson);
//         res.json(status);
//     };
//
//     const removeLessonFromModule = async (req, res) => {
//         const { moduleId, lessonId } = req.params;
//         const status = await dao.removeLessonFromModule(moduleId, lessonId);
//         res.json(status);
//     };
//
//     app.post("/api/modules", createModule);
//     app.get("/api/modules", findAllModules);
//     app.get("/api/modules/:moduleId", findModuleById);
//     app.put("/api/modules/:moduleId", updateModule);
//     app.delete("/api/modules/:moduleId", deleteModule);
//
//     app.post("/api/modules/:moduleId/lessons", addLessonToModule);
//     app.put("/api/modules/:moduleId/lessons/:lessonId", updateLessonInModule);
//     app.delete("/api/modules/:moduleId/lessons/:lessonId", removeLessonFromModule);
// }
