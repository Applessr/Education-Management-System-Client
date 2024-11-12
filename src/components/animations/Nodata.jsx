import React from 'react';
import Lottie from 'lottie-react';
import noData from '../../assets/animations/Nodata.json';

const Nodata = () => {
  return (
    <div>
         <Lottie
                animationData={noData}
                loop={true}
                autoplay={true}
                style={{ width: 250, height: 250 }}
            />
    </div>
  )
}

export default Nodata
