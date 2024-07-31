import * as dao from "./dao.js";
import mongoose from 'mongoose';

export default function CourseRoutes(app) {

    const createCourse = async (req, res) => {
        try {
            const course = await dao.createCourse(req.body);
            res.status(201).json(course);
        } catch (error) {
            console.error('Error creating course:', error);
            res.status(500).send(error.message);
        }
    };

    const findAllCourses = async (req, res) => {
        try {
            const courses = await dao.findAllCourses();
            res.json(courses);
        } catch (error) {
            console.error('Error finding courses:', error);
            res.status(500).send(error.message);
        }
    };

    const findCourseById = async (req, res) => {
        const { number } = req.params;
        try {
            const course = await dao.findCourseById(number);
            if (course) {
                res.json(course);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error('Error finding course by ID:', error);
            res.status(500).send(error.message);
        }
    };

    const updateCourse = async (req, res) => {
       const { courseId } = req.params;
       const updatedCourse = req.body;
       const status = await dao.updateCourse(courseId, updatedCourse);
       res.json(status);
    };


    const deleteCourse = async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid ID format");
        }
        try {
            const status = await dao.deleteCourse(id);
            if (status.deletedCount > 0) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            res.status(500).send(error.message);
        }
    };

    // 定义路由
    app.post("/api/courses", createCourse);
    app.get("/api/courses", findAllCourses);
    app.get("/api/courses/:number", findCourseById);
    app.put("/api/courses/:number", updateCourse);
    app.delete("/api/courses/:id", deleteCourse);
}




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


