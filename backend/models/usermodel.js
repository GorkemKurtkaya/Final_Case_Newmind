import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true, "Mail adresi boş bırakılamaz"],
        unique: true,
        validate: [validator.isEmail, "Mail adresi geçerli değil"]
    },
    password: {
        type: String,
        required: [true, "Şifre alanı boş bırakılamaz"],
        minLength: [3, "Şifre en az 3 karakter olmalıdır"]
    },
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
        if (error) return next(error); 
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", userSchema);

export default User;
