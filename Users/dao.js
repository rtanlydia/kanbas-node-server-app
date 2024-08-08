import model from "./model.js";
import CourseModel from '../Kanbas/Courses/model.js';
import mongoose from "mongoose";
export const createUser = (user) => {
    delete user._id
    return model.create(user);
}

export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};

export const updateUserEmail = (userId, email) => {
    return model.updateOne({ _id: userId }, { $set: { email: email } });
};

export const updateUserRole = (userId, role) => {
    return model.updateOne({ _id: userId }, { $set: { role: role } });
};

// new!!!!!!
export const findEnrolledCoursesByUserId = (userId) => {
    return model.findById(userId).populate('enrolledCourses');
};

// Enroll user in a course
export const enrollUserInCourse = async (userId, courseId) => {
    //console.log(`Enrolling user with ID: ${userId} into course with ID: ${courseId}`); // 添加日志记录
    const user = await model.findById(userId);
    if (!user) {
        console.error(`User not found with ID: ${userId}`); // 错误日志
        throw new Error("User not found");
    }

    const course = await CourseModel.findById(courseId);
    if (!course) {
        console.error(`Course not found with ID: ${courseId}`); // 错误日志
        throw new Error("Course not found");
    }
    if (user.enrolledCourses.includes(courseId)) {
        console.error(`User already enrolled in course with ID: ${courseId}`); // 错误日志
        throw new Error("User already enrolled in this course");
    }

    user.enrolledCourses.push(courseId);
    await user.save();
    return user.populate('enrolledCourses');
};

export const createCourseForUser = async (userId, courseData) => {
    try {
        const user = await model.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const newCourse = new CourseModel(courseData);
        await newCourse.save();

        user.enrolledCourses.push(newCourse._id);
        await user.save();

        return newCourse;
    } catch (error) {
        throw error;
    }
};

export const deleteCourseForUser = async (userId, courseId) => {
    try {
        const user = await model.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const courseIndex = user.enrolledCourses.indexOf(courseId);
        if (courseIndex > -1) {
            user.enrolledCourses.splice(courseIndex, 1);
        } else {
            throw new Error('Course not found in enrolledCourses');
        }

        await user.save();
        await CourseModel.findByIdAndDelete(courseId);

        return user;
    } catch (error) {
        throw error;
    }
};