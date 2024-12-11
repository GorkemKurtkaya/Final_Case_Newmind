import {
    changePasswordService,
    changeNameService,
    getUserByIdService,
    getUserStatsService
} from "../services/userService.js";

const changePassword = async (req, res) => {
    try {
        const message = await changePasswordService(
            res.locals.user._id,
            req.body.oldPassword,
            req.body.newPassword
        );

        res.status(200).json({
            succeeded: true,
            message,
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message,
        });
    }
};

const changeName = async (req, res) => {
    try {
        const message = await changeNameService(res.locals.user._id, req.body.name);

        res.status(200).json({
            succeeded: true,
            message,
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message,
        });
    }
};

const getAUser = async (req, res) => {
    try {
        const user = await getUserByIdService(req.params.id);

        res.status(200).json({
            name: user.username,
            email: user.email,
            id: user._id,
        });
    } catch (error) {
        res.status(400).json({
            succeeded: false,
            error: error.message,
        });
    }
};

const getUserStats = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                succeeded: false,
                message: "Access denied",
            });
        }

        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        const data = await getUserStatsService(lastYear);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error: error.message,
        });
    }
};

export { changePassword, changeName, getAUser, getUserStats };