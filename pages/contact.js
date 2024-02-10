import Layout from '../components/Layouts/Default'
import Hero from '../components/Hero'
import ContactForm from '../components/ContactForm'
import DownloadItem from '../components/DownloadItem'
import Title from '../components/Title'

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
    content_type: 'contactPage',
  })

  const socialRes = await contentful.getEntries({
    content_type: 'homePage',
    select: 'fields.email, fields.facebook, fields.instagram, fields.spotify, fields.youTube, fields.phone',
  })

  const fileDownloadRes = await contentful.getEntries({
    content_type: 'fileDownload',
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
        image: heroUrl
      },
      mobileHero: {
        altText: page?.mobileHero ? page?.mobileHero?.fields?.title : page?.hero?.fields?.title,
        blur: mobileHeroBlur,
        image: mobileHeroUrl
      },
      pageTitle: page.title,
      files: fileDownloadRes.items,
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

const Contact = ({ hero, mobileHero, pageTitle, socialMedia, files }) => {
  return (
    <Layout
      pageTitle={pageTitle}
      pageDescription={pageTitle}
      imageUrl={hero}
      pageUrl='/concerts'
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
            className='w-full h-full centerContent flex-col text-primary-50 font-khorla tracking-wider gap-2 px-3 text-center'
          >
            <p className='text-6xl leading-tight'>Veera Kuisma</p>
            <div className='w-3/4 lg:w-1/2 my-4 h-[1px] bg-primary-100 bg-opacity-20 rounded-full'></div>
            <p className='text-xl tracking-wider'>{socialMedia.email}</p>
            <p className='text-lg tracking-wider'>{socialMedia.phone}</p>
          </AnimateIn>
        </div>
      </Hero>

      <div className='py-6 lg:py-16 px-6 w-full bg-primary-950'>
        <ContactForm></ContactForm>
      </div>

      {files.length > 0 && (
        <div className='flex flex-col py-6 lg:py-16 gap-2 md:gap-12 md:px-0'>
          <Title title='Downloads' textColor='text-primary-950' borderColor='border-primary-500' />
          <div
            className={`container px-6 grid grid-flow-row gap-6 md:gap-8 ${files.length > 1 && 'md:grid-cols-2'
              }`}
          >
            {files.map((file) => (
              <DownloadItem
                key={file.sys.id}
                title={file.fields.description}
                filename={file.fields.file.fields.file.fileName}
                file={`https:${file.fields.file.fields.file.url}`}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Contact
