import mongoose from 'mongoose';
import ModuleModel from './model.js';

export const createModule = async (module) => {
    try {
        delete module._id; // 确保没有 _id 字段，以便 MongoDB 自动生成
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

export const updateModuleInDb = async (id, updatedModule) => {
    try {
        // 验证 ID 是否为有效的 ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }

        return await ModuleModel.findByIdAndUpdate(id, updatedModule, { new: true }).exec();
    } catch (error) {
        console.error('Error updating module:', error);
        throw error;
    }
};

export const deleteModule = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }

        return await ModuleModel.deleteOne({ _id: id }).exec();
    } catch (error) {
        console.error('Error deleting module:', error);
        throw error;
    }
};
