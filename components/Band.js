import React from 'react'

import AnimateIn from "./AnimateIn"
import SocialMediaIcons from "./SocialMediaIcons"

import Image from "next/image"

export default function Band({ band }) {
  const containerRef = React.useRef(null)

  const [fontSize, setFontSize] = React.useState()

  React.useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth
    const targetSize = 34

    setFontSize
    console.log('🚀 || file: Band.js:13 || React.useEffect || containerWidth:', containerWidth)
  }, [])

  return (
    <AnimateIn slideDirection='right' classes="relative centerContent flex-col rounded overflow-hidden shadow-lg mx-4">
      <Image
        alt={band.image}
        src={band.image}
        fill
        className={`object-cover object-center`}
      />

      <div className={`absolute bg-primary-950 ${band.image && 'opacity-90'} w-full h-full`}></div>

      <div className="w-full max-w-3xl text-primary-100 my-12 md:my-16 px-4">
        <div classes='w-full flex flex-col justify-center items-center'>
          <div>
            <div ref={containerRef} className='flex flex-col centerContent gap-5'>
              <h1 className={`text-2xl md:text-4xl drop-shadow-2xl leading-normal text-center tracking-wider font-khorla mx-12`}>{band.name}</h1>
              <SocialMediaIcons />
            </div>
          </div>

          <div className='border-b border-primary-100 w-full opacity-20 my-8'></div>
        </div>

        <div className="flex justify-center items-center gap-16 w-full">
          <div className='prose prose-2xl max-w-2xl text-center md:text-justify leading-[2rem] tracking-wide font-sans font-medium z-10'>
            {band.description}
          </div>
        </div>
      </div>

      <div className="w-full min-h-16 bg-primary-900 opacity-60 uppercase font-bold font-khorla text-primary-50 centerContent cursor-pointer hover:opacity-80 duration-100 tracking-wider text-center p-4 z-10">
        {`Read more about ${band.name}`}
      </div>
    </AnimateIn>
  )
}
