import React, { useEffect, useState } from 'react';
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, removeErrors, removeSuccess } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function ForgotPassword() {

    const { loading, error, success, message } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");

    const forgotPasswordEmail = (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your registered email", { position: 'top-center', autoClose: 3000 });
            return;
        }

        const myForm = new FormData();
        myForm.set('email', email);
        dispatch(forgotPassword(myForm));
    }

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (success) {
            toast.success(message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess());
            setEmail("");
        }
    }, [dispatch, success, message]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <PageTitle title="Forgot Password" />
                    <Navbar />

                    <div className="premium-login-container">

                        <div className="premium-login-card">

                            <h2 className="login-heading">
                                Reset Your Password
                            </h2>

                            <p className="login-subtitle">
                                Don’t worry — we’ll help you get back to your sweetness 🍯
                            </p>

                            <form className="premium-form" onSubmit={forgotPasswordEmail}>

                                <div className="premium-input-group">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label>Registered Email Address</label>
                                </div>

                                <button className="premium-auth-btn">
                                    Send Reset Link
                                </button>

                            </form>

                        </div>
                    </div>

                    <Footer />
                </>
            )}
        </>
    )
}

export default ForgotPassword;