import React, { useEffect } from 'react'
import '../UserStyles/Profile.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PageTitle from '../components/PageTitle'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Profile() {

    const { loading, isAuthenticated, user } = useSelector(state => state.user)
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Navbar />
                    <PageTitle title={`${user.name} Profile`} />

                    <div className="premium-profile-container">

                        <div className="premium-profile-card">

                            <h1 className="profile-heading">
                                My Profile
                            </h1>

                            <div className="profile-image-wrapper">
                                <img
                                    src={user.avatar?.url || '/images/profile.png'}
                                    alt="User Profile"
                                    className="premium-profile-image"
                                />
                            </div>

                            <Link to="/profile/update" className="edit-profile-btn">
                                Edit Profile
                            </Link>

                            <div className="profile-details-grid">

                                <div className="profile-detail-card">
                                    <h3>Username</h3>
                                    <p>{user.name}</p>
                                </div>

                                <div className="profile-detail-card">
                                    <h3>Email Address</h3>
                                    <p>{user.email}</p>
                                </div>

                                <div className="profile-detail-card">
                                    <h3>Member Since</h3>
                                    <p>
                                        {user.createdAt
                                            ? String(user.createdAt).substring(0, 10)
                                            : 'N/A'}
                                    </p>
                                </div>

                            </div>

                            <div className="profile-action-buttons">
                                <Link to="/orders/user" className="profile-btn">
                                    My Orders
                                </Link>

                                <Link to="/password/update" className="profile-btn outline">
                                    Change Password
                                </Link>
                            </div>

                        </div>
                    </div>

                    <Footer />
                </>
            )}
        </>
    )
}

export default Profile