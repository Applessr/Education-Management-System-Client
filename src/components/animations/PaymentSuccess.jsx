import React from 'react';
import Lottie from 'lottie-react';
import paymentSuccess from '../../assets/animations/paymentSuccess.json';

const PaymentSuccess = () => {
  return (
    <div>
    <Lottie
        animationData={paymentSuccess}
        loop={true}
        autoplay={true}
        style={{ width: 300, height: 300 }}
    />
</div>
  )
}

export default PaymentSuccess
