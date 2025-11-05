import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layouts/Default'

import Hero from '../components/Hero'
import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'
import { getImageBuffer } from "../util/getImageBuffer"

export default function Home({ pageTitle, slogan, hero, mobileHero, socialMedia }) {
  return (
    <Layout socialMedia={socialMedia} transparent footer={false} headerFadeIn pageTitle={pageTitle}>
      <Hero Image={Image} heroPosition='top' desktopImg={hero} mobileImg={mobileHero}>
        <div className='text-primary-100/90 flex flex-col font-khorla justify-center items-center tracking-wide'>
          <div className='flex w-full justify-end pr-3 -mb-3 md:pr-6 md:-mb-5'>
            <AnimateIn animationType='slide' delay={1000}>
              <h1 className='text-[2.6rem] md:text-[4.7rem] font-medium leading-none drop-shadow-2xl'>
                Veera
              </h1>
            </AnimateIn>
          </div>

          <div className='text-[5rem] md:text-[11rem] leading-none'>
            <AnimateIn delay={1000} className='drop-shadow-2xl' animationType='slide' slideDirection='right'>
              Kuisma
            </AnimateIn>
          </div>

          <div className='w-full'>
            <AnimateIn animationType='slide' slideDirection='bottom' delay={1000}>
              <Link href='/about'>
                <div className='text-sm md:text-2xl flex justify-end pr-4 -mt-1'>{slogan}</div>
              </Link>
            </AnimateIn>
          </div>
        </div>
      </Hero>
    </Layout>
  )
}

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'homePage',
  })

  const page = pageRes?.items[0]?.fields

  const heroUrl = 'https:' + page.hero.fields.file.url
  const mobileHeroUrl = page?.mobileHero ? 'https:' + page?.mobileHero?.fields?.file?.url : heroUrl

  const heroBuffer = await getImageBuffer(heroUrl)
  const mobileHeroBuffer = mobileHeroUrl !== heroUrl
    ? await getImageBuffer(mobileHeroUrl)
    : heroBuffer

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
      slogan: page?.slogan,
      socialMedia: {
        email: page?.email || null,
        facebook: page?.facebook || null,
        instagram: page?.instagram || null,
        spotify: page?.spotify || null,
        youTube: page?.youTube || null,
        phone: page?.phone || null,
      },
    },
    // Revalidate once per day.
    revalidate: 86400,
  }
}
