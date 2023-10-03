import Image from 'next/image'

import Layout from '../components/Layouts/Default'
import Video from '../components/Video'
import AnimateIn from '../components/AnimateIn'

const Gallery = () => {
  const videos = [
    {
      sys: {
        id: 123,
      },
      fields: {
        title: 'Some Venue',
        description: 'Some Venue',
        youTubeLink: 'https://www.youtube.com/watch?v=Q7_7Pf6ncbw',
      },
      sys: {
        id: 123,
      },
      fields: {
        title: 'Some Venue',
        description: 'Some Venue',
        youTubeLink: 'https://www.youtube.com/watch?v=vXE5y7PT0T0',
      },
    },
    {
      sys: {
        id: 123,
      },
      fields: {
        title: 'Some Venue',
        description: 'Some Venue',
        youTubeLink: 'https://www.youtube.com/watch?v=W7pGxCQlTtc',
      },
    },
    {
      sys: {
        id: 123,
      },
      fields: {
        title: 'Some Venue',
        description: 'Some Venue',
        youTubeLink: 'https://www.youtube.com/watch?v=4A1DZ2SlLhE',
      },
    },
    {
      sys: {
        id: 123,
      },
      fields: {
        title: 'Some Venue',
        description: 'Some Venue',
        youTubeLink: 'https://www.youtube.com/watch?v=FtC8_682HDA',
      },
    },
    {
      sys: {
        id: 123,
      },
      fields: {
        title: 'Some Venue',
        description: 'Some Venue',
        youTubeLink: 'https://www.youtube.com/watch?v=UpaJ4JEoxy8',
      },
    },
    {
      sys: {
        id: 123,
      },
      fields: {
        title: 'Some Venue',
        description: 'Some Venue',
        youTubeLink: 'https://www.youtube.com/watch?v=ChcpiSWvOdw',
      },
    },
  ]

  const ImageLayout = ({ image, index }) => {
    return (
      <AnimateIn delay={index * 1000} className={`relative h-full w-full delay-[${index * 1000}}ms]`} >
        <Image alt={image} src={image} fill className={`object-cover object-center rounded shadow`} />

        <div className='absolute bg-primary-950 w-full h-full z-10 opacity-20 hover:opacity-0 duration-300 grayscale'></div>
      </AnimateIn >
    )
  }

  return (
    <Layout pageTitle='Gallery'>
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className='py-6 md:py-16 flex flex-col gap-6 md:gap-16'>
          <div className='w-full h-screen grid grid-cols-2 md:grid-cols-3 gap-1 container px-2'>
            <ImageLayout index={0} image='/veera-3367.jpg' />
            <ImageLayout index={1} image='/alda.jpg' />
            <ImageLayout index={2} image='/P1110768.jpg' />
            <ImageLayout index={3} image='/P1110770.jpg' />
            <ImageLayout index={4} image='/Polenta-8__c__Tommi_Ahonen.webp' />
            <ImageLayout index={5} image='/veera-3270-3.jpg' />
            <ImageLayout index={6} image='/veera-ensemble.jpeg' />
            <ImageLayout index={7} image='/polentakaustinen.jpeg' />
            <ImageLayout index={8} image='/veeramaister.jpeg' />
          </div>

          <div className='container flex justify-center items-center flex-wrap'>
            <div className='container grid grid-flow-row lg:grid-cols-2 gap-6 px-2'>
              {videos.map((video, index) => (
                <Video
                  prominent={index === 0}
                  key={video.sys.id}
                  title={video.fields?.title}
                  description={video.fields.description}
                  link={video.fields.youTubeLink}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Gallery
