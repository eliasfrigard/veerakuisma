import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layouts/default'
import AnimateIn from '../components/AnimateIn'

export default function Home() {
  return (
    <Layout>
      <div className='font-khorla container w-full min-h-screen flex flex-col justify-center px-32 font-medium text-primary tracking-wide p-32 '>
        <h1 className='text-[11rem] leading-none drop-shadow-lg text-[#F2EEEB] uppercase text-center mb-16'>
          Bands & Projects
        </h1>
        <AnimateIn animationType='slide' classes='w-full h-[60vh] bg-secondary-500 rounded-xl shadow-md'>
          <Link href='/'>
            <Image
              alt='Veera Hero'
              src='/veera-3367.jpg'
              fill
              className={`rounded-xl shadow-md object-cover object-center`}
            />
          </Link>
        </AnimateIn>
      </div>
    </Layout>
  )
}
