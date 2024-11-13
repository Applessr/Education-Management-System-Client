import React from 'react';
import Lottie from 'lottie-react';
import paymentFail from '../../assets/animations/paymentFail.json';

const PaymentFail = () => {
  return (
    <div>
            <Lottie
                animationData={paymentFail}
                loop={true}
                autoplay={true}
                style={{ width: 500, height: 500 }}
            />
        </div>
  )
}

export default PaymentFail
