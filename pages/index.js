import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layouts/Default'
import AnimateIn from '../components/AnimateIn'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <Layout transparent footer={false} headerFadeIn>
      <Hero
        altText="Hero Image"
        heroPosition="top"
        desktopImg="/veera-3367.jpg"
        mobileImg="/veera-3367.jpg"
      >
        <div className='text-primary-100 flex flex-col font-khorla justify-center items-center tracking-wide'>
          <div className='flex w-full justify-end pr-3 -mb-3 md:pr-6 md:-mb-6'>
            <AnimateIn animationType='slide' classes='delay-[1000ms]'>
              <h1 className='text-[2.6rem] md:text-[4.3rem] font-medium leading-none drop-shadow-2xl'>Veera</h1>
            </AnimateIn>
          </div>

          <div className='text-[5rem] md:text-[10rem] leading-none'>
            <AnimateIn classes='delay-[1000ms] drop-shadow-2xl' animationType='slide' slideDirection='right'>
              Kuisma
            </AnimateIn>
          </div>

          <div className='w-full '>
            <AnimateIn animationType='slide' slideDirection='bottom' classes='delay-[1000ms]'>
              <Link href='/about'>
                <div className='text-sm md:text-xl flex justify-end pr-4 -mt-1 md:-mt-2'>
                  Violinist, Composer & Folk Musician
                </div>
              </Link>
            </AnimateIn>
          </div>
        </div>
      </Hero>
    </Layout>
  )
}
