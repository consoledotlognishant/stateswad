import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import API from "../utils/api";
import { loadUser } from "../features/user/userSlice";

function VerifyEmail() {

    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        const verify = async () => {

            try {

                const { data } = await API.get(`/api/v1/verify-email/${token}`);

                if (data.success) {

                    // Save token
                    localStorage.setItem("token", data.token);

                    // Load user into Redux (VERY IMPORTANT)
                    dispatch(loadUser());

                    // Redirect to home
                    navigate("/");

                }

            } catch (error) {

                console.error(error);

                navigate("/login");

            }

        };

        verify();

    }, [token, navigate, dispatch]);

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Verifying your email...</h2>
            <p>Please wait while we activate your account.</p>
        </div>
    );
}

export default VerifyEmail;