import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./redux/authSlice";
import { useDispatch } from "react-redux";

import Header from './components/Home/Header/Header'
import HeaderBottom from "./components/Home/Header/HeaderBottom";

// import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
// import SignUp from "./pages/Account/SignUp";
// import Cart from "./pages/Cart/Cart";
// import Contact from "./pages/Contact/Contact";
// import Home from "./pages/Home/Home";
// import Journal from "./pages/Journal/Journal";
// import Offer from "./pages/Offer/Offer";
// import Payment from "./pages/payment/Payment";
// import ProductDetails from "./pages/ProductDetails/ProductDetails";
// import Shop from "./pages/Shop/Shop";

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom/>
      <Outlet/>      
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout/>}/>
      <Route path="/signin" element={<SignIn/>}></Route>

    </Route>
  )
)



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
        else{
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
