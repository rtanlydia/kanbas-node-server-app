import mongoose from 'mongoose';
import ModuleModel from './model.js';
import model from "../../Users/model.js";

export const createModule = async (module) => {
    try {
        delete module._id;
        return await ModuleModel.create(module);
    } catch (error) {
        console.error('Error creating module:', error);
        throw error;
    }
};

export const findModulesByCourse = async (number) => {
    try {
        return await ModuleModel.find({ course: number }).exec();
    } catch (error) {
        console.error('Error finding modules by course:', error);
        throw error;
    }
};

export const updateModule = (name, updatedModule) => ModuleModel.findOneAndUpdate({ name }, updatedModule, { new: true });

export const deleteModule = (id) => ModuleModel.deleteOne({ _id: id });

