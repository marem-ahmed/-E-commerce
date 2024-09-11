import React from 'react'
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import { useState } from "react";
import * as Yup from "yup";


export default function VerfiyCode() {
      let navigate = useNavigate();

      let [isLoading, setIsLoading] = useState(false);
 async function verifyCode(values) {
   setIsLoading(true);

   const { data } = await axios.post(
     `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
     values
   );
   console.log(data);

   if (data.status === "Success") {
     setIsLoading(false);
     navigate("/reset");
   }
 }
  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Enter Your Code"),
  });

  const verifyFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyCode,
    validationSchema: validationSchema2,
  });
    
    if (isLoading) return <Loader/>
      return (
        <>
          <div className="container mt-5">
            <h2>please enter your code</h2>
            <form onSubmit={verifyFormik.handleSubmit}>
              <div className="form-group mt-3">
                <input
                  type="text"
                  id="code"
                  name="resetCode"
                  placeholder="code"
                  className="form-control"
                  value={verifyFormik.values.code}
                  onChange={verifyFormik.handleChange}
                />
              </div>
              {verifyFormik.touched.code && verifyFormik.errors.code ? (
                <div className="alert alert-danger ">
                  {" "}
                  {verifyFormik.errors.code}{" "}
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
