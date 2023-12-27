
import { useSearchParams } from "react-router-dom"
import { useState } from "react";
import axios from 'axios'
import { saveAs } from 'file-saver';

const PaymentSuccess = () => {

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
            </div>
        </div>
    )
}

export default PaymentSuccess