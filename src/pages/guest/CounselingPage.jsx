import React from 'react'

export default function CounselingPage() {
  return (
    <div className='h-auto flex flex-col item gap-11'>

      <div className='h-[500px] flex justify-start' style={{
        backgroundImage: 'url(https://res.cloudinary.com/djudr1vzc/image/upload/v1730855543/mental_care_psfocg.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: '10% 25%',
      }}>

        <div className='w-2/5 h-full bg-[#005F87]  flex items-center px-16'>
          <div className='flex flex-col gap-3 w-4/5'>
            <h1 className='text-white text-4xl font-bold'>Counseling and Mental Health Center at Pierre University</h1>
            <p className='text-white text-xl '>Pierre University is dedicated to supporting students’ mental health and well-being through our Counseling and Mental Health Center. We provide confidential, compassionate services to help students navigate academic pressures, personal challenges, and mental health needs.</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-5 items-start mx-[15%] pb-1 '>
        <div>
          <h1 className='text-3xl font-bold'>Services Offered</h1>
        </div>

        <div className='ml-6'>
          <ul className='list-disc list-inside flex flex-col gap-4 text-xl'>
            <li>Individual Counseling – Personalized sessions with trained counselors to address concerns like stress, anxiety, relationship issues, and more.
              n</li>
            <li>Group Therapy – Small, supportive groups focusing on topics such as stress management, coping skills, and building resilience.</li>
            <li>Workshops & Seminars – Regular events covering mental wellness topics like mindfulness, time management, and self-care practices.
            </li>
            <li>Crisis Support – Immediate support for urgent mental health issues, available to students in need of emergency assistance.
            </li>
            <li>Referrals – Access to psychiatric services, specialized care, or long-term counseling outside the university if needed.
            </li>
          </ul>
        </div>
      </div>

      <div className='flex flex-col gap-5 items-start mx-[15%] pb-1 '>
        <div>
          <h1 className='text-3xl font-bold'>How to Access Services</h1>
        </div>

        <div className='ml-6'>
          <ul className='list-disc list-inside flex flex-col gap-4 text-xl'>
            <li>Walk-In Hours – Drop-in hours are available daily for immediate support or initial consultations.
              n</li>
            <li>Appointment Scheduling – Book sessions via email or phone. Appointments are available both in-person and online.</li>
            <li>Workshops & Seminars – Regular events covering mental wellness topics like mindfulness, time management, and self-care practices.
            </li>
            <li>Confidentiality – All sessions are private, and records are kept strictly confidential in accordance with university and legal standards.
            </li>
          </ul>
        </div>
      </div>

      <div className='flex flex-col gap-5 items-start mx-[15%] pb-10 border-b-4 border-[#BABABA]'>
        <div>
          <h1 className='text-3xl font-bold'>Contact Information</h1>
        </div>

        <div className='ml-6'>
          <ul className='list-disc list-inside flex flex-col gap-4 text-xl'>
            <li>Location: Student Wellness Building, Pierre University Campus
              n</li>
            <li>Phone: +66 2 123 4570</li>
            <li>Email: counseling@pierreuniversity.ac.th
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}
