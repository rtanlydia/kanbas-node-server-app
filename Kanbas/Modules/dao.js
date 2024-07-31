import model from "./model.js";

export const createModule = (module) => {
    delete module._id;
    return model.create(module);
}

export const findAllModules = () => model.find();
export const findModuleById = (moduleId) => model.findById(moduleId);
export const findModulesByCourse = (course) => model.find({ course });

export const updateModule = (moduleId, module) => {
    return model.updateOne({ _id: moduleId }, { $set: module });
}

export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });

export const addLessonToModule = (moduleId, lesson) => {
    return model.updateOne(
        { _id: moduleId },
        { $push: { lessons: lesson } }
    );
}

export const updateLessonInModule = (moduleId, lessonId, lesson) => {
    return model.updateOne(
        { _id: moduleId, "lessons._id": lessonId },
        { $set: { "lessons.$": lesson } }
    );
}

export const removeLessonFromModule = (moduleId, lessonId) => {
    return model.updateOne(
        { _id: moduleId },
        { $pull: { lessons: { _id: lessonId } } }
    );
}
