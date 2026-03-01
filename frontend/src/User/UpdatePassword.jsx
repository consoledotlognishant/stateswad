import React, { useEffect, useState } from 'react';
import '../UserStyles/Form.css'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeErrors, removeSuccess, updatePassword } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function UpdatePassword() {

  const { success, loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Password Updated Successfully");
      dispatch(removeSuccess());
      navigate("/profile");
    }
  }, [dispatch, success, navigate]);

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <Navbar />
          <PageTitle title="Update Password" />

          <div className="premium-login-container">

            <div className="premium-login-card">

              <h2 className="login-heading">Update Password</h2>
              <p className="login-subtitle">
                Keep your account secure with a strong password.
              </p>

              <form onSubmit={updatePasswordSubmit}>

                <div className="premium-input-group">
                  <input
                    type="password"
                    placeholder=" "
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <label>Current Password</label>
                </div>

                <div className="premium-input-group">
                  <input
                    type="password"
                    placeholder=" "
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <label>New Password</label>
                </div>

                <div className="premium-input-group">
                  <input
                    type="password"
                    placeholder=" "
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label>Confirm Password</label>
                </div>

                <button className="premium-auth-btn">
                  Update Password
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

export default UpdatePassword;