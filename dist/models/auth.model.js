import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
//create user schema 
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    confirmPassword: String,
    isAdmin: { type: Boolean, default: false }
});
//create user model
const User = mongoose.model('User', userSchema);
export const createNewUser = async (username, email, password) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            console.log('Email is alreadt exist');
            return null;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        let newUser = new User({
            username: username,
            email: email,
            password: hashPassword
        });
        await newUser.save();
        return newUser;
    }
    catch (error) {
        console.log('Error creating new user : ', error);
        throw error;
    }
};
export const login = async (email, password) => {
    try {
        //check for email 
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Email is not exist');
            return null;
        }
        //check for password
        const same = await bcrypt.compare(password, user.password);
        if (!same) {
            console.log('Password is incorrect');
            return null;
        }
        //return user id 
        return { id: user._id, isAdmin: user.isAdmin ?? false };
    }
    catch (error) {
        console.log('Error in login :', error);
        throw error;
    }
};
export const getUserByUserId = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    }
    catch (error) {
        console.log('Error in getting email:', error);
        throw error;
    }
};
