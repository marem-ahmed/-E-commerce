import axios from "axios";
import { createContext, useEffect, useState } from "react";

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
export default function CartContextProvider(props){
const [cartId, setcartId] = useState(null);
const [numOfItems,setnumOfItems]=useState(null)
 async function getAnitialCart(){
  let {data}=await getCartDetails()
  if(data){
    setnumOfItems(data.numOfCartItems)
  setcartId(data.data._id)
  }
  }
  useEffect(()=>
  getAnitialCart()
  ,[])
function onlinePayment(shippingAddress){
  return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
  {
    shippingAddress
},
  {
    headers
  }
  ).then((res)=>res).catch((err)=>err)
}
    return <CartContext.Provider value={{addToCart,getCartDetails,removeItemfromCart,updateItemfromCart,onlinePayment,setnumOfItems,setcartId,cartId,numOfItems}}>
        {props.children}
    </CartContext.Provider>
}