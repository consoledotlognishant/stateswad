import React, { useEffect, useState } from 'react';
import '../UserStyles/Form.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeErrors, removeSuccess, updateProfile } from '../features/user/userSlice';
import Loader from '../components/Loader';

function UpdateProfile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState('/images/profile.png');

    const { user, error, success, message, loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profileImageUpdate = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const updateSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (success) {
            toast.success(message);
            dispatch(removeSuccess());
            navigate("/profile");
        }
    }, [dispatch, success, navigate]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar?.url || '/images/profile.png');
        }
    }, [user]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <Navbar />
                    <PageTitle title="Update Profile" />

                    <div className="premium-login-container">

                        <div className="premium-login-card">

                            <h2 className="login-heading">Update Profile</h2>
                            <p className="login-subtitle">
                                Keep your profile updated and professional.
                            </p>

                            <div className="avatar-preview-wrapper">
                                <img
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    className="premium-avatar"
                                />
                            </div>

                            <form onSubmit={updateSubmit} encType="multipart/form-data">

                                <div className="file-upload-wrapper">
                                    <label className="file-upload-label">
                                        Change Profile Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={profileImageUpdate}
                                        />
                                    </label>
                                </div>

                                <div className="premium-input-group">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <label>Full Name</label>
                                </div>

                                <div className="premium-input-group">
                                    <input
                                        type="email"
                                        placeholder=" "
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <label>Email Address</label>
                                </div>

                                <button className="premium-auth-btn">
                                    Save Changes
                                </button>

                            </form>

                        </div>
                    </div>

                    <Footer />
                </>
            )}
        </>
    );
}

export default UpdateProfile;