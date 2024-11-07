import React from 'react'

export default function ActivityPage() {
  return (
    <div className='h-auto w-full'>

      <div className='flex flex-col gap-5 items-start mx-[5%] pb-10 border-b-4 border-black flex-wrap'>
        <div>
          <h1 className='text-3xl font-bold'>Academic Excellence at Pierre University</h1>
        </div>
        <div>
          <p className='text-xl'>Pierre University offers a wide array of undergraduate, graduate, and doctoral programs designed to meet international standards. Programs span disciplines such as:</p>
        </div>

        <div className="flex w-full gap-4">

          <div className='w-1/2 flex flex-col gap-2'>
            <h1 className='text-xl font-bold'>Student Clubs and Organizations</h1>
            <div className='h-auto overflow-hidden'>
            <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730810012/activity-student_hkwoyq.jpg" alt="" />
            </div>
            <div>
              <ul className='list-disc list-inside flex flex-col gap-4'>
                <li>Academic Clubs – Clubs for business, engineering, health sciences, and other disciplines allow students to deepen their knowledge and network with professionals.</li>
                <li>Cultural Societies – Students can join groups that celebrate various cultures, including Thai, international, and ethnic-specific clubs, creating a space for sharing and learning about traditions from around the world.
                </li>
                <li>Creative and Arts Clubs – These include drama, music, photography, and fine arts, where students can express their creativity and showcase their talents.
                </li>
                <li>
                Sports and Recreation – Options range from soccer, badminton, and swimming to martial arts and yoga, promoting both competition and fitness.
                </li>
              </ul>
            </div>
          </div>

          <div className='w-1/2  flex flex-col gap-2'>
            <h1 className='text-xl font-bold'>Events and Festivals</h1>
            <div className='h-[455px] overflow-hidden'>
            <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730810022/activity-culture1_ehdruo.jpg" alt="" />
            </div>
            <div>
              <ul className='list-disc list-inside flex flex-col gap-4'>
                <li>International Day – A university-wide event where students celebrate diversity by sharing their cultures, showcasing traditional attire, cuisine, music, and dances.</li>
                <li>Career Fairs and Networking Events – Regular events where students connect with industry professionals, explore job opportunities, and attend skill-building workshops.</li>
                <li>Academic Conferences and Guest Lectures – Students can attend lectures and seminars led by field experts and visiting professors, gaining insights into global issues and industry trends.
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div className="flex w-full gap-4">

          <div className='w-1/2 flex flex-col gap-2'>
            <h1 className='text-xl font-bold'>Leadership and Volunteer Programs</h1>
            <div className='h-auto overflow-hidden'>
            <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730810033/activity-volunteer1_uyby5d.jpg" alt="volunteers"  className='w-full h-auto'/>
            </div>
            <div>
              <ul className='list-disc list-inside flex flex-col gap-4'>
                <li>Student Government – A student-led body that represents the student community, organizing events and advocating for student needs.</li>
                <li>Volunteer Programs – Opportunities to work with NGOs, engage in environmental projects, or participate in local community outreach, fostering social responsibility and hands-on learning.
                </li>
                <li>
                Peer Mentorship – Senior students can become mentors, helping newer students with academic guidance, campus orientation, and personal support.
                </li>
              </ul>
            </div>
          </div>

          <div className='w-1/2  flex flex-col gap-2'>
            <h1 className='text-xl font-bold'>Innovation and Entrepreneurship Initiatives</h1>
            <div className='h-auto overflow-hidden'>
            <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730810062/activity-innovation1_ckqigl.jpg" alt="" />
            </div>
            <div>
              <ul className='list-disc list-inside flex flex-col gap-4'>
                <li>Startup Incubators and Competitions – For students interested in launching their own ventures, Pierre University provides support through entrepreneurship competitions, hackathons, and mentorship from industry experts.</li>
                <li>Research Projects – Students can collaborate on research initiatives led by faculty, working in labs or with external organizations to contribute to real-world solutions.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
