import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import './Categories.module.css'
import SubCategory from '../SubCategory/SubCategory';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loader from '../Loader/Loader';

export default function Categories() {

  async function getAllcategories(){
    return await axios.get("https:ecommerce.routemisr.com/api/v1/categories");
  }
  let { data,isLoading } = useQuery("categories", getAllcategories);
console.log(data);
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="container my-5">
          <div className="row gy-5">
            {data?.data.data.map((ele) => {
              return (
                <Link to={"subcategory"} className="product col-md-4">
                  <img
                    src={ele.image}
                    alt=""
                    className="w-100 "
                    height={"300px"}
                  />
                  <h3 className="my-3">{ele.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
