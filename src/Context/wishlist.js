import axios from "axios";
import { createContext, useEffect, useState} from "react";

export let wishListContext = createContext();
let headers = { token: localStorage.getItem("userToken") };



export default function WishContextProvider(props){
  const [wishlistDetails, setWishListDetails] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlistDetails');
    if (savedWishlist) {
      setWishListDetails(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlistDetails', JSON.stringify(wishlistDetails));
  }, [wishlistDetails]);

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
    .then((res) =>{
      setWishListDetails(res.data.data)
      setIsFavorite(true)
    } )
    .catch((err) => err);
}
   async function getAllProductWishList(){
    
      return await axios.get(
       `https:ecommerce.routemisr.com/api/v1/wishlist`,
       {
         headers,
       }
     ).then((res)=>{setWishListDetails(res.data.data)

     }).catch((err)=>err)

   }

function removeFromWishList(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
            headers

    }).then((res)=>{setWishListDetails(res.data.data)
       setIsFavorite(false)
    }).catch((err)=>err)

}

  return <wishListContext.Provider
      value={{ addProductToWishList ,getAllProductWishList,removeFromWishList,wishlistDetails,isFavorite}}
    >
      {props.children}
    </wishListContext.Provider>
}

