import React from 'react'

export default function ResearchPage() {
  return (
    <div className='h-auto w-full'>

      <div className='flex flex-col gap-5 items-start mx-[5%] pb-10 border-b-4 border-black flex-wrap'>
        <div>
          <h1 className='text-3xl font-bold'>Research Units & Centers at Pierre University</h1>
        </div>
        <div className='mb-7'>
          <p className='text-xl'>Pierre University is committed to advancing knowledge and fostering innovation through a range of research units and centers. These dedicated hubs support interdisciplinary research, collaboration with industry, and real-world solutions for pressing global and regional issues.</p>
        </div>

        <div className="flex w-full gap-4">

          <div className='w-1/2 flex flex-col gap-2'>
            <h1 className='text-xl font-bold'>Health and Biomedical Sciences Research Unit</h1>
            <div className='h-auto overflow-hidden'>
              <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730856805/Research-1_hycsyi.jpg" alt="research Image" />
            </div>
            <div className='ml-6'>
              <ul className='list-disc list-inside flex flex-col gap-4 text-xl'>
                <li>Conducts research in public health, biotechnology, and medical innovations.</li>
                <li>Engages in projects related to disease prevention, healthcare accessibility, and mental health.
                </li>
                <li>Partners with hospitals and health organizations for clinical trials and community health initiatives.
                </li>
              </ul>
            </div>
          </div>

          <div className='w-1/2  flex flex-col gap-2'>
            <h1 className='text-xl font-bold'>Artificial Intelligence and Data Science Lab</h1>
            <div className='h-[455px] overflow-hidden'>
              <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730856791/research-2_afkqzm.jpg" alt="Science Lab image" className='w-full h-full object-cover' />
            </div>
            <div className='ml-6'>
              <ul className='list-disc list-inside flex flex-col gap-4 text-xl'>
                <li>Specializes in machine learning, big data analytics, and AI applications.</li>
                <li>Works on projects related to smart cities, automated systems, and predictive analytics.</li>
                <li>Offers internships and research opportunities for students interested in AI.
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div className="flex w-full gap-4">
          <div className='w-1/2 flex flex-col gap-2'>
            <h1 className='text-xl font-bold'>Center for Cultural and Social Research</h1>
            <div className='h-auto overflow-hidden'>
              <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730856792/activity-culture3_eikfx0.jpg" alt="volunteers" className='w-full h-auto' />
            </div>
            <div className='ml-6'>
              <ul className='list-disc list-inside flex flex-col gap-4 text-xl'>
                <li>Explores cultural dynamics, social change, and human rights in Southeast Asia.</li>
                <li>Engages in fieldwork and policy research to address regional social challenges.
                </li>
                <li>
                  Hosts conferences and publishes reports on cultural integration and social justice.
                </li>
              </ul>
            </div>
          </div>

          <div className='w-1/2  flex flex-col gap-2'>
            <h1 className='text-xl font-bold'>Business and Innovation Research Hub</h1>
            <div className='h-auto overflow-hidden'>
              <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730856792/research-3_ffzcbi.jpg" alt="" />
            </div>
            <div className='ml-6'>
              <ul className='list-disc list-inside flex flex-col gap-4 text-xl'>
                <li>Supports entrepreneurship, startup incubation, and market research.</li>
                <li>Collaborates with business leaders to foster innovative solutions for industry challenges.</li>
                <li>Provides mentorship, resources, and funding for student-led business projects.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className='w-1/2 flex flex-col gap-2'>
            <h1 className='text-xl font-bold'>Center for Sustainable Development</h1>
            <div className='h-auto overflow-hidden'>
              <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730856792/research-4_nyezqc.jpg" alt="volunteers" className='w-full h-auto' />
            </div>
            <div className='ml-6'>
              <ul className='list-disc list-inside flex flex-col gap-4 text-xl'>
                <li>Focuses on environmental research, renewable energy, and sustainable urban development.</li>
                <li>Collaborates with local and international organizations to develop eco-friendly solutions for Southeast Asia.
                </li>
                <li>
                  Hosts annual symposiums on sustainability and publishes research findings in top journals.
                </li>
              </ul>
            </div>
          </div>

          <div className='w-1/2  flex flex-col gap-2'>
            <h1 className='text-xl font-bold'>Business and Innovation Research Hub</h1>
            <div className='h-auto overflow-hidden'>
              <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730810062/activity-innovation1_ckqigl.jpg" alt="business hub image" />
            </div>
            <div className='ml-6'>
              <ul className='list-disc list-inside flex flex-col gap-4 text-xl'>
                <li>Research in advanced materials, robotics, and sustainable engineering.</li>
                <li>Collaborates with tech companies and government bodies on research and development.</li>
                <li>Provides hands-on projects and lab work for engineering students.</li>
              </ul>
            </div>
          </div>

        </div> 
      </div>
    </div>
  )
}
