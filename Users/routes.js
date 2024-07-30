import * as dao from "./dao.js";
let currentUser = null;
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
    const signup = async (req, res) => { };
    const signin = async (req, res) => { };
    const signout = (req, res) => { };
    const profile = async (req, res) => { };


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
    app.put("/api/users/:userId/email", updateUserEmail);}



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

