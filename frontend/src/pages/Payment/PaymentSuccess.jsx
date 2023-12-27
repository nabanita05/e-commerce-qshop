
import { useSearchParams } from "react-router-dom"
import { useState } from "react";
import axios from 'axios'
import { saveAs } from 'file-saver';

const PaymentSuccess = () => {
    const [paymentDetails, setPaymentDetails] = useState(null);

    const [state, setState] = useState({
        name: '',
        receiptId: 0,
        price1: 0,
        price2: 0,
    });
    const handleChange = ({ target: { value, name } }) => {
        setState((prevState) => ({ ...prevState, [name]: value }));
    };
    const createAndDownloadPdf = () => {
        axios
            .post('http://localhost:5000/create-pdf', state)
            .then(() => axios.get('http://localhost:5000/fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'newPdf.pdf');
            });
    };



    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
    const razorpay_payment_id = String(referenceNum);
    const getPaymentDetails = async () => {
        try {
            console.log(razorpay_payment_id);
            const response = await axios.post("http://localhost:4000/api/getPaymentDetails", {
                razorpay_payment_id : razorpay_payment_id
            })
            setPaymentDetails(response.data);
        } catch (error) {
            console.error("Error fetching payment details:", error.message);
        }
    }
    return (
        <div>
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
            </div>
        </div>
    )
}

export default PaymentSuccess