import { Schema, model, models } from "mongoose";

const chatSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    sender: {
        type: Schema.Types.String,
        ref: "User"
    },
    reciever: {
        type: Schema.Types.String,
        ref: "User"
    },
    chatId:{
        type: String,
    }

})

const Chat = models?.Chat || model("Chat", chatSchema)

export default Chat