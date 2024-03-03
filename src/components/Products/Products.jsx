import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from "../../Context/cart";
import toast, { Toaster } from "react-hot-toast";



export default function Products() {
   const [isClicked, setIsClicked] = useState(false);
   const originalColor = "#aaa9a9";
   const clickedColor = "#ff0000";
   const currentColor = isClicked ? clickedColor : originalColor;

    const myStyles = {
      color: currentColor,
    };

  function convertColorHeart() {
    setIsClicked(!isClicked);
  }
  let { addToCart } = useContext(CartContext);
  async function addCart(id) {
    let res = await addToCart(id);
    if (res.data.status === "success") {
      toast.success("Product added successfully");
    } else {
      toast.error("Product did not added ");
    }
  }
  function getAllProduct() {
    return axios.get("https:ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery("products", getAllProduct);

  return (
   
    <>
   
      {/* {isLoading ? <Loader></Loader> : null} */}
      <div className="container">
        <div className="row g-4">
          {data?.data.data.map((ele) => {
            return (
              <div className="col-md-2 product p-4" key={ele.id}>
                <Link to={`/productDetails/` + ele.id}>
                  <img src={ele.imageCover} alt="" className="w-100" />
                  <div className="py-2">
                    <h6 className="text-main">{ele.category.name}</h6>
                    <p>{ele.title.split(" ").slice(0, 2).join(" ")}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>{ele.price} EGP</p>
                    <div>
                      <i className="fas fa-star text-warning"></i>
                      <span>{ele.ratingsAverage}</span>
                    </div>
                  </div>
                </Link>
                <i
                  onClick={convertColorHeart}
                  class="fa-solid fa-heart cursor-pointer fs-3 "
                  style={myStyles}
                ></i>
                <button
                  className="btn bg-main text-white w-100"
                  onClick={() => addCart(ele.id)}
                >
                  + Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
