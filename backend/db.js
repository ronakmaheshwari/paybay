import mongoose, { Schema } from "mongoose";
import { number } from "zod";

mongoose.connect("mongodb+srv://ronak:H0qQSnbatnu59WxV@cluster0.gq8an.mongodb.net/paytm");

const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const users = mongoose.model('users',userSchema);
const account = mongoose.model('accounts',accountSchema);

export {users,account};