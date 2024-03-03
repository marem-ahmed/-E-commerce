import axios from 'axios';
import React, { useContext } from 'react'
import Slider from "react-slick";
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/cart';
import toast, { Toaster } from "react-hot-toast";
  import { Helmet } from "react-helmet";
import Loader from '../Loader/Loader';

export default function ProductDetails() {
  let { numOfItems, setnumOfItems } = useContext(CartContext);

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
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let product = useParams();
  function getSpecificProduct(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { data,isLoading } = useQuery("specificProduct", () =>
    getSpecificProduct(product.id)
  );

  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      ;
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="container my-5">
          <div className="row align-items-center ">
            <div className="col-md-4">
              <Slider {...settings}>
                <img src={data?.data.data.images[0]} className="w-100" alt="" />
                <img src={data?.data.data.images[1]} alt="img2" />
                <img src={data?.data.data.images[2]} alt="img3" />
                <img src={data?.data.data.images[3]} alt="img4" />
                <img src={data?.data.data.images[4]} alt="img5" />
              </Slider>
            </div>
            <div className="col-md-8">
              <h2>{data?.data.data.title}</h2>
              <p>{data?.data.data.imageCover}</p>
              <p>{data?.data.data.category.name}</p>
              <div className="d-flex justify-content-between">
                <p> {data?.data.data.price}EGP</p>
                <div>
                  <i className="fas fa-star text-warning"></i>
                  <span>{data?.data.data.ratingsAverage}</span>
                </div>
              </div>
              <button
                onClick={() => addCart(data?.data.data.id)}
                className="btn bg-main w-100 text-white"
              >
                + add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
