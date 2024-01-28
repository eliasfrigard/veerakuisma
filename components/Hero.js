import Image from 'next/image'

import { useParallax } from "react-scroll-parallax"

import AnimateIn from '../components/AnimateIn'

const Hero = ({ children, className, desktopImg, mobileImg, altText, overlay = true }) => {
  const parallax = useParallax({
    speed: -40,
  })

  return (
    <AnimateIn className={className}>
      <div id='hero' className='relative h-screen w-screen -mt-[85px] flex justify-center items-center shadow-lg overflow-hidden'>
        <Image
          ref={parallax.ref}
          alt={altText}
          src={desktopImg || mobileImg}
          fill
          className={`hidden md:block object-cover`}
        />

        {mobileImg &&
          (
            <Image
              alt={altText}
              src={mobileImg || desktopImg}
              fill
              className='md:hidden object-cover object-bottom'
            />
          )
        }

        {overlay && (
          <AnimateIn
            delay={1000}
            className='absolute w-full h-screen bg-primary-950 bg-opacity-70 backdrop-blur'
          ></AnimateIn>
        )}

        <div className='z-10 mt-85 centerContent'>{children}</div>
      </div>
    </AnimateIn>
  )
}

export default Hero
