import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Invalid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [3, "Password must be at least 3 characters long"]
    },
    // address: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Address"
    // }
    // ],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });


userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.hash(user.password, 10, (error, hash) => {
        if (error) return next(error); // Hata kontrolü eklendi
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", userSchema);

export default User;
