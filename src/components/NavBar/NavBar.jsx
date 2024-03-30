import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../Assets/images/freshcart-logo.svg'
import { TokenContext } from "../../Context/Token";
import { CartContext } from "../../Context/cart";
import './NavBar.module.css'
export default function NavBar() {
  let { setnumOfItems, numOfItems } = useContext(CartContext);
   const [cartDetails, setcartDetails] = useState({});
   let { getCartDetails} =useContext(CartContext);
 async function getCartProducts() {
   let { data } = await getCartDetails();
   setcartDetails(data);
 }
 useEffect(() => {
   getCartProducts();
 }, []);
    let {token,settoken} = useContext(TokenContext);
    let navigate=useNavigate()
    function logOut(){
      localStorage.removeItem('userToken')
      settoken(null);
      navigate('./login')

    }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to={"home"}>
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
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"home"}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"cart"}
                  >
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"products"}
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"categories"}
                  >
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"brands"}
                  >
                    Brands
                  </Link>
                </li>
              </ul>
            ) : null}

            <ul className="ms-auto navbar-nav mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={""}
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={""}
                    >
                      <i className="fa-brands fa-facebook"></i>{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={""}
                    >
                      <i className="fa-brands fa-tiktok"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={""}
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={""}
                    >
                      <i className="fa-brands fa-linkedin"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"cart"}
                    >
                      <i className="fa-solid fa-cart-shopping fs-3 position-relative shoping">
                        {cartDetails?.data ? (
                          <span className="bg-main badge translate-middle-y translate-middle-x position-absolute fs-6  rounded-3 ">
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
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"register"}
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"login"}
                    >
                      login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
