import AnimateIn from "./AnimateIn"
import SocialMediaIcons from "./SocialMediaIcons"

import Image from "next/image"

export default function Band({ band }) {
  return (
    <AnimateIn animationType='slide' slideDirection='right'>
      <div classes='w-full flex flex-col justify-center items-center px-6'>
        <div>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between w-full'>
            <h1 className={`text-4xl drop-shadow-2xl leading-[4.5rem] tracking-wider font-khorla`}>{band.name}</h1>
            <SocialMediaIcons />
          </div>
        </div>

        <div className='border-b border-red-500 w-full opacity-20 mb-7 mt-6 md:mt-3'></div>
      </div>

      <div className="flex justify-between items-center gap-16">
        <div className='h-[300px] flex-grow flex flex-col justify-center bg-black'></div>
        <div className='prose prose-2xl max-w-3xl leading-[2rem] tracking-wide font-sans font-medium'>
          {band.description}
        </div>
      </div>

      <div className="w-full h-16 bg-black opacity-50 rounded-lg mt-10 text-white uppercase font-bold font-khorla -tracking-wider centerContent cursor-pointer hover:opacity-100 duration-100">
        {`Read more about ${band.name}`}
      </div>
    </AnimateIn>
  )
}
