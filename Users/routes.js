import * as dao from "./dao.js";

export default function UserRoutes(app) {

    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    app.delete("/api/users/:userId", deleteUser);

    const findAllUsers = async (req, res) => {
        const { role,name } = req.query;
        if (role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        }
        if (name) {
            const users = await dao.findUsersByPartialName(name);
            res.json(users);
            return;
        }
        const users = await dao.findAllUsers();
        res.json(users);
    };
    // const findAllUsers = async (req, res) => {
    //     const users = await dao.findAllUsers();
    //     res.json(users);
    // };
    app.get("/api/users", findAllUsers);

    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        res.json(status);
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);

    };

    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.status(401).json({ message: "Unable to login. Try again later." });
        }

    };
    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };


    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const findEnrolledCoursesByUserId = async (req, res) => {
        try {
            const user = await dao.findEnrolledCoursesByUserId(req.params.userId);
            if (user) {
                res.status(200).json(user.enrolledCourses);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    const enrollUserInCourse = async (req, res) => {
        const { userId, courseId } = req.params;
        try {
            const user = await dao.enrollUserInCourse(userId, courseId);
            res.status(200).json(user);
        } catch (error) {
            if (error.message === "User not found" || error.message === "Course not found") {
                res.status(404).json({ error: error.message });
            } else if (error.message === "User already enrolled in this course") {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unexpected error occurred" });
            }
        }
    };





    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.put("/api/users/:userId/role", updateUserRole);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
    app.put("/api/users/:userId/email", updateUserEmail);
    // new user course!!!
    app.get("/api/users/:userId/enrolledCourses", findEnrolledCoursesByUserId);
    app.post("/api/users/:userId/RegisterCourses/:courseId/enroll", enrollUserInCourse);
}




const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
        const users = await dao.findUsersByRole(role);
        res.json(users);
        return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
    return;
};

const updateUserEmail = async (req, res) => {
    const { userId } = req.params;
    const { email } = req.body;
    const status = await dao.updateUserEmail(userId, email);
    res.json(status);
};

const updateUserRole = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;
    const status = await dao.updateUserRole(userId, role);
    res.json(status);
};

