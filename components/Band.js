import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import AnimateIn from './AnimateIn'
import IconHandler from './IconHandler'

import TextLayout from './TextLayout'

const Band = ({
  name,
  image,
  description,
  spotify,
  email,
  youTube,
  website,
  instagram,
  facebook
}) => {
  const containerRef = React.useRef(null)

  return (
    <AnimateIn
      slideDirection='right'
      className='relative centerContent flex-col rounded overflow-hidden shadow-lg mx-4'
    >
      <Image alt={name} src={image} fill className={`object-cover object-center`} />

      <div className={`absolute bg-primary-950 ${image && 'opacity-90'} w-full h-full`}></div>

      <div className='w-full max-w-3xl text-primary-100 my-12 md:my-16 px-4'>
        <div className='w-full flex flex-col justify-center items-center'>
          <div>
            <div ref={containerRef} className='flex flex-col centerContent gap-5'>
              <h1
                className={`text-2xl md:text-4xl drop-shadow-2xl leading-normal text-center tracking-wider font-khorla mx-12`}
              >
                {name}
              </h1>
              <IconHandler email={email} spotify={spotify} youTube={youTube} website={website} instagram={instagram} facebook={facebook} />
            </div>
          </div>

          <div className='border-b border-primary-100 w-full opacity-20 my-8'></div>
        </div>

        <div className='flex justify-center items-center gap-16 w-full'>
          <div className='prose prose-2xl max-w-2xl text-center md:text-justify leading-[2rem] tracking-wide font-sans font-medium z-10'>
            <TextLayout text={description} className='text-primary-100 prose-headings:text-primary-100 prose-blockquote:text-primary-100 prose-a:text-accent-500 prose-blockquote:border-primary-100' />
          </div>
        </div>
      </div>

      <Link
        href={`/bands/${name.toLowerCase()}`}
        className={`w-full min-h-16 bg-primary-900 opacity-60 uppercase font-bold font-khorla text-primary-50 centerContent cursor-pointer hover:opacity-80 duration-100 tracking-wider text-center p-4 z-10`}
      >
        {`Read more about ${name}`}
      </Link>
    </AnimateIn>
  )
}

export default Band
