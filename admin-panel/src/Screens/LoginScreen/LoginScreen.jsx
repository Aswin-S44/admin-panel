import React, { useState } from "react";
import "./LoginScreen.css";
import { loginUser } from "../../services/api";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [otpRequired, setOtpRequired] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false); 
    try {
      let res = await loginUser(username, password);
      if (res && res.data && res.data.status === 200) {
        setLoading(false);
        setError(false);
        setUser(res.data.data);
        setOtpRequired(true);
      } else {
        setLoading(false);
        setError(true);
        setMessage("No user found");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setMessage("Something went wrong");
    }
  };

  const validateOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    if (securityCode === user.otp) {
      setLoading(false);
      setError(false);
      localStorage.setItem("user_info", JSON.stringify(user));
      window.location.href = "/home";
    } else {
      setError(true);
      setMessage("Wrong OTP");
    }
  };

  return (
    <div className="loginContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="loginBox p-4">
              {!otpRequired ? (
                <form onSubmit={handleSubmit}>
                  <h2 className="login-title text-center font-500">Login</h2>
                  {error && (
                    <div className="error">
                      <p className="error-text">{message}</p>
                    </div>
                  )}
                  <div className="form-group mt-3">
                    <label htmlFor="username" className="font-400">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                      className="form-control w-100"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="font-400">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="form-control"
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <>Please wait....</> : <>Submit</>}
                  </button>
                </form>
              ) : (
                <form onSubmit={validateOtp}>
                  <h2 className="login-title text-center font-500">
                    OTP Validation
                  </h2>
                  {error && (
                    <div className="error">
                      <p className="error-text">{message}</p>
                    </div>
                  )}
                  <div className="form-group mt-3">
                    <label htmlFor="securityCode" className="font-400">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      id="securityCode"
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      placeholder="Enter the OTP sent to your email"
                      required
                      className="form-control w-100"
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <>Please wait....</> : <>Validate OTP</>}
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
