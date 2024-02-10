import Layout from '../../components/Layouts/Default'
import Hero from '../../components/Hero'
import TextLayout from '../../components/TextLayout'
import Events from '../../components/Events'
import Video from '../../components/Video'
import ImageLayout from '../../components/ImageLayout'
import Breadcrumbs from '../../components/Breadcrumbs'
import IconModal from '../../components/IconModal'

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
  email,
  spotify,
  facebook,
  instagram,
  concerts,
  images,
  videos,
  socialMedia,
}) {
  let heroUrl, mobileHeroUrl

  if (hero) heroUrl = 'https:' + hero?.fields?.file?.url
  if (mobileHero) mobileHeroUrl = 'https:' + mobileHero?.fields?.file?.url

  return (
    <Layout socialMedia={socialMedia} pageTitle={name}>
      {hero && (
        <Hero
          altText='Hero Image'
          heroPosition='center'
          desktopImg={heroUrl}
          mobileImg={mobileHeroUrl || heroUrl}
        >
          <div className='pt-[85px]'>
            <AnimateIn animationType='slide' delay={1000}>
              <h1 className='text-[2.6rem] md:text-8xl font-bold leading-none tracking-wider text-primary-100 opacity-80 uppercase font-khorla text-center'>
                {name}
              </h1>
            </AnimateIn>
          </div>
        </Hero>
      )}

      <div className='w-full centerContent mt-6 lg:mt-8'>
        <Breadcrumbs />
      </div>

      <div className='container flex flex-col pt-1 pb-6 lg:pb-16 lg:pt-6 gap-6 lg:gap-16'>
        <div className='w-full pt-2 lg:pt-0 centerContent px-3 md:px-10'>
          <TextLayout text={biography || description} />
        </div>

        {(images.length > 0 || videos.length > 0) && (
          <div className='pt-2 flex flex-col gap-2 lg:gap-6'>
            <div className='container flex justify-center items-center flex-wrap'>
              <div
                className={`container grid grid-flow-row ${videos.length > 1 && 'lg:grid-cols-2'} gap-2 px-2`}
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
            <div
              className={`w-full grid ${images.length === 2 && 'grid-cols-2'} ${images.length > 2 && 'md:grid-cols-3'
                } gap-1 container px-2`}
            >
              {images.map((image, index) => (
                <ImageLayout key={image} index={index} image={'https:' + image.url} />
              ))}
            </div>
          </div>
        )}

        <Events
          concerts={concerts}
          bandName={name}
          email={email}
          noPadding
          morePrevConcertsText={`More previous concerts with ${name}`}
        />

        <IconModal />
      </div>
    </Layout>
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

  const band = bandRes.items.find((entry) => {
    return entry.fields.name.toLowerCase() === slug
  })

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

  const heroUrl = band?.hero ? 'https:' + band?.hero?.fields?.file?.url : undefined
  const mobileHeroUrl = band?.mobileHero ? 'https:' + band?.mobileHero?.fields?.file?.url : undefined

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
        altText: band?.hero ? band?.hero?.fields?.title : 'Desktop Hero Image',
        blur: heroBlur || null,
        image: heroUrl || null
      },
      mobileHero: {
        altText: band?.mobileHero ? band?.mobileHero?.fields?.title : 'Mobile Hero Image',
        blur: mobileHeroBlur || null,
        image: mobileHeroUrl || null
      },
      concerts: {
        upcoming: upcomingConcertsRes?.items || concerts.upcoming,
        previous: previousConcertsRes?.items || concerts.previous,
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
  }
}
