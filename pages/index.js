import Link from 'next/link'
import Layout from '../components/Layouts/Default'
import AnimateIn from '../components/AnimateIn'
import Hero from '../components/Hero'

import { createClient } from 'contentful'

export default function Home({ pageTitle, slogan, hero, mobileHero, socialMedia }) {
  return (
    <Layout socialMedia={socialMedia} transparent footer={false} headerFadeIn pageTitle={pageTitle}>
      <Hero altText='Hero Image' heroPosition='top' desktopImg={hero} mobileImg={mobileHero}>
        <div className='text-primary-100 flex flex-col font-khorla justify-center items-center tracking-wide'>
          <div className='flex w-full justify-end pr-3 -mb-3 md:pr-6 md:-mb-8'>
            <AnimateIn animationType='slide' delay={1000}>
              <h1 className='text-[2.6rem] md:text-[4.3rem] font-medium leading-none drop-shadow-2xl'>
                Veera
              </h1>
            </AnimateIn>
          </div>

          <div className='text-[5rem] md:text-[10rem] leading-none'>
            <AnimateIn delay={1000} className='drop-shadow-2xl' animationType='slide' slideDirection='right'>
              Kuisma
            </AnimateIn>
          </div>

          <div className='w-full '>
            <AnimateIn animationType='slide' slideDirection='bottom' delay={1000}>
              <Link href='/about'>
                <div className='text-sm md:text-xl flex justify-end pr-4 -mt-3'>{slogan}</div>
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

  const hero = page?.hero ? 'https:' + page?.hero?.fields?.file?.url : null
  const mobileHero = page?.mobileHero ? 'https:' + page?.mobileHero?.fields?.file?.url : null

  return {
    props: {
      hero,
      mobileHero,
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
  }
}
