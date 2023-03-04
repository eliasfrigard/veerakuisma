import Image from 'next/image'
import Layout from './Layouts/Default'

export default function Home() {
  return (
    <Layout>
      <div className='container w-full h-screen flex flex-col justify-center items-center px-32 font-medium text-primary'>
        <div className='text-matcha-800'>
          <div className='text-[12rem] leading-none'>Veera</div>
          <div className='text-[12rem] leading-none ml-36 '>
            Kuisma
            <div className='text-2xl w-full flex mt-3 ml-4'>Musician & Composer</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
