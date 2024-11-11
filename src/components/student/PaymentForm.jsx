import { useState } from 'react';
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentForm = () => {
    const elements = useElements();
    const stripe = useStripe();
    const params = useParams()
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const orderId = params.orderId
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    console.log(orderId);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            if (!stripe || !elements) {
                return;
            }

            setIsProcessing(true);

            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // return_url: `http://localhost:5174/customer`,
                },
                redirect: "if_required",
            });

            if (error) {

                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message);
                } else {
                    setMessage("An unexpected error occurred.");
                }
            }
            if (paymentIntent.status === "succeeded") {
                await changeStatusToConfirmFunction(token, orderId)
                toast.success('Payment Successful')
                navigate('/student/success')
            }
            setIsProcessing(false);
        } catch (error) {
            console.error('Error confirming payment:', error);
            setMessage('Payment confirmation failed.');
        }
    };

    return (
        <form id="payment-form" className='w-[26rem]' onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button className=' w-full bg-[#16325B] mx-auto py-2 mt-2 rounded-lg font-head text-white'
                disabled={isProcessing || !stripe || !elements} id="submit">
                <span id="button-text " >
                    {isProcessing ? "Processing ... " : "Pay now"}
                </span>
            </button>

            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

export default PaymentForm;
