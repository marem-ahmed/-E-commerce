// import React from 'react'

// export default function text() {
//   return (
//     <>
//      const validationSchema = Yup.object({
//       name: Yup.string()
//         .min(3, "name is too short")
//         .max(10, "name is too long")
//         .required("name is requried"),
//       email: Yup.string()
//         .email("email not valid")
//         .required("email is required"),
//       password: Yup.string()
//         .matches(/^[A-z][a-z]{3,8}$/, "invalid password")
//         .required("password is required"),
//       rePassword: Yup.string()
//         .oneOf([Yup.ref("password")])
//         .required("password required match with repassword"),
//       phone: Yup.string()
//         .matches(/^01[0125][0-9]{8}$/, "invalid phone")
//         .required("phone is required"),
//     });
//         onsubmit: (x) => console.log("hiii"),

//     </>
//   )

