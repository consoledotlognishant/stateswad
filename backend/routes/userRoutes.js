import express from "express";
import passport from "passport";

import {
    registerUser,
    loginUser,
    logout,
    requestPasswordReset,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getUsersList,
    getSingleUser,
    updateUserRole,
    deleteUser,
    googleLoginSuccess,
    verifyEmail
} from "../controller/userController.js";

import { verifyUserAuth, roleBasedAccess } from "../middleware/userAuth.js";

const router = express.Router();


// AUTH ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);


// EMAIL VERIFICATION
router.get("/verify-email/:token", verifyEmail);


// PASSWORD ROUTES
router.post("/password/forgot", requestPasswordReset);
router.post("/reset/:token", resetPassword);


// USER PROFILE
router.get("/profile", verifyUserAuth, getUserDetails);
router.put("/password/update", verifyUserAuth, updatePassword);
router.put("/profile/update", verifyUserAuth, updateProfile);


// GOOGLE OAUTH
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    googleLoginSuccess
);


// ADMIN ROUTES
router.get(
    "/admin/users",
    verifyUserAuth,
    roleBasedAccess("admin"),
    getUsersList
);

router
    .route("/admin/user/:id")
    .get(verifyUserAuth, roleBasedAccess("admin"), getSingleUser)
    .put(verifyUserAuth, roleBasedAccess("admin"), updateUserRole)
    .delete(verifyUserAuth, roleBasedAccess("admin"), deleteUser);


export default router;

