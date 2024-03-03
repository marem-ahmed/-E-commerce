import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  import { Helmet } from "react-helmet";

export default function Register  () {
 
  const [errMessage,seterrMessage]=useState(false)
  const[isLoading,setisLoading]=useState(false)
    const navigate = useNavigate();

  async function callResigster(requestResigster){
    seterrMessage("")
    setisLoading(true)
     let {data} = await axios.post(
       `https://ecommerce.routemisr.com/api/v1/auth/signup`,
       requestResigster
     ).catch(
      err=>
      { 
        setisLoading(false);
        seterrMessage(err.response.data.message)}
      );
     if(data.message==='success'){
       navigate('/home')
     }
  }
  const validate = Yup.object({
    name: Yup.string()
      .min(3, "name is too short")
      .max(10, "name is too long")
      .required("name is requried"),
    email: Yup.string().email("email not valid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Za-z\d@$!%*#?&]{8,}$/, "invalid password")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")])
      .required("password required match with repassword"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "invalid phone"),
  });
     const registerForm = useFormik({
       initialValues: {
         name: "",
         email: "",
         password: "",
         rePassword: "",
         phone: "",
       },
       onSubmit: callResigster,
       validationSchema: validate,
     });

   return (
     <>
       <Helmet>
         <title>Register</title>
       </Helmet>
       ;
       <div className="w-50 mx-auto my-5">
         <h2 className="">Register Now:</h2>
         {errMessage ? (
           <div className="alert alert-danger">{errMessage}</div>
         ) : null}
         <form onSubmit={registerForm.handleSubmit}>
           <div className="form-group mb-2">
             <label htmlFor="name"> Name</label>
             <input
               type="text"
               className="form-control"
               name="name"
               id="name"
               value={registerForm.values.name}
               onChange={registerForm.handleChange}
               onBlur={registerForm.handleBlur}
             />
             {registerForm.errors.name && registerForm.touched.name ? (
               <div className="p-2 alert alert-danger my-2">
                 {registerForm.errors.name}
               </div>
             ) : null}
           </div>
           <div className="form-group mb-2">
             <label htmlFor="name">Email</label>
             <input
               type="text"
               className="form-control"
               name="email"
               id="email"
               value={registerForm.values.email}
               onChange={registerForm.handleChange}
               onBlur={registerForm.handleBlur}
             />
             {registerForm.errors.email && registerForm.touched.email ? (
               <div className="p-2 alert alert-danger my-2">
                 {registerForm.errors.email}
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
               value={registerForm.values.password}
               onChange={registerForm.handleChange}
               onBlur={registerForm.handleBlur}
             />
             {registerForm.errors.password && registerForm.touched.password ? (
               <div className="p-2 alert alert-danger my-2">
                 {registerForm.errors.password}
               </div>
             ) : null}
           </div>
           <div className="form-group mb-2">
             <label htmlFor="name">RePassword</label>
             <input
               type="password"
               className="form-control"
               name="rePassword"
               id="rePassword"
               value={registerForm.values.rePassword}
               onChange={registerForm.handleChange}
               onBlur={registerForm.handleBlur}
             />
             {registerForm.errors.rePassword &&
             registerForm.touched.rePassword ? (
               <div className=" p-2 alert alert-danger my-2">
                 {registerForm.errors.email}
               </div>
             ) : null}
           </div>
           <div className="form-group mb-2">
             <label htmlFor="phone">Phone</label>
             <input
               type="tel"
               className="form-control"
               name="phone"
               id="phone"
               value={registerForm.values.phone}
               onChange={registerForm.handleChange}
               onBlur={registerForm.handleBlur}
             />
             {registerForm.errors.phone && registerForm.touched.phone ? (
               <div className="p-2 alert alert-danger my-2">
                 {registerForm.errors.email}
               </div>
             ) : null}
           </div>
           <button
             type="submit"
             className="btn bg-main text-white d-block ms-auto"
           >
             {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Submit"}
           </button>
         </form>
       </div>
     </>
   );
  };
 
 

