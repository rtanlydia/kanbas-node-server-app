import Database from "../Database/index.js";
export default function CourseRoutes(app) {
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        Database.courses = Database.courses.map((c) =>
            c._id === id ? { ...c, ...course } : c
        );
        res.sendStatus(204);
    });
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.courses = Database.courses.filter((c) => c._id !== id);
        res.sendStatus(204);
    });
    app.post("/api/courses", (req, res) => {
        const course = { ...req.body,
            _id: new Date().getTime().toString() };
        Database.courses.push(course);
        res.send(course);
    });
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });
}



// // import express from "express";
// import * as dao from "./dao.js";
//
// const router = express.Router();
//
// // CRUD operations for courses
//
// const createCourse = async (req, res) => {
//     const newCourse = req.body;
//     const createdCourse = await dao.createCourse(newCourse);
//     res.json(createdCourse);
// };
//
// const getAllCourses = async (req, res) => {
//     const courses = await dao.getAllCourses();
//     res.json(courses);
// };
//
// const getCourseById = async (req, res) => {
//     const { courseId } = req.params;
//     const course = await dao.getCourseById(courseId);
//     res.json(course);
// };
//
// const updateCourse = async (req, res) => {
//     const { courseId } = req.params;
//     const updatedCourse = req.body;
//     const status = await dao.updateCourse(courseId, updatedCourse);
//     res.json(status);
// };
//
// const deleteCourse = async (req, res) => {
//     const { courseId } = req.params;
//     const status = await dao.deleteCourse(courseId);
//     res.json(status);
// };
//
// const findCoursesByInstructor = async (req, res) => {
//     const { instructorId } = req.params;
//     const courses = await dao.findCoursesByInstructor(instructorId);
//     res.json(courses);
// };
//
// const findCoursesByDepartment = async (req, res) => {
//     const { department } = req.params;
//     const courses = await dao.findCoursesByDepartment(department);
//     res.json(courses);
// };
//
// // Define routes
// router.post("/api/courses", createCourse);
// router.get("/api/courses", getAllCourses);
// router.get("/api/courses/:courseId", getCourseById);
// router.put("/api/courses/:courseId", updateCourse);
// router.delete("/api/courses/:courseId", deleteCourse);
// router.get("/api/courses/instructor/:instructorId", findCoursesByInstructor);
// router.get("/api/courses/department/:department", findCoursesByDepartment);
//
// export default router;
//
