import React from "react";
import dotBackground from '../../assets/bg-dotDotdot.webp';
function LandingItem2() {
  return (
    <div >
      <div className="relative w-screen h-screen overflow-hidden text-white"
        style={{
          backgroundImage: `url(${dotBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <div className="px-[25vw] flex flex-col gap-10 items-start justify-center h-[100vh]">

          <h1 className="font-bold text-7xl text-[#272988]">IMPACT AS BIG AS PIERRE </h1>
          {/* <p className="text-3xl text-[#272988] font-semibold">
            What starts here can be a new idea in the mind of a single student. What starts here can be a work of art that enriches lives or a discovery that saves them. What starts here can be a new way of doing things, a new perspective on a global challenge. What starts here changes the world.
          </p> */}
          <p className="text-3xl text-black font-semibold"> What starts here can be a new idea in the mind of a single student</p>
          <p className="text-4xl text-[#272988] font-semibold"> What starts here can be a work of art that enriches lives or a discovery that saves them</p>
          <p className="text-3xl text-black font-semibold"> What starts here can be a new way of doing things, a new perspective on a global challenge</p>
          <p className="text-5xl text-[#272988] font-bold"> What starts here changes the world.</p>
        </div>

      </div>
    </div>
  );
}

export default LandingItem2;
