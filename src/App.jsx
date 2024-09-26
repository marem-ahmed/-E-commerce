import { createBrowserRouter ,RouterProvider } from 'react-router-dom';
import './App.css';
import LayOut from './components/LayOut/LayOut';
import Home from './components/Home/Home';
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Categories from "./components/Categories/Categories";
import Brands from './components/Brands/Brands';
import Cart from "./components/Cart/Cart";
import Products from './components/Products/Products'
import NotFound from "./components/NotFound/NotFound";
import TokenContextProvider, { TokenContext } from './Context/Token';
import { useContext, useEffect } from 'react';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CheckOut from './components/CheckOut/CheckOut';
import SubCategory from './components/SubCategory/SubCategory';
import ForgetPasswordPage from './components/ForgetPasswordPage/ForgetPasswordPage';
import VerfiyPassword from './components/VerfiyCode/VerfiyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import WishList from './components/WishList/WishList'
const routes = createBrowserRouter([
  {
    path: "",
    element: <LayOut></LayOut>,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRoutes>
            <Home></Home>
          </ProtectedRoutes>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Cart></Cart>
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoutes>
            <Categories></Categories>
          </ProtectedRoutes>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoutes>
            <Brands></Brands>
          </ProtectedRoutes>
        ),
      },
      {
        path: "products",
        element: (
            <Products></Products>
        ),
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
      {
        path: "/productDetails/:id",
        element: (
          <ProtectedRoutes>
            <ProductDetails></ProductDetails>
          </ProtectedRoutes>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoutes>
            <CheckOut></CheckOut>
          </ProtectedRoutes>
        ),
      },
      {
        path: "subcategory",
        element: (
          <ProtectedRoutes>
            <SubCategory></SubCategory>
          </ProtectedRoutes>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoutes>
            <WishList></WishList>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/forget",
        element: <ForgetPasswordPage></ForgetPasswordPage>,
      },
      {
        path: "/verfiy",
        element: <VerfiyPassword></VerfiyPassword>,
      },
      {
        path: "/reset",
        element: <ResetPassword></ResetPassword>,
      },
    ],
  },
]);
function App() {
    let { settoken } = useContext(TokenContext);
useEffect(()=>{
if(localStorage.getItem('userToken')){
  settoken(localStorage.getItem('userToken'))
}
},[]
)
  return (
    <>
        <RouterProvider router={routes}></RouterProvider>
      
    </>
  );
}

export default App;
