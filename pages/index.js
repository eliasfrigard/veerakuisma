import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layouts/default'
import AnimateIn from '../components/AnimateIn'

export default function Home() {
  return (
    <Layout>
      <div className='font-khorla container w-full h-screen flex flex-col justify-center items-center px-32 font-medium text-primary tracking-wide'>
        <div className='absolute bg-[#07080D] w-screen h-screen opacity-70'></div>

        {/* Background Image */}
        <AnimateIn animationType='fade' classes='duration-[1000ms]'>
          <Image
            alt="alt-text"
            src="/veera-3367.jpg"
            fill
            className={`block object-cover object-center`}
          />
        </AnimateIn>

        <div className='absolute bg-[#07080D] w-screen h-screen opacity-30'></div>

        {/* Overlay */}
        <AnimateIn animationType='fade' classes='absolute w-screen h-full bg-[#07080D] bg-opacity-60 backdrop-blur-sm delay-[1000ms]'>
        </AnimateIn>

        {/* Text */}
        <div className='text-[#F2EEEB] flex flex-col'>
          <div className='w-full flex justify-end pr-6 -mb-6'>
            <AnimateIn animationType='slide' classes='delay-[1000ms]'>
              <h1 className='text-[4.3rem] font-medium leading-none drop-shadow-2xl'>Veera</h1>
            </AnimateIn>
          </div>

          <div className='text-[10rem] leading-none'>
            <AnimateIn classes='delay-[1000ms] drop-shadow-2xl' animationType='slide' slideDirection='right'>
              Kuisma
            </AnimateIn>
          </div>

          <div>
            <AnimateIn animationType='slide' slideDirection='bottom' classes='delay-[1000ms]'>
              <Link href='/about'>
                <div className='text-xl w-full flex justify-end pr-4 -mt-2'>
                  Violinist, Composer & Folk Musician
                </div>
              </Link>
            </AnimateIn>
          </div>
        </div>
      </div>
    </Layout>
  )
}
