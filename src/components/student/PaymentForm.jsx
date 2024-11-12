import { useState } from 'react';
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { studentPayTuition } from '@/src/api/student';
import PayMentStatus from './PayMentStatus';
import useStudent from '@/src/hooks/useStudent';

const PaymentForm = () => {
    const { getStudentPayMentStatus } = useStudent();
    const elements = useElements();
    const stripe = useStripe();

    const token = localStorage.getItem("token");
    const amount = 140000;
    const semester = '1/2024'; 

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // new state for payment status

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
                    // return_url: http://localhost:5174/customer,
                },
                redirect: "if_required",
            });

            if (error) {
                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message);
                } else {
                    setMessage("An unexpected error occurred.");
                }
                setPaymentStatus("failed"); // Set payment status to failed
                setIsModalOpen(true);
            } else if (paymentIntent) {
                if (paymentIntent.status === "succeeded") {
                    await studentPayTuition(token, { amount, semester, status: "COMPLETED" });
                    toast.success('Payment Successful');
                    setMessage('Payment Successful');
                    setPaymentStatus("succeeded"); // Set payment status to succeeded
                    setIsModalOpen(true);
                } else if (paymentIntent.status === "pending") {
                    await studentPayTuition(token, { amount, semester, status: "PENDING" });
                    toast.info('Payment is pending. Please complete the payment.');
                    setMessage('Payment is pending. Please complete the payment.');
                    setPaymentStatus("pending"); // Set payment status to pending
                    setIsModalOpen(true);
                } else if (paymentIntent.status === "failed") {
                    await studentPayTuition(token, { amount, semester, status: "FAILED" });
                    toast.error('Payment Failed');
                    setMessage('Payment Failed');
                    setPaymentStatus("failed"); // Set payment status to failed
                    setIsModalOpen(true);
                }
            } else {
                setMessage("No paymentIntent returned.");
                setIsModalOpen(true);
            }

            setIsProcessing(false);
        } catch (error) {
            console.error('Error confirming payment:', error);
            setMessage('Payment confirmation failed.');
            setPaymentStatus("failed"); // Set payment status to failed
            setIsModalOpen(true);
            setIsProcessing(false);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        getStudentPayMentStatus(token, semester);

    };

    return (
        <div>
            <form id="payment-form" className='w-[26rem]' onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" />
                <button
                    className=' w-full bg-[#16325B] mx-auto py-2 mt-2 rounded-lg font-head text-white'
                    disabled={isProcessing || !stripe || !elements}
                    id="submit"
                >
                    <span id="button-text">
                        {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>

                {message && <div id="payment-message">{message}</div>}
            </form>

            {isModalOpen && <PayMentStatus message={message} onClose={handleModalClose} paymentStatus={paymentStatus} />}
        </div>
    );
};

export default PaymentForm;