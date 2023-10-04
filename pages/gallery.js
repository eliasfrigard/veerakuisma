import Image from 'next/image'

import Layout from '../components/Layouts/Default'
import Video from '../components/Video'
import ImageLayout from '../components/ImageLayout'

import { createClient } from 'contentful';

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const videoRes = await contentful.getEntries({
    content_type: 'video'
  })

  const imageRes = await contentful.getAssets()

  const videos = videoRes.items.map(item => item.fields)
  const images = imageRes.items.map(item => item.fields.file)

  return {
    props: {
      videos,
      images
    },
  }
}

const Gallery = ({ videos, images }) => {
  return (
    <Layout pageTitle='Gallery'>
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className='py-6 md:py-16 flex flex-col gap-6 md:gap-16'>
          <div className='w-full h-screen grid grid-cols-2 md:grid-cols-3 gap-1 container px-2'>
            {
              images.map((image, index) => (
                <ImageLayout key={image} index={index} image={'https:' + image.url} />
              ))
            }
          </div>

          <div className='container flex justify-center items-center flex-wrap'>
            <div className={`container grid grid-flow-row ${videos.length > 1 && 'lg:grid-cols-2'} gap-6 px-2`}>
              {videos.map((video, index) => (
                <Video
                  prominent={index === 0}
                  key={video.youTubeLink}
                  title={video.name}
                  link={video.youTubeLink}
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
