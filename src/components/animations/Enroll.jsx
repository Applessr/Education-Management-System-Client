import React from 'react';
import Lottie from 'lottie-react';
import enroll from '../../assets/animations/Enroll.json';

const Enroll = () => {
    return (
        <div>
            <Lottie
                animationData={enroll}
                loop={true}
                autoplay={true}
                style={{ width: 600, height: 600 }}
            />
        </div>
    )
}

export default Enroll
