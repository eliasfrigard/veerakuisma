import Layout from '../components/Layouts/Default'
import Events from '../components/Events'
import AnimateIn from '../components/AnimateIn'
import Hero from '../components/Hero'

import { createClient } from 'contentful'

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

  const page = pageRes.items[0].fields

  return {
    props: {
      ...(page.hero && { hero: page?.hero }),
      ...(page.mobileHero && { mobileHero: page?.mobileHero }),
      // heroPosition: page?.heroPosition || 'center',
      // heroImageActive: page?.heroImageActive || true,
      pageTitle: page?.title,
      // pageDescription: page?.description,
      concerts: {
        upcoming: upcomingConcertsRes?.items || concerts.upcoming,
        previous: previousConcertsRes?.items || concerts.previous,
      },
    },
  }
}

export default function Concerts({
  hero,
  mobileHero,
  heroPosition,
  concerts,
  pageTitle,
  pageDescription,
}) {
  return (
    <Layout
      pageTitle='Concerts'
      pageDescription={pageDescription}
      imageUrl={`https: + ${hero.fields.file.url}`}
      pageUrl='/concerts'
    >
      {hero && (
        <Hero
          altText='Hero Image'
          heroPosition='center'
          desktopImg='/veera-3367.jpg'
          mobileImg='/veera-3367.jpg'
        >
          <div className='pt-[85px]'>
            <AnimateIn animationType='slide' delay={1000}>
              <h1 className='text-[2.6rem] md:text-8xl font-bold leading-none tracking-wider text-primary-100 opacity-60 uppercase font-khorla'>
                concerts
              </h1>
            </AnimateIn>
          </div>
        </Hero>
      )}

      <Events concerts={concerts} email='mais.kuis@gmail.com' />
    </Layout>
  )
}
