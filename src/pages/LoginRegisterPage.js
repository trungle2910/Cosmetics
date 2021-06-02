import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/actions/auth.actions";
import { routeActions } from "../redux/actions/route.actions";

const LoginRegisterPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [registerFrom, setRegisterFrom] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const handleRegisterChange = (e) => {
    setRegisterFrom({ ...registerFrom, [e.target.name]: e.target.value });
  };
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const { name, email, password, role } = registerFrom;
    dispatch(authActions.register({ name, email, password, role }));
  };

  const [loginFrom, setLoginFrom] = useState({
    email: "",
    password: "",
  });
  const handleLoginChange = (e) => {
    setLoginFrom({ ...loginFrom, [e.target.name]: e.target.value });
  };
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginFrom;
    dispatch(authActions.login({ email, password }));
  };

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);
  return (
    <>
      <h1>Login and register</h1>
      <div
        className={!isActive ? "container" : "container right-panel-active"}
        style={{ width: "800px" }}
      >
        <div className="form-container sign-up-container">
          <form className="formInput" onSubmit={handleSubmitRegister}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              className="inputBox"
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleRegisterChange}
            />
            <input
              className="inputBox"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleRegisterChange}
            />
            <input
              className="inputBox"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleRegisterChange}
            />
            <button className="SingUpButton" type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="formInput" onSubmit={handleSubmitLogin}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input
              className="inputBox"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleLoginChange}
            />
            <input
              className="inputBox"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleLoginChange}
            />
            <a href="#">Forgot your password?</a>
            <button className="SingUpButton" type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="SingUpButtonGhost SingUpButton"
                id="signIn"
                onClick={() => {
                  setIsActive(false);
                }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="SingUpButtonGhost SingUpButton"
                id="signUp"
                onClick={() => {
                  setIsActive(true);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRegisterPage;
