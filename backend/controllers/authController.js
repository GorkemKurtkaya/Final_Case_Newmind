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
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000
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
    // JWT çerezini temizle
    res.cookie("jwt", "", {
        maxAge: 0, // Çerezi hemen sil
        httpOnly: true, // Çerezi yalnızca HTTP istekleri üzerinden erişilebilir kılar
        path: '/', // Çerezin geçerli olduğu yol
        sameSite: 'Lax' // Güvenlik için, cross-site isteklerde kullanılabilir
    });

    // Başarılı yanıt gönder
    res.status(200).json({
        succeeded: true,
        message: "Logged out successfully"
    });
};

export { registerUser, loginUser, getLogout };