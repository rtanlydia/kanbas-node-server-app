// import Database from "../Database/index.js";
// export default function CourseRoutes(app) {
//     app.put("/api/courses/:id", (req, res) => {
//         const { id } = req.params;
//         const course = req.body;
//         Database.courses = Database.courses.map((c) =>
//             c._id === id ? { ...c, ...course } : c
//         );
//         res.sendStatus(204);
//     });
//     app.delete("/api/courses/:id", (req, res) => {
//         const { id } = req.params;
//         Database.courses = Database.courses.filter((c) => c._id !== id);
//         res.sendStatus(204);
//     });
//     app.post("/api/courses", (req, res) => {
//         const course = { ...req.body,
//             _id: new Date().getTime().toString() };
//         Database.courses.push(course);
//         res.send(course);
//     });
//     app.get("/api/courses", (req, res) => {
//         const courses = Database.courses;
//         res.send(courses);
//     });
// }



//import express from "express";
import * as dao from "./dao.js";

export default function UserRoutes(app) {

    //onst router = express.Router();

    const createCourse = async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    };

    const findAllCourses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    };

    const findCourseById = async (req, res) => {
        const { courseId } = req.params;
        const course = await dao.findCourseById(courseId);
        res.json(course);
    };

    const updateCourse = async (req, res) => {
        const { courseId } = req.params;
        const updatedCourse = req.body;
        const status = await dao.updateCourse(courseId, updatedCourse);
        res.json(status);
    };

    const deleteCourse = async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        res.json(status);
    };

    const findCoursesByInstructor = async (req, res) => {
        const { instructorId } = req.params;
        const courses = await dao.findCoursesByInstructor(instructorId);
        res.json(courses);
    };

    const findCoursesByDepartment = async (req, res) => {
        const { department } = req.params;
        const courses = await dao.findCoursesByDepartment(department);
        res.json(courses);
    };

    // Define routes
    app.post("/api/courses", createCourse);
    app.get("/api/courses", findAllCourses);
    app.get("/api/courses/:courseId", findCourseById);
    app.put("/api/courses/:courseId", updateCourse);
    app.delete("/api/courses/:courseId", deleteCourse);
    app.get("/api/courses/instructor/:instructorId", findCoursesByInstructor);
    app.get("/api/courses/department/:department", findCoursesByDepartment);

    //app.use(router);

}
