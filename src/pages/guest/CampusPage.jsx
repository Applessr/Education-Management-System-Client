import React from 'react'

export default function CampusPage() {
  return (
    <div className='h-auto flex flex-col item gap-11'>

      <div className='h-[550px] flex justify-center' style={{
        backgroundImage: 'url(https://res.cloudinary.com/djudr1vzc/image/upload/v1730805820/campus1_mfechp.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: '25% 90%',
      }}>

        <div className='w-3/5 h-full bg-[#272988] opacity-75 flex items-center px-16'>
          <div className='flex flex-col gap-3 w-4/5 '>
            <h1 className='text-white text-4xl font-bold opacity-100'> Campus life</h1>
            <p className='text-white text-xl opacity-100'>Vibrant student life with various clubs, cultural events, and support services for international students, including Thai language and cultural classes.</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-5 items-start mx-[15%] pb-10 border-b-4 border-[#BABABA]'>
        <div>
          <h1 className='text-3xl font-bold'>Campus and Location</h1>
        </div>
        <div >
          <p className='text-xl pb-5 border-b-4 border-[#BABABA]'>Nestled in Bangkok’s vibrant central district, Pierre University’s campus combines modern architecture with traditional Thai influences, creating a unique atmosphere that reflects both international and local cultures. The campus is equipped with state-of-the-art facilities, including advanced labs, multimedia classrooms, and an expansive library with resources from around the world.</p>
        </div>

        <div>
          <h1 className='text-3xl font-bold'>Campus Facilities</h1>
        </div>
        <div>
          <p className='text-xl'>The university boasts modern architecture mixed with Thai cultural design, creating an inspiring environment for learning and collaboration. Key facilities include:</p>
        </div>

        <div>
          <ul className='list-disc list-inside flex flex-col gap-4'>
            <li>Advanced Learning Spaces – High-tech classrooms, lecture halls, and seminar rooms equipped with the latest educational technology.</li>
            <li>Research Labs – Specialized labs in engineering, health sciences, and environmental studies, giving students hands-on experience in their fields.</li>
            <li>Library and Digital Resources – A vast library with international publications, digital resources, and quiet study areas, available to students around the clock.
            </li>
            <li>Innovation Hub – A collaborative workspace for students and faculty to develop projects, supported by state-of-the-art technology and research resources.
            </li>
          </ul>
        </div>
      </div>

      <div className='flex w-full h-[850px]'>

        <div className='w-[600px] min-w-[600px] h-full ml-1 flex overflow-hidden'>

          <div className='h-full'>
            <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730805831/env.friendly_hixmpo.jpg" alt="environment" />
          </div>

        </div>
          <div className='flex flex-col justify-center m-28 gap-6 ' >
          <h1 className='text-3xl font-bold'>Campus and Location</h1>
            <p className='text-xl pb-12 border-b-4 border-[#BABABA]'>The campus includes landscaped gardens and green spaces where students can relax and study outdoors. The university has committed to eco-friendly practices, integrating sustainable energy, waste management, and green building initiatives across the campus.</p>
          </div>

      </div>
    </div>
  )
}
