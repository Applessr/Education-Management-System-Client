import { User } from 'lucide-react';
import React, { useEffect, useRef } from 'react'

export default function LandingItem8() {
    const scrollRef = useRef(null);

    // ffffffffffffffffffffffffffffffffffffffff
    // const handleScroll = (e) => {
    //     e.stopPropagation()

    //     const scrollDeltaY = e.deltaY
    //     const threshold = 1;

    //     const startHorizon = scrollRef.current.scrollLeft <= 0
    //     const endHorizon = scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth - threshold

    //     console.log(scrollRef.current.scrollWidth, "--------- ", scrollRef.current.clientWidth)
    //     console.log("StartHorizon ===", startHorizon , "endHorizon ===", endHorizon)
    //     // console.log("current position =", scrollRef.current.scrollLeft)

    //     const direction = e.deltaY > 0 ? 1 : -1;
    //     const currentPosition = container.scrollLeft;
    //     const nextPosition = currentPosition + (containerWidth * direction);
    //     scrollRef.current.scrollLeft += scrollDeltaY
    //     // console.log("after calculation =", scrollRef.current.scrollLeft += scrollDeltaY)

    //     if (!startHorizon && !endHorizon) {
    //         // froze screen
    //         e.preventDefault()
    //         scrollRef.current.scrollLeft += e.deltaY // what?
    //     }
    // }

    const handleScroll = (e) => {
        if (!scrollRef.current) return;

        const container = scrollRef.current;
        const containerWidth = container.clientWidth;

        // Determine scroll direction
        const direction = e.deltaY > 0 ? 1 : -1;

        // Calculate current snap point
        const currentPosition = container.scrollLeft;

        console.log("currentPosition ======",currentPosition)
        const nextPosition = currentPosition + (containerWidth * direction);

        container.scrollTo({
            left: nextPosition,
            behavior: 'smooth'
        });

        const userSeen = container.scrollWidth - containerWidth;
        // console.log('user=====',userSeen)
        if (currentPosition > 0 && currentPosition >= userSeen) {
            console.log("still inside")
            e.preventDefault();
        }
    };

    useEffect(() => {
        const scrollElement = scrollRef.current
        // wheel must not be in passive mode to prevent default
        scrollElement.addEventListener('wheel', handleScroll, { passive: false })

        return () => {
            scrollElement.removeEventListener('wheel', handleScroll);
        };
    }, [])

    return (
        <div
            ref={scrollRef}
            className='horizontal-scroll overflow-x-scroll flex  ml-2 mt-4 hide-scrollbar '>

            <div className=' w-screen h-screen flex-shrink-0'
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/djudr1vzc/image/upload/v1731317758/bridge-1834754_1920_gergg3.jpg)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className='relative z-0 w-1/2 h-full bg-[#eff7fd] opacity-60'>
                    <div className='absolute z-50 w-1/2 h-full flex flex-col justify-center items-center p-[1]'>
                        <h1 className='text-5xl font-bold mb-10'>Join the Faculty of Engineering at Pierre University!</h1>
                        <p className='text-3xl font-medium'>  Ready to engineer the future? At the Faculty of Engineering at Pierre University, students receive hands-on training and cutting-edge knowledge to drive innovation and tackle global challenges. With a focus on real-world applications, our programs equip you to excel in diverse engineering fields.</p>
                    </div>
                </div>
            </div>

            <div className='w-screen h-screen flex-shrink-0 bg-pink-500 '
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/djudr1vzc/image/upload/v1731317759/engineer-4922423_1920_yiemcz.jpg)`,
                    backgroundSize: 'cover',
                }}>
                <div className='w-1/2 h-full flex flex-col justify-center items-center ml-10'>
                    <h1 className='text-5xl font-bold mb-10'>Shape Tomorrow with Pierre University’s Faculty of Engineering!</h1>
                    <p className='text-2xl font-medium'>At Pierre University, the Faculty of Engineering offers a launchpad for those ready to transform ideas into reality. Our programs in Mechanical, Civil, Electrical, and Software Engineering give you the skills to excel in fast-growing fields. Dive into hands-on projects in high-tech labs, connect with global industry leaders, and gain insights from experienced faculty who are pioneers in their fields. From sustainable infrastructure to groundbreaking software, your education here is designed to propel you into a future of innovation and impact.</p>
                </div>
            </div>

            <div className='w-screen h-screen flex-shrink-0 bg-green-500 '
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/djudr1vzc/image/upload/v1731318204/paper-3225109_1920_yyyjkl.jpg)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <h1 className='text-5xl font-bold mb-10'>Build your career, solve real-world challenges, and lead the change with Pierre University!</h1>
                </div>
            </div>
        </div>
    )
}
