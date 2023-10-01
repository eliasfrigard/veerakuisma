import Layout from '../components/Layouts/Default'
import Image from "next/image"

export default function Gallery() {
  const ImageLayout = ({ image }) => {
    return (
      <div className='relative h-full w-full'>
        <Image
          alt={image}
          src={image}
          fill
          className={`object-cover object-center rounded shadow`}
        />

        <div className='absolute bg-primary-950 w-full h-full z-10 opacity-20 hover:opacity-0 duration-300 grayscale'></div>
      </div>
    )
  }

  return (
    <Layout>
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className='w-full h-screen grid grid-cols-3 gap-1 container py-16'>
          <ImageLayout image="/veera-3367.jpg" />
          <ImageLayout image="/alda.jpg" />
          <ImageLayout image="/P1110768.jpg" />
          <ImageLayout image="/P1110770.jpg" />
          <ImageLayout image="/Polenta-8__c__Tommi_Ahonen.webp" />
          <ImageLayout image="/veera-3270-3.jpg" />
          <ImageLayout image="/veera-ensemble.jpeg" />
          <ImageLayout image="/polentakaustinen.jpeg" />
          <ImageLayout image="/veeramaister.jpeg" />
        </div>
      </div>
    </Layout>
  )
}
