import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/cart";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import { TokenContext } from "../../Context/Token";
import { wishListContext } from "./../../Context/wishlist";

export default function Products() {
  let navigate = useNavigate(); // For navigation

  // Using CartContext to access cart-related variables and functions
  const { numOfItems, setnumOfItems, addToCart } = useContext(CartContext);
  const { settoken, token } = useContext(TokenContext);

  // Using wishListContext to handle wishlist actions
  const { addProductToWishList, removeFromWishList, wishlistDetails } =
    useContext(wishListContext);

  const [isFavorite, setIsFavorite] = useState(false);

  // Toggle favorite status for a product
  const toggleFavorite = async (id) => {
    if (wishlistDetails?.includes(id)) {
      await removeFromWishList(id);
      toast.error("Product removed from wishlist successfully");
    } else {
      await addProductToWishList(id);
      toast.success("Product added to wishlist successfully");
    }
  };

  // Add a product to the cart
  async function addCart(id) {
    if (!token) {
      // If user is not logged in, redirect to login page
      toast.success("Please login to add items to your cart.");
      navigate("/login");
      return; // Exit function to prevent adding the product
    }

    // Proceed to add to cart if token exists
    const res = await addToCart(id);
    if (res.data.status === "success") {
      toast.success("Product added successfully");
      setnumOfItems(res.data.numOfCartItems);
    } else {
      toast.error("Product did not add");
    }
  }

  // Fetch all products using axios
  function getAllProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  // Use react-query to fetch the products
  const { data, isLoading } = useQuery("products", getAllProduct);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row g-4">
            {data?.data.data.map((ele) => (
              <div className="col-md-2 product p-4" key={ele.id}>
                <Link to={`/productDetails/${ele.id}`}>
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

                {/* Toggle Favorite */}
                <i
                  className="fa-solid fa-heart cursor-pointer fs-3"
                  onClick={() => toggleFavorite(ele.id)}
                  style={{
                    color: wishlistDetails?.includes(ele.id) ? "red" : "grey",
                  }}
                ></i>

                {/* Add to Cart Button */}
                <button
                  className="btn bg-main text-white w-100"
                  onClick={() => addCart(ele.id)}
                >
                  + add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
