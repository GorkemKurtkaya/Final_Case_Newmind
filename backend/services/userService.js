import User from "../models/usermodel.js";
import bcrypt from 'bcryptjs';



// BURDA BİR HATA VAR ŞİFRE DEĞİŞTİRİNCE KOMPLE ŞİFRE BOZULUYOR BUNU ÇÖZECEM
const changePasswordService = async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const same = await bcrypt.compare(oldPassword, user.password);
    if (!same) {
        console.log("Password mismatch"); // Eski parolayı doğrulamada hata
        throw new Error("Invalid password");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    console.log("yeni password", newPassword);
    console.log("hashedNewPassword", hashedNewPassword);
    console.log("eski password", oldPassword);

    return "Password changed successfully";
};

const changeNameService = async (userId, newName) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.name = newName;
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

const getUserStatsService = async (lastYear) => {
    const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 },
            },
        },
    ]);

    return data;
};


export { changePasswordService, changeNameService, getUserByIdService, getUserStatsService };