import Image from 'next/image'
import Layout from '../components/Layouts/Default'
import Events from '../components/Events'

import { Hero } from 'eliasfrigard-reusable-components/dist/app'
import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'
import { getImageBuffer } from "../util/getImageBuffer"

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  var currentDate = new Date().toISOString()

  const upcomingConcertsRes = await contentful.getEntries({
    content_type: 'concert',
    order: 'fields.dateTime',
    'fields.dateTime[gte]': currentDate,
  })

  const previousConcertsRes = await contentful.getEntries({
    content_type: 'concert',
    order: '-fields.dateTime',
    'fields.dateTime[lte]': currentDate,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'concertsPage',
  })

  const socialRes = await contentful.getEntries({
    content_type: 'homePage',
    select: 'fields.email, fields.facebook, fields.instagram, fields.spotify, fields.youTube, fields.phone',
  })

  const page = pageRes.items[0].fields
  const socialPage = socialRes?.items[0]?.fields

  const heroUrl = 'https:' + page.hero.fields.file.url
  const mobileHeroUrl = page?.mobileHero ? 'https:' + page?.mobileHero?.fields?.file?.url : heroUrl

  const heroBuffer = await getImageBuffer(heroUrl)
  const mobileHeroBuffer = await getImageBuffer(mobileHeroUrl)

  const { base64: heroBlur } = await getPlaiceholder(heroBuffer)
  const { base64: mobileHeroBlur } = await getPlaiceholder(mobileHeroBuffer)

  return {
    props: {
      hero: {
        altText: page?.hero?.fields?.title,
        blur: heroBlur,
        url: heroUrl
      },
      mobileHero: {
        altText: page?.mobileHero ? page?.mobileHero?.fields?.title : page?.hero?.fields?.title,
        blur: mobileHeroBlur,
        url: mobileHeroUrl
      },
      pageTitle: page?.title,
      concerts: {
        upcoming: upcomingConcertsRes?.items || concerts.upcoming,
        previous: previousConcertsRes?.items || concerts.previous,
      },
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

export default function Concerts({
  hero,
  mobileHero,
  concerts,
  pageDescription,
  socialMedia
}) {
  return (
    <Layout
      pageTitle='Concerts'
      pageDescription={pageDescription}
      pageUrl='/concerts'
      socialMedia={socialMedia}
    >
      {/* <Hero
        Image={Image}
        heroPosition='center'
        desktopImg={hero}
        mobileImg={mobileHero}
      >
        <div className='pt-[85px]'>
          <AnimateIn animationType='slide' delay={1000}>
            <h1 className='text-[2.6rem] md:text-8xl font-bold leading-none tracking-wider text-primary-100 opacity-60 uppercase font-khorla'>
              concerts
            </h1>
          </AnimateIn>
        </div>
      </Hero> */}
      <div className="fixed inset-0">
        {/* Overlay with color and blur */}
        <div className="absolute inset-0 bg-primary-900 bg-opacity-30 backdrop-blur-lg z-10" />

        {/* Background image */}
        <Image
          src={hero.url}
          alt={hero.altText}
          fill
          sizes="(min-width: 768px) 80vw, 100vw"
          className="object-cover z-0"
          priority // Ensures the image loads quickly for hero sections
        />
      </div>


      <Events concerts={concerts} email='mais.kuis@gmail.com' titleColor="text-white" />
    </Layout>
  )
}
