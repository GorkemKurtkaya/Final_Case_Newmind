import { registerUserService, loginUserService } from "../services/authService.js";

const registerUser = async (req, res) => {
    try {
        const user = await registerUserService(req.body);
        res.status(201).json({
            succeeded: true,
            user: user._id
        });
    } catch (error) {
        res.status(400).json({
            succeeded: false,
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUserService(email, password);


        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: 'Lax'
        });

        res.cookie("user", user._id.toString(), {
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: 'Lax'
        });

        res.status(200).json({
            succeeded: true,
            user: user._id,
            message: "Login successful"
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message
        });
    }
};



const getLogout = (req, res) => {
    res.cookie("jwt", "", {
        maxAge: 0, 
        httpOnly: true, 
        path: '/', 
        sameSite: 'Lax' 
    });

    res.cookie("user", "", {
        maxAge: 0,
        path: '/',
        sameSite: 'Lax'
    });

    res.status(200).json({
        succeeded: true,
        message: "Logged out successfully"
    });
};

export { registerUser, loginUser, getLogout };