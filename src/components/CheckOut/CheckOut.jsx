import { Formik, useFormik } from 'formik'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { CartContext } from '../../Context/cart';
import { Helmet } from "react-helmet";

export default function CheckOut() {
     <Helmet>
       <title>CheckOut</title>
     </Helmet>;
   let{onlinePayment}= useContext(CartContext);
  
  
    async function paymentSubmit(shippingAddress) {
      console.log(shippingAddress);
      let { data } = await onlinePayment(shippingAddress);
      window.location.href = data.session.url;
    };
    let paymentForm = useFormik({
      initialValues: {
       
          details: "details",
          phone: "",
          city: "",
        
      },
       onSubmit: paymentSubmit,
    });
  return (
    <>
      <div className="container bg-main-light mt-5 p-4 ">
        <h2>Shipping:</h2>
        <form onSubmit={paymentForm.handleSubmit}>
          <div className="form-group">
            <label htmlFor="details">Details</label>
            <input
              type="text"
              className="form-control"
              name="details"
              id="details"
              value={paymentForm.values.details}
              onChange={paymentForm.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              id="phone"
              value={paymentForm.values.phone}
              onChange={paymentForm.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              id="city"
              value={paymentForm.values.city}
              onChange={paymentForm.handleChange}
            />
          </div>

          <button
          type='submit'
            className="btn bg-main w-100 text-light mt-5"
          >
            payment Now
          </button>
        </form>
      </div>
    </>
  );
}
