import Layout from '../components/Layouts/Default'
import Video from '../components/Video'
import ImageLayout from '../components/ImageLayout'

import { createClient } from 'contentful'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'galleryPage',
  })


  const socialRes = await contentful.getEntries({
    content_type: 'homePage',
    select: 'fields.email, fields.facebook, fields.instagram, fields.spotify, fields.youTube, fields.phone',
  })

  const page = pageRes.items[0].fields
  const socialPage = socialRes?.items[0]?.fields

  const videos = page.videos.map(video => video.fields)
  const images = page.images.map(image => image.fields.file)


  return {
    props: {
      pageTitle: page.title,
      videos,
      images,
      socialMedia: {
        email: socialPage?.email || null,
        facebook: socialPage?.facebook || null,
        instagram: socialPage?.instagram || null,
        spotify: socialPage?.spotify || null,
        youTube: socialPage?.youTube || null,
        phone: socialPage?.phone || null,
      }
    },
  }
}

const Gallery = ({ pageTitle, videos, images, socialMedia }) => {
  return (
    <Layout pageTitle={pageTitle} socialMedia={socialMedia}>
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className='py-3 lg:py-16 flex flex-col gap-3 lg:gap-6'>
          <div className='container flex justify-center items-center flex-wrap'>
            <div className={`container grid grid-flow-row ${videos.length > 1 && 'lg:grid-cols-2'} gap-4 px-2`}>
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

          <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-2 container px-2'>
            {
              images.map((image, index) => (
                <ImageLayout key={image} index={index} image={'https:' + image.url} />
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Gallery
