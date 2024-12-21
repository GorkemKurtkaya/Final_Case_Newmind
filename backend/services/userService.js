import User from "../models/usermodel.js";




const changeNameandMailService = async (userId, newName,newMail) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.name = newName;
    user.email = newMail;
    await user.save();

    return "Name changed successfully";
};

const getUserByIdService = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};




export {  changeNameandMailService, getUserByIdService};