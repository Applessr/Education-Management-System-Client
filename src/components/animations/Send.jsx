import React from 'react';
import Lottie from 'lottie-react';
import send from '../../assets/animations/send.json';

const Send = () => {
    return (
        <div>
            <Lottie
                animationData={send}
                loop={true}
                autoplay={true}
                style={{ width: 600, height: 600 }}
            />
        </div>
    )
}

export default Send
