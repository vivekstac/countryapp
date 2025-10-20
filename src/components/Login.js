import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import logoImage from "../assets/img/login-banner-cropped.svg";
import Google from "../assets/img/google.svg";
import LinkedIn from "../assets/img/linkedIn.svg";
import FaceBook from "../assets/img/facebook.svg";
import Twitter from "../assets/img/twitter.svg";
import Eyes from "../assets/img/eye.svg";

function Login() {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
    });
    const [error, setError] = useState({
        userName: "",
        password: "",
    });
    const [showPw, setShowPwd] = useState(false)
    const navigate = useNavigate();

    const validatePassword = (pwd) => {
        const regex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(pwd);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newError = { userName: "", password: "" };

        if (!formData.userName) {
            newError.userName = "Username is required";
        }

        if (!validatePassword(formData.password)) {
            newError.password = "Must be 8+ chars, 1 Cap, 1 Num, & 1 Symbol";
        }

        setError(newError);

        if (!newError.userName && !newError.password) {
            localStorage.setItem("user", formData.userName);
            navigate("/home");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Container className="form-container vh-100 d-flex align-items-center">
            <div>
                <h1 className="mb-2">Sign In</h1>
                <h4 className="mb-4">New User? <span className="create-txt">&nbsp; Create an Account</span></h4>
                <Form className="form-control-main" onSubmit={handleSubmit}>
                    <Form.Group className="mb-1">
                        <Form.Control
                            name="userName"
                            className="form-input" value={formData.userName || ''}
                            placeholder="Username or Email"
                            onChange={(e) => handleChange(e)}
                            isInvalid={error.userName} />
                    </Form.Group>

                    {error.userName && <div className="text-danger pwd-error-txt text-wrap text-break">
                        {error.userName}
                    </div>}

                    <Form.Group className="mb-1 position-relative">
                        <Form.Control name="password"
                            className="form-input"
                            type={showPw ? "text" : "password"}
                            value={formData.password || ''}
                            placeholder="Enter password"
                            onChange={(e) => handleChange(e)}
                            isInvalid={error.password} />
                        {formData.password && <div className="pwd-eye-icon" onClick={() => setShowPwd(!showPw)}><img src={Eyes} alt="eye" /></div>}

                    </Form.Group>

                    {error.password && <div className="text-danger pwd-error-txt text-wrap text-break">
                        {error.password}
                    </div>}

                    <Form.Check
                        type="checkbox"
                        id="custom-checkbox"
                        className="form-checkbox"
                        label="Keep me signed in"
                        onChange={handleChange}
                    />

                    <Button type="submit">Sign In</Button>
                </Form>

                <div className="">
                    <div className="sign-in-container">
                        <div className="divider-line"></div>
                        <div className="divider-text">Or Sign In With</div>
                        <div className="divider-line"></div>
                    </div>
                    <div className="social-icons">
                        <img src={Google} alt="google" />
                        <img src={FaceBook} alt="facebook" />
                        <img src={LinkedIn} alt="LinkedIn" />
                        <img src={Twitter} alt="Twitter" />
                    </div>
                </div>
            </div>
            <div className="right-container">
                <img src={logoImage} alt="LogoImage" />
            </div>
        </Container>
    );
}

export default Login;
