import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/Token";
import { Helmet } from "react-helmet";
import ForgetPasswordPage from "../ForgetPasswordPage/ForgetPasswordPage";

export default function Login() {
  const [userName, setUserName] = useState("");
  let {settoken,callLogin,errMessage,seterrMessage,isLoading,setisLoading,userInfo,setUserInfo,isUserLogin} = useContext(TokenContext);
  const navigate = useNavigate();
if(isUserLogin==true){
  navigate('/')
}
  function forGetPass() {
    navigate("/forgetpasswordpage");
    console.log("mmmmm");
  }

  const validate = Yup.object({
    email: Yup.string().email("email not valid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Za-z\d@$!%*#?&]{8,}$/, "invalid password")
      .required("password is required"),
  });
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: callLogin,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      ;
      <div className="w-50 mx-auto my-5">
        <h2 className="">Login Now:</h2>
        {errMessage ? (
          <div className="alert alert-danger">{errMessage}</div>
        ) : null}
        <form onSubmit={loginForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.errors.email && loginForm.touched.email ? (
              <div className="p-2 alert alert-danger my-2">
                {loginForm.errors.email}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password">password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              id="password"
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.errors.password && loginForm.touched.password ? (
              <div className="p-2 alert alert-danger my-2">
                {loginForm.errors.password}
              </div>
            ) : null}
          </div>
          <div className="d-flex justify-content-between">
            <Link to={"/forget"}>forget your password?</Link>
            <button
              type="submit"
              className="btn bg-main text-white d-block ms-auto"
            >
              {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
