import React from 'react';
import Lottie from 'lottie-react';
import sendEmail from '../../assets/animations/sendEmail.json';

const SendMail = () => {
    return (
        <div>
            <Lottie
                animationData={sendEmail}
                loop={true}
                autoplay={true}
                style={{ width: 500, height: 500 }}
            />
        </div>
    )
}

export default SendMail
