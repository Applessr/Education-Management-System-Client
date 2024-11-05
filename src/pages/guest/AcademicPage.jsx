import React from 'react'

export default function AcademicPage() {
  return (
    <div className='h-auto flex flex-col item gap-11'>

      <div className='h-[550px] flex justify-end' style={{
        backgroundImage: 'url(https://res.cloudinary.com/djudr1vzc/image/upload/v1730804841/academic1_zgdhfv.jpg)', // Replace with your direct image link
        backgroundSize: 'cover',
        backgroundPosition: '20% 25%',
      }}>

        <div className='w-2/5 h-full bg-[#272988] opacity-75 flex items-center px-16'>
          <div className='flex flex-col gap-3 w-4/5'>
            <h1 className='text-white text-4xl font-bold'> Academic Programs</h1>
            <p className='text-white text-xl '>Pierre University offers a range of undergraduate, graduate, and doctoral programs across various disciplines</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-5 items-start mx-[15%] pb-10 border-b-4 border-black'>
        <div>
          <h1 className='text-3xl font-bold'>Academic Excellence at Pierre University</h1>
        </div>
        <div>
          <p className='text-xl'>Pierre University offers a wide array of undergraduate, graduate, and doctoral programs designed to meet international standards. Programs span disciplines such as:</p>
        </div>

        <div>
          <ul className='list-disc list-inside flex flex-col gap-4'>
            <li>Business and Management – Specializations in International Business, Marketing, and Hospitality Management prepare students for leadership in global industries.
              n</li>
            <li>Engineering and Technology – Cutting-edge courses in Computer Science, IT, and Engineering, with a focus on emerging technologies and practical applications.</li>
            <li>Health Sciences – Programs in Public Health, Nursing, and Biomedical Sciences that emphasize both clinical skills and research.
            </li>
            <li>Social Sciences and Humanities – International Relations, Psychology, and Cultural Studies programs that equip students to address global social issues.
            </li>
          </ul>
        </div>

        <div>
          <h1 className='text-3xl font-bold'>Focus on Practical Learning</h1>
        </div>
        <div>
          <p className='text-xl'>Courses integrate internships, case studies, and project-based learning, allowing students to gain real-world experience. Many programs include capstone projects and research opportunities, preparing graduates to enter their fields with confidence.</p>
        </div>
        <div>
          <h1 className='text-3xl font-bold'>Global Curriculum and Faculty</h1>
        </div>
        <div>
          <p className='text-xl'>Pierre University’s faculty includes international experts and industry professionals who bring a global perspective to the classroom. The curriculum emphasizes both global and regional insights, helping students understand diverse cultural and business contexts.</p>
        </div>

        <div>
          <h1 className='text-3xl font-bold'>Language and Multicultural Education</h1>
        </div>
        <div>
          <p className='text-xl'>All programs are taught in English, with additional language support and cultural orientation for international students. This approach prepares students to succeed in multicultural environments and global careers.</p>
        </div>

        <div>
          <h1 className='text-3xl font-bold'>Research and Innovation Hubs</h1>
        </div>
        <div>
          <p className='text-xl'>The university supports a strong culture of research, with dedicated centers in fields like Sustainable Development, Health Innovation, and Technology. Students and faculty collaborate on projects addressing regional and global challenges, often working with industry partners.</p>
        </div>

      </div>
    </div>
  )
}
