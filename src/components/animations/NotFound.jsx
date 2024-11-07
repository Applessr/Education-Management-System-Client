import React from 'react';
import Lottie from 'lottie-react';
import notFound from '../../assets/animations/not-found.json';

const NotFound = () => {
    return (
        <div>
            <Lottie
                animationData={notFound}
                loop={true}
                autoplay={true}
                style={{ width: 600, height: 600 }}
            />
        </div>
    )
}

export default NotFound
