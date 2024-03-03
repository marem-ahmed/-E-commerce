import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgetPasswordPage() {
    const navigate=useNavigate()
    async function submitForget(email){
    let{data}= await axios.post( "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
      email
    }
  );
console.log(data);
if(data.message==='statusMsg'){
navigate('/login')
}
    }
    let forgetForm = useFormik({
      initialValues: {
        email: "",
      },
      onSubmit: submitForget,
    });
  return (
    <>
      <div className="container mt-5">
        <h2>please enter your verification code</h2>
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
          <button type="submit" className="btn btn-outline-success my-4">
            Verify
          </button>
        </form>
      </div>
    </>
  );
}
