import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    liked: {
        type: Array
    },
    reviews: {
        productCode: String,
        content: String,
        grade: {
            type: Number,
            min: 0,
            max: 5
        }
    }
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
});

const User = model('User', userSchema)

export default User;