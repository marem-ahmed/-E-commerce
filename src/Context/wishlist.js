import axios from "axios";
import { createContext} from "react";

export let wishListContext = createContext();
let headers = { token: localStorage.getItem("userToken") };

   async function getAllProductWishList(){
      return await axios.get(
       `https:ecommerce.routemisr.com/api/v1/wishlist`,
       {
         headers,
       }
     ).then((res)=>res).catch((err)=>err)

   }
 function addProductToWishList(id) {
  return  axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: id,
      },
      {
        headers
      }
    )
    .then((res) => res)
    .catch((err) => err);
}
function removeFromWishList(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
            headers

    }).then((res)=>res).catch((err)=>err)

}

export default function WishContextProvider(props){
    
  return <wishListContext.Provider
      value={{ addProductToWishList ,getAllProductWishList,removeFromWishList}}
    >
      {props.children}
    </wishListContext.Provider>
  
}
