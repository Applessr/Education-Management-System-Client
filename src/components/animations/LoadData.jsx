import React from 'react';
import Lottie from 'lottie-react';
import loadData from '../../assets/animations/loadData.json';

const LoadData = () => {
    return (
        <div>
            <Lottie
                animationData={loadData}
                loop={true}
                autoplay={true}
                style={{ width: 500, height: 500 }}
            />

        </div>
    )
}

export default LoadData
