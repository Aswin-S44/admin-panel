import React, { useState } from "react";
import "./LoginScreen.css";
import { loginUser } from "../../services/api";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [twofaEnabled, set2faEnabled] = useState(false);
  const [securityCode, setSecurityCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await loginUser(username, password);
      if (res && res.data && res.data.status == 200) {
        setLoading(false);
        setError(false);
        set2faEnabled(res?.data?.data?.enable2fa);
        setValidationSuccess(true);
        setUser(res?.data?.data);
      } else {
        setLoading(false);
        setError(true);
        setMessage("No user found");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setMessage("Something went wrong");
    }
  };

  const validateSecurityCode = async (e) => {
    e.preventDefault();
    if (securityCode === user?.securityCode) {
      setError(false);
      setMessage("");
      localStorage.setItem("user_info", JSON.stringify(user));
      window.location.href = "/home";
    } else {
      setError(true);
      setMessage("Wrong security code");
    }
  };

  return (
    <div className="loginContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="loginBox p-4">
              <form onSubmit={handleSubmit}>
                <h2 className="login-title text-center font-500">Login</h2>

                {error && (
                  <div className="error">
                    <p className="error-text">{message}</p>
                  </div>
                )}

                <div className="form-group mt-3">
                  <label htmlFor="email" className="font-400">
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

                {twofaEnabled && (
                  <div className="form-group">
                    <label htmlFor="password">Secret Key</label>
                    <input
                      type="password"
                      id="2facode"
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      placeholder="Enter your Security Code"
                      required
                      className="form-control"
                    />
                  </div>
                )}

                {validationSuccess ? (
                  <button
                    className="btn btn-success"
                    onClick={validateSecurityCode}
                  >
                    {" "}
                    Submit
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Please wait" : "Validate"}
                  </button>
                )}
              </form>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
