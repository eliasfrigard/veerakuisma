import Image from 'next/image'

import AnimateIn from '../components/AnimateIn'

const Hero = ({ image, index }) => {
  return (
    <AnimateIn delay={index * 1000} className={`relative h-full w-full max-h-[700px] aspect-square delay-[${index * 1000}}ms]`} >
      <Image alt={image} src={image} fill className={`object-cover object-center rounded shadow`} />

      {/* IMAGE OVERLAY */}
      <div className='absolute bg-primary-950 w-full h-full z-10 opacity-20 hover:opacity-0 duration-300 grayscale'></div>
    </AnimateIn >
  )
}

export default Hero
