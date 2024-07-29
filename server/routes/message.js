import express from 'express';
import { Message } from '../models/Message.js';
import { verifyAdmin } from "./auth.js";

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const { email, userID, message } = req.body;
        const newMessage = new Message({
            email,
            userID,
            message,
            read: false 
        });
        await newMessage.save();
        return res.json({ added: true });
    } catch (err) {
        return res.status(500).json({ error: "Error in adding message" });
    }
});

router.get('/messages' , verifyAdmin, async (req, res) => {
    try {
        const messages = await Message.find();
        return res.json(messages);
    } catch (err) {
        return res.status(500).json({ error: "Error in fetching messages" });
    }
});

router.delete('/message/:id', verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ error: "Message not found" });
        }
        return res.json({ deleted: true });
    } catch (err) {
        return res.status(500).json({ error: "Error in deleting message" });
    }
});

router.patch('/messages/:id', verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedMessage = await Message.findByIdAndUpdate(id, { read: true }, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ error: "Message not found" });
        }
        return res.json({ updated: true });
    } catch (err) {
        return res.status(500).json({ error: "Error in updating message" });
    }
});

export { router as MessageRouter };
