import Image from "next/image"

import AnimateIn from "../components/AnimateIn"

export default function Hero({ children, desktopImg, mobileImg, altText, heroPosition, overlay = true }) {
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

        {
          overlay && (
            <AnimateIn classes="delay-[1000ms] absolute w-full h-screen bg-primary-950 bg-opacity-70 backdrop-blur">
            </AnimateIn>
          )
        }


        <div className="z-10 mt-85 centerContent">
          {children}
        </div>
      </div>

    </AnimateIn>
  )
}
