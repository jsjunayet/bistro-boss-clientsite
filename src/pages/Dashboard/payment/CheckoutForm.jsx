import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import '../Payment/styles.css'
import { useEffect, useState } from "react";
import UseAxois, { axiosSecure } from "../../../Hooks/UseAxois";
import UseaxiosPublic from "../../../Hooks/UseaxiosPublic";
import UseCardItem from "../../../Hooks/UseCarditem/UseCardItem";
import UseAuth from "../../../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const axiosPublic = UseaxiosPublic()
    const { user } = UseAuth()
    const [error, seterror] = useState('')
    const [clienSecret, setclienSecret] = useState('')
    const [trantisionid, settrantisionid] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const [card, refetch] = UseCardItem()
    const totalprice = card.reduce((total, item) => total + item.price, 0)
    console.log(totalprice);
    const navigate = useNavigate()

    useEffect(() => {
        if (totalprice > 0) {
            axiosPublic.post('/create-payment-intent', { price: totalprice })
                .then(res => {
                    console.log(res.data)
                    setclienSecret(res.data?.clientSecret)
                })
        }
    }, [axiosPublic, totalprice])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cards = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            seterror(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            seterror('')
        }
        const { paymentIntent, error: confirmerror } = await stripe.confirmCardPayment(clienSecret, {
            payment_method: {
                card: cards,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                }
            }
        })
        if (confirmerror) {
            console.log('taka asehe ni', confirmerror)
        }
        else {
            console.log("succeful", paymentIntent)
            if (paymentIntent.status == 'succeeded') {
                settrantisionid(paymentIntent.id)
                console.log(card)
                // database same the payment deaitls
                const payment = {
                    price: totalprice,
                    category: card.map(item => item?.name),
                    email: user?.email,
                    transactionID: paymentIntent?.id,
                    date: new Date(),

                    cardId: card.map(item => item?._id),
                    menuID: card.map(item => item.menuID),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payment', payment)
                console.log(res.data)
                refetch()
                navigate('/dashboard/paymenthistory')


            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-secondary my-3 text-xl  btn-sm " type="submit" disabled={!stripe || !clienSecret}>
                Pay
            </button>
            <p className=" text-red-600">{error}</p>
            {
                trantisionid && <p>your succefull payment and your transation id : {trantisionid}</p>
            }

        </form>
    );


    // Make sure to call `loadStripe` outside of a component’s render to avoid
    // recreating the `Stripe` object on every render.
    // const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

};

export default CheckoutForm;