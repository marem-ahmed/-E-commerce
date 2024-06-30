import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/cart';
import { useQuery } from 'react-query';
import CheckOut from './../CheckOut/CheckOut';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loader from '../Loader/Loader';

export default function Cart() {
  

const [cartDetails,setcartDetails]=useState({})
let { getCartDetails, removeItemfromCart, updateItemfromCart, setnumOfItems } =
  useContext(CartContext);
 async function getCartProducts(){
let {data}=await getCartDetails()
if(data){
  setcartDetails(data);
  setnumOfItems(data.numOfCartItems);
}
  
 }
 async function removeItem(id){
 let {data}= await removeItemfromCart(id)
 setcartDetails(data)
setnumOfItems(data.numOfCartItems);

}
 async function updateItem(id,count) {
   let { data } = await updateItemfromCart(id, count);
   setcartDetails(data);

 }
   useEffect(
     () =>{ getCartProducts()},
[]
   );
  return (
    <>
      <Helmet>
        <title>My Cart</title>
      </Helmet>
      ;
      {cartDetails?.data ? (
        <div className="container bg-main-light mt-5 p-4">
          <h2>Shop Cart:</h2>
          <p className="text-main">
            Total cart Price:{cartDetails.data.totalCartPrice} EGP
          </p>
          {cartDetails.data.products.map((ele) => {
            return (
              <div className="row my-3 border-bottom" key={ele.id}>
                <div key={ele.product._id} className="col-md-1 ">
                  <img src={ele.product.imageCover} alt="" className="w-100" />
                </div>
                <div className="col-md d-flex justify-content-between align-items-center  my-3">
                  <div>
                    <h4>{ele.product.title}</h4>
                    <p className="text-main">{ele.price}:EGP</p>
                    <button
                      onClick={() => removeItem(ele.product._id)}
                      className="btn btn-outline-danger mb-3"
                    >
                      <i className="fas fa-trash pe-2 "></i>Remove
                    </button>
                  </div>
                  <div className="d-flex align-items-center ">
                    <button
                      onClick={() =>
                        updateItem(ele.product._id, ele.product.count)
                      }
                      className="btn btn-outline-success"
                    >
                      -
                    </button>
                    <span className="mx-2">{ele.count}</span>
                    <button
                      onClick={() =>
                        updateItem(ele.product._id, ele.product.count)
                      }
                      className=" btn btn-outline-success"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <Link className="btn bg-main text-light w-100" to={"/checkout"}>
            CheckOut
          </Link>
        </div>
      ) : <Loader/>}
    </>
  );

}
