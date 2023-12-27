
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import axios from "axios"
import { useSelector } from "react-redux";
import logo from "../../../public/logo.png"

const Payment = () => {

  const amount = useSelector((state) => state.amountpay.payableAmount)
  console.log(amount);


  const paymentHandler = async () => {

    const { data: { key } } = await axios.get("http://localhost:4000/api/getkey")

    console.log(key);

    const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
      amount
    })

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "QSHop",
      description: "You're Completely Secured while Paying",
      image: logo,
      order_id: order.id,
      callback_url: "http://localhost:4000/api/paymentverification",
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#92E9F0"
      },
    };
    const razor = new window.Razorpay(options)
    razor.open()


  }
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="p-10 pt-10 text-center ">
        <p>Pay With Razorpay! We&apos;re continuously working to add more payment gateways</p>

        <button onClick={paymentHandler} className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
          Proceed To Pay
        </button>

      </div>
    </div>
  );
};

export default Payment;
