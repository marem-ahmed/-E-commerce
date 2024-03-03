 import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

 export default function Brands() {
  async function getAllBrands(){
    return await axios("https:ecommerce.routemisr.com/api/v1/brands");
  }
  let { data } = useQuery("Brands", getAllBrands);
  console.log(data);
   return (
     <>
       <Helmet>
         <title>Brands</title>
       </Helmet>
       <div className="container my-5">
        <h1 className='text-main text-center mb-4'>All Brands</h1>
         <div className="row">
            {data?.data.data.map((ele) => {
             return (
               <div className="product col-md-3">
                 <img
                   src={ele.image}
                   alt=""
                   className="w-100 "
                 />
                 <h3 className="my-3 text-center">{ele.name}</h3>
               </div>
             );
           })} 
         </div>
       </div>
     </>
   );
 }
