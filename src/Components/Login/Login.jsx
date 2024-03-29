import React, { useEffect, useState } from "react";
import "./Login.css";
import { GrDocumentImage } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../features/LoginAction";
import { resetLoginError } from "../../features/LoginSlice";
import Cookies from "js-cookie";
import { userLogined } from "../../features/LoginSlice";
import { userLogout } from "../../features/LoginSlice";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { error } = useSelector((state) => state.login || {});
  const { is_Authenticated, user } = useSelector((state) => state.login);

  const userInfoCookie =
    !!Cookies.get("accessToken") && !!Cookies.get("detail");
  useEffect(() => {
    userInfoCookie ? dispatch(userLogined()) : dispatch(userLogout());
  }, [userInfoCookie]);

  useEffect(() => {
    if (is_Authenticated && user.isSuperuser) {
      navigator("/adminpage");
    } else if (is_Authenticated && !user.isSuperuser) {
      navigator("/userdashboard");
    }
  }, [is_Authenticated]);

  useEffect(() => {
    dispatch(resetLoginError());
  }, [email, password]);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(regex.test(value) ? "" : "Invalid email");
  };
  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  }

  const validatePassword = (value) => {
    const regex = /^.{8,}$/;
    setPasswordError(
      regex.test(value) ? "" : "Password must be at least 8 characters"
    );
  };
  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  }

  function submitForm(e) {
    e.preventDefault();
    if (!EmailError && !PasswordError) {
      const data = {
        email: email,
        password: password,
      };
      const respo = dispatch(LoginUser(data));
      console.log(respo);
    } else {
      toast.error(EmailError ? EmailError : PasswordError);
    }
  }

  return (
    <>
      <div className="w-full h-[700px] flex ">
        <div className="w-[60%] max-lg:hidden h-full rounded-r-xl grid items-center justify-center">
          <div className="flex flex-shrink-0 flex-col items-center ">
            <div className="flex">
              <span>
                <GrDocumentImage className="h-20 w-auto text-green-800" />
              </span>
              <span className="font-black text-8xl text-green-800">magify</span>
            </div>
          </div>
        </div>
        <div className="lg:w-[40%] w-full  h-full bg-slate-200 rounded-l-lg flex flex-col justify-center items-center">
          <section className="section_form max-sm:w-full max-sm:items-center max-sm:flex max-sm:flex-col">
            <div className="flex flex-shrink-0 max-sm:mx-auto flex-col items-center lg:hidden">
              <div className="flex">
                <span>
                  <GrDocumentImage className="h-10 w-auto text-green-800" />
                </span>
                <span className="font-black text-3xl text-green-800 mb-8">
                  magify
                </span>
              </div>
            </div>
            <div className="text-3xl max-sm:text-xl max-sm:px-9 font-bold ">
              LOGIN
            </div>
            <form
              id="consultation-form max-sm:text-xs login"
              className="feed-form  max-[320px]:w-[98%]"
              onSubmit={(e) => submitForm(e)}
            >
              <input
                name="email"
                className={
                  EmailError || (error && error.email)
                    ? "input-changed max-[320px]:w-[98%]"
                    : "input1 max-[320px]:w-[98%]"
                }
                required=""
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e)}
              />
              <div className="error h-[10px] text-red-600">
                {error && error.email ? error.email : EmailError}
              </div>
              <input
                name="password"
                className={
                  PasswordError || (error && error.password)
                    ? "input-changed max-[320px]:w-[98%]"
                    : "input1 max-[320px]:w-[98%]"
                }
                required=""
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
              />
              <div className="error h-[10px] text-red-600">
                {error && error.password ? error.password : PasswordError}
              </div>
              <button className="button_submit max-[320px]:w-[98%]">
                LOGIN
              </button>
            </form>
          </section>
          <span className="text-xs mt-4 text-gray-800">
            Not a user?
            <Link className="  text-green-800" to="/signup">
              Create account
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
