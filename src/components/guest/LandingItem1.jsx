import React from "react";
import previewVideo1 from '../../assets/buildind preview 1.mp4';
import previewImage1 from '../../assets/library - 1.jpg';

function LandingItem1() {
  return (
    <div className="relative w-full h-[150vh] ">
     
      <div className="z-10 sticky top-12 flex flex-col items-start justify-center p-12 h-full text-white text-7xl font-bold ">
        <div>What</div>
        <div>Start Here</div>
        <div>Change</div>
        <div>The World</div>
      </div>
      
      <video className="absolute top-[365px] left-1/2 h-1/2 w-full transform -translate-x-1/2 -translate-y-1/2" autoPlay loop muted>
        <source src={previewVideo1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-[590px] w-full h-1/2">
      <img src={previewImage1} alt="Your Description" className="w-full h-auto" />
    </div>
    </div>

    // safe
    // <div className="relative w-full h-screen overflow-hidden">
    //   <video className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2" autoPlay loop muted>
    //     <source src={previewVideo1} type="video/mp4" />
    //     Your browser does not support the video tag.
    //   </video>
    //   <div className="relative z-10 flex flex-col items-start justify-center p-12 h-full text-white text-6xl font-bold">
    //     <div>What</div>
    //     <div>Start Here</div>
    //     <div>Change</div>
    //     <div>The World</div>
    //   </div>

    //   {/* <div className="relative w-full">
    //   <img src={yourImage} alt="Your Description" className="w-full h-auto" />
    // </div> */}
    // </div>
  );
}

export default LandingItem1;
