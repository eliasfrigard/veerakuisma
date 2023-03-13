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
            <AnimateIn classes='drop-shadow-lg' animationType='slide'>
              Kuisma
            </AnimateIn>
            <AnimateIn animationType='slide'>
              <Link href='/about'>
                <div className='text-3xl w-full flex justify-end mt-3 pr-4'>
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
