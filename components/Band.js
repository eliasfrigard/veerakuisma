import Image from 'next/image'
import Link from 'next/link'

import AnimateIn from './AnimateIn'
import TextLayout from './TextLayout'

const Band = ({ name, image, description }) => {
  const link = `/bands/${name.toLowerCase()}`

  return (
    <AnimateIn
      className='relative centerContent flex-col rounded-xl overflow-hidden shadow-lg mx-4 hover:scale-[1.01] duration-500'
    >
      <Link
        href={link}
        aria-label={`View ${name} band page`}
        className="w-full h-full flex flex-col justify-center items-center cursor-pointer group"
      >
        <Image
          alt={name}
          src={image}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />

        <div className='w-full h-full bg-primary-900 bg-opacity-70 backdrop-blur duration-500 flex justify-center items-center group-hover:bg-opacity-60 group-hover:backdrop-blur-sm'>
          <div className='w-full max-w-3xl text-primary-100 my-10 lg:my-16 px-4'>
            <div className='w-full flex flex-col justify-center items-center'>
              <div className='flex flex-col centerContent gap-5'>
                <h1
                  className={`text-3xl md:text-4xl drop-shadow-2xl leading-normal text-center tracking-wider font-khorla mx-12`}
                >
                  {name}
                </h1>
              </div>

              <div className='border-b border-primary-100 w-3/4 opacity-20 my-6 lg:my-8 rounded-full'></div>
            </div>

            <div className='flex justify-center items-center gap-16 w-full'>
              <div className='prose prose-2xl max-w-2xl text-center md:text-justify leading-[2rem] tracking-wide font-sans font-medium z-10'>
                <TextLayout
                  text={description}
                  className='text-primary-100 prose-headings:my-0 prose-headings:font-medium prose-p:my-0 prose-headings:text-primary-100 prose-blockquote:text-primary-100 prose-a:text-accent-500 prose-blockquote:border-primary-100 px-2'
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </AnimateIn>
  )
}

export default Band
