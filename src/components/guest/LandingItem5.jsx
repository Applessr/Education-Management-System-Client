import React, { useEffect, useRef, useState } from 'react'
import landingVideo from '../../assets/bg-landing2.mov';
import dotBackground from '../../assets/bg-dotDotdot.webp';
import stringBackground from '../../assets/strings2.svg';
import media1 from '../../assets/bg-media1.mp4';

export default function LandingItem5() {

  const contentRef = [useRef(null), useRef(null), useRef(null)];
  console.log(contentRef)
  const [contentVisible, setContentVisible] = useState([false, false, false]);
  // console.log('contentVisible', contentVisible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entriesArr) => {
        entriesArr.forEach((el) => {
          // console.log("forEach observe ==",el)
          // console.log("observe at target==",el.target)
          const index = contentRef.findIndex(ref => ref.current === el.target)

          if (el.isIntersecting && index !== -1) {
            setContentVisible((prev) => {
              const newContentVisible = [...prev];
              newContentVisible[index] = true
              // console.log('arr after intersect== ', newContentVisible)
              return newContentVisible
            })
          }
        })
        // console.log("out of forEach observe")
      },
      { threshold: 0.3 }
    )

    // observe all div assigned useRef not requited to be in an array
    contentRef.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      // console.log('out of useEffect--------------------------------------------')
      contentRef.forEach((el) => {
        if (el.current) {
          observer.unobserve(el.current)
        }
      })
    }
  }, [])

  return (
    <div className='flex flex-col gap-2 w-screen items-center overflow-y-hidden'
      style={{
        backgroundImage: `url(${stringBackground})`,
        backgroundSize: 'cover',
      }}
    >

      <div className={`w-[85%] flex  ${contentVisible[0] ? 'opacity-100 slide-media' : 'opacity-0'}`} ref={contentRef[0]} >

        <div className=' flex items-center '>
          <div className='w-1/2 '>
            <h1 className='text-4xl text-[#272988] font-bold mb-4'>Discover the Faculty of Communication and Media Studies at Pierre University</h1>
            <p className='text-xl'>Unlock your potential in one of the world’s fastest-growing fields! The Faculty of Communication and Media Studies at Pierre University offers dynamic programs that blend creativity with cutting-edge technology, preparing you for success in the global media landscape.</p>
          </div>

          <div className="w-1/2 h-[500px] clip-custom">
            <video src={media1} autoPlay loop muted className='object-cover w-full h-full'></video>
          </div>

        </div>

      </div>

      {/* content 2 */}
      <div className={`w-[85%] flex ${contentVisible[1] ? 'opacity-100 slide-media' : 'opacity-0'}`} ref={contentRef[1]} >

        <div className='flex  items-center'>
          <div className='w-1/2 '>
            <h1 className='text-3xl text-[#272988] font-semibold mb-4'>Why Choose Us?</h1>
            <ul className='list-disc list-inside pl-7 text-xl'>
              <li>Comprehensive Curriculum
                Explore media theory, digital storytelling, public relations, and multimedia production, all taught by industry experts and renowned faculty.</li>
              <li>State-of-the-Art Facilities
                Work in high-tech media labs, TV and radio studios, and digital editing suites, gaining hands-on experience with the latest industry tools.</li>
              <li>Global Opportunities
                With exchange programs, internships, and partnerships around the world, students get real-world exposure and valuable global perspectives.</li>
              <li>Career Pathways
                Graduates from this faculty are in high demand, finding careers in journalism, broadcasting, social media, public relations, and digital marketing.</li>
            </ul>
          </div>

          <div className="w-1/2 h-[600px] clip-custom-second mr-6">
            <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1731233112/bg-media2_hfekgu.jpg" alt="media2" className='object-cover w-full h-full' />
          </div>
        </div>
      </div>

      {/* content 3 */}
      <div className={`w-[85%] flex ${contentVisible[2] ? 'opacity-100 slide-media' : 'opacity-0'}`} ref={contentRef[2]}>

        <div className='flex  items-center'>
          <div className='w-1/2 '>
            <h1 className='text-3xl text-[#272988] font-semibold mb-4'>Join the Digital Media and Film & Television Studies Program at Pierre University!</h1>
            <p className='text-xl'>Are you ready to shape the future of media? Dive into the world of storytelling, production, and digital innovation with our Digital Media and Film & Television Studies program at Pierre University. Designed for creative minds and tech enthusiasts, this program provides you with the skills, knowledge, and industry exposure to excel in the evolving media landscape.</p>
          </div>

          <div className="w-1/2 h-[500px] clip-custom mr-6">
            <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1731233113/bg-media3_wxyhah.jpg" alt="media3" className='object-cover w-full h-full' />
          </div>
        </div>
      </div>

    </div>
  )
}
