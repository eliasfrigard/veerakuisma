import Image from 'next/image'
import Layout from '../components/Layouts/Default'
import AnimateIn from '../components/AnimateIn'
import TwoColumnLayout from '../components/TwoColumnLayout'

import { createClient } from 'contentful'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'aboutPage',
  })

  const page = pageRes.items[0].fields

  return {
    props: {
      hero: page.hero,
      mobileHero: page?.mobileHero || null,
      biography: page.biography,
    },
  }
}

const About = ({
  hero,
  mobileHero = undefined,
  biography,
}) => {
  return (
    <Layout pageTitle='About'>
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className='container centerContent flex-col gap-6 md:gap-16 p-6 md:py-16'>
          <AnimateIn className='relative w-full aspect-[9/16] md:aspect-video'>
            <Image
              alt={hero.fields?.title}
              src={'https:' + hero.fields?.file?.url}
              fill
              className={`object-cover object-center rounded shadow`}
            />
          </AnimateIn>

          <AnimateIn className='text-center md:text-justify leading-[2rem] tracking-wide font-sans font-medium z-10 md:px-10'>
            <TwoColumnLayout text={biography} />
          </AnimateIn>
        </div>
      </div>
    </Layout>
  )
}

export default About
