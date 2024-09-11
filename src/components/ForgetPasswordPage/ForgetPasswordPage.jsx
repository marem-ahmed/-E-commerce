import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import { useState } from 'react';
import * as Yup from "yup";

export default function ForgetPasswordPage() {
  let[isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()


    async function submitForget(email){
      setIsLoading(true)
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      
        email,
      
    );
console.log(data);
if (data.statusMsg === "success") {
  toast.success(" Reset code sent to your email...");
  navigate('/verfiy')
} else {
  toast.error("error");
}
    }

     let validationSchema = Yup.object({
       email: Yup.string()
         .email("email not valid")
         .required("email is required"),
     });
    let forgetForm = useFormik({
      initialValues: {
        email: "",
      },
      onSubmit: submitForget,
      validationSchema
    });
    if (isLoading) return <Loader></Loader>;
  return (
    <>
      <div className="container mt-5">
        <h2>please enter your Email</h2>
        <form onSubmit={forgetForm.handleSubmit}>
          <div className="form-group mt-3">
            <input
              type="email"
              id="name"
              name="email"
              placeholder="Email"
              className="form-control"
              value={forgetForm.values.email}
              onChange={forgetForm.handleChange}
            />
          </div>
          {forgetForm.touched.email && forgetForm.errors.email ? (
            <div className="alert alert-danger ">
              {" "}
              {forgetForm.errors.email}{" "}
            </div>
          ) : (
            ""
          )}
          <button type="submit" className="btn btn-outline-success my-4">
            Verify
          </button>
        </form>
      </div>
    </>
  );
}
