import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { TokenContext } from "../../Context/Token";
import { CartContext } from "../../Context/cart";
import "./NavBar.module.css";

export default function NavBar() {
  let { numOfItems } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState({});
  let { getCartDetails } = useContext(CartContext);

  async function getCartProducts() {
    let { data } = await getCartDetails();
    setCartDetails(data);
  }

  useEffect(() => {
    getCartProducts();
  }, []);

  let { token, setToken, userInfo } = useContext(TokenContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container">
          <Link className="navbar-brand" to={"/home"}>
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/"}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/cart"}
                    >
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/products"}
                    >
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/categories"}
                    >
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/brands"}
                    >
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/wishlist"}
                    >
                      Wishlist
                    </Link>
                  </li>
                </ul>

                {/* User info display */}
                <ul className="ms-auto navbar-nav mb-2 mb-lg-0 align-items-center">
                    <span className="mx-3 fs-5 fw-noraml">
                      Hello <span className="text-main fw-bolder">{token ? userInfo : "User"}</span>
                    </span>
                  
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/cart"}
                    >
                      <i className="fa-solid fa-cart-shopping fs-3 position-relative shoping">
                        {cartDetails?.data ? (
                          <span className="bg-main badge translate-middle-y translate-middle-x position-absolute fs-6 rounded-3">
                            {numOfItems}
                          </span>
                        ) : null}
                      </i>
                    </Link>
                  </li>
                  <li className="nav-item ms-3">
                    <button
                      className="nav-link active"
                      aria-current="page"
                      onClick={logOut}
                    >
                      LogOut
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <ul className="ms-auto navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/register"}
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/login"}
                  >
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}