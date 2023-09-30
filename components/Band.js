import AnimateIn from "./AnimateIn"
import SocialMediaIcons from "./SocialMediaIcons"

import Image from "next/image"

export default function Band({ band }) {
  return (
    <AnimateIn animationType='slide' slideDirection='right' classes="relative centerContent flex-col rounded overflow-hidden shadow-lg mx-4">
      <Image
        alt={band.image}
        src={band.image}
        fill
        className={`object-cover object-center`}
      />

      <div className="absolute bg-black opacity-80 w-full h-full"></div>

      <div className="max-w-3xl text-primary-500 my-12 md:my-16 px-6 ">
        <div classes='w-full flex flex-col justify-center items-center px-6'>
          <div>
            <div className='flex flex-col centerContent gap-5'>
              <h1 className={`text-4xl drop-shadow-2xl leading-normal text-center tracking-wider font-khorla mx-12`}>{band.name}</h1>
              <SocialMediaIcons />
            </div>
          </div>

          <div className='border-b border-primary-500 w-full opacity-20 my-8'></div>
        </div>

        <div className="flex justify-center items-center gap-16 w-full">
          {/* <div className='rounded-lg overflow-hidden relative h-[300px] flex-grow flex flex-col justify-center bg-black'>
          <Image
          alt={band.image}
          src={band.image}
          fill
          className={`object-cover object-center`}
          />
        </div> */}
          <div className='prose prose-2xl max-w-2xl text-center md:text-justify leading-[2rem] tracking-wide font-sans font-medium z-10'>
            {band.description}
          </div>
        </div>
      </div>

      <div className="w-full min-h-16 bg-black opacity-50 text-white uppercase font-bold font-khorla -tracking-wider centerContent cursor-pointer hover:opacity-100 duration-100 tracking-wider text-center p-4">
        {`Read more about ${band.name}`}
      </div>
    </AnimateIn>
  )
}
