import { Elements } from "@stripe/react-stripe-js";
import Title from "../../share/Title";
import CheckoutForm from "./payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe('pk_test_51OEF3CAmt6OY2qQjrncnGPkmQTrJUeKE6qtw4cz0SC0GVCSusJjXov1j4MssrzdXqDBI6qX2mUc624fYPZMtdSiV00FB7vZMxV');

const Payment = () => {
    return (
        <div>
            <div className=" text-black pt-20">
                <p className="text-3xl font-semibold">Please Payment Now</p>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;