import React from 'react'
import { useFormik } from "formik";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export default function ResetPassword() {
    let navigate = useNavigate();
    async function resetPassword(values) {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );
      if(data.token){
        navigate('/login')
      }
      console.log(data);
    }
    const resetPasswordForm = useFormik({
      initialValues: {
        email: "",
        newPassword: "",
      },
      onSubmit: resetPassword,
    });
  return (
    <>
      <div className="container mt-5">
        <h2>reset your account password</h2>
        <form onSubmit={resetPasswordForm.handleSubmit}>
          <div className="form-group mt-3">
            <input
              type="email"
              id="name"
              name="email"
              placeholder="Email"
              className="form-control"
              value={resetPasswordForm.values.email}
              onChange={resetPasswordForm.handleChange}
            />
          </div>
          {resetPasswordForm.touched.email && resetPasswordForm.errors.email ? (
            <div className="alert alert-danger ">
              {" "}
              {resetPasswordForm.errors.email}{" "}
            </div>
          ) : (
            ""
          )}
          <div className="form-group mt-3">
            <input
              type="password"
              id="resetPassword"
              name="newPassword"
              placeholder="Password"
              className="form-control"
              value={resetPasswordForm.values.newPassword}
              onChange={resetPasswordForm.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-outline-success my-4">
            Reset
          </button>
        </form>
      </div>
    </>
  );
}
