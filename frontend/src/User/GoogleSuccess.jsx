
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "../features/user/userSlice";

function GoogleSuccess() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {

            // Save JWT token
            localStorage.setItem("token", token);

            // Load user from backend
            dispatch(loadUser());

            // Redirect to home
            navigate("/");
        }

    }, [dispatch, navigate]);

    return <h2>Logging you in...</h2>;
}

export default GoogleSuccess;