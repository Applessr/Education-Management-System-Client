import React from 'react'

const NotFound = () => {
  return (
    <div>
    <section className="">
      <div className=" mx-auto text-[#22A094] flex flex-col items-center">
          <div className="flex text-center m-5">
            <div>
              <img className='w-[39rem]' src='https://i.imgur.com/9lN31En.png'/>
            </div>
            <div className='flex flex-col items-end my-auto'>
              <p className="mb-4 text-3xl tracking-tight font-bold text-[#DB5252] md:text-4xl">Something's missing.</p>
              <p className="mb-4 text-lg text-end text-gray-500 ">Sorry, we can't find that page.<br/> You'll find lots to explore on the home page. </p>
            </div>
          </div>   
      </div>
  </section>
  </div>
  )
}

export default NotFound
