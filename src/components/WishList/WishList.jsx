import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { wishListContext } from '../../Context/wishlist';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/cart';

export default function WishList() {
  let { numOfItems, setnumOfItems } = useContext(CartContext);

    const [wishlistDetails,setWishListDetails]=useState({})
    const { getAllProductWishList, removeFromWishList } =
      useContext(wishListContext);


      let { addToCart } = useContext(CartContext);
      async function addCart(id) {
        let res = await addToCart(id);
        if (res.data.status === "success") {
          toast.success("Product added successfully");
          setnumOfItems(res.data.numOfCartItems);
        } else {
          toast.error("Product did not added ");
        }
      }
     async function displayWishList(){
         const { data } = await getAllProductWishList()
         if(data){
            setWishListDetails(data)
         }
     }
     async function deleteItemFromWishList(id){
     const{data}=await removeFromWishList(id)
                 setWishListDetails(data);


     }
     useEffect(() => {
        displayWishList();
     }, [])
    
  return (
    <div>
      <>
        <Helmet>
          <title>My WishList:</title>
        </Helmet>
        {wishlistDetails?.data ? (
          <div className="container bg-main-light mt-5 p-4">
            <h2>
              WishList: <span className='text-main fw-bold'>{wishlistDetails.count}</span>
            </h2>
            {wishlistDetails.data.map((ele) => {
              return (
                <div className="row my-3 border-bottom" key={ele.id}>
                  <div key={ele._id} className="col-md-2 ">
                    <img src={ele.imageCover} alt="" className="w-100" />
                  </div>
                  <div className="col-md d-flex justify-content-between align-items-center  my-3">
                    <div>
                      <h4>{ele.title}</h4>
                      <p className="text-main">{ele.price}:EGP</p>
                      <div>
                        <i className="fas fa-star text-warning"></i>
                        <span>{ele.ratingsAverage}</span>
                      </div>
                      <button
                        className="btn btn-outline-danger mt-4"
                        onClick={() => deleteItemFromWishList(ele._id)}
                      >
                        <i className="fas fa-trash pe-2 "></i>Remove
                      </button>
                    </div>
                    <button
                      className="btn bg-main text-white ms-auto my-auto w-25 py-2"
                      onClick={() => addCart(ele.id)}
                    >
                      + add to cart
                    </button>
                  </div>
                </div>
              );
            })}
            <Link className="btn bg-main text-light w-100" to={"/checkout"}>
              CheckOut
            </Link>
          </div>
        ) : (
          <Loader></Loader>
        )}
      </>
    </div>
  );
}
