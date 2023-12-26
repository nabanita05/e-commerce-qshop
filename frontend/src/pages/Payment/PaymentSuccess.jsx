
import { useSearchParams } from "react-router-dom"
const PaymentSuccess = () => {

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
    return (
        <div>
            <h1>Order SUccesful</h1>
            <p>{referenceNum}</p>
        </div>
    )
}

export default PaymentSuccess