import React from 'react'

export default function ContactPage() {
    return (
        <div >
             <div className='flex w-full h-auto items-center mx-16'>
                <h1 className='text-3xl font-bold'>Contact Us</h1>
             </div>

            <div className='flex w-full h-auto items-center mx-16 '>

                <div className='w-[600px] min-w-[600px] h-full ml-1 flex overflow-hidden'>
                    <div className='h-full'>
                        <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730853349/env-friendly_puuxwc.jpg" alt="Contact building" />
                    </div>
                </div>

                <div className='flex flex-col justify-center m-28 gap-6 border border-black p-6' >
                    <h1 className='text-3xl font-bold'>General Information</h1>
                    <div>
                        <p className='text-xl'>Pierre University Thailand</p>
                        <p className='text-xl'>123 Sukhumvit Road, Bangkok</p>
                        <p className='text-xl'>Main Building (MAI)</p>
                        <p className='text-xl'>Thailand, TX 78712</p>
                        <p className='text-xl'>Tel: 02-123-4567</p>
                        <p className='text-xl'>Email:</p>
                    </div>
                </div>

            </div>

            <div className='flex flex-col justify-center mx-28 gap-4 ' >
                    <h1 className='text-3xl font-bold'>Social Media</h1>
                    <p className='text-xl'>Follow us on Facebook, Instagram, and LinkedIn @PierreUniversityThailand for updates on events, programs, and more!</p>
                    <p className='text-xl pb-12 border-b-4 border-black'>For admissions inquiries or to schedule a campus tour, please reach out via email or phone. We’re here to help you on your path to an exceptional education!</p>
                </div>
        </div>
    )
}
