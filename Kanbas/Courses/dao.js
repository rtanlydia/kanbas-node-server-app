import CourseModel from "./model.js";

export const createCourse = async (course) => {
    try {
        delete course._id;
        course.number = `Course-${Date.now()}`;
        return await CourseModel.create(course);
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
};

export const findAllCourses = () => {
    return CourseModel.find();
};

export const findCourseById = (number) => {
    return CourseModel.findOne({ number }).exec();
};

export const updateCourse = (id, updatedCourse) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID format');
    }
    //return CourseModel.updateOne({ _id: id }, { $set: updatedCourse });
    return CourseModel.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: updatedCourse });
};

export const deleteCourse = (id) => {
    return CourseModel.deleteOne({ _id: id });
};
