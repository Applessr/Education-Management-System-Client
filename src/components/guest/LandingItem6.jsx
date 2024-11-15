import React, { useEffect, useRef, useState } from 'react'

export default function LandingItem6() {
  const contentRef = useRef(null)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect( ()=> {
    const observer = new IntersectionObserver(
      ([entry]) => {
   
        if (entry.isIntersecting) {
          setContentVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if ( contentRef.current) {
      observer.observe(contentRef.current)
    }
    return () => observer.disconnect()
    
  }, [])

  return (
    <div 
    ref={contentRef}
    className={`h-screen mb-2 ${contentVisible ? 'opacity-100 slide-media' : 'opacity-0'}`} 
    style={{
      backgroundImage: 'url(https://res.cloudinary.com/djudr1vzc/image/upload/v1731287255/BBA_qowoqs.jpg)',
      backgroundSize: 'cover',
    }}
    >
      <div className='text-white w-1/2 flex flex-col justify-center h-full'>
        <div className='relative z-0 w-full h-full bg-[#0A1E1F] bg-opacity-50'> 
          <div className={`absolute z-50 flex flex-col h-full justify-center ml-16 ${contentVisible ? 'opacity-100 scale-up-center-BBA' : 'opacity-0'}`}> 
            <h1 className='text-6xl font-bold mb-10'>Business and Economics</h1>
            <p className='text-2xl font-bold'>
              Dynamic programs in Business Administration and Accounting, equipping future leaders with the skills to excel in global business environments. From foundational business principles to advanced financial analysis, students gain a comprehensive education tailored to meet the demands of the modern economy.
            </p>
          </div>
        </div>
      </div>    
    </div>
  )
}
