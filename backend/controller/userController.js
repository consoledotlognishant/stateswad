import handleAsyncError from "../middleware/handleAsyncError.js";
import crypto from "crypto";
import HandleError from "../utils/handleError.js";
import User from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { v2 as cloudinary } from "cloudinary";



/*
================================
REGISTER USER
================================
*/
export const registerUser = handleAsyncError(async (req, res, next) => {

    const { name, email, password, avatar } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });



    if (existingUser) {

        if (!existingUser.emailVerified) {
            return res.status(400).json({
                success: false,
                message: "Email not verified. Please check your email."
            });
        }

        return next(new HandleError("User already exists", 400));
    }

    // Upload avatar if provided
    let avatarData = {};

    if (avatar) {
        const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        avatarData = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        };
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar: avatarData
    });

    // Generate email verification token
    const verifyToken = user.generateEmailVerifyToken();

    await user.save({ validateBeforeSave: false });

    const verifyURL = `https://stateswad.vercel.app/verify-email/${verifyToken}`;

    const message = `
Please verify your email by clicking the link below:

${verifyURL}

This link will expire in 15 minutes.
`;

    try {

        await sendEmail({
            email: user.email,
            subject: "Email Verification",
            message
        });

        res.status(200).json({
            success: true,
            message: `Verification email sent to ${user.email}`
        });

    } catch (error) {

        user.emailVerifyToken = undefined;
        user.emailVerifyExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new HandleError("Email could not be sent", 500));
    }

});



/*
================================
VERIFY EMAIL
================================
*/
export const verifyEmail = handleAsyncError(async (req, res, next) => {

    const token = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        emailVerifyToken: token,
        emailVerifyExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new HandleError("Invalid or expired verification link", 400));
    }

    user.emailVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});



/*
================================
LOGIN USER
================================
*/
export const loginUser = handleAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new HandleError("Email or password cannot be empty", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new HandleError("Invalid Email or password", 401));
    }

    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) {
        return next(new HandleError("Invalid Email or password", 401));
    }

    if (!user.emailVerified) {
        return next(new HandleError("Please verify your email first", 401));
    }

    sendToken(user, 200, res);
});



/*
================================
LOGOUT
================================
*/
export const logout = handleAsyncError(async (req, res) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    res.status(200).json({
        success: true,
        message: "Successfully Logged out"
    });
});



/*
================================
FORGOT PASSWORD
================================
*/
export const requestPasswordReset = handleAsyncError(async (req, res, next) => {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new HandleError("User doesn't exist", 400));
    }

    const resetToken = user.generatePasswordResetToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordURL = `${req.protocol}://${req.get("host")}/reset/${resetToken}`;

    const message = `
Use the following link to reset your password:

${resetPasswordURL}

This link will expire in 30 minutes.
`;

    try {

        await sendEmail({
            email: user.email,
            subject: "Password Reset Request",
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        });

    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new HandleError("Email couldn't be sent", 500));
    }

});



/*
================================
RESET PASSWORD
================================
*/
export const resetPassword = handleAsyncError(async (req, res, next) => {

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new HandleError("Token is invalid or expired", 400));
    }

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return next(new HandleError("Passwords do not match", 400));
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});



/*
================================
GET USER DETAILS
================================
*/
export const getUserDetails = handleAsyncError(async (req, res) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });

});



/*
================================
UPDATE PASSWORD
================================
*/
export const updatePassword = handleAsyncError(async (req, res, next) => {

    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    const isMatch = await user.verifyPassword(oldPassword);

    if (!isMatch) {
        return next(new HandleError("Old password is incorrect", 400));
    }

    if (newPassword !== confirmPassword) {
        return next(new HandleError("Passwords do not match", 400));
    }

    user.password = newPassword;

    await user.save();

    sendToken(user, 200, res);
});



/*
================================
UPDATE PROFILE
================================
*/
export const updateProfile = handleAsyncError(async (req, res) => {

    const { name, email, avatar } = req.body;

    const newData = { name, email };

    if (avatar) {

        const user = await User.findById(req.user.id);

        if (user.avatar?.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id);
        }

        const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newData, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        user
    });
});



/*
================================
GOOGLE LOGIN SUCCESS
================================
*/
export const googleLoginSuccess = async (req, res) => {

    const user = req.user;

    const token = user.getJWTToken();

    res.redirect(
        `https://stateswad.vercel.app/google-success?token=${token}`
    );
};



/*
================================
ADMIN CONTROLLERS
================================
*/

export const getUsersList = handleAsyncError(async (req, res) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
});


export const getSingleUser = handleAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new HandleError("User doesn't exist", 400));
    }

    res.status(200).json({
        success: true,
        user
    });

});


export const updateUserRole = handleAsyncError(async (req, res) => {

    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        user
    });

});


export const deleteUser = handleAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new HandleError("User doesn't exist", 400));
    }

    if (user.avatar?.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    });

});