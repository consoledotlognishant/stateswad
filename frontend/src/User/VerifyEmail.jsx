import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

function VerifyEmail() {

    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const verify = async () => {

            try {

                const { data } = await API.get(`/api/v1/verify-email/${token}`);

                if (data.success) {

                    localStorage.setItem("token", data.token);

                    navigate("/");
                }

            } catch (error) {
                console.log(error);
            }

        };

        verify();

    }, [token, navigate]);

    return <h2>Verifying your email...</h2>;
}

export default VerifyEmail;