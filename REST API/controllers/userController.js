import { Router } from "express";
import userService from "../services/userService.js";

const userController = Router();

userController.post('/register', async (req, res) => {
    console.log(req.body);

    const { username, phone, email, password } = req.body

    const result = await userService.register(username, phone, email, password);

    res.json(result);
});

userController.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const result = await userService.login(email, password);

    res.json(result);
});

userController.post('/logout', async (req, res) => {
    res.status(204).end();
});

export default userController;