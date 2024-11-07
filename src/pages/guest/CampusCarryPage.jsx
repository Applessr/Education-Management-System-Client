import React from 'react'

export default function CampusCarryPage() {
  return (
    <div>
      <div className='flex flex-col gap-5 items-start mx-[15%] pb-10 mt-5'>
        <div>
          <h1 className='text-3xl font-bold'>Pierre University Campus Carry-On Guidelines</h1>
        </div>
        <div >
          <p className='text-xl pb-5 '>To maintain a safe, productive, and enjoyable environment for all students, Pierre University has set the following guidelines for items allowed on campus:</p>
        </div>

        <div>
          <h1 className='text-3xl font-bold'>Permitted Items</h1>
        </div>
        
        <div className='ml-6'>
          <ul className='list-disc list-inside flex flex-col gap-4 text-xl'>
            <li>Personal Electronics – Laptops, tablets, and phones for study and class use.</li>
            <li>Backpacks and Bags – Bags are allowed, but large suitcases or oversized luggage should be checked with campus services.</li>
            <li>Reusable Water Bottles – We encourage students to stay hydrated and support sustainability.</li>
            <li>Snacks and Light Food – Small snacks and beverages are allowed, but meals should be enjoyed in designated dining areas.</li>
            <li>Umbrellas and Outerwear – Necessary for the rainy season and variable weather in Bangkok.</li>
          </ul>
        </div>

        <div>
          <h1 className='text-3xl font-bold'>Prohibited Items</h1>
        </div>

        <div className='ml-6'>
          <ul className='list-disc list-inside flex flex-col gap-4 text-xl'>
            <li>Weapons or Dangerous Items – Firearms, knives, and other weapons are strictly prohibited.</li>
            <li>Controlled Substances – Drugs and alcohol are not permitted on campus, except for prescription medication with documentation.</li>
            <li>Loudspeakers and Amplifiers – To maintain a peaceful environment, avoid using devices that disrupt others.
            </li>
            <li>Pets – With the exception of service animals, pets are not allowed on campus.
            </li>
          </ul>
        </div>

        <div>
          <h1 className='text-3xl font-bold'>Additional Notes</h1>
        </div>

        <div className='ml-6'>
          <ul className='list-disc list-inside flex flex-col gap-4 text-xl'>
            <li>Security Checks – Campus security may perform bag checks to ensure safety.</li>
            <li>Lost and Found – If you misplace an item, visit the campus Lost and Found office located at the Student Services Center.</li>
            <li>Personal Belongings – Please keep valuables secure and avoid leaving personal items unattended.
            </li>
          </ul>
        </div>
        <p className='text-xl pb-5 '>For questions about specific items or concerns regarding campus carry-on policies, contact the Student Services office at info@pierreuniversity.ac.th or call +66 2 123 4567.</p>
      </div>
    </div>
  )
}
