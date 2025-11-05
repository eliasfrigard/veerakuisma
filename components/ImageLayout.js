import Image from 'next/image'

import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

const ImageLayout = ({ image, index, onClick }) => {
  return (
    <AnimateIn
      delay={index * 1000}
      className={`relative h-full w-full max-h-[700px] aspect-square delay-[${index * 1000}ms] rounded overflow-hidden cursor-pointer`}
      onClick={onClick}
    >
      <div className="relative w-full h-full overflow-hidden group">
        <Image
          alt={image}
          src={image}
          fill
          className={`object-cover object-center brightness-95 shadow
                      transition-all duration-500 ease-in-out
                      will-change-transform transform-gpu
                      origin-center group-hover:scale-105 group-hover:brightness-110`}
        />
      </div>
    </AnimateIn>
  )
}

export default ImageLayout