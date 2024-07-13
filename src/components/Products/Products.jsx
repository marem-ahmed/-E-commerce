import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/cart";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import { TokenContext } from "../../Context/Token";
import { wishListContext} from './../../Context/wishlist';

export default function Products() {
  let { numOfItems, setnumOfItems } = useContext(CartContext);
    let { settoken } = useContext(TokenContext);
    const [wishlistDetails, setWishListDetails] = useState({});

let { addProductToWishList } = useContext(wishListContext);
let { addToCart } = useContext(CartContext);
console.log(addToCart);
  async function addtoWishList(id) {
    let result= await addProductToWishList(id)
    setWishListDetails(result);
    toast.success("Product added to wishList successfully");

 }
  async function addCart(id) {
    let res = await addToCart(id);

    if (res.data.status === "success") {
      toast.success("Product added successfully");
      setnumOfItems(res.data.numOfCartItems);

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
      {isLoading ? (
        <Loader />
      ) : (
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
                    className="fa-solid fa-heart cursor-pointer fs-3  "
                      onClick={() => addtoWishList(ele.id)}
                    style={{
                    }}
                  ></i>
                  <button
                    className="btn bg-main text-white w-100"
                    onClick={() => addCart(ele.id)}
                  >
                    + add to cart
                  </button>
                </div>
              );
            })}

          </div>
        </div>
      )}
    </>
  );
}
