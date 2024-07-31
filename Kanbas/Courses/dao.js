import CourseModel from "./model.js";
import model from "../../Users/model.js";

export const createCourse = (course) => {
    delete course._id
    return model.create(course);
}

// export const createCourse = (course) => model.create(course);
export const findAllCourses = () => CourseModel.find();
export const findCourseById = (courseId) => CourseModel.findById(courseId);
export const updateCourse = (courseId, updatedCourse) => CourseModel.updateOne({ _id: courseId }, { $set: updatedCourse });
export const deleteCourse = (courseId) => CourseModel.deleteOne({ _id: courseId });
export const findCoursesByInstructor = (instructorId) => CourseModel.find({ instructor: instructorId });
export const findCoursesByDepartment = (department) => CourseModel.find({ department });
