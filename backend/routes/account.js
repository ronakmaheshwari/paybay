import express from "express";
import { authMiddleware } from "../middleware.js";
import { account } from "../db.js";
import mongoose from "mongoose";
import zod from "zod";

const accountRouter = express.Router();

const transferSchema = zod.object({
    to: zod.string().min(1, "Recipient ID is required"),
    amount: zod.number().positive("Amount must be positive")
});

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    try {
        const finder = await account.findOne({ userId: req.userId });

        if (!finder) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({ balance: finder.balance });

    } catch (error) {
        console.error("Balance error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const check = await account.findOne({ userId: req.userId }).session(session);

    if (!check || check.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

export { accountRouter };
