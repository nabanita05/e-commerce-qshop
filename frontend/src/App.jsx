import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./redux/authSlice";
import { useDispatch } from "react-redux";

import Header from './components/Home/Header/Header'
import HeaderBottom from "./components/Home/Header/HeaderBottom";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import Shop from "./pages/shop/Shop";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/WishList/Wishlist";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <Outlet />
    </div>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/wishlist",
        element: <Wishlist/>
      },
      {
        path: "/paymentgateway",
        element: <Payment/>
      },
    ]
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  },{
    path : "/paymentsuccess",
    element : <PaymentSuccess/>
  }
])


function App() {
  const dispatch = useDispatch()
  //Name of the web page
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Toggle between the original title and a custom blinking text
      document.title = document.title === 'QShop : Best E-Commerce website in India' ? 'Special Offer Available upon ₹1500 Shopping' : 'QShop : Best E-Commerce website in India';
    }, 3000);
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    authService.getCurrentUser().then(
      (userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      }
    )
  }, [])
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
