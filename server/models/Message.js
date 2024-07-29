import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    email: { type: String, required: true },
    userID: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

const Message = mongoose.model('Messages', messageSchema);

export { Message };
