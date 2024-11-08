import React, { useEffect, useRef, useState } from "react";
import previewImage1 from '../../assets/library - 1.jpg';
import landingVideo from '../../assets/bg-landing2.mov';

function LandingItem1() {

  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // nothing just set false to true and run fade-in to fade-in-active in CSS
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (videoRef.current) {
        videoRef.current.play(); // Start play video
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-auto ">

      <div className="sticky top-[2rem] z-10 h-[100vh] flex flex-col items-start justify-center p-16  text-white text-[80px] font-bold shadow-xl"
        style={{ textShadow: '6px 6px 6px rgba(0, 0, 0, 0.5)' }}>
       <div className="m-20">
       <h1>What</h1>
        <h1>Start Here</h1>
        <h1>Change</h1>
        <h1>The World</h1>
       </div>
      </div>

      <div className="relative w-full h-[100vh] mt-[-32rem] ">
        <video
          ref={videoRef}
          className={`absolute top-0 left-1/2  w-full h-full transform -translate-x-1/2 -translate-y-1/2 object-cover fade-in ${isVisible ? 'fade-in-active' : ''}`}
          autoPlay
          loop
          muted
        >
          <source src={landingVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="relative w-full mt-[-36rem] ">
        <img src={previewImage1} alt="Your Description" className="w-full h-auto object-cover" />
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* this is overRay   */}
          {/* <div className="w-full h-full bg-gradient-to-b from-[#ffffff] via-transparent to-transparent filter blur-3xl"></div> */}
        </div>
      </div>
    </div>
  );
}

export default LandingItem1;
