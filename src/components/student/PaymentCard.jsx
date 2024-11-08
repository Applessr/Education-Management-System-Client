import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import useStudent from '@/src/hooks/useStudent';
import { studentCreatePaymentIntent, studentFetchPublishableKey } from '@/src/api/student';
import { loadStripe } from '@stripe/stripe-js';

const PaymentCard = () => {
    const token = localStorage.getItem('token');
    const { getStudentProfile, studentInfo } = useStudent();

    const amount = 140000;
    const semester = '1/2024'; // หรือใช้ `studentInfo?.major?.tuitionFee` หากต้องการดึงจากข้อมูล studentInfo
    console.log('amount :>> ', amount);
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    const fetchPublishableKey = async () => {
        try {
            const response = await studentFetchPublishableKey(token);
            const { publishableKey } = response.data;
            const stripe = await loadStripe(publishableKey);
            setStripePromise(stripe);
        } catch (error) {
            console.error("Error fetching publishable key:", error);
        }
    };

    const createPaymentIntent = async () => {
        try {
            if (!amount || !semester) {
                return;
            }
            const response = await studentCreatePaymentIntent(token, { amount, semester });
            console.log(response, 'Payment Intent Response');
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.error("Error creating payment intent:", error);
        }
    };

    // ดึงข้อมูล publishableKey และสร้าง PaymentIntent เมื่อ Component โหลด
    useEffect(() => {
        fetchPublishableKey();
        createPaymentIntent();
    }, []);

    return (
        <div>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm />
                </Elements>
            )}
        </div>
    );
};

export default PaymentCard;
