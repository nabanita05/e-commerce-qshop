import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Header from './components/Home/Header/Header'
import HeaderBottom from "./components/Home/Header/HeaderBottom";

// import About from "./pages/About/About";
// import SignIn from "./pages/Account/SignIn";
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
      
   
      <Outlet />
      
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout/>}/>
    </Route>
  )
)

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
