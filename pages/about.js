import Image from 'next/image'
import Layout from '../components/Layouts/Default'
import TextLayout from '../components/TextLayout'
import Video from '../components/Video'

import Hero from '../components/Hero'
import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

import {
  getContentfulClient,
  fetchSocialMedia,
  processHeroImage,
} from '../util/contentful'

export async function getStaticProps() {
  const contentful = getContentfulClient()

  const pageRes = await contentful.getEntries({
    content_type: 'aboutPage',
  })

  const page = pageRes.items[0].fields

  const [{ hero, mobileHero }, socialMedia] = await Promise.all([
    processHeroImage(page),
    fetchSocialMedia(),
  ])

  return {
    props: {
      hero,
      mobileHero,
      pageTitle: page.title,
      biography: page.biography,
      socialMedia,
    },
  }
}

const About = ({ hero, mobileHero, pageTitle, biography, socialMedia }) => {
  return (
    <Layout pageTitle={pageTitle} socialMedia={socialMedia}>
      <div className="-mt-[85px] pt-[85px] min-h-screen">
        <div className="container centerContent flex-col gap-6 md:gap-16 px-6 py-8 md:px-0 md:py-16">
          <Hero
            Image={Image}
            spaced
            overlay={false}
            heroPosition="top"
            desktopImg={hero}
            mobileImg={mobileHero}
          />

          <AnimateIn
            threshold={0}
            className="text-center md:text-justify leading-[2rem] tracking-wide font-sans font-medium z-10 px-2 md:px-10 pt-2 lg:pt-0"
          >
            <TextLayout text={biography} />
          </AnimateIn>
        </div>

        <div className="container mx-auto pb-8 md:pb-16 px-6 md:px-0">
          <Video link="https://www.youtube.com/watch?v=7xW4906-n0U" prominent />
        </div>
      </div>
    </Layout>
  )
}

export default About
