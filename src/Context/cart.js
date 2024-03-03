import axios from "axios";
import { createContext } from "react";

export let CartContext=createContext();
let headers={token:localStorage.getItem('userToken')};

function addToCart(id){
  return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
  {
    productId:id
  },{
    headers
    
  }
  ).then((res)=>res).catch((err)=>err)
}
function getCartDetails(){
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
    headers
  }
  ).then((res)=>res).catch((err)=>err)
}
function removeItemfromCart(id){
  return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
  {
    headers
    
  }
  ).then((res)=>res).catch((err)=>err)
}
function updateItemfromCart(id,count){
  return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
  {
    count
},
  {
    headers
  }
  ).then((res)=>res).catch((err)=>err)
}
function onlinePayment(shippingAddress){
  return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/65e0c4b2be8b523235853141?url=http://localhost:3000`,
  {
    shippingAddress
},
  {
    headers
  }
  ).then((res)=>res).catch((err)=>err)
}
export default function CartContextProvider(props){
    return <CartContext.Provider value={{addToCart,getCartDetails,removeItemfromCart,updateItemfromCart,onlinePayment}}>
        {props.children}
    </CartContext.Provider>
}