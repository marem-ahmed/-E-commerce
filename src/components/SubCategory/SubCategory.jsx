import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';

export default function SubCategory() {
    function getSubcategories(){
        return axios.get(
          "https:ecommerce.routemisr.com/api/v1/categories/6439d61c0049ad0b52b90051"
        );
    }
           let { data } = useQuery("subCategories", getSubcategories);
console.log(data);
  return (
    <>
    
    </>
  )
}
