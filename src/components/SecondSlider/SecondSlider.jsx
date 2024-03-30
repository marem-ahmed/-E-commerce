import React from 'react'
import Slider from 'react-slick';
import './SecondSlider.module.css'
import img1 from '../../Assets/images/catSlider1.jpeg'
import img2 from "../../Assets/images/catSlider2.jpeg";
import img3 from "../../Assets/images/catSlider3.jpeg";
import img5 from "../../Assets/images/catSlider5.jpeg";
import img6 from "../../Assets/images/catSlider6.jpeg";
export default function SecondSlider() {
      let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
      };
  return (
    <>
      <div className="container my-5">
        <h2>Shop Popular Categories</h2>
        <Slider {...settings} className='my-3'>
          <img src={img1} alt="catSlider1"  />
          <img src={img2} alt="catSlider2"  />
          <img src={img3} alt="catSlider3"  />
          <img src={img5} alt="catSlider5"  />
          <img src={img6} alt="catSlider6"  />
        </Slider>
      </div>
    </>
  );
}
