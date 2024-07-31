import AssignmentModel from "./model.js";

export const createAssignment = (assignment) => {
    delete assignment._id;
    return AssignmentModel.create(assignment);
};

export const findAllAssignments = () => AssignmentModel.find();
export const findAssignmentsByCourse = (courseId) => AssignmentModel.find({ course: courseId });
export const findAssignmentById = (assignmentId) => AssignmentModel.findById(assignmentId);
export const updateAssignment = (assignmentId, assignment) => AssignmentModel.updateOne({ _id: assignmentId }, { $set: assignment });
export const deleteAssignment = (assignmentId) => AssignmentModel.deleteOne({ _id: assignmentId });
