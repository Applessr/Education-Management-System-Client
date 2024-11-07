import React from "react";

function LandingItem3() {
  return (
    <div className="flex mt-5">

      <div className="w-2/5 h-[750px] bg-blue-900">
        <img
          src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730795553/env1_c6otti.jpg"
          alt="enviroment"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-3/5 h-auto py-10">

        <div className="flex flex-col gap-10 px-16" >
          <div>
            <p className="flex justify-center text-5xl font-bold text-[#272988]">
              IMPACT AS BIG AS PIERRE{" "}
            </p>
          </div>

          <div className="flex flex-col gap-12">
            <p className="text-2xl">
              Experience world-class education in the heart of Bangkok! At Pierre University, we offer a diverse, international community with cutting-edge programs, global connections, and hands-on learning. Discover your potential with access to top-tier research facilities, expert faculty, and vibrant student life. From career fairs to cultural festivals, every day here is a step toward your future.
            </p>

            <div className="flex justify-around  text-3xl font-bold text-[#272988] mt-10">
              <div className='flex flex-col justify-center items-center'>
                <p>#1</p>
                <p>PRIVATE UNIVERSITY</p>
                <p>IN BANGKOK</p>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <p>170+</p>
                <p>FIELDS OF STUDY</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LandingItem3;
