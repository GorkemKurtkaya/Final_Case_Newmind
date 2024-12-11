import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUserService = async (userData) => {
    const existingUser = await User.findOne({ name: userData.name });
    if (existingUser) {
        throw new Error("Bu isimde bir kullanıcı zaten var");
    }
    const user = await User.create(userData);
    return user;
};

const loginUserService = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Yanlış email veya şifre");
    }

    const same = await bcrypt.compare(password, user.password);
    if (!same) {
        throw new Error("Yanlış email veya şifre", password, user.password);
        
    }
    

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { user, token };
};


export { registerUserService, loginUserService };