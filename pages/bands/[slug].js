import Layout from '../../components/Layouts/Default'
import Hero from '../../components/Hero'
import AnimateIn from '../../components/AnimateIn'
import TextLayout from '../../components/TextLayout'
import Events from '../../components/Events'

import { createClient } from 'contentful'

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
  concerts
}) {
  let heroUrl, mobileHeroUrl

  if (hero) heroUrl = 'https:' + hero?.fields?.file?.url
  if (mobileHero) mobileHeroUrl = 'https:' + mobileHero?.fields?.file?.url

  return (
    <Layout>
      {hero && (
        <Hero
          altText='Hero Image'
          heroPosition='center'
          desktopImg={heroUrl}
          mobileImg={mobileHeroUrl}
        >
          <div className='pt-[85px]'>
            <AnimateIn animationType='slide' delay={1000}>
              <h1 className='text-[2.6rem] md:text-8xl font-bold leading-none tracking-wider text-primary-100 opacity-60 uppercase font-khorla'>
                {name}
              </h1>
            </AnimateIn>
          </div>
        </Hero>
      )}

      <AnimateIn className='container centerContent z-10 md:px-10 pt-24'>
        <TextLayout text={biography || description} />
      </AnimateIn>

      <Events concerts={concerts} bandName={name} className='md:py-0 md:pb-24' />
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
    }
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

  return {
    props: {
      ...band?.fields,
      concerts: {
        upcoming: upcomingConcertsRes?.items || concerts.upcoming,
        previous: previousConcertsRes?.items || concerts.previous,
      },
    },
  }
}
