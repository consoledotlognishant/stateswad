
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:
                "https://stateswad.onrender.com/api/v1/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {

                const email = profile.emails[0].value;

                // 1️⃣ Check if user already exists with this email
                let user = await User.findOne({ email });

                if (user) {

                    // If the user exists but has no googleId yet, attach it
                    if (!user.googleId) {
                        user.googleId = profile.id;
                        user.emailVerified = true;
                        await user.save();
                    }

                } else {

                    // 2️⃣ Create new user if not found
                    user = await User.create({
                        name: profile.displayName,
                        email: email,
                        googleId: profile.id,
                        emailVerified: true
                    });

                }

                done(null, user);

            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;

