import Layout from '../components/Layouts/Default'
import Event from '../components/Event'
import Image from 'next/image'
import Title from '../components/Title'
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
  console.log('🚀 || file: concerts.js:35 || getStaticProps || page:', page)

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

      <div className={`flex flex-col ${concerts.previous.length && 'gap-10 md:gap-24'} py-10 md:py-24`}>
        <div>
          <div className='flex flex-col gap-4 md:gap-12 px-4 md:px-0'>
            <Title title='Upcoming' />
            {concerts.upcoming.length > 0 ? (
              <div className='centerContent flex-col container relative w-full bg-primary-950 rounded shadow-lg px-6'>
                {concerts.upcoming.map((concert, index) => (
                  <Event
                    key={concert.sys.id}
                    date={concert.fields.dateTime}
                    venue={concert.fields.venue}
                    city={concert.fields.address}
                    country={concert.fields.country}
                    link={concert.fields.urlLink}
                    first={index === 0}
                    last={index + 1 === concerts.upcoming.length}
                  />
                ))}
              </div>
            ) : (
              <div className='centerContent flex-col container relative w-full p-6 bg-primary-950 rounded shadow-lg'>
                <p className='text-xl leading-loose text-center tracking-wider font-bold font-khorla text-primary-100'>
                  No upcoming concerts at this moment.
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          {concerts.previous.length > 0 && (
            <div className='flex flex-col gap-4 md:gap-12 px-4 md:px-0'>
              <Title title='Previous' />{' '}
              <div className='centerContent flex-col container relative w-full px-6 bg-primary-950 rounded shadow-lg'>
                {concerts.previous.map((concert, index) => (
                  <Event
                    key={concert.sys.id}
                    date={concert.fields.dateTime}
                    venue={concert.fields.venue}
                    city={concert.fields.address}
                    country={concert.fields.country}
                    link={concert.fields.urlLink}
                    first={index === 0}
                    last={index + 1 === concerts.previous.length}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
