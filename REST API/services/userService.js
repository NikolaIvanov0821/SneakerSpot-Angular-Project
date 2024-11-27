import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/User.js";

const userService = {
    async register(username, email, password) {
        const user = await User.findOne({ email });

        if (user) {
            throw new Error('User already exists');
        }

        const createdUser = await User.create(username, email, password);

        return generateResponse(createdUser);
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid user of password');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid user of password');
        }

        return generateResponse(user);
    },
    logout() {
        // TODO: Invalidate token
        
        return true;
    }
}

function generateResponse(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, 'MYSECRET', { expiresIn: '2h' });

    return {
        _id: user._id,
        email: user.email,
        accessToken: token,
    };
}

export default userService;