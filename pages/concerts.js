import Layout from '../components/Layouts/Default'
import Event from '../components/Event'
import Image from 'next/image'
import Title from '../components/Title'
import AnimateIn from '../components/AnimateIn'
import Hero from '../components/Hero'

// import { createClient } from 'contentful'

export async function getStaticProps() {
  // const contentful = createClient({
  //   space: process.env.SPACE_ID,
  //   accessToken: process.env.ACCESS_TOKEN,
  // })

  // var currentDate = new Date().toISOString()

  // const upcomingConcertsRes = await contentful.getEntries({
  //   content_type: 'concert',
  //   order: 'fields.dateTime',
  //   'fields.dateTime[gte]': currentDate,
  // })

  // const previousConcertsRes = await contentful.getEntries({
  //   content_type: 'concert',
  //   order: '-fields.dateTime',
  //   'fields.dateTime[lte]': currentDate,
  // })

  // const pageRes = await contentful.getEntries({
  //   content_type: 'concertsPage',
  // })

  // const page = pageRes.items[0].fields

  const concerts = {
    upcoming: [
      {
        sys: {
          id: 123
        },
        fields: {
          dateTime: Date.now(),
          venue: 'Some Venue',
          address: 'Some Address Somewhere',
          country: 'Finland',
          urlLink: 'https://veerakuisma.vercel.app'
        },
      },
      {
        sys: {
          id: 123
        },
        fields: {
          dateTime: Date.now(),
          venue: 'Some Venue',
          address: 'Some Address Somewhere',
          country: 'Finland',
          urlLink: 'https://veerakuisma.vercel.app'
        },
      }
    ],
    previous: [
      {
        sys: {
          id: 123
        },
        fields: {
          dateTime: Date.now(),
          venue: 'Some Venue',
          address: 'Some Address Somewhere',
          country: 'Finland',
          urlLink: 'https://veerakuisma.vercel.app'
        },
      },
      {
        sys: {
          id: 123
        },
        fields: {
          dateTime: Date.now(),
          venue: 'Some Venue',
          address: 'Some Address Somewhere',
          country: 'Finland',
          urlLink: 'https://veerakuisma.vercel.app'
        },
      }
    ]
  }

  const hero = {
    fields: {
      file: {
        url: '/veera-3367.jpg'
      }
    }
  }

  const page = null
  const upcomingConcertsRes = null
  const previousConcertsRes = null

  return {
    props: {
      hero: page?.heroImage || hero,
      mobileHero: page?.mobileHeroImage || hero,
      heroPosition: page?.heroPosition || 'center',
      heroImageActive: page?.heroImageActive || true,
      pageTitle: page?.name || 'concerts',
      pageDescription: page?.description || 'concerts',
      concerts: {
        upcoming: upcomingConcertsRes?.items || concerts.upcoming,
        previous: previousConcertsRes?.items || concerts.previous,
      },
    },
  }
}

export default function Concerts({
  hero,
  heroPosition,
  concerts,
  mobileHero,
  heroImageActive,
  pageTitle,
  pageDescription,
}) {
  return (
    <Layout
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      imageUrl={`https: + ${hero.fields.file.url}`}
      pageUrl='/concerts'
    >
      {heroImageActive && (
        <Hero
          altText="Hero Image"
          heroPosition="center"
          desktopImg="/veera-3367.jpg"
          mobileImg="/veera-3367.jpg"
        >
          <div className='pt-[85px]'>
            <AnimateIn animationType='slide' classes='delay-[1000ms]'>
              <h1 className='text-[2.6rem] md:text-8xl font-bold leading-none tracking-wider text-primary-100 opacity-60 uppercase font-khorla'>concerts</h1>
            </AnimateIn>
          </div>
        </Hero>
      )}

      <div className='flex flex-col gap-10 md:gap-24 py-10 md:py-24'>
        <div>
          <div className='flex flex-col md:gap-12 px-4 md:px-0'>
            <Title title='Upcoming' />
            {concerts.upcoming.length > 0 ? (
              <div className='centerContent flex-col container relative w-full bg-primary-950 rounded shadow-lg'>
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
            <div className='flex flex-col px-4 md:px-0 md:gap-12'>
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
