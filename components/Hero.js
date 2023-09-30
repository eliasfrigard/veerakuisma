import Image from "next/image"

import AnimateIn from "../components/AnimateIn"

export default function Hero({ children, desktopImg, mobileImg, altText, heroPosition }) {
  return (
    <AnimateIn>
      <div id='hero' className='relative h-screen -mt-[85px] flex justify-center items-center shadow-xl'>
        <Image
          alt={altText}
          src={desktopImg}
          fill
          className={`hidden lg:block object-cover object-${heroPosition}`}
        />
        <Image
          alt={altText}
          src={mobileImg}
          fill
          className='lg:hidden object-cover object-bottom'
        />

        <AnimateIn delay={2000} classes="absolute w-full h-screen bg-black bg-opacity-70 backdrop-blur delay-[1000ms]"></AnimateIn>

        <div className="z-10 centerContent">
          {children}
        </div>
      </div>

    </AnimateIn>
  )
}
