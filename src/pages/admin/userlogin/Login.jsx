import React, { useState } from "react";
import OfflineCaptcha from "../../../components/captcha/OfflineCaptcha";
import { useToast } from "../../../components/toster/Toast";
import { loginUser } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetCaptcha, setResetCaptcha] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // 

  const { showToast } = useToast();
  const navigate = useNavigate();

  const isFormValid = email.trim() && password.trim() && captchaValue;

const handleSubmit = async (e) => {
  e.preventDefault();
  setFormSubmitted(true); // ✅ Trigger captcha error display

  if (!email.trim() || !password.trim() || !captchaValue) {
    showToast("Please fill in all fields and complete the captcha.", "error");
    setCaptchaValue(false); // Reset captcha verification
    setResetCaptcha((prev) => !prev); // ✅ Refresh captcha
    return;
  }

  setLoading(true);

  try {
    const res = await loginUser(email, password);
    console.log(res);

    if (res.success) {
      showToast("Login Successful!", "success");
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("userRole", res.data.role);
      setFormSubmitted(false); // ✅ Reset submission flag

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      showToast("Login failed. Please try again.", "error");
      setCaptchaValue(false);
      setResetCaptcha((prev) => !prev); // ✅ Refresh captcha
    }
  } catch (error) {
    console.error("Login error:", error);
    showToast("An error occurred during login. Please try again.", "error");
    setCaptchaValue(false);
    setResetCaptcha((prev) => !prev); // ✅ Refresh captcha
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <OfflineCaptcha
          onVerify={setCaptchaValue}
          isReset={resetCaptcha}
          showError={formSubmitted} //Show captcha error only after submission
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
