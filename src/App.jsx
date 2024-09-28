import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LayOut from './components/LayOut/LayOut';
import Home from './components/Home/Home'; // Import Home component
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Categories from "./components/Categories/Categories";
import Brands from './components/Brands/Brands';
import Cart from "./components/Cart/Cart";
import Products from './components/Products/Products';
import NotFound from "./components/NotFound/NotFound";
import TokenContextProvider, { TokenContext } from './Context/Token';
import { useContext, useEffect } from 'react';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CheckOut from './components/CheckOut/CheckOut';
import SubCategory from './components/SubCategory/SubCategory';
import ForgetPasswordPage from './components/ForgetPasswordPage/ForgetPasswordPage';
import VerfiyPassword from './components/VerfiyCode/VerfiyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import WishList from './components/WishList/WishList';

// Define the routes
const routes = createBrowserRouter([
  {
    path: "",
    element: <LayOut />, // Render the Layout
    children: [
      {
        path: "/", // This is the home route
        element: <Home />, // Render the Home component
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>
        ),
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/productDetails/:id",
        element: (
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoutes>
            <CheckOut />
          </ProtectedRoutes>
        ),
      },
      {
        path: "subcategory",
        element: (
          <ProtectedRoutes>
            <SubCategory />
          </ProtectedRoutes>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoutes>
            <WishList />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/forget",
        element: <ForgetPasswordPage />,
      },
      {
        path: "/verfiy",
        element: <VerfiyPassword />,
      },
      {
        path: "/reset",
        element: <ResetPassword />,
      },
    ],
  },
]);

function App() {
  let { settoken } = useContext(TokenContext);
  
   useEffect(() => {
     const userToken = localStorage.getItem("userToken");
     
   }, [settoken]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
