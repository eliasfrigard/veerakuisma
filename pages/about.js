import Image from 'next/image'
import Layout from '../components/Layouts/Default'
import TextLayout from '../components/TextLayout'
import Video from '../components/Video'

import Hero from '../components/Hero'
import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'
import { getImageBuffer } from "../util/getImageBuffer"

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'aboutPage',
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
      pageTitle: page.title,
      biography: page.biography,
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

const About = ({
  hero,
  mobileHero,
  pageTitle,
  biography,
  socialMedia
}) => {
  return (
    <Layout pageTitle={pageTitle} socialMedia={socialMedia}>
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className='container centerContent flex-col gap-6 md:gap-16 px-6 py-8 md:px-0 md:py-16'>
          <Hero Image={Image} spaced overlay={false} heroPosition='top' desktopImg={hero} mobileImg={mobileHero} />

          <AnimateIn threshold={0} className='text-center md:text-justify leading-[2rem] tracking-wide font-sans font-medium z-10 px-3 md:px-10 pt-2 lg:pt-0'>
            <TextLayout text={biography} />
          </AnimateIn>
        </div>
      </div>

      <div className='container mx-auto pb-8 md:pb-16 px-6 md:px-0'>
        <Video link="https://www.youtube.com/watch?v=7xW4906-n0U" prominent />
      </div>

    </Layout>
  )
}

export default About
