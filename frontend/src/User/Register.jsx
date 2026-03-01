import React, { useEffect, useState } from 'react';
import '../UserStyles/Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, removeErrors, removeSuccess } from '../features/user/userSlice';
import Navbar from '../components/Navbar';

function Register() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState('/images/profile.png');

    const { name, email, password } = user;
    const { success, loading, error } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error('Please fill out all required fields', { position: 'top-center', autoClose: 3000 });
            return;
        }

        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);

        dispatch(register(myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (success) {
            toast.success("Registration Successful", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess());
            navigate('/login');
        }
    }, [dispatch, success, navigate]);

    return (
        <>
            <Navbar />

            <div className="premium-login-container">

                <div className="premium-login-card">

                    <h2 className="login-heading">
                        Create Your Account
                    </h2>

                    <p className="login-subtitle">
                        Join our family of homemade sweetness
                    </p>

                    {/* Avatar Preview */}
                    <div className="avatar-preview-wrapper">
                        <img src={avatarPreview} alt="Avatar Preview" className="premium-avatar" />
                    </div>

                    <form className="premium-form" onSubmit={registerSubmit} encType="multipart/form-data">

                        <div className="premium-input-group">
                            <input
                                type="text"
                                name="name"
                                required
                                value={name}
                                onChange={registerDataChange}
                            />
                            <label>Full Name</label>
                        </div>

                        <div className="premium-input-group">
                            <input
                                type="email"
                                name="email"
                                required
                                value={email}
                                onChange={registerDataChange}
                            />
                            <label>Email Address</label>
                        </div>

                        <div className="premium-input-group">
                            <input
                                type="password"
                                name="password"
                                required
                                value={password}
                                onChange={registerDataChange}
                            />
                            <label>Password</label>
                        </div>

                        {/* File Upload */}
                        <div className="file-upload-wrapper">
                            <label className="file-upload-label">
                                Upload Profile Picture
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                />
                            </label>
                        </div>

                        <button className="premium-auth-btn" disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>

                        <div className="login-links">
                            Already have an account?
                            <Link to="/login"> Sign In</Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;