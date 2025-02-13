import express from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET, saltrounds } from "../config.js";
import { account, users } from "../db.js";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middleware.js";

const userRouter = express.Router();

const Schema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

userRouter.post('/signup', async (req, res) => {
    try {
        const { username, firstName, lastName, password } = req.body;
        const response = Schema.safeParse(req.body);

        if (!response.success) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const existingUser = await users.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ message: "Email already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, saltrounds);

        const newUser = await users.create({
            username,
            firstName,
            lastName,
            password: hashedPassword
        });

        const userId = newUser._id;

        await account.create({
            userId,
            balance: 1 + Math.random() * 10000
        });

        const token = jwt.sign({ userId }, JWT_SECRET);

        res.status(201).json({
            message: "User created successfully",
            token: token
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

userRouter.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const response = signInSchema.safeParse(req.body);

        if (!response.success) {
            return res.status(400).json({ message: "Incorrect inputs" });
        }

        const existingUser = await users.findOne({ username });

        if (!existingUser) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);

        return res.status(200).json({ token });

    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

userRouter.put('/', authMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { success } = updateSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({ message: "Error while updating information" });
    }

    await users.updateOne(
        { _id: req.userId },
        { $set: req.body }
    );

    res.json({ message: "Updated successfully" });
});

userRouter.get('/bulk', async (req, res) => {
    try {
        const filter = req.query.filter || "";
        const usersList = await users.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } },
                { lastName: { "$regex": filter, "$options": "i" } }
            ]
        });

        res.json({
            users: usersList.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });

    } catch (error) {
        console.error("Bulk fetch error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export { userRouter };
