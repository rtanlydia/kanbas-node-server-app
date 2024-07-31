// import mongoose from "mongoose";
// import assignmentSchema from "./assignmentSchema.js";
//
//
// const Assignment = mongoose.model("Assignment", assignmentSchema);
//
// export const createAssignment = (assignment) => Assignment.create(assignment);
// export const findAllAssignments = () => Assignment.find();
// export const findAssignmentById = (id) => Assignment.findById(id);
// export const updateAssignment = (id, updatedAssignment) => Assignment.updateOne({ _id: id }, { $set: updatedAssignment });
// export const deleteAssignment = (id) => Assignment.deleteOne({ _id: id });


import AssignmentModel from "./model.js";

export const createAssignment = (assignment) => AssignmentModel.create(assignment);

export const getAllAssignments = () => AssignmentModel.find();


export const getAssignmentById = (assignmentId) => AssignmentModel.findById(assignmentId);

export const updateAssignment = (assignmentId, updatedAssignment) => AssignmentModel.updateOne({ _id: assignmentId }, { $set: updatedAssignment });

export const deleteAssignment = (assignmentId) => AssignmentModel.deleteOne({ _id: assignmentId });

export const findAssignmentsByCourse = (course) => AssignmentModel.find({ course });

export const findAssignmentsByStudentId = (studentId) => AssignmentModel.find({ "submissions.studentId": studentId });
