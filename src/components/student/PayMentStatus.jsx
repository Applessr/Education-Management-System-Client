import React from 'react';
import PaymentSuccess from '../animations/PaymentSuccess';
import PaymentFail from '../animations/PaymentFail';

const PayMentStatus = ({ message, onClose, paymentStatus }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4">{message}</h3>
                {paymentStatus === 'succeeded' && <PaymentSuccess />}
                {paymentStatus === 'failed' && <PaymentFail />}
                <button
                    className="px-4 py-2 bg-[#272988] text-white rounded-lg w-full"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PayMentStatus;