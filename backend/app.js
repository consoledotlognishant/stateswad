import express from 'express';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import errorHandleMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import passport from "./config/passport.js";
import session from "express-session";

const app = express();

/*
==============================
BODY PARSER (IMPORTANT)
==============================
*/
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/*
==============================
COOKIES
==============================
*/
app.use(cookieParser());

/*
==============================
FILE UPLOAD
==============================
*/
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 }
}));

/*
==============================
SESSION (FOR GOOGLE OAUTH)
==============================
*/
app.use(
    session({
        secret: "stateswad_secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            sameSite: "none"
        }
    })
);

/*
==============================
PASSPORT
==============================
*/
app.use(passport.initialize());
app.use(passport.session());

/*
==============================
CORS (VERY IMPORTANT)
==============================
*/
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://stateswad.vercel.app"
    ],
    credentials: true
}));

/*
==============================
ROUTES
==============================
*/
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

/*
==============================
ERROR MIDDLEWARE
==============================
*/
app.use(errorHandleMiddleware);

export default app;