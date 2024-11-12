import React from 'react';
import Lottie from 'lottie-react';
import success from '../../assets/animations/success.json';

const Success = () => {
    return (
        <div>
            <Lottie
                animationData={success}
                loop={true}
                autoplay={true}
                style={{ width: 70, height: 70 }}
            />
        </div>
    )
}

export default Success
