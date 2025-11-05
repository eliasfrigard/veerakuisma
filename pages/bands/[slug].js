import Image from 'next/image'
import Layout from '../../components/Layouts/Default'
import TextLayout from '../../components/TextLayout'
import Video from '../../components/Video'

import Hero from '../../components/Hero'
import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'
import { getImageBuffer } from "../../util/getImageBuffer"

export default function Band({
  name,
  hero,
  mobileHero,
  description,
  biography,
  spotify,
  videos,
  socialMedia,
}) {
  const fallback = true
  const hasLongWord = name.split(' ').some((word) => word.length >= 12)

  return (
    <Layout socialMedia={socialMedia} pageTitle={name}>
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className={`container centerContent flex-col gap-6 md:gap-16 md:px-0 md:py-16 ${hero && fallback ? 'pb-8 pt-8' : 'pb-8 pt-2'}`}>
          <div className='px-6 w-full'>
            <Hero Image={Image} spaced fallback={fallback} overlay={false} heroPosition='top' desktopImg={hero} mobileImg={mobileHero}>
              <div className='h-full w-full bg-red-400 bg-opacity-60'>
              </div>
            </Hero>
          </div>

          <AnimateIn threshold={0} className='text-center md:text-justify leading-[2rem] tracking-wide font-sans font-medium z-10 px-3 md:px-10 pt-2 lg:pt-0 flex flex-col gap-6 md:gap-10 justify-center items-center mt-2'>
            <h1 className={`break-word font-bold leading-[1] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary-950 to-accent-600 opacity-80 uppercase font-khorla text-center drop-shadow-glow ${hasLongWord ? 'text-[2rem]' : 'text-[3rem]'} md:text-7xl`}>
              {name}
            </h1>
            <div className='w-2/3 h-[1px] bg-primary-950 opacity-20 rounded-full' />
            <TextLayout text={biography || description} />
          </AnimateIn>


          {
            videos?.length > 0 && (
              <div className='container mx-auto flex justify-center items-center flex-wrap px-6 md:px-0'>
                <div
                  className={`container grid grid-flow-row ${videos?.length > 1 && 'lg:grid-cols-2'} gap-4`}
                >
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
            )
          }

          {
            spotify?.length > 0 && (
              <div className={`gap-6 container mx-auto px-6 md:px-0 ${spotify?.length > 1 ? 'grid md:grid-cols-2' : ''}`}>
                {
                  spotify?.length && spotify.map((album, index) => (
                    <AnimateIn key={index} className='w-full'>
                      <iframe
                        className={`md:shadow-lg h-full min-h-[500px] w-full`}
                        src={`https://open.spotify.com/embed/album/${album.split('/').pop()}`}
                        allowFullScreen
                        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                        loading='lazy'
                      ></iframe>
                    </AnimateIn>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </Layout >
  )
}

export async function getStaticPaths() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const bandRes = await contentful.getEntries({
    content_type: 'band',
  })

  const paths = bandRes.items.map((band) => ({
    params: {
      slug: band.fields.name.toLowerCase(),
    },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const bandRes = await contentful.getEntries({
    content_type: 'band',
  })

  let band = bandRes.items.find((entry) => {
    return entry.fields.name.toLowerCase() === slug
  })

  if (!band) {
    return {
      notFound: true
    }
  }

  var currentDate = new Date().toISOString()

  const upcomingConcertsRes = await contentful.getEntries({
    content_type: 'concert',
    'fields.band.sys.id': band?.sys.id,
    order: 'fields.dateTime',
    'fields.dateTime[gte]': currentDate,
  })

  const previousConcertsRes = await contentful.getEntries({
    content_type: 'concert',
    'fields.band.sys.id': band?.sys.id,
    order: '-fields.dateTime',
    'fields.dateTime[lte]': currentDate,
  })

  const imageRes = await contentful.getAssets({
    'metadata.tags.sys.id[in]': slug.toLowerCase(),
  })

  const videoRes = await contentful.getEntries({
    content_type: 'video',
    'fields.band.sys.id[in]': band.sys.id,
  })

  const socialRes = await contentful.getEntries({
    content_type: 'homePage',
    select: 'fields.email, fields.facebook, fields.instagram, fields.spotify, fields.youTube, fields.phone',
  })

  const socialPage = socialRes?.items[0]?.fields

  const videos = videoRes.items.map((item) => item.fields)
  const images = imageRes.items.map((item) => item.fields.file)

  let heroBlur, mobileHeroBlur

  const heroUrl = band?.fields?.hero ? 'https:' + band?.fields?.hero?.fields?.file?.url : undefined
  const mobileHeroUrl = band?.fields?.mobileHero ? 'https:' + band?.fields?.mobileHero?.fields?.file?.url : undefined

  if (heroUrl) {
    const heroBuffer = await getImageBuffer(heroUrl)
    const heroPlaiceholder = await getPlaiceholder(heroBuffer)
    heroBlur = heroPlaiceholder.base64
  }

  if (mobileHeroUrl) {
    const mobileHeroBuffer = await getImageBuffer(mobileHeroUrl)
    const mobileHeroPlaiceholder = await getPlaiceholder(mobileHeroBuffer)
    mobileHeroBlur = mobileHeroPlaiceholder.base64
  }

  return {
    props: {
      ...band?.fields,
      hero: {
        altText: band?.fields?.hero?.fields?.title || '',
        blur: heroBlur || null,
        url: heroUrl || null
      },
      mobileHero: {
        altText: band?.fields?.mobileHero?.fields?.title || '',
        blur: mobileHeroBlur || null,
        url: mobileHeroUrl || null
      },
      concerts: {
        upcoming: upcomingConcertsRes?.items || [],
        previous: previousConcertsRes?.items || [],
      },
      images,
      videos,
      socialMedia: {
        email: socialPage?.email || null,
        facebook: socialPage?.facebook || null,
        instagram: socialPage?.instagram || null,
        spotify: socialPage?.spotify || null,
        youTube: socialPage?.youTube || null,
        phone: socialPage?.phone || null,
      },
    },
    revalidate: 3600, // Revalidate every hour
  }
}
