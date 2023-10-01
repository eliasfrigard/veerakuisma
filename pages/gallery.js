import Image from 'next/image'

import Layout from '../components/Layouts/Default'
import Video from '../components/Video'

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

  const ImageLayout = ({ image }) => {
    return (
      <div className='relative h-full w-full'>
        <Image alt={image} src={image} fill className={`object-cover object-center rounded shadow`} />

        <div className='absolute bg-primary-950 w-full h-full z-10 opacity-20 hover:opacity-0 duration-300 grayscale'></div>
      </div>
    )
  }

  return (
    <Layout pageTitle='Gallery'>
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className='py-6 md:py-16 flex flex-col gap-6 md:gap-16'>
          <div className='w-full h-screen grid grid-cols-2 md:grid-cols-3 gap-1 container px-2'>
            <ImageLayout image='/veera-3367.jpg' />
            <ImageLayout image='/alda.jpg' />
            <ImageLayout image='/P1110768.jpg' />
            <ImageLayout image='/P1110770.jpg' />
            <ImageLayout image='/Polenta-8__c__Tommi_Ahonen.webp' />
            <ImageLayout image='/veera-3270-3.jpg' />
            <ImageLayout image='/veera-ensemble.jpeg' />
            <ImageLayout image='/polentakaustinen.jpeg' />
            <ImageLayout image='/veeramaister.jpeg' />
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
