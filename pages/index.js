import Link from 'next/link'
import Layout from '../components/Layouts/default'
import AnimateIn from '../components/AnimateIn'

export default function Home() {
  return (
    <Layout>
      <div className='font-khorla container w-full h-screen flex flex-col justify-center items-center px-32 font-medium text-primary tracking-wide'>
        <div className='text-matcha-800'>
          <AnimateIn animationType='slide'>
            <h1 className='text-[10rem] leading-none drop-shadow-lg'>Veera</h1>
          </AnimateIn>
          <div className='text-[12rem] leading-none ml-36 '>
            <AnimateIn classes='drop-shadow-lg' animationType='slide' slideDirection='right'>
              Kuisma
            </AnimateIn>
            <AnimateIn animationType='slide' slideDirection='bottom'>
              <Link href='/about'>
                <div className='text-3xl w-full flex justify-end mt-6 pr-4'>
                  Violinist, Composer & Folk Musician
                </div>
              </Link>
            </AnimateIn>
          </div>
        </div>
      </div>

      <div className='h-screen right-0 top-0 fixed flex gap-12 justify-center items-center flex-col'>
        <AnimateIn
          animationType='slide'
          slideDirection='right'
          classes='flex justify-start items-center h-20 w-[150px] sideMenuItem text-3xl duration-500 delay-[1000ms]'
        >
          <Link href='/about' className='absolute -translate-x-[35%] font-bold font-khorla text-matcha-800'>
            About Me
          </Link>
        </AnimateIn>
        <AnimateIn
          animationType='slide'
          slideDirection='right'
          classes='flex justify-start items-center h-20 w-[150px] sideMenuItem text-3xl duration-500 delay-[1200ms]'
        >
          <p className='absolute -translate-x-[35%] font-bold font-khorla text-matcha-800'>Projects</p>
        </AnimateIn>
        <AnimateIn
          animationType='slide'
          slideDirection='right'
          classes='flex justify-start items-center h-20 w-[150px] sideMenuItem text-3xl duration-500 delay-[1400ms]'
        >
          <p className='absolute -translate-x-[35%] font-bold font-khorla text-matcha-800'>Music</p>
        </AnimateIn>
        <AnimateIn
          animationType='slide'
          slideDirection='right'
          classes='flex justify-start items-center h-20 w-[150px] sideMenuItem text-3xl duration-500 delay-[1600ms]'
        >
          <p className='absolute -translate-x-[35%] font-bold font-khorla text-matcha-800'>Contact</p>
        </AnimateIn>
      </div>
    </Layout>
  )
}
