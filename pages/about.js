import Image from 'next/image'
import Layout from '../components/Layouts/Default'
import AnimateIn from '../components/AnimateIn'
import TextLayout from '../components/TextLayout'
import Hero from '../components/Hero'

import { createClient } from 'contentful'

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
    select: 'fields.email, fields.facebook, fields.instagram, fields.spotify, fields.youTube',
  })

  const page = pageRes.items[0].fields
  const socialPage = socialRes?.items[0]?.fields

  const hero = page?.hero ? 'https:' + page?.hero?.fields?.file?.url : null
  const mobileHero = page?.mobileHero ? 'https:' + page?.mobileHero?.fields?.file?.url : null
  console.log('🚀 || file: about.js:29 || getStaticProps || mobileHero:', mobileHero)

  return {
    props: {
      hero,
      mobileHero,
      pageTitle: page.title,
      biography: page.biography,
      socialMedia: {
        email: socialPage?.email || null,
        facebook: socialPage?.facebook || null,
        instagram: socialPage?.instagram || null,
        spotify: socialPage?.spotify || null,
        youTube: socialPage?.youTube || null,
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
        <div className='container centerContent flex-col gap-6 md:gap-16 p-6 md:py-16'>
          {
            mobileHero && (
              <Hero overlay={false} altText='Hero Image' heroPosition='top' mobileImg={mobileHero} className='md:hidden' />
            )
          }

          <AnimateIn className='relative w-full aspect-[9/16] md:aspect-video hidden md:block'>
            <Image
              alt={hero}
              src={hero}
              fill
              className={`object-cover object-center rounded shadow`}
            />
          </AnimateIn>

          <AnimateIn className='text-center md:text-justify leading-[2rem] tracking-wide font-sans font-medium z-10 md:px-10'>
            <TextLayout text={biography} />
          </AnimateIn>
        </div>
      </div>
    </Layout>
  )
}

export default About
