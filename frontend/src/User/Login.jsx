import React, { useEffect, useState } from 'react';
import '../UserStyles/Form.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, removeErrors, removeSuccess } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

function Login() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const { error, loading, success, isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = new URLSearchParams(location.search).get("redirect") || "/";

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email: loginEmail, password: loginPassword }))
    }
    const googleLogin = () => {
        window.location.href = "https://stateswad.onrender.com/api/v1/auth/google";
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect)
        }
    }, [isAuthenticated, navigate, redirect])

    useEffect(() => {
        if (success) {
            toast.success('Login Successful', { position: 'top-center', autoClose: 3000 })
            dispatch(removeSuccess())
        }
    }, [dispatch, success])

    return (
        <>
            <Navbar />

            <div className="premium-login-container">

                <div className="premium-login-card">

                    <h2 className="login-heading">
                        Welcome Back
                    </h2>

                    <p className="login-subtitle">
                        Sign in to continue enjoying homemade sweetness
                    </p>

                    <form className='premium-form' onSubmit={loginSubmit}>

                        <div className="premium-input-group">
                            <input
                                type="email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <label>Email Address</label>
                        </div>

                        <div className="premium-input-group">
                            <input
                                type="password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <label>Password</label>
                        </div>

                        <button className="premium-auth-btn" disabled={loading}>
                            {loading ? "Signing In..." : "Sign In"}
                        </button>

                        <div className="divider">
                            <br />
                            <span>OR</span>
                        </div>

                        <button
                            type="button"
                            className="google-auth-btn"
                            onClick={googleLogin}
                        >
                            <img className='google-auth-btn-img' src="/images/google.png" alt="" />
                        </button>
                        <div className="login-links">
                            <Link to="/password/forgot">Forgot Password?</Link>
                            <span>•</span>
                            <Link to="/register">Create Account</Link>
                        </div>
                        <div className="email-verification-warning">
                            ⚠️ Verification email may land in your <b>Spam</b> folder.
                            Please check it if you don’t see it in your inbox.
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}

export default Login;