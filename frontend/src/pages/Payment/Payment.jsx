
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import axios from "axios"
import { useSelector } from "react-redux";

const Payment = () => {
    
    const amountToPay = useSelector((state)=> state.amountpay.payableAmount)
    console.log(amountToPay);

    const paymentHandler  = async ()=>{
        const { data: { key } } = await axios.get("https://e-commerce-qshop.vercel.app/api/getkey")

        const { data: { order } } = await axios.post("https://e-commerce-qshop.vercel.app/api/checkout", {
            amountToPay
        })

        const options = {
            key, 
            amount : order.amountToPay,
            currency : "INR",
            name : "QSHop",
            description : "You're Completely Secured while Paying",
            image: "https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg",
            order_id : order.id,
            callback_url : "https://e-commerce-qshop.vercel.app/api/paymentverification",
            prefill : {
                name : "Nabanita Sarma",
                email : "sarmaatinaban241i@gmail.com",
                contact : "9999999999"
            },
            notes : {
                "address": "Razorpay Corporate Office" 
            },
            theme : {
                "color" : "#92E9F0"
            }
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
