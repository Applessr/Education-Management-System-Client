import React from 'react';
import Lottie from 'lottie-react';
import loading from '../../assets/animations/loading.json';

const Loading = () => {
    return (
        <div>
            <Lottie
                animationData={loading} 
                loop={true} 
                autoplay={true} 
                style={{ width: 500, height: 500 }} 
            />
        </div>
    );
};

export default Loading;
