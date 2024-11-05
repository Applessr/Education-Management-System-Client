import React from "react";

function LandingItem2() {
  return (
    <div>
      <div className="relative w-full h-screen overflow-hidden  bg-sky-100 text-white" 
       style={{
        backgroundImage: `url(https://res.cloudinary.com/djudr1vzc/image/upload/v1730798494/bg-homepage-3_mbcwms.jpg)`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="px-[15vw] flex flex-col gap-10 items-center justify-center h-[100vh]">

          <h1 className="font-bold text-7xl">IMPACT AS BIG AS PIERRE </h1>
          <p className="text-3xl">
            What starts here can be a new idea in the mind of a single student. What starts here can be a work of art that enriches lives or a discovery that saves them. What starts here can be a new way of doing things, a new perspective on a global challenge. What starts here changes the world.
          </p>
        </div>

      </div>
    </div>
  );
}

export default LandingItem2;
