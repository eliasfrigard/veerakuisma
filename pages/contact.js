import Layout from '../components/Layouts/Default'
import AnimateIn from '../components/AnimateIn'
import Hero from '../components/Hero'
import ContactForm from '../components/ContactForm'

import { createClient } from 'contentful'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'contactPage',
  })

  const socialRes = await contentful.getEntries({
    content_type: 'homePage',
    select: 'fields.email, fields.facebook, fields.instagram, fields.spotify, fields.youTube, fields.phone',
  })

  const page = pageRes.items[0].fields
  const socialPage = socialRes?.items[0]?.fields

  const hero = page?.hero ? 'https:' + page?.hero?.fields?.file?.url : null
  const mobileHero = page?.mobileHero ? 'https:' + page?.mobileHero?.fields?.file?.url : null

  return {
    props: {
      hero,
      mobileHero,
      pageTitle: page.title,
      socialMedia: {
        email: socialPage?.email || null,
        phone: socialPage?.phone || null,
        facebook: socialPage?.facebook || null,
        instagram: socialPage?.instagram || null,
        spotify: socialPage?.spotify || null,
        youTube: socialPage?.youTube || null,
        phone: socialPage?.phone || null,
      }
    },
  }
}

const Contact = ({ hero, mobileHero, pageTitle, socialMedia }) => {
  return (
    <Layout
      pageTitle={pageTitle}
      pageDescription={pageTitle}
      imageUrl={hero}
      pageUrl='/concerts'
      footer={false}
      socialMedia={socialMedia}
    >
      <Hero
        altText='Contact Veera'
        heroPosition='center'
        desktopImg={hero}
        mobileImg={mobileHero}
      >
        <div className='relative pt-[85px] w-screen h-screen z-10'>
          <AnimateIn
            delay={1000}
            className='w-full h-full centerContent flex-col text-primary-50 font-khorla tracking-wider gap-2 text-center'
          >
            <p className='text-6xl leading-tight'>Veera Kuisma</p>
            <div className='w-3/4 lg:w-1/2 my-4 h-[1px] bg-primary-100 bg-opacity-20 rounded-full'></div>
            <p className='text-xl tracking-wider'>{socialMedia.email}</p>
            <p className='text-lg tracking-wider'>{socialMedia.phone}</p>
          </AnimateIn>
        </div>

      </Hero>
      <div className='py-16 px-6 w-full bg-primary-950'>
        <ContactForm></ContactForm>
      </div>
    </Layout>
  )
}

export default Contact
