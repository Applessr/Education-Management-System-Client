import React, { useEffect, useRef, useState } from "react";
import previewVideo1 from '../../assets/buildind preview 1.mp4';
import previewImage2 from '../../assets/prevideo1.mov';
import previewImage1 from '../../assets/library - 1.jpg';

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
    }, 200); 
    
    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="relative w-full h-[164vh] ">

      <div className="sticky top-[25px] z-10 h-[100vh] flex flex-col items-start justify-center p-12  text-white text-[80px] font-bold shadow-xl" 
      style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)' }}>
        <div>What</div>
        <div>Start Here</div>
        <div>Change</div>
        <div>The World</div>
      </div>

      <div className="relative w-full h-[100vh] mt-[-550px]">
      <video 
      ref={videoRef}
      className= {`absolute top-0 left-1/2  w-full h-full transform -translate-x-1/2 -translate-y-1/2 object-cover fade-in ${isVisible ? 'fade-in-active' : ''}`}
      autoPlay 
      loop 
      muted
      >
        <source src={previewImage2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

      <div className="relative w-full min-h-[50vh] mt-[-475px] ">
        <img src={previewImage1} alt="Your Description" className="w-full h-auto object-cover" />
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="w-full h-full bg-gradient-to-b from-[#4B2911] via-transparent to-transparent filter blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default LandingItem1;
