import React from 'react'

export default function AboutPage() {
    return (
        <div className='h-screen flex flex-col item gap-11'>

            <div className='h-1/3' style={{
                backgroundImage: 'url(https://res.cloudinary.com/djudr1vzc/image/upload/v1730789153/campus2_rksdsf.jpg)', // Replace with your direct image link
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

                <div className='w-2/5 h-full bg-[#272988] opacity-75 flex items-center px-16'>
                    <div className='flex flex-col gap-3 w-4/5'>
                        <h1 className='text-white text-4xl font-bold'> Pierre University</h1>
                        <p className='text-white text-xl '>Pierre University is an internationally renowned institution in Bangkok, attracting students worldwide with a multicultural, innovative learning environment.</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-3 items-start mx-[15%] pb-10 border-b-4 border-black'>
                <div>
                    <h1 className='text-3xl font-bold'>Pierre University: An International Hub of Learning in Bangkok</h1>
                </div>
                <div>
                    <p className='text-xl'>Pierre University, known for its commitment to global education and innovation, stands as a leading international institution in the heart of Bangkok, Thailand. Established with a vision to create leaders for a globalized world, Pierre University attracts students from across the globe, offering a multicultural environment that fosters academic excellence, cultural understanding, and practical learning.</p>
                  
                </div>
                
            </div>

        </div>
    )
}
