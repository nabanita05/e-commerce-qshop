
import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from 'axios'
import { saveAs } from 'file-saver';
import LoadingBar from "react-top-loading-bar";
import toast, { Toaster } from "react-hot-toast";
import authService from "../../appwrite/auth";

const PaymentSuccess = () => {

    const [userName, setuserName] = useState("Unknown!")
    const [orderDetails, setorderDetails] = useState(null)
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [progress, setProgress] = useState(0)
    const [state, setState] = useState({
        name: '',
        receiptId: 0,
        price1: 0,
        price2: 0,
    });


    const seachQuery = useSearchParams()[0]
    const referenceNum = seachQuery.get("reference")



    //get user name:
    const fetchData = async () => {
        try {
            const userData = await authService.getCurrentUser();
            console.log((userData));
            if (userData) {

                setuserName(userData.name)
            }

        } catch (error) {
            console.error("Fetching data failed:", error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    //get order details
    const getOrder = async () => {
        try {
            if (userName !== "Unknown!") {
                const response = await axios.post("http://localhost:4000/api/getOrderDetails", {
                    name: userName
                })
                if (response) {
                    setorderDetails(response.data)
                } else {
                    console.log("Error in getting order details");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    //saving to pdf
    const handleChange = ({ target: { value, name } }) => {
        setState((prevState) => ({ ...prevState, [name]: value }));
    };
    const createAndDownloadPdf = () => {
        setProgress(progress + 33)
        axios
            .post('http://localhost:5000/create-pdf', state)
            .then(() => axios.get('http://localhost:5000/fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                setProgress(100)
                saveAs(pdfBlob, 'newPdf.pdf');
                toast.success("PDF Downloaded!")
            });
    };


    //get payment details
    const razorpay_payment_id = String(referenceNum);
    const getPaymentDetails = async () => {
        try {
            setProgress(progress + 33)
            console.log(razorpay_payment_id);
            const response = await axios.post("http://localhost:4000/api/getPaymentDetails", {
                razorpay_payment_id: razorpay_payment_id
            })
            setProgress(100)
            setPaymentDetails(response.data);
        } catch (error) {
            console.error("Error fetching payment details:", error.message);
        }
    }

    return (
        <div>
            <Toaster />
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <h1>Order SUccesful</h1>
            <p>{referenceNum}</p>
            <div className="App">
                <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                <input type="number" placeholder="Receipt ID" name="receiptId" onChange={handleChange} />
                <input type="number" placeholder="Price 1" name="price1" onChange={handleChange} />
                <input type="number" placeholder="Price 2" name="price2" onChange={handleChange} />
                <button onClick={createAndDownloadPdf}>Download PDF</button>
                <button onClick={getPaymentDetails}>Press</button>
                {paymentDetails && (
                    <div>
                        <p>Razorpay Order ID: {paymentDetails.razorpay_order_id}</p>
                        <p>Razorpay Signature: {paymentDetails.razorpay_signature}</p>
                    </div>
                )}

                <br />
                <button onClick={getOrder}>get name</button>
                {orderDetails && (
                    <div>
                        <p>Price: {orderDetails.price}</p>
                        <p>Shipping Charge : {orderDetails.shippingFee}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PaymentSuccess